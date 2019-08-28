<template>
  <div>

    <group>
      <my-input title="金蛋数量(个)" placeholder="请输入" v-model="eggNum"
                placeholder-align="right"
                label-width="40vw"
                text-align="right"></my-input>
      <my-input title="金蛋单价(Y币/个)" placeholder="请输入" v-model="perPrice"
                placeholder-align="right" label-width="40vw"
                text-align="right"></my-input>
      <my-input title="游戏时长(分钟)" placeholder="请输入" v-model="time"
                placeholder-align="right" label-width="40vw"
                text-align="right"></my-input>
    </group>

    <MyFoot v-on:increment="footSetting"></MyFoot>
  </div>
</template>

<script>
  import {Group} from 'vux'
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
        eggNum: '',
        time: '',
        perPrice: '',
        setting: null
      }
    },
    mixins: [BarChangeMixin],
    created () {
      this.getEggSetting()
    },
    methods: {
      getEggSetting () {
        this.$api.getEggSetting(this.$barId).then((data) => {
          this.setting = data
          this.eggNum = data.egg_count
          this.perPrice = data.unit_price
          this.time = data.game_len/60
        })
      },
      footSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.eggNum, '请输入金蛋数量')) {
            return
          }
          if (this.$util.judgeValue(this.eggNum>=10, '金蛋数量最少为10 ')) {
            return
          }
          if (this.$util.judgeValue(this.perPrice, '请输入金蛋单价')) {
            return
          }
          if (this.$util.judgeValue(this.perPrice>0, '金蛋单价不能为0')) {
            return
          }
          if (this.$util.judgeValue(this.time, '请输入游戏时长')) {
            return
          }
          if (this.$util.judgeValue(this.time>0, '游戏时长不能为0')) {
            return
          }
          let data = {
            "bar_id": this.$barId,
            "egg_count": this.eggNum,
            "unit_price": this.perPrice,
            "game_len": this.time*60
          }
          this.$api.getEggList(this.$barId).then(res=>{
            let eggCount = res.reduce((total,price)=>{
              return ~~(total+price.prize_count)
            })
            if (eggCount>this.eggNum){
              let error = new Error()
              error.code = 55555
              error.message = `金蛋的数量不能小于奖品的数量`
              return Promise.reject(error)
            }else {
              return this.$api.eggSetting(data)
            }
          }).then(data=>{
            this.setting = data
            this.$router.back()
          })
            .catch(err => {
              let msg = err.code ? err.message : '未知错误'
              this.$vux.alert.show({
                title: '加载失败',
                content: msg,
              })
            })
        } else {
          this.$router.back()
        }
      },
      onBarChange () {
        this.setting = null
        this.eggNum = ''
        this.perPrice = ''
        this.time = ''
        this.getEggSetting()
      }
    },
    activated () {
      if (this.setting) {
        let data = this.setting
        this.eggNum = data.egg_count
        this.perPrice = data.unit_price
        this.time = data.game_len/60
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
