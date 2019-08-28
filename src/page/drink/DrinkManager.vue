<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getDrinkManagers"
    @reLoadData="getDrinkManagers">
    <group slot="top">
      <cell is-link title="添加仓库管理员" value='' :link="{name:'AddManager',query:{type:'drink'}}"></cell>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.name">
        <span slot="title">{{'('+item.user.id+')'+item.user.nickname}}</span>
        <span class="my-green" @click="passUser(item)" v-if="item.bind_status===1">通过</span>
        <span class="add-margin-left my-del" @click="deleteUser(item.id)">删除</span>
      </cell>
    </group>
  </scroll>
</template>

<script>
  import {
    Cell,
    Group
  } from 'vux'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    name: "drink-manager",
    components: {
      Cell,
      Group,
      Scroll,
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created(){
      this.getDrinkManagers()
    },
    methods:{
      getDrinkManagers () {
        this.onloadStart()
        this.$api.getDrinkManagers(this.$barId)
          .then(data=>{
            this.list = data
            this.onLoadSuccess()
          })
          .catch(err=>{
            console.log(err)
            this.onLoadError()
          })
      },
      passUser(item){
        this.$api.passDrinkManager(item.id)
          .then(data=>{
            this.$util.change1(this.list,data)
          })
      },
      deleteUser(id){
        this.$api.deleteDrinkManager(id)
          .then(data=>{
            this.$util.remove(this.list, id)
          })
      },
      onBarChange () {
        this.list = []
        this.getDrinkManagers()
      },
    },
    activated(){
      if (this.$route.meta.isBack){
        this.getDrinkManagers()
      }
    }
  }
</script>

<style scoped>

</style>
