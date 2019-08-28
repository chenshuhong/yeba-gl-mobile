<template>

  <div>

    <group>
      <my-input title="播放次数"
                placeholder="输入套餐次数"
                placeholder-align="right"
               label-width="40vw"
               text-align="right"
                v-model="play_count"></my-input>
      <x-input title="套餐价格" placeholder="输入套餐价格"  placeholder-align="right"
               type="number"
               label-width="40vw"
               text-align="right"
               v-model="price"></x-input>
    </group>
    <group>
      <x-textarea v-model="remark" :max="30" placeholder="输入套餐备注"></x-textarea>
    </group>
    <MyFoot v-on:increment="OccupyImgAdd"></MyFoot>
  </div>

</template>

<script>
  import { Group,XInput,XTextarea } from 'vux'
  import MyFoot from '../../components/MyFoot'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'OccupyVideoAdd',
    components: {
      MyInput,
      Group,
      XInput,
      MyFoot,
      XTextarea,
      MyInput
    },
    created () {
    },
    activated(){
      this.play_count = ''
      this.price = ''
      this.remark = ''
      params  = this.$route.params
      if (params.id) {
        this.play_count = params.play_count
        this.price = params.price
        this.remark = params.remark
      }
    },
    methods: {
      OccupyImgAdd (e) {
        if (e) {
          if (this.$util.judgeValue(this.play_count,'请输入霸屏播放次数')){
            return
          }
          if (this.$util.judgeValue(this.play_count>1,'霸屏播放次数至少两次')){
            return
          }
          if (this.$util.judgeValue(this.price, '请输入霸屏价格')){
            return
          }
          let data = {
            'play_count': this.play_count,
            'price': this.price,
            'remark': this.remark,
            'type': 2,
            'bar_id': this.$barId,
            'status': 0
          }
          if (params.id){
            this.$api.updateOccupyScreen(params.id, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'occupyVideoEdit',
                data:item
              })
              this.$router.back()
            })
          }else {
            this.$api.addOccupyImg(data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'occupyVideoAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          this.$router.back()
        }
      }
    },
    data () {
      return {
        play_count: '',
        price: '',
        remark: ''
      }
    }
  }
</script>

<style>


</style>
