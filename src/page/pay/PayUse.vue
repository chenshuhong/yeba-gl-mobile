<template>

  <div id="">

    <group>
      <x-switch title="夜吧支付功能" :value-map="[2,1]" v-model="status" @on-change="onChange"></x-switch>
    </group>

    <group v-if="status==1">
      <cell is-link title="支付入口" value='' link="/pay/PayEnter"></cell>
      <cell is-link title="结算说明" value='' link=""></cell>
      <cell is-link title="结账通知" value='' link="/checkout/CheckoutList"></cell>
    </group>

    <div class="my-catalog">

    <p class="my-title">夜吧支付说明</p>
    <div class="my-catalog-item">
      <p class="my-first-catalog">1.什么是夜吧支付</p>
      <p class="my-second-catalog">夜吧支付是为酒吧整合微信支付和支付宝支付的支付 平台，拥有低手续费、T+1银行卡自动到账、划分消 费用户等级等优点</p>
    </div>
    <div class="my-catalog-item">
      <p class="my-first-catalog">2、怎样使用夜吧支付？</p>
      <p class="my-second-catalog">点击功能开关为开启状态，下载支付二维码到打印店 进行打印，贴到收银台或桌上，或者复制支付链接到 公众号的自定义菜单，用户可以点击进行付款。</p>
    </div>
    <div class="my-catalog-item">
      <p class="my-first-catalog">3.怎样结算？</p>
      <p class="my-second-catalog">提现需提供银行卡名称、银行卡号、持卡人姓名相关 信息，提供给夜吧微信客服：yeba98。相关信息经核 实成功后，提现的金额将每天早上7点左右自动转账。</p>
    </div>
    <div class="my-catalog-item">
      <p class="my-first-catalog">4.如需帮助请联系微信客服 yeba98</p>
    </div>

  </div>


  </div>

</template>

<script>
  import { Cell, CellBox, Group, XSwitch } from 'vux'
  export default {
    components: {
      Cell,
      CellBox,
      Group,
      XSwitch,
    },
    created(){
      this.barinfo = this.$store.state.currentBar
      this.getPay()
    },
    methods: {
      getPay () {
        this.$api.getBarConfigs(this.barinfo.bar_id,'bar_pay').then((data) => {
          this.status = data[0].status
          this.id = data[0].id
        })
      },
      onChange (newVal) {
        this.payUpdate()
      },
      payUpdate () {
        let data = {
          'bar_id': this.barinfo.bar_id,
          'status': this.status,
          'cfg_modules_name': 'bar_pay',
          'cfg_type': 1
        }
        this.$api.updateModule(this.id, data).then((res) => {

        })
      }
    },
    data () {
      return {
        barinfo: {},
        status: 2,
        id: ''
      }
    }
  }
</script>

<style>

</style>
