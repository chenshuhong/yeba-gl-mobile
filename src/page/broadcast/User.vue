<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getUsers"
    @reLoadData="getUsers">
    <group slot="top">
      <cell is-link title="新增播报人员" value='' :link="{name:'AddManager'}"></cell>
    </group>
    <group v-for="item in list" :key="item.id">
      <cell>
        <span slot="title">{{'('+item.user.id+')'+item.user.nickname}}</span>
        <load-img slot="icon" :url="item.user.avatar" class="avatar" border-radius="50%"></load-img>
        <span class="my-green" @click="passUser(item)" v-if="item.status===2">通过</span>
        <span class="add-margin-left my-del" @click="deleteUser(item.id)">删除</span>
        <popup-picker
          title="选择用户有效期限"
          popup-title="选择用户有效期限"
          show-name
          :data="conditionGroups"
          v-model="groupValue"
          placeholder="设为"
          :show.sync="showPopupPicker"
          :show-cell="false"
          @on-change="onGroupChange"
        style="display: none"></popup-picker>
      </cell>
      <cell v-if="item.status === 1" title="有效期至">{{getTime(item)}}</cell>
    </group>
  </scroll>

</template>

<script>
  import {Cell, Group,PopupPicker} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  import LoadImg from '@/components/LoadImg'
  let moment = require('moment')
  export default {
    name: "broadcast-user",
    components: {
      Cell,
      Group,
      Scroll,
      LoadImg,
      PopupPicker
    },
    data(){
      return {
        item:'',
        showPopupPicker:false,
        groupValue: [],
        conditionGroups: [[
          {
            name: '15天',
            value: '1'
          },
          {
            name: '1个月',
            value: '2'
          },
          {
            name: '3个月',
            value: '3'
          },
          {
            name: '永久',
            value: '4'
          }
        ]],
      }
    },
    created () {
      this.getUsers()
    },
    mixins: [LoadStutusMixin, BarChangeMixin],
    methods: {
      getUsers () {
        this.onloadStart()
        this.$api.getBroadcastUsers(this.$barId)
          .then(data => {
            let list = []
            for (let item of data) {
              list.push(item)
            }
            this.list = list
            this.onLoadSuccess()
          })
          .catch(err => {
            this.onLoadError()
          })
      },
      onBarChange () {
        this.list = []
        this.getUsers()
      },
      getTime(item){
        let m=moment(item.created_at)
        switch (item.limit_type){
          case 0:
            return '已过期'
          case 1:
            return m.add(15,'d').format('YYYY-MM-DD HH:mm:ss')
          case 2:
            return m.add(30,'d').format('YYYY-MM-DD HH:mm:ss')
          case 3:
            return m.add(180,'d').format('YYYY-MM-DD HH:mm:ss')
          case 4:
            return '永久'
        }
        return ''
      },
      passUser(item){
        this.item = item
        this.showPopupPicker=true
      },
      deleteUser(id){
        this.$api.deleteBroadcastUser(this.$barId,id)
          .then(data=>{
            this.$util.remove(this.list, id)
          })
      },
      onGroupChange (value) {
        this.$api.passBroadcastUser(this.$barId,this.item.id,~~value[0],this.item.user.id)
          .then(data=>{
            this.$util.change1(this.list,data)
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

<style scoped>
  .avatar {
    width: 8vw;
    height: 8vw;
    margin-right: 2vw;
    border-radius: 50%;
  }
</style>
