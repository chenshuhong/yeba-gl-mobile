<template>
  <div>

    <group value="dd">
      <x-input placeholder="http://yeba.im">
        <span slot="right" class="my-green" >复制</span>
      </x-input>
    </group>

    <group title="">
      <cell class="my-head-img" title="二维码样式一">
        <img slot="icon"  style="display:block;margin-right:5px;" src="../../assets/home_bp_icon.png">
        <span slot="" class="my-green">保存</span>
      </cell>
      <cell class="my-head-img" title="二维码样式二">
        <img slot="icon"  style="display:block;margin-right:5px;" src="../../assets/home_bp_icon.png">
        <span slot="" class="my-green">保存</span>
      </cell>
    </group>


  </div>
</template>



<script>
  import { Datetime, Group, XButton,XInput,Cell, CellBox,XSwitch } from 'vux'

  export default {
    components: {
      XSwitch,
      Datetime,
      Group,
      XButton,
      XInput,
      Cell,
      CellBox,
    },
    data () {
      return {
        value5: '',
        computeHoursFunction (date, isToday, generateRange) {
          if (isToday) {
            return generateRange(new Date().getHours(), 23)
          } else {
            return generateRange(0, 23)
          }
        },
        computeDaysFunction (options, generateRange) {
          return [options.month] // if current month is n, days are [n]
        },
        onlySetEndDate: '2017-10-11',
        onlySetEndDateValue: ''
      }
    },
    methods: {
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      showPlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH',
          value: '2017-05-20 18',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      toggleFormat () {
        this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
      },
      change (value) {
        console.log('change', value)
      },
      clearValue (value) {
        this.value6 = ''
      },
      clearValue8 (value) {
        this.value8 = ''
      },
      setToday (value) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
        console.log('set today ok')
      }
    }
  }
</script>

<style scoped lang="less">
  .center {
    padding-top: 10px;
    padding-left: 15px;
    color: green;
  }
</style>
