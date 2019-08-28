<template>

  <div>

    <group>
      <cell is-link title="复制微信客服号" :value='kefu'
            v-clipboard:copy="kefu"
            v-clipboard:success="onCopy"
      ></cell>
      <cell is-link title="拨打客服热线" value="020-29898398" @click.native="onCall"></cell>
    </group>

    <group>
      <cell is-link title="桌贴" value='' link="/bar/TableStrick"></cell>
      <cell is-link title="小程序二维码" link='/bar/MiniAppsQRCode'></cell>
    </group>

    <group>
      <cell is-link title="酒吧信息" value='' link="/bar/BarMessage"></cell>
      <cell is-link title="WI-FI设置" value='' link="/bar/WiFi"></cell>
    </group>

    <box gap="1rem">
      <x-button type="primary" @click.native="logout">注销</x-button>
    </box>

  </div>

</template>

<script>
  import { Cell, CellBox, Group,Box,XButton } from 'vux'

  export default {
    components: {
      Cell,
      CellBox,
      Group,
      Box,
      XButton
    },
    data () {
      return {
        kefu:'yeba98'
      }
    },
    created () {

    },
    methods: {
      onCopy: function (e) {
        this.$vux.alert.show({
          title: '提示',
          content: '已复制到剪贴板'
        })
      },
      onCall () {
        window.open('tel:020-29898398')
      },
      logout () {
        this.$store.commit(this.$config.STORAGE.USER_TOKEN)
        this.$router.push('/Login')
      }
    }

  }
</script>

<style>

</style>
