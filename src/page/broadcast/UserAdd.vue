<template>
  <div class="checkout">
    <div class="center broadcast-header">
      {{textTop}}
    </div>
    <div class="broadcast-center">
      <load-img :url="imgSrc" class="photo"></load-img>
    </div>
    <div class="broadcast-footer center">
      {{textBottom}}
    </div>
  </div>
</template>

<script>
  import LoadImg from '@/components/LoadImg.vue'
  export default {
    name: "UserAddNoKeep",
    components: {
      LoadImg
    },
    data () {
      return {
        imgSrc: '',
        type: 'broadcast',
        textTop:'',
        textBottom: ''
      }
    },
    created(){
      this.type = this.$route.query.type || 'broadcast'
      this.setData()
    },
    methods:{
      setData(){
        if (this.type === 'broadcast'){
          this.imgSrc = 'http://mobile.qq.com/qrcode?url='+encodeURIComponent(this.$config.DRINK+this.$barId)
          this.textTop = "请需要播报功能那个的用户扫下方二维码，如是本用户请长按识别二维码即可"
          this.textBottom = "注意:在播报人员管理页面点通过才生效"
        }else if (this.type === 'drink'){
          this.imgSrc = 'http://mobile.qq.com/qrcode?url='+encodeURIComponent(this.$config.DRINK+this.$barId)
          this.textTop = "请需接受存酒与取酒相关信息的用户扫下方二维码,如是本用户请长按识别二维码即可"
          this.textBottom = "注意：在仓库管理员管理页面点通过才生效"
        }else if (this.type === 'drinkWaiter'){
          this.imgSrc = 'http://mobile.qq.com/qrcode?url='+encodeURIComponent(this.$config.WAITER+this.$barId)
          this.textTop = "请需要接收账单通知的用户扫下方二维码,如是本用户请长按识别二维码即可"
          this.textBottom = "注意：在服务员管理页面点通过才生效"
        }else if (this.type === 'tablePrize'){
          this.imgSrc = 'http://mobile.qq.com/qrcode?url='+encodeURIComponent(this.$config.TABLE+this.$barId)
          this.textTop = " 请需要接收中奖信息的用户扫下方二维码,如是本用户请长按识别二维码即可"
          this.textBottom = "注意：在中奖页面点通过才生效，微信账号必须关注“夜吧APP”公众号才可以收到通知"
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log('beforeRouteLeave',to,from)
      let name = to.name
      if (name === 'BroadcastUser'|| name === 'DrinkManager'|| name === 'DrinkWaiter'||name === 'TablePrizeUser'){
        to.meta.isBack = true
      }
      next()
    }
  }
</script>

<style scoped>
  .checkout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photo {
    width: 70vw;
    height: 70vw;
  }

  .broadcast-header{
    background: white;
    padding: 4vw 4vw;
    margin: 2vw 0;
  }
  .broadcast-center{
    background: white;
    width: 100%;
    padding: 10vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .broadcast-footer{
    font-size: 4vw;
    margin-top: 6vw;
    padding: 4vw 4vw;
  }
</style>
