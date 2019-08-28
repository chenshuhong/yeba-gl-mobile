<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getUsersList"
    @reLoadData="getUsersList">
    <group slot="top">
      <my-input placeholder="请输入内定用户夜吧ID" v-model="user_id">
        <span slot="right" class="my-green add-margin-left" @click="addUsers">添加</span>
      </my-input>
      <popup-picker
        title="当前所属用户组"
        show-name
        :data="prizes"
        placeholder="设为"
        :show.sync="showPopupPicker"
        :show-cell="false"
        @on-change="onPrizeChange"></popup-picker>
    </group>
    <group v-for="item in list" :key="item.id" >
      <cell :title="item.user_id+'('+item.user.nickname+')'">
        <span class="my-del" @click="deleteUsers(item)">删除</span>
      </cell>
      <cell v-if="item.prize" title="内定奖品" :value="item.prize.prize_name"></cell>
    </group>
  </scroll>

</template>

<script>
  import {Cell, Group, PopupPicker} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Cell,
      Group,
      Scroll,
      MyInput,
      PopupPicker
    },
    mixins: [LoadStutusMixin, BarChangeMixin],
    data () {
      return {
        user_id: '',
        prizes: [],
        showPopupPicker:false
      }
    },
    created () {
      this.getUsersList()
      this.getPrizes()
    },
    methods: {
      //获取列表
      getUsersList () {
        this.onloadStart()
        this.$api.getGamesUsersList(this.$barId).then((data) => {
          this.list = data
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      //添加
      addUsers () {
        if (this.$util.judgeValue(this.user_id, '请输入用户id')) {
          return
        }
        this.showPopupPicker = true
      },
      //获取奖品
      getPrizes () {
        this.$api.getPrizesList(this.$barId,1).then((data) => {
          let list1 = []
          for (let i = 0; i < data.length; i++) {
            let obj = data[i]
            let prize = {
              name: obj.prize_name + '(￥' + obj.prize_price + ')',
              value: obj.id + ''
            }
            list1.push(prize)
          }
          if (list1.length>0){
            this.prizes.splice(0,1,list1)
          }
        })
      },
      onPrizeChange(value){
        let data = {
          'user_id': this.user_id,
          'prize_id':value[0]
        }
        this.$api.addGamesUsers(this.$barId, data).then((data) => {
          this.user_id = ''
          this.list.unshift(data)
        })
      },
      //删除
      deleteUsers (item) {
        this.$api.deleteGamesUsers(this.$barId, item.user_id).then((data) => {
          this.$util.remove(this.list, item.id)
        })
      },
      onBarChange () {
        this.getUsersList()
        this.getPrizes()
      }
    }

  }
</script>

<style>


</style>
