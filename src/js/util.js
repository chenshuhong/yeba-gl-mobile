import config from '../config/config'
import Vue from 'vue'

export default {
  /**
   * 跳转到微信授权页
   * @constructor
   */
  WXAuth () {
    console.log('跳转微信登陆中...')
    let redirectUrlEncode = encodeURIComponent(`https://m.yeba.im/h5/login`)
    let afterLoginRedirect = encodeURIComponent(window.location)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.WECHAT_ID}&redirect_uri=${redirectUrlEncode}&response_type=code&scope=snsapi_userinfo&state=${afterLoginRedirect}#wechat_redirect`
  },
  /**
   * 通用设置存储
   * @param key
   * @param value
   */
  setStorage (key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  },
  /**
   * 通用获取存储
   * @param key
   */
  getStorage (key) {
    let valueJson = localStorage.getItem(key)
    if (!valueJson) {
      return
    }
    return JSON.parse(valueJson)
  },
  /**
   * 通用设置存储sessionStorage
   * @param key
   * @param value
   */
  setSStorage (key, value = {}) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * 通用获取存储sessionStorage
   * @param key
   */
  getSStorage (key) {
    let valueJson = sessionStorage.getItem(key)
    if (!valueJson) {
      return
    }
    return JSON.parse(valueJson)
  },

  /**
   * 延迟执行的promise
   * @param ms
   * @returns {Promise}
   */
  delayPromise (ms = 1000) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms)
    })
  },

  /**
   * Created by 15733 on 2017/8/14.
   */
  getQueryString (name) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
  },

  openInPc () {
    Vue.$vux.alert.show({
      title: '提示',
      content: '请暂时先在PC版后台进行设置'
    })
  },

  remove (list, id) {
    let index = list.findIndex((item) => {
      return item.id === id
    })
    if (index < 0) {
      return
    }
    list.splice(index, 1)
  },

  change1 (list, item) {
    let index = list.findIndex((data) => {
      return data.id === item.id
    })
    if (index < 0) {
      return
    }
    Vue.set(list, index, item)
  },

  change2 (list, fun) {
    let {
      index,
      item
    } = fun()
    if (index < 0) {
      return
    }
    Vue.set(list, index, item)
  },

  /**
   * 获取在七牛上的key值，根据yeba.im来标识
   */
  getQiniuKey (url) {
    return url.substring(url.indexOf('yeba.im/') + 8)
  },
  /**
   * 获取七牛url完整路径
   * @param key
   * @returns {*}
   */
  getQiniuUrl (key) {
    return config.QINIU_URL + key
  },
  /**
   * 判断是否需要输入
   * @param val
   * @param desc
   * @returns {boolean}
   */
  judgeValue (val, desc) {
    if (val) {
      return false
    } else {
      Vue.$vux.toast.show({
        text: desc,
        type: 'cancel'
      })
      return true
    }
  },
  /**
   * 开关状态标识
   * @param title
   * @param value
   * @returns {string}
   */
  switchSuffix (title, value) {
    if (value) {
      return title + '<span class="gray">(已关闭)</span>'
    } else {
      return title + '<span class="gray">(已开启)</span>'
    }
  },
  /**
   * 使用微信 JS 对象判断是否微信内置浏览器 ,建议使用此方法进行判断
   * @returns {boolean}
   */
  judgeWeiXin () {
    if (typeof WeixinJSBridge !== 'undefined') {
      console.log('当前在微信')
      return true
    } else {
      console.log('当前不在微信')
      return false
    }
  }
}
