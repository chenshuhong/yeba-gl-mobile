<template>

  <div id="">
    <group>
      <my-input
        title="套餐时长" placeholder="输入套餐时长"
        placeholder-align="right"
        label-width="40vw"
        text-align="right"
        v-model="duration"></my-input>
      <x-input
        title="套餐价格" placeholder="输入套餐价格"
        placeholder-align="right"
        label-width="40vw"
        text-align="right"
        type="number"
        v-model="price"></x-input>
      <popup-picker title="对应主题" show-name :data="themeList" v-model="value1"></popup-picker>
    </group>
    <group>
      <x-textarea v-model="remark" :max="30" placeholder="输入套餐备注"></x-textarea>
    </group>
    <MyFoot v-on:increment="OccupyImgAdd"></MyFoot>
  </div>
</template>

<script>
  import {Group, XTextarea, PopupPicker, XInput} from 'vux'
  import MyFoot from '../../components/MyFoot'
  import MyInput from '@/components/MyInput'

  let params
  export default {
    name: 'OccupyImgAdd',
    components: {
      Group,
      XTextarea,
      XInput,
      PopupPicker,
      MyFoot,
      MyInput
    },
    data () {
      return {
        value1: ['0'],
        themeList: [[{
          name: '无主题',
          value: '0'
        }]],
        duration: '',
        price: '',
        remark: ''
      }
    },
    created () {
      this.OccupyTheme()
    },
    activated () {
      this.duration = ''
      this.price = ''
      this.remark = ''
      this.value1 = []
      params = this.$route.params
      if (params.id) {
        this.duration = params.duration
        this.price = params.price
        this.remark = params.remark
        if (params.theme) {
          this.value1 = [params.theme_id + '']
        }
      }
    },
    methods: {
//主题
      OccupyTheme () {
        let list1 = []
        list1.push({
          name: '无主题',
          value: '0'
        })
        this.$api.getOccupyTheme().then((data) => {
          for (let i = 0; i < data.length; i++) {
            let theme = {
              name: data[i].theme_name,
              value: data[i].id + ''
            }
            list1.push(theme)
          }
          this.themeList.splice(0, 1, list1)
        })
      },
      OccupyImgAdd (e) {
        if (e) {
          if (this.$util.judgeValue(this.duration, '请输入霸屏时长')) {
            return
          }
          if (this.$util.judgeValue(this.price, '请输入霸屏价格')) {
            return
          }
          let data = {
            'duration': this.duration,
            'price': this.price,
            'remark': this.remark,
            'type': 1,
            'bar_id': this.$barId,
            'status': 0,
            'theme_id': this.value1[0]
          }
          //编辑
          if (params.id) {
            this.$api.updateOccupyScreen(params.id, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'occupyImgEdit',
                data: item
              })
              this.$router.back()
            })
          } else {
//            添加
            this.$api.addOccupyImg(data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'occupyImgAdd',
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
