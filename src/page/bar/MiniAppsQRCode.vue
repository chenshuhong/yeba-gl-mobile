<template>

  <div class="checkout">
    <load-img
      :url="imgSrc"
    class="photo"/>
  </div>

</template>

<script>
  import LoadImg from '@/components/LoadImg'
  export default {
    name: 'MiniAppQrCodeNoKeep',
    components: {
      LoadImg,
    },
    data () {
      return {
        imgSrc: ''
      }
    },
    created () {
      this.imgSrc = 'http://api.yeba.im/wxmini/bars/' + this.$barId + '/chatroom/qrcode'
    },
    methods: {
      goBack () {
        this.$router.back()
      }
    }

  }
</script>

<style scoped lang="scss">
  .checkout{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo{
    width: 80vw;
    min-height: 80vw;
  }
</style>
