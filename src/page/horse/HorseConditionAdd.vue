<template>

  <div>
    <group>
      <my-input title="押注Y币值大于"
               text-align="right"
               placeholder="请输入"
               placeholder-align="right"
               v-model="condition"></my-input>
      <popup-picker title="奖品选择" :data="list" v-model="value1" show-name placeholder="请选择奖品"></popup-picker>
    </group>

    <MyFoot v-on:increment="addPrize"></MyFoot>


  </div>

</template>

<script>
  import { Group, PopupPicker } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'HorseConditionAddNoKeep',
    components: {
      Group,
      MyInput,
      PopupPicker,
      MyFoot
    },
    data () {
      return {
        value1: [],
        list: [],
        condition: ''
      }
    },
    created () {
      this.getPrizes()
      params = this.$route.params
      if (params.id) {
        this.condition = params.condition
        this.list = [[{
          name: params.prize_name + '(￥' + params.prize_price + ')',
          value: params.prize_id + ''
        }]]
        this.value1[0] = params.prize_id + ''
      }
    },
    methods: {
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
            this.list.splice(0,1,list1)
          }
        })
      },
//      添加
      addPrize (e) {
        if (e) {
          if (this.$util.judgeValue(this.condition,'请输入Y币值')){
            return
          }
          if (this.$util.judgeValue(this.value1.length>0&&this.value1[0]!=='0','请选择奖品')){
            return
          }
          let data = {
            'prize_id': parseInt(this.value1[0]),
            'condition': parseInt(this.condition),
            'game_type': 4
          }
          if (params.id) {
            this.$api.updateGamePrize(this.$barId, params.id, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'horseConditionEdit',
                data: item
              })
              this.$router.back()
            })
          } else {
            this.$api.addGamesPrize(this.$barId, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'horseConditionAdd',
                data: item
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
