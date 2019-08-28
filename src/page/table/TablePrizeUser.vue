<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getUsers"
    @reLoadData="getUsers">
    <group slot="top">
      <cell is-link title="添加中奖信息接收人" :link="{name:'AddManager',query:{type:'tablePrize'}}"></cell>
    </group>
    <group v-for="item in list" :key="item.id">
      <cell>
        <span slot="title">{{'('+item.user.id+')'+item.user.nickname}}</span>
        <span class="my-green" @click="passUser(item)" v-if="item.status===2">通过</span>
        <span class="add-margin-left my-del" @click="deleteUser(item.id)">删除</span>
      </cell>
    </group>
  </scroll>
</template>

<script>
  import {Cell, Group} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name:'TablePrize',
    components: {
      Cell,
      Group,
      Scroll
    },
    data () {
      return {}
    },
    created () {
      this.getUsers()
    },
    mixins: [LoadStutusMixin, BarChangeMixin],
    methods:{
      getUsers(){
        this.onloadStart()
        this.$api.getTablePrizeUsers(this.$barId)
          .then(data=>{
            let list = []
            for (let item of data) {
              list.push(item)
            }
            this.list = list
            this.onLoadSuccess()
          })
          .catch(err=>{
            this.onLoadError()
          })
      },
      onBarChange () {
        this.list = []
        this.getUsers()
      },
      passUser(item){
        this.$api.passTablePrizeUser(this.$barId,item.id)
          .then(data=>{
            this.$util.change1(this.list,data)
          })
      },
      deleteUser(id){
        this.$api.deleteTablePrizeUser(this.$barId,id)
          .then(data=>{
            this.$util.remove(this.list, id)
          })
      },
    },
    activated(){
      if (this.$route.meta.isBack){
        this.getUsers()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
