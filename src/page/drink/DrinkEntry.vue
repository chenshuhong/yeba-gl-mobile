<template>
    <group title="存酒分享二维码">
      <cell>
        <load-img class="gl-photo" slot="icon" :url="img"></load-img>
        <span class="my-green"
              v-clipboard:copy="value"
              v-clipboard:success="onCopy">复制链接</span>
      </cell>
    </group>
</template>

<script>
  import {
    Cell,
    Group
  } from 'vux'
  import LoadImg from '@/components/LoadImg.vue'
  export default {
    name: "DrinkEntryNoKeep",
    components: {
      Cell,
      Group,
      LoadImg
    },
    data () {
      return {
        value: '',
        img: ''
      }
    },
    created(){
      this.value = this.$config.DRINKGET+this.$barId
      this.img = this.imgSrc = 'http://mobile.qq.com/qrcode?url='+encodeURIComponent(this.value)
    },
    methods:{
      onCopy: function (e) {
        this.$vux.alert.show({
          title: '提示',
          content: '已复制到剪贴板'
        })
      },
    }
  }
</script>

<style scoped>

</style>
