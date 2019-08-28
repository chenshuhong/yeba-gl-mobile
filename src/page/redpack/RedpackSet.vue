<template>

  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('酒吧参与抽成',!redpacketStatus)"  :value="redpacketStatus" @on-click="onClick" prevent-default></x-switch>
    </group>
    <template v-if="redpacketStatus">
      <group >
        <my-input title="抽成比例（%）"  v-model="redpacketDivide" placeholder="请输入分成比例" text-align="right" ></my-input>
      </group>
      <group class="disc" title="最高可设置抽取10%"></group>
      <MyFoot v-on:increment="changeRedpacketDivide" ></MyFoot>
    </template>
  </div>

</template>

<script>
  import { Group,XSwitch } from 'vux'
  import MyFoot from '../../components/MyFoot'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      XSwitch,
      MyFoot,
      MyInput
    },
    data () {
      return {
        redpacketDivide:0
      }
    },
    methods: {
      onClick(){
        let data
        if (this.redpacketStatus){
          data = {
            'red_packet_divide':0
          }
          this.$api.changeBarInfo(this.$barId,data).then(data=>{
            this.$store.commit(this.$config.STORAGE.BAR_INFO,data)
          })
        }else {
          data = {
            'red_packet_divide':1
          }
        }
        this.$api.changeBarInfo(this.$barId,data).then(data=>{
          this.$store.commit(this.$config.STORAGE.BAR_INFO,data)
        })
      },
      changeRedpacketDivide(e){
        if (e) {
          if (this.$util.judgeValue(this.redpacketDivide<=10, '红包抽成不可大于10%')) {
            return
          }
          let data = {
            'red_packet_divide':this.redpacketDivide || 0
          }
          this.$api.changeBarInfo(this.$barId,data).then(data=>{
            this.$store.commit(this.$config.STORAGE.BAR_INFO,data)
            this.$router.back()
          })
        }else {
          this.$router.back()
        }
      }
    },
    created(){

    },
    activated(){
      this.redpacketDivide = this.$store.state.currentBar.red_packet_divide
    },
    computed:{
      redpacketStatus(){
        this.redpacketDivide = this.$store.state.currentBar.red_packet_divide
        return this.$store.state.currentBar.red_packet_divide!==0
      }
    }
  }
</script>

<style>



</style>
