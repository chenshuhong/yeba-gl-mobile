<template>
  <div class="checkout">
    <load-img :url="imgSrc" class="photo"></load-img>
  </div>
</template>

<script>
  import LoadImg from '@/components/LoadImg'

  export default {
    name: 'TableStrickNoKeep',
    components: {
      LoadImg,
    },
    data () {
      return {
        imgSrc: ''
      }
    },
    created () {
      this.imgSrc = 'http://m.yeba.im/ASQ/index.php/WxPublic/getPubQrcode/barid/' + this.$barId
    },
    methods: {
      goBack () {
        this.$router.back()
      }
    }

  }
</script>

<style scoped lang="scss">
  .checkout {
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
