import config from '../../config/config'
import axios from 'axios'
import api from '../api'
import store from '@/vuex/store'
import router from '@/router'
import util from '../util'
import errorCode from './ErrorCode'
import Vue from 'vue'

// axios 配置
const axiosInstance = axios.create({
  baseURL: config.URL,
  timeout: config.NETWORK_TIMEOUT,
  headers: {
    'Accept': 'application/vnd.yeba.v1.1.0+json',
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axiosInstance.interceptors.request.use(function (request) {
  let token = store.state.token
  if (token) {
    request.headers.Authorization = `${token.token_type} ${token.access_token}`
  }
  return request
})

axiosInstance.interceptors.response.use(function (response) {
  console.log(response)
  return response
}, function (error) {
  if (error && error.response && error.response.data && error.response.data.code === errorCode.TOKEN_EXPIRE) {
    let token = store.state.token
    let isRefreshToken = store.state.isRefreshToken
    if (isRefreshToken) {
      return util.delayPromise().then(data => {
        return axiosInstance({
          method: error.config.method,
          url: error.config.url,
          data: error.config.data
        })
      })
    } else {
      if (token && token.refresh_token) {
        store.commit(config.STORAGE.IS_REFRESHTOKEN, true)
        return api.refreshToken(token.refresh_token)
          .then(function (data) {
            store.commit(config.STORAGE.IS_REFRESHTOKEN, false)
            store.commit(config.STORAGE.USER_TOKEN, data)
            return axiosInstance({
              method: error.config.method,
              url: error.config.url,
              data: error.config.data
            })
          }, function (error) {
            console.log(error)
            store.commit(config.STORAGE.IS_REFRESHTOKEN, false)
            if (error.code && error.code === errorCode.REFRESH_TOKEN_INVIAL) {
              console.log('刷新token无效，需要重新登录')
              store.commit(config.STORAGE.USER_TOKEN)
              router.go(0)
            }
          })
      } else {
        return api.tokenBase(false)
          .then(data => {
            store.commit(config.STORAGE.USER_TOKEN, data)
            return axiosInstance({
              method: error.config.method,
              url: error.config.url,
              data: error.config.data
            })
          })
      }
    }
  } else {
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error)
    }
  }
})

function request (url, {data = {}, method = 'GET', individualization = true, showLoading = true, changeMethod = method, successText = ''} = {}) {
  if (changeMethod === 'DELETE') {
    return new Promise((resolve, reject) => {
      Vue.$vux.confirm.show({
        title: '是否删除',
        onConfirm () {
          resolve(doRequest(url, data, method, individualization, showLoading, changeMethod, successText))
        },
        onCancel () {
          reject(new Error('cancel delete'))
        }
      })
    })
  } else {
    return doRequest(url, data, method, individualization, showLoading, changeMethod, successText)
  }
}

function doRequest (url, data, method, individualization, showLoading, changeMethod, successText) {
  if (showLoading) {
    Vue.$vux.loading.show({
      text: '加载中..'
    })
  }
  return axiosInstance.request({
    url,
    method,
    data
  }).then(data => {
    if (showLoading) {
      Vue.$vux.loading.hide()
    }
    if (changeMethod === 'PUT') {
      Vue.$vux.toast.show({
        text: '修改成功'
      })
    } else if (changeMethod === 'POST') {
      Vue.$vux.toast.show({
        text: successText || '新增成功'
      })
    } else if (changeMethod === 'DELETE') {
      Vue.$vux.toast.show({
        text: '删除成功'
      })
    }
    if (data.data.meta) {
      data.data.data.meta = data.data.meta
    }
    return Promise.resolve(data.data.data)
  }).catch(err => {
    if (showLoading) {
      Vue.$vux.loading.hide()
    }
    console.log(err.response)
    let msg = err.code ? err.message : '未知错误'
    if (individualization) {
      Vue.$vux.alert.show({
        title: '加载失败',
        content: msg,
        onHide () {
          if (false) {
            request(url, {
              method,
              data,
              individualization,
              showLoading
            })
          }
        }
      })
    }
    return Promise.reject(err)
  })
}

export default {
  request
}
