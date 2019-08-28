<template>
  <div id="app">
    <keep-alive :exclude="/NoKeep$/">
      <router-view v-wechat-title="title" img-set="./static/ico.png"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    //去除长按后的弹框
    mounted () {
      document.oncontextmenu = function (e) {
        let tagName = e.target.tagName
        console.log(tagName)
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          e.preventDefault()
        }
      }
      this.wxInit()
    },
    computed: {
      title () {
        let barName = ''
        if (this.bar) {
          barName = `·${this.bar.name}`
        }
        if (this.$route.meta.title) {
          if (this.$route.meta.noShowBar) {
            return this.$route.meta.title
          } else {
            return this.$route.meta.title + barName
          }
        } else {
          return '酒吧后台管理系统'
        }
      },
      bar () {
        return this.$store.state.currentBar
      }
    },
    methods: {
      wxInit () {
        let wx = window.wx
        this.$api.getWxSignature()
          .then(data => {
            if (data) {
              Object.assign(data, {
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
              })
              window.wx.config(data)
            }
          })
        let imgUrl = 'https://img.yeba.im/gl-logo.png'
        wx.ready(function () {
          let shareData = {
            title: `夜吧掌上后台`,
            desc: `夜吧手机版后台，实现快捷管理，随时随地提现资金...爪机在手，世界我有`,
            link: `${window.location.origin}${window.location.pathname}#/BarList`,
            imgUrl
          }
          wx.onMenuShareTimeline(shareData)
          wx.onMenuShareAppMessage(shareData)
        })
        wx.error(function (res) {
          console.log(res)
        })
      }
    },
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
<style lang="scss">
  @import "./style/app.scss";
</style>
