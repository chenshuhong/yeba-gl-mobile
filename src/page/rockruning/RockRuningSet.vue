<template>

  <div>
    <group>
      <my-input title="参赛人数"
               placeholder="请输入"
               v-model="contestant_count"
               placeholder-align="right"
               label-width="40vw"
               text-align="right"></my-input>
      <my-input title="参赛费用"
               placeholder="请输入"
               placeholder-align="right"
               label-width="40vw"
               text-align="right"
               v-model="entry_fee"></my-input>
      <my-input title="摇晃次数"
               placeholder="请输入"
               placeholder-align="right"
               label-width="40vw"
               text-align="right"
               v-model="total_rock_count"></my-input>
    </group>

    <MyFoot v-on:increment="saveSetting"></MyFoot>

  </div>

</template>

<script>
  import {  Group } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      MyFoot,
      MyInput
    },
    data () {
      return {
        contestant_count: '',
        entry_fee: '',
        total_rock_count: '',
        rockSetting:null
      }
    },
    mixins:[BarChangeMixin],
    created () {
      this.runningSetting()
    },
    methods: {
      runningSetting(){
        this.$api.getRunningSetting(this.$barId).then((data)=>{
          this.rockSetting = data
          this.contestant_count = data.contestant_count
          this.entry_fee = data.entry_fee
          this.total_rock_count = data.total_rock_count
        })
      },
      saveSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.contestant_count,'请输入参赛人数')){
            return
          }
          if (this.$util.judgeValue(this.entry_fee,'请输入参赛费用')){
            return
          }
          if (this.$util.judgeValue(this.total_rock_count,'请输入摇晃次数')){
            return
          }
          if (this.$util.judgeValue(this.total_rock_count>10,'摇晃次数不小于10次')){
            return
          }
          let data = {
            'contestant_count': this.contestant_count,
            'entry_fee': this.entry_fee,
            'total_rock_count': this.total_rock_count
          }
          this.$api.runningSetting(this.$barId, data).then((res) => {
            this.rockSetting = data
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      },
      onBarChange(){
        this.rockSetting = null
        this.contestant_count = ''
        this.entry_fee = ''
        this.total_rock_count = ''
        this.runningSetting()
      }
    },
    activated(){
      if (this.rockSetting){
        let data = this.rockSetting
        this.contestant_count = data.contestant_count
        this.entry_fee = data.entry_fee
        this.total_rock_count = data.total_rock_count
      }
    }
  }
</script>

<style>


</style>
