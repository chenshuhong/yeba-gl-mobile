<template>

  <div>
    <group>
      <my-input title="押注Y币数"
               text-align="right"
               placeholder="请输入"
               v-model="stake_yb"
               placeholder-align="right"></my-input>
      <popup-picker title="选择奖品" :data="list" v-model="value" placeholder="请选择奖品" show-name></popup-picker>
    </group>
    <MyFoot v-on:increment="saveSetting"></MyFoot>
  </div>

</template>

<script>
  import {Group ,PopupPicker} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'MagicConditionAddNoKeep',
    components: {
      Group,
      MyInput,
      PopupPicker,
      MyFoot
    },
    data () {
      return {
        value: [],
        list: [],
        stake_yb: '',
      }
    },
    created () {
      this.getPrizes()
      params = this.$route.params
      if (params.id) {
        this.list = [[{
          name: params.prize_name,
          value: params.prize_id + ''
        }]]
        this.value[0] = this.$route.params.prize_id + ''
        this.stake_yb = this.$route.params.stake_yb
      }
    },
    methods: {
      //获取奖品
      getPrizes () {
        this.$api.getPrizesList(this.$barId).then((data) => {
          let list1 = []
          for (let i = 0; i < data.length; i++) {
            let obj = data[i]
            var prize = {
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
      //保存
      saveSetting (e) {
        if (e) {

          if (params.id){
            let data = {
              'prize_id': parseInt(this.value[0]),
              'stake_yb': parseInt(this.stake_yb),
              'prize_setting_id': params.id
            }
            this.$api.settingMagicPrize(this.$barId, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'magicConditionEdit',
                data: item
              })
              this.$router.back()
            })
          }else {
            let data = {
              'prize_id': parseInt(this.value[0]),
              'stake_yb': parseInt(this.stake_yb),
            }
            this.$api.settingMagicPrize(this.$barId, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'magicConditionAdd',
                data: item
              })
              this.$router.back()
            })
          }
        } else {
          this.$router.back()
        }
      }
    },

  }
</script>

<style>


</style>
