<template>
  <div>
    <group label-width="60vw">
      <cell title="上墙消息"></cell>
      <my-input title="显示时长（秒）"
                text-align="right"
                v-model="goWallShowTime"
                placeholder-align="right"></my-input>
    </group>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('霸屏排行榜',occupyscreenStatus === 2)" :value-map="[2,1]" v-model="occupyscreenStatus"></x-switch>
      <my-input title="显示时长（秒）"
                text-align="right"
                v-model="occupyscreenShowTime"
                placeholder-align="right"></my-input>
    </group>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('礼物排行榜',giftStatus === 2)" :value-map="[2,1]"  v-model="giftStatus"></x-switch>
      <my-input title="显示时长（秒）"
                text-align="right"
                v-model="giftShowTime"
                placeholder-align="right"></my-input>
    </group>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('人气排行榜',populStatus === 2)" :value-map="[2,1]"  v-model="populStatus"></x-switch>
      <my-input title="显示时长（秒）"
                text-align="right"
                v-model="populShowTime"
                placeholder-align="right"></my-input>
    </group>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('红包排行榜',redpacketStatus === 2)" :value-map="[2,1]"  v-model="redpacketStatus"></x-switch>
      <my-input title="显示时长（秒）"
                text-align="right"
                v-model="redpacketShowTime"
                placeholder-align="right"></my-input>
    </group>
    <MyFoot v-on:increment="modulesUpdate"></MyFoot>
  </div>

</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  import MyInput from '@/components/MyInput'
  import MyFoot from '@/components/MyFoot'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name:'ComponentSet',
    components: {
      Cell,
      Group,
      XSwitch,
      MyInput,
      MyFoot
    },
    mixins: [BarChangeMixin],
    data () {
      return {
        goWallShowTime:'',
        redpacketShowTime:'',
        populShowTime:'',
        giftShowTime:'',
        occupyscreenShowTime:'',
        redpacketStatus:2,
        populStatus:2,
        giftStatus:2,
        occupyscreenStatus:2,
        goWallId:'',
        redpacketId:'',
        populId:'',
        giftId:'',
        occupyscreenId:'',
        setting:null
      }
    },
    created () {
      this.getRank()
    },
    methods: {
      setSetting(){
        this.setting.forEach(item=>{
          let name = item.cfg_modules_name
          if (name === 'redpacket_rank'){
            this.redpacketId = item.id
            this.redpacketStatus = item.status
            this.redpacketShowTime = item.cfg_value
          }else if(name === 'popularity_rank'){
            this.populId = item.id
            this.populStatus = item.status
            this.populShowTime = item.cfg_value
          }else if(name === 'gift_rank'){
            this.giftId = item.id
            this.giftStatus = item.status
            this.giftShowTime = item.cfg_value
          } else if(name === 'occupyscreen_rank'){
            this.occupyscreenId = item.id
            this.occupyscreenStatus = item.status
            this.occupyscreenShowTime = item.cfg_value
          } else if(name === 'go_wall'){
            this.goWallId = item.id
            this.goWallShowTime = item.cfg_value
          }
        })
      },
      getRank () {
        this.$api.getBarRank(this.$barId).then((data) => {
          this.setting = data
          this.setSetting()
        })
      },
      modulesUpdate(e){
        if (e){
          if (this.$util.judgeValue(this.goWallShowTime,'请输入上墙消息秒数')){
            return
          }
          if (this.$util.judgeValue(this.occupyscreenShowTime,'请输入霸屏排行榜显示秒数')){
            return
          }
          if (this.$util.judgeValue(this.giftShowTime,'请输入礼物排行榜显示秒数')){
            return
          }
          if (this.$util.judgeValue(this.populShowTime,'请输入人气排行榜显示秒数')){
            return
          }
          if (this.$util.judgeValue(this.redpacketShowTime,'请输入红包排行榜显示秒数')){
            return
          }
          if (this.$util.judgeValue(this.goWallShowTime>=20,'上墙消息秒数必须大于等于20')){
            return
          }
          if (this.$util.judgeValue(this.occupyscreenShowTime>=5,'霸屏排行榜显示秒数必须大于等于5')){
            return
          }
          if (this.$util.judgeValue(this.giftShowTime>=5,'礼物排行榜显示秒数必须大于等于5')){
            return
          }
          if (this.$util.judgeValue(this.populShowTime>=5,'人气排行榜显示秒数必须大于等于5')){
            return
          }
          if (this.$util.judgeValue(this.redpacketShowTime>=5,'红包排行榜显示秒数必须大于等于5')){
            return
          }
          let data=[
            {
              method:'put',
              url:`modules/configs/${this.giftId}`,
              data:{
                bar_id: this.$barId,
                status: this.giftStatus,
                'cfg_modules_name': 'gift_rank',
                'cfg_type': 3,
                'cfg_value': this.giftShowTime
              }
            },
            {
              method:'put',
              url:`modules/configs/${this.populId}`,
              data:{
                bar_id: this.$barId,
                status: this.populStatus,
                'cfg_modules_name': 'popularity_rank',
                'cfg_type': 3,
                'cfg_value': this.populShowTime
              }
            },
            {
              method:'put',
              url:`modules/configs/${this.occupyscreenId}`,
              data:{
                bar_id: this.$barId,
                status: this.occupyscreenStatus,
                'cfg_modules_name': 'occupyscreen_rank',
                'cfg_type': 3,
                'cfg_value': this.occupyscreenShowTime
              }
            },
            {
              method:'put',
              url:`modules/configs/${this.redpacketId}`,
              data:{
                bar_id: this.$barId,
                status: this.redpacketStatus,
                'cfg_modules_name': 'redpacket_rank',
                'cfg_type': 3,
                'cfg_value': this.redpacketShowTime
              }
            },
            {
              method:'put',
              url:`modules/configs/${this.goWallId}`,
              data:{
                bar_id: this.$barId,
                'cfg_modules_name': 'go_wall',
                'cfg_type': 3,
                'cfg_value': this.goWallShowTime
              }
            }
          ]
          this.$api.batch(data)
            .then(data=>{
              this.setting = data
              this.$router.back()
            })
        }else{
          this.$router.back()
        }
      },
      onBarChange () {
        this.setting = null
        this.getRank()
      },
    },
    activated(){
      if (this.setting){
        this.setSetting()
      }
    }
  }
</script>

<style>

</style>
