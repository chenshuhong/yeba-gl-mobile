<!-- 带有缩略图的img组件 -->
<template>
  <div>
    <img class="csh-photo" v-lazy="url" @click="onImgClick" :style="{borderRadius:borderRadius}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'LoadImg',
    data () {
      return {}
    },
    props: {
      url: {
        type: String
      },
      urls: {
        type: Array
      },
      borderRadius:{
        type:String
      }
    },
    methods:{
      onImgClick(){
        let urls
        if (this.urls&&this.urls.length>0){
          urls = this.urls
        }else {
          urls = [this.url]
        }
        if (this.$util.judgeWeiXin()){
          window.wx.previewImage({
            current:this.url,
            urls
          })
        }else {
          this.$router.push({
            name: 'BigPicView',
            params: {
              urls,
              url:this.url
            }
          })
        }
      }
    }
  }
</script>
<style>
  .csh-photo {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background-color: #EBEBEB;
  }

  .csh-photo[lazy=loading],.csh-photo[lazy=error]{
    object-fit: contain;
    box-sizing: border-box;
  }
</style>
