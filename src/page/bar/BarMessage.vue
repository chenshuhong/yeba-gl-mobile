<template>

  <div>
    <group>
      <cell title="酒吧名" :value="bar.name"></cell>
      <my-input title="订台电话"
               placeholder="请输入订台电话"
               v-model="fixed_phone"
               placeholder-align="right" text-align="right"></my-input>
      <my-input title="手机号 " placeholder="请输入手机号"
               v-model="phone"
               placeholder-align="right" text-align="right"></my-input>

    </group>
    <group class="gl-margin-bottom">
      <cell title="封面图">
        <load-img :url="bar.logo" class="barImg"></load-img>
      </cell>
      <cell title="幻灯片">
      </cell>
      <div>
        <load-img :urls="urls" :url="logo.image" class="photo margin" v-for="(logo,key) of banners" :key="key">
          <img src="../../assets/delete.png" class="gl-icon-delete" @click="deleteImg(logo,key)"/>
        </load-img>
        <my-photo @uploadSuccess="addBannerPic" uploadType="barnner" class="photo margin">
          <img src="../../assets/bar_uplowder.png" class="photo marginUpload" />
        </my-photo>
      </div>
    </group>

    <MyFoot v-on:increment="updateBarMessage"></MyFoot>
  </div>
</template>

<script>
  import {
    Cell,
    Group,
    Datetime,
  } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyPhoto from '../../components/MyPhoto.vue'
  import LoadImg from '../../components/LoadImg.vue'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Cell,
      Group,
      MyFoot,
      Datetime,
      MyPhoto,
      LoadImg,
      MyInput
    },
    data () {
      return {
        bar: {},
        banners:[],
        fixed_phone: '',
        phone: ''
      }
    },
    mixins: [BarChangeMixin],
    created () {
      this.bar = this.$store.state.currentBar
      this.fixed_phone = this.bar.fixed_phone
      this.phone = this.bar.phone
      this.getBanners()
    },
    methods: {
      getBanners () {
        this.$api.getBarBanners(this.$barId).then((data) => {
          let list = []
          for (let item of data){
            list.push(item.data)
          }
          this.banners = list
        })
      },
      updateBarMessage (e) {
        if (e) {
          let data = {
            'name': this.bar.name,
            'phone': this.phone,
            'fixed_phone': this.fixed_phone
          }
          this.$api.changeBarInfo(this.$barId, data).then((data) => {
            this.bar = data
            this.$store.commit(this.$config.STORAGE.BAR_INFO, data)
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      },
      addBannerPic (key) {
        let url = this.$util.getQiniuKey(key)
        let data = {
          image: key
        }
        this.$api.addBarBannner(this.$barId,data)
          .then(data=>{
            this.banners.push(data)
          })
      },
      onBarChange () {
        this.bar = this.$store.state.currentBar
        this.getBanners()
      },
      deleteImg(logo,key){
        this.$api.deleteBarBannner(this.$barId,logo.id)
          .then(data=>{
            this.banners.splice(key,1)
          })
      }
    },
    activated () {
      this.fixed_phone = this.bar.fixed_phone
      this.phone = this.bar.phone
    },
    computed:{
      urls(){
        let urls = []
        for (let item of this.banners){
          urls.push(item.image)
        }
        return urls
      }
    }
  }
</script>

<style scoped>
  .barImg {
    width: 60vw;
  }

  .photo {
    position: relative;
    width: 20vw;
    height: 20vw;
    display: inline-block;
  }

  .margin {
    margin-left: 15px;
    margin-bottom: 10px;
  }

  .marginUpload {
    margin-left: 0;
    margin-bottom: 10px;
  }
</style>
