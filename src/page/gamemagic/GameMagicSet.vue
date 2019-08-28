<template>

  <div>

    <group>
      <my-input title="可押注奖品上限"
               placeholder="请输入" v-model="number" placeholder-align="right"
               label-width="40vw"
               text-align="right"></my-input>
      <my-input title="单个奖品押注倍数上限"
               placeholder="请输入"  v-model="multiple"
               placeholder-align="right"
               label-width="60vw"
               text-align="right"></my-input>
    </group>

    <MyFoot v-on:increment="saveSetting"></MyFoot>

  </div>

</template>

<script>
  import { Group} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      MyInput,
      MyFoot,
    },
    data () {
      return {
        number:'',
        multiple:'',
        setting:null
      }
    },
    created () {
      this.magicSetting()
    },
    mixins:[BarChangeMixin],
    methods: {
      magicSetting(){
        this.$api.getMagicSetting(this.$barId).then((data={})=>{
          this.setting = data
          this.multiple = data.max_stake_multiple
          this.number = data.max_prize_number
        })
      },
      saveSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.multiple,'请输入可押注奖品上限')){
            return
          }
          if (this.$util.judgeValue(this.number,'请输入单个奖品押注倍数上限')){
            return
          }
          let data = {
            'max_prize_number':parseInt(this.number),
            'max_stake_multiple':parseInt(this.multiple)
          }
          this.$api.magicSetting(this.$barId,data).then((res) => {
            this.setting = data
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      }
      ,
      onBarChange(){
        this.setting = null
        this.value1=''
        this.value2=''
        this.magicSetting()
      }
    },
    activated(){
      if (this.setting){
        let data = this.setting
        this.multiple = data.max_stake_multiple
        this.number = data.max_prize_number
      }
    }
  }
</script>

<style>


</style>
