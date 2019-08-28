<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getDrinkWaiters"
    @reLoadData="getDrinkWaiters">
    <group slot="top">
      <cell is-link title="添加存酒通知接收人" value='' :link="{name:'AddManager',query:{type:'drinkWaiter'}}"></cell>
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
    name: "drink-waiter",
    components: {
      Cell,
      Group,
      Scroll,
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created(){
      this.getDrinkWaiters()
    },
    methods:{
      getDrinkWaiters () {
        this.onloadStart()
        this.$api.getDrinkWaiters(this.$barId)
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
        this.$api.passDrinkWaiter(item.id)
          .then(data=>{
            this.$util.change1(this.list,data)
          })
      },
      deleteUser(id){
        this.$api.deleteDrinkWaiter(id)
          .then(data=>{
            this.$util.remove(this.list, id)
          })
      },
      onBarChange () {
        this.list = []
        this.getDrinkWaiters()
      },
    },
    activated(){
      if (this.$route.meta.isBack){
        this.getDrinkWaiters()
      }
    }
  }
</script>

<style scoped>

</style>
