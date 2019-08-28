<template>
  <div>
    <group>
      <cell title="一等奖"></cell>
      <popup-picker title="奖品" :data="list" v-model="firstPrize" show-name placeholder="请选择奖品"></popup-picker>
      <my-input title="奖品数量" placeholder="请输入" v-model="firstPrizeNum"
                placeholder-align="right"
                label-width="40vw"
                text-align="right"></my-input>
    </group>
    <group>
      <cell title="二等奖"></cell>
      <popup-picker title="奖品" :data="list" v-model="secondPrize" show-name placeholder="请选择奖品"></popup-picker>
      <my-input title="奖品数量" placeholder="请输入" v-model="secondPrizeNum"
                placeholder-align="right"
                label-width="40vw"
                text-align="right"></my-input>
    </group>
    <group>
      <cell title="三等奖"></cell>
      <popup-picker title="奖品" :data="list" v-model="thirdPrize" show-name placeholder="请选择奖品"></popup-picker>
      <my-input title="奖品数量" placeholder="请输入" v-model="thirdPrizeNum"
                placeholder-align="right"
                label-width="40vw"
                text-align="right"></my-input>
    </group>
    <group class="gl-margin-bottom">
      <cell title="幸运奖"></cell>
      <popup-picker title="奖品" :data="list" v-model="luckPrize" show-name placeholder="请选择奖品"></popup-picker>
      <my-input title="奖品数量" placeholder="请输入" v-model="luckPrizeNum"
                placeholder-align="right"
                label-width="40vw"
                text-align="right"></my-input>
    </group>
    <MyFoot v-on:increment="footSetting"></MyFoot>
  </div>
</template>

<script>
  import {Group, Cell, PopupPicker} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyInput from '@/components/MyInput'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    data () {
      return {
        firstPrizeNum: '',
        secondPrizeNum: '',
        thirdPrizeNum: '',
        luckPrizeNum: '',
        eggList: null,
        list: [],
        luckPrize: [],
        firstPrize: [],
        secondPrize: [],
        thirdPrize: []
      }
    },
    components: {
      Group,
      MyInput,
      MyFoot,
      Cell,
      PopupPicker
    },
    mixins: [BarChangeMixin],
    created () {
      this.getPrizes()
      this.getEggList()
    },
    methods: {
      //获取奖品
      getPrizes () {
        this.$api.getPrizesList(this.$barId, 1).then((data) => {
          let list1 = []
          for (let i = 0; i < data.length; i++) {
            let obj = data[i]
            let prize = {
              name: obj.prize_name + '(￥' + obj.prize_price + ')',
              value: obj.id + ''
            }
            list1.push(prize)
          }
          if (list1.length > 0) {
            this.list.splice(0, 1, list1)
          }
        })
      },
      getEggList () {
        this.$api.getEggList(this.$barId)
          .then(data => {
            this.eggList = data
            this.setEggList()
          })
      },
      setEggList () {
        if (this.eggList && this.eggList.length > 0) {
          this.eggList.forEach(item => {
            let level = item.level
            let prizeId = [item.prize_id + '']
            if (level === 1) {
              this.firstPrize = prizeId
              this.firstPrizeNum = item.prize_count
            } else if (level === 2) {
              this.secondPrize = prizeId
              this.secondPrizeNum = item.prize_count
            } else if (level == 3) {
              this.thirdPrize = prizeId
              this.thirdPrizeNum = item.prize_count
            } else if (level === 4) {
              this.luckPrize = prizeId
              this.luckPrizeNum = item.prize_count
            }
          })
        } else {
          let prizeId = []
          this.firstPrize = prizeId
          this.firstPrizeNum = ''
          this.secondPrize = prizeId
          this.secondPrizeNum = ''
          this.thirdPrize = prizeId
          this.thirdPrizeNum = ''
          this.luckPrize = prizeId
          this.luckPrizeNum = ''
        }
      },
      footSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.firstPrize.length, '请选择一等奖奖品')) {
            return
          }
          if (this.$util.judgeValue(this.firstPrizeNum, '请输入一等奖奖品数量')) {
            return
          }
          if (this.$util.judgeValue(this.secondPrize.length, '请选择二等奖奖品')) {
            return
          }
          if (this.$util.judgeValue(this.secondPrizeNum, '请输入二等奖奖品数量')) {
            return
          }
          if (this.$util.judgeValue(this.thirdPrize.length, '请选择三等奖奖品')) {
            return
          }
          if (this.$util.judgeValue(this.thirdPrizeNum, '请输入三等奖奖品数量')) {
            return
          }
          if (this.$util.judgeValue(this.luckPrize.length, '请选择幸运奖奖品')) {
            return
          }
          if (this.$util.judgeValue(this.luckPrizeNum, '请输入幸运奖奖品数量')) {
            return
          }
          let data = [
            {
              method: 'post',
              url: `egg/prize`,
              data: {
                "bar_id": this.$barId,
                "level": 1,
                "prize_id": this.firstPrize[0],
                "prize_count": this.firstPrizeNum
              }
            },
            {
              method: 'post',
              url: `egg/prize`,
              data: {
                "bar_id": this.$barId,
                "level": 2,
                "prize_id": this.secondPrize[0],
                "prize_count": this.secondPrizeNum
              }
            },
            {
              method: 'post',
              url: `egg/prize`,
              data: {
                "bar_id": this.$barId,
                "level": 3,
                "prize_id": this.thirdPrize[0],
                "prize_count": this.thirdPrizeNum
              }
            },
            {
              method: 'post',
              url: `egg/prize`,
              data: {
                "bar_id": this.$barId,
                "level": 4,
                "prize_id": this.luckPrize[0],
                "prize_count": this.luckPrizeNum
              }
            }
          ]
          this.$api.getEggSetting(this.$barId).then(res => {
            let allCount = ~~this.firstPrizeNum + ~~this.secondPrizeNum + ~~this.thirdPrizeNum + ~~this.luckPrizeNum
            if (res.egg_count < allCount) {
              let error = new Error()
              error.code = 55555
              error.message = `奖品的数量不能大于金蛋的数量`
              return Promise.reject(error)
            } else {
              return this.$api.batch(data, false)
            }
          }).then(data => {
            this.eggList = data
            this.$router.back()
          })
            .catch(err => {
              if (err.code === 23406) {
                this.$api.startEgg(this.$barId)
                  .then(() => {
                    return this.$api.batch(data)
                  })
                  .then(data => {
                    this.$router.back()
                  })
              } else {
                let msg = err.code ? err.message : '未知错误'
                this.$vux.alert.show({
                  title: '加载失败',
                  content: msg,
                })
              }
            })
        } else {
          this.$router.back()
        }
      },
      onBarChange () {
        this.eggList = null
        this.getPrizes()
        this.setEggList()
      },
    },
    activated () {
      this.getEggList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
