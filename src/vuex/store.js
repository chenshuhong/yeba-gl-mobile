import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config/config'
import util from '@/js/util'
import api from '@/js/api'
Vue.use(Vuex)

const state = {
  token: null,
  isRefreshToken: false,
  currentBar: null,
  userInfo: null,
  openId: '',
  eventbus: null,
  qiniuToken: null
}

const mutations = {
  [config.STORAGE.USER_TOKEN] (state, token) {
    state.token = token
    util.setStorage(config.STORAGE.USER_TOKEN, token)
  },
  [config.STORAGE.IS_REFRESHTOKEN] (state, isRefreshToken) {
    state.isRefreshToken = isRefreshToken
  },
  [config.STORAGE.BAR_INFO] (state, bar) {
    state.currentBar = bar
    util.setSStorage(config.STORAGE.BAR_INFO, bar)
  },
  [config.STORAGE.OPEN_ID] (state, openId) {
    state.openId = openId
    util.setStorage(config.STORAGE.OPEN_ID, openId)
  },
  [config.STORAGE.EVENT_BUS] (state, eventbus) {
    state.eventbus = eventbus
  },
  [config.STORAGE.USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
    util.setStorage(config.STORAGE.USER_INFO, userInfo)
  },
  [config.STORAGE.QINIU_TOKEN] (state, qiniuToken) {
    state.qiniuToken = qiniuToken
  }
}

const actions = {
  [config.STORAGE.BAR_INFO] (context, barId) {
    let data = {
      showLoading: false
    }
    api.getBarInfo(barId, data)
      .then(data => {
        context.commit(config.STORAGE.BAR_INFO, data)
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
