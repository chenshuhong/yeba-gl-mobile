<template>
    <div>
      <!--banner图-->
      <transition name="slide">
        <swiper class="box" :list="list" height="55vw" :interval="5000" v-if="list.length>0" auto loop ></swiper>
      </transition>
      <group gutter="0">
        <cell is-link :title="$store.state.currentBar.name" is-link>
          <router-link to="/BarList">
            <span class="gray">切换酒吧</span>
          </router-link>
        </cell>
      </group>
      <!--功能列表-->
      <MySet></MySet>
      <MyGrid></MyGrid>
    </div>
</template>
<script>
  import {Group,Cell,Swiper} from 'vux'
  import MyGrid from '../../components/MyGrid'
  import MySet from '../../components/MySet'
  export default {
    name: 'Home',
    data() {
      return {
        list:[]
      }
    },
    components:{
      MyGrid,
      MySet,
      Group,
      Cell,
      Swiper
    },
    created(){
      this.getADs()
    },
    methods:{
      getADs(){
        this.$api.getADs()
          .then(data=>{
            let imgs = []
            for (let item of data){
              imgs.push({
                img:item.image,
                url:item.url,
                title:item.slide_name
              })
            }
            this.list = imgs
          })
      }
    }
  }
</script>
<style scoped>
  .box{
    height: 55vw;
    overflow: hidden;
  }
  .slide-enter-active{
    transition: all .5s linear;
    height: 55vw;
  }
  .slide-enter{
    height:0!important;
  }
</style>
