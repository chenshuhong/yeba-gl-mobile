<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getDrinks"
    @reLoadData="getDrinks">
    <group slot="top">
      <popup-picker
        title="当前用户状态"
        show-name
        :data="userStatus"
        v-model="userStatuValue"
        :show.sync="statuShowPopupPicker"
        placeholder="设为"
        :show-cell="false"
        @on-change="onStatusChange"></popup-picker>
      <cell :title="userStatus[0][~~userStatuValue[0]].name" @click.native="statuShowPopupPicker = true" isLink></cell>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.user.nickname+'('+item.user.id+')'">
      </cell>
      <cell-form-preview :list="item"></cell-form-preview>
    </group>
  </scroll>
</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview,
    PopupPicker
  } from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    name: "drink-get",
    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll,
      PopupPicker
    },
    mixins: [LoadStatusMixin, BarChangeMixin],
    created () {
      this.getDrinks()
    },
    data(){
      return{
        statuShowPopupPicker:false,
        userStatus: [[
          {
            name: '全部',
            value: '0'
          },
          {
            name: '(存酒)未处理',
            value: '1'
          },
          {
            name: '(存酒)已存入',
            value: '2'
          },
          {
            name: '(存酒)已过期',
            value: '3'
          },
          {
            name: '(取酒)未处理',
            value: '4'
          },
          {
            name: '(取酒)已取走',
            value: '5'
          },
          {
            name: '(取酒)已过期',
            value: '6'
          },
          {
            name: '(取酒)没人取',
            value: '7'
          }
        ]],
        userStatuValue: ['0'],
      }
    },
    methods:{
      getDrinks(){
        this.onloadStart()
        this.$api.getDrinks(this.$barId,~~this.userStatuValue[0])
          .then(data=>{
            let list = []
            for (let i = 0; i < data.length; i++) {
              list.push(this.changeData(data[i]))
            }
            this.list = list
            this.onLoadSuccess()
          }).catch(err=>{
            console.log(err)
          this.onLoadError()
        })
      },
      changeData (data) {
        let stulist = [
          {
            label: '类型',
            value: data.apply_type === 1?'存':'取'
          },
          {
            label: '状态',
            value: this.getStoreStatus(data),
          },
          {
            label: '内容',
            value: this.getApplyContent(data.apply_content)
          },
          {
            label: '申请时间',
            value: data.created_at
          },

        ]
        if (data.handle_second!==0){
          stulist.push({
            label: '处理时间',
            value: data.updated_at
          })
        }
        if (data.admin){
          stulist.push({
            label: '管理员（ID）',
            value: data.admin.nickname+'('+data.admin.id+')'
          })
        }
        Object.assign(stulist, data)
        return stulist
      },
      getStoreStatus(data){
        let applyType = data.apply_type
        let storeStatus = data.store_status
        let takeStatus = data.take_status
        if (applyType === 1){
          if (storeStatus === 1){
            return '未处理'
          }else if (storeStatus ===2){
            return '已存入'
          }else {
            return '已过期'
          }
        }else {
          if (takeStatus === 1){
            return '未处理'
          }else if (takeStatus ===2){
            return '已取走'
          }else if (takeStatus ===3){
            return '已过期'
          } else{
            return '没人取'
          }
        }
      },
      getApplyContent(content){
        if(content){
          return JSON.parse(content).map((item)=>{
            return `${item.name}*${item.count}`
          }).join(',')
        }else {
          return ''
        }
      },
      onBarChange () {
        this.getDrinks()
      },
      onStatusChange(value){
        this.getDrinks()
      }
    }
  }
</script>

<style scoped>

</style>
