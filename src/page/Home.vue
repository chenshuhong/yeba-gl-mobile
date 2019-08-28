<template>
  <div>
    <MyPopupTop :message="msg" :show="show"></MyPopupTop>
    <keep-alive :exclude="/NoKeep$/">
      <router-view class="main"></router-view>
    </keep-alive>
    <!--底部栏-->
    <yeba-tabbar></yeba-tabbar>
  </div>
</template>

<script>
  import MyPopupTop from '../components/MyPopupTop'
  import YebaTabbar from '../components/YebaTabbar'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name: 'HomeBase',
    components: {
      YebaTabbar,
      MyPopupTop
    },
    mixins:[BarChangeMixin],
    data(){
      return {
        msg: '',
        show:false
      }
    },
    created(){
      this.welcome()
    },
    methods: {
      welcome(){
        this.msg=`欢迎进入 [ ${this.$store.state.currentBar.name} ]`
        this.show = true
      },
      onBarChange(){
        this.welcome()
      }
    },
    watch: {
      show (val) {
        if (val) {
          setTimeout(() => {
            this.show = false
          }, 3000)
        }
      }
    }
  }
</script>
<style scoped>
  .main{
    margin-bottom: 20vw;
  }
</style>
