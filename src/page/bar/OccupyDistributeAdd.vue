<template>

  <div>
    <group>
      <my-input title="夜吧ID"
               text-align="right"
               placeholder="请输入夜吧ID"
               v-model="user_id"
               placeholder-align="right"
                :disabled="noEditable" ></my-input>
      <my-input title="分成比例(1-60%)"
               text-align="right"
                placeholder="请输入"
               v-model="user_divide"
               placeholder-align="right"
      label-width="60vw">
        <span slot="right">%</span>
      </my-input>
    </group>
    <group title="分成规则：假设用户霸屏100元，如果设置分成比例为20%，则分销人员得20元，剩下的再按照酒吧和夜吧进行分成。">
      <x-input title="备注" text-align="right" placeholder="选填" novalidate :show-clear="true" v-model="remark"
               placeholder-align="right"></x-input>
    </group>
    <MyFoot v-on:increment="saveSetting"></MyFoot>


  </div>

</template>

<script>
  import { Group,XInput} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'OccupyDistributeAddNoKeep',
    components: {
      Group,
      XInput,
      MyFoot,
      MyInput
    },
    data () {
      return {
        user_id: '',
        user_divide: '',
        remark: '',
        noEditable:false
      }
    },
    created () {
      params = this.$route.params
      if (params.id) {
        this.noEditable = true
        this.user_id = params.user_id
        this.user_divide = params.user_divide
        this.remark = params.remark
      }
    },
    methods: {
      //保存
      saveSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.user_id,'请输入用户id')){
            return
          }
          if (this.$util.judgeValue(this.user_divide,'请输入分成比例')){
            return
          }
          if (this.$util.judgeValue(this.user_divide<60&&this.user_divide>0,'分成比例必须在1-60%')){
            return
          }
          let data = {
            'user_id': this.user_id,
            'user_divide': this.user_divide,
            'remark': this.remark
          }
          if (params.id) {
            //修改
            this.$api.updateOccupyDistribute(this.$barId, params.id, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'occupyDistributeEdit',
                data:item
              })
              this.$router.back()
            })
          } else {
            //添加
            this.$api.addOccupyDistribute(this.$barId, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'occupyDistributeAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          this.$router.back()
        }
      }
    }
  }
</script>

<style>


</style>
