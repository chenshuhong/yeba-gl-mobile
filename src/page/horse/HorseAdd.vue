<template>

  <div>

    <group>
      <my-input title="最多可押注的赛马" placeholder="请输入" v-model="horseNum"
               placeholder-align="right"
                label-width="40vw"
               text-align="right"></my-input>
      <my-input title="本场押注所需Y币" placeholder="请输入" v-model="need_yb"
               placeholder-align="right" label-width="40vw"
               text-align="right"></my-input>
    </group>

    <MyFoot v-on:increment="footSetting"></MyFoot>

  </div>

</template>

<script>
  import { Group } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      MyInput,
      MyFoot
    },
    data () {
      return {
        horseNum: '',
        need_yb: '',
        setting:null
      }
    },
    mixins:[BarChangeMixin],
    created () {
      this.horseSetting()
    },
    methods: {
      horseSetting () {
        this.$api.getHorseSetting(this.$barId).then((data) => {
          this.setting = data
          this.horseNum = data.max_horse_number
          this.need_yb = data.need_yb
        })
      },
      footSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.horseNum,'请输入最多的押注赛马数')){
            return
          }
          if (this.$util.judgeValue(this.need_yb,'请输入押注所需Y币')){
            return
          }
          let data = {
            'max_horse_number': parseInt(this.horseNum),
            'need_yb': parseInt(this.need_yb)
          }
          this.$api.horseSetting(this.$barId, data).then((res) => {
            this.setting = data
            this.$router.back()
          })
        }else {
          this.$router.back()
        }
      },
      onBarChange(){
        this.setting = null
        this.horseNum = ''
        this.need_yb = ''
        this.horseSetting()
      }
    },
    activated(){
      if (this.setting){
        let data = this.setting
        this.horseNum = data.max_horse_number
        this.need_yb = data.need_yb
      }
    }
  }
</script>

<style>


</style>
