// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index'
import {LoadingPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin} from 'vux'
import store from './vuex/store'
import util from './js/util'
import api from './js/api/index'
import config from './config/config'
import VueLazyload from 'vue-lazyload'
import logo from './assets/logo.svg'
import VueClipboard from 'vue-clipboard2'

Vue.prototype.$util = util// 挂载工具到vue实例上
Vue.prototype.$config = config// 挂载配置文件到vue实例上
Vue.prototype.$api = api// 挂载网络请求到vue实例上

Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueClipboard)
Vue.use(ConfirmPlugin)
Vue.use(VueLazyload, {
  error: logo,
  loading: logo
})
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = config.DEV

judgeEnvironment()
initFunDebug()

function judgeEnvironment () {
  // 判断是否手机端访问
  let userAgentInfo = navigator.userAgent.toLowerCase()
  console.log(userAgentInfo)
  let Agents = ['android', 'iphone']
  let isPc = true
  for (let i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) > 0) {
      isPc = false
    }
  }
  if (isPc && process.env.NODE_ENV !== 'development') {
    location.replace(config.PCURL)
  }
}

function initFunDebug () {
  let fundebug = require('fundebug-javascript')
  fundebug.apikey = 'efe68fd84675429ee7b11a0f626cb6e66ad9212b85165a787f432eacc6c2c596'
  fundebug.appversion = config.VERSION
  fundebug.releasetage = config.RELEASESTAGE
  fundebug.silent = (process.env.NODE_ENV === 'development')
  fundebug.filters = [
    {
      message: /cancel delete/
    },
    {
      req: {
        method: /^POST$/,
        url: /signature/
      },
      res: {
        status: /401/
      }
    }
  ]
  Vue.config.errorHandler = function (err, vm, info) {
    let componentName = formatComponentName(vm)
    let propsData = vm.$options && vm.$options.propsData
    fundebug.notifyError(err, {
      metaData: {
        componentName,
        propsData,
        info
      }
    })
  }
}

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  let name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
