<template>
  <div>
    <img src="../assets/yeba.png" class="yeba-logo center"/>
    <p class="center title1">夜 吧</p>
    <p class="center title2">酒吧夜店娱乐互动平台</p>
    <div>
      <group gutter="8vw" :style="{visibility:isShowPhoneLogin?'visible':'hidden'}">
        <my-input placeholder="请输入夜吧ID/手机号" v-model="phone"></my-input>
        <x-input placeholder="请输入密码" v-model="pwd" type="password"></x-input>
      </group>
      <template v-if="isShowPhoneLogin">
        <box gap="10vw 1rem 0">
          <x-button @click.native="phoneLogin" class="bt-font-size">登陆</x-button>
        </box>
        <p class="gray center bt-font-size login-margin-top" @click="wxAuth">使用微信登录或注册</p>
      </template>
      <template v-else>
        <box gap="10vw 1rem 0">
          <x-button type="primary" @click.native="wxAuth" class="bt-font-size">微信登陆</x-button>
        </box>
        <p class="gray center bt-font-size login-margin-top" @click="showPhoneLogin">使用夜吧账号登录</p>
      </template>
    </div>
    <span class="fixed-bottom gray footer">广州遇乐网络有限公司</span>
  </div>
</template>
<script>
  import {Group, XInput, XButton, Box} from 'vux'
  import errorCode from '../js/api/ErrorCode'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Box,
      MyInput
    },
    name: 'LoginNoKeep',
    data () {
      return {
        phone: '',
        pwd: '',
        isShowPhoneLogin:false
      }
    },
    created () {
      let code = this.$route.query.code
      if (code) {
        this.wxLogin(code)
      }
    },
    methods: {
      phoneLogin () {
        if (this.$util.judgeValue(this.phone,'请输入夜吧ID/手机号')){
          return
        }
        if (this.$util.judgeValue(this.pwd,'请输入密码')){
          return
        }
        this.$api.tokenBase()
          .then(data => {
            this.$store.commit(this.$config.STORAGE.USER_TOKEN, data)
            return this.$api.tokenId(this.phone, this.pwd)
          })
          .then(data => {
            this.$store.commit(this.$config.STORAGE.USER_TOKEN, data)
            return this.$api.getUserInfo()
          })
          .then(data => {
            this.$store.commit(this.$config.STORAGE.USER_INFO, data)
            this.$router.push({
              path: '/BarList'
            })
          })
      },
      wxAuth () {
        this.$util.WXAuth()
      },
      wxLogin (code) {
        let wxUserInfo
        let store = this.$store
        let router = this.$router
        let config = this.$config
        this.$api.tokenBase()
          .then(data => {
            console.log('获取最基本的token', data)
            store.commit(config.STORAGE.USER_TOKEN, data)
            return this.$api.getWechatUserInfo(code)
          })
          .then(data => {
            wxUserInfo = data
            store.commit(config.STORAGE.OPEN_ID, data.openid)
            return this.$api.tokenWx(data.openid, data.unionid)
          })
          .then(data => {
            return Promise.resolve(data)
          }, err => {
            console.log('获取基于微信用户的token失败', err)
            if (errorCode.OPENID_INVALID === err.code || errorCode.USER_NOT_EXSIT === err.code) {
              console.log('检测到需要注册')
              return this.$api.register(wxUserInfo)
                .then(data => {
                  return this.$api.tokenWx(wxUserInfo.openid, wxUserInfo.unionid)
                })
                .then(data => {
                  this.$api.uploadAvatar(wxUserInfo.headimgurl, false).then()
                  console.log('获取基于微信用户的token', data)
                  store.commit(config.STORAGE.USER_TOKEN, data)
                  return Promise.resolve(data)
                })
            } else {
              return Promise.reject(err)
            }
          })
          .then(data => {
            this.$store.commit(this.$config.STORAGE.USER_TOKEN, data)
            return this.$api.getUserInfo()
          })
          .then(data => {
            this.$store.commit(this.$config.STORAGE.USER_INFO, data)
            this.$router.push({
              path: '/BarList'
            })
          })
      },
      showPhoneLogin(){
        this.isShowPhoneLogin = true
      }
    }
  }
</script>
<style scoped>
  .yeba-logo {
    display: block;
    width: 40vw;
    margin: 10vw auto 5vw;
  }

  .footer {
    bottom: 2vw;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3.6vw;
  }

  .title1{
    font-weight: bold;
    font-size: 5.2vw;
  }

  .title2{
    font-size: 4vw;
  }

  .bt-font-size{
    font-size: 4.8vw;
  }

  .login-margin-top{
    margin-top: 4vw;
    margin-bottom: 4vw;
    text-decoration: underline;
  }

  @media (max-height: 500px) {
    .footer {
      display: none;
    }
  }

</style>
