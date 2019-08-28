<template>

  <div>

    <group>
      <my-input
        v-model="value1"
        title="比赛时间(分钟)"
        placeholder="请输入"
        placeholder-align="right"
        label-width="40vw"
        text-align="right"></my-input>
      <my-input
        v-model="value2"
        title="比赛费用(Y币/人)"
        placeholder="请输入"
        label-width="40vw"
        placeholder-align="right"
        text-align="right"></my-input>
    </group>

    <MyFoot v-on:increment="FootBtn"></MyFoot>

  </div>

</template>

<script>
  import {Group,XInput} from "vux"
  import MyInput from '../../components/MyInput'
  import MyFoot from "../../components/MyFoot.vue"
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Group,
      MyFoot,
      MyInput,
      XInput
    },
    data() {
      return {
        value1: '',
        value2: '',
        diceSetting:null
      };
    },
    mixins:[BarChangeMixin],
    methods: {
      getDice() {
        this.$api.getDiceRule(this.$barId).then((data={})=> {
          if (JSON.stringify(data) === '[]'){
            return
          }
          this.diceSetting = data
          let time = data.game_time
          this.value1 = time / 60
          this.value2 = data.need_yb
        });
      },
      FootBtn(e) {
        if (e) {
          if (this.$util.judgeValue(this.value1,'请输入比赛时间')){
            return
          }
          if (this.$util.judgeValue(this.value2,'请输入比赛费用')){
            return
          }
          let data = {
            'bar_id': this.$barId,
            'need_yb': this.value2,
            'game_time': this.value1 * 60
          }
          this.$api.setDiceRule(data).then(res => {
            this.diceSetting = data
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      },
      onBarChange(){
        this.diceSetting = null
        this.value1=''
        this.value2=''
        this.getDice()
      }
    },
    created() {
      this.getDice()
    },
    activated(){
      if (this.diceSetting){
        let data = this.diceSetting
        let time = data.game_time
        this.value1 = time / 60
        this.value2 = data.need_yb
      }
    }
  }
</script>

<style>

</style>
