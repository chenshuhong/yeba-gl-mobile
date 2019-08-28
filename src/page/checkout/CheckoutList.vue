<template>

  <div>

    <group>
      <cell title="结账通知接收人" value="添加" link="/checkout/CheckoutAdd"></cell>
    </group>

    <group title="">
      <cell @click.native="showLoading"  title="Hjon (10188)">
        <span slot class="my-del">删除</span>
      </cell>
      <cell  title="墨迹 (123456)">
        <span slot class="my-del">删除</span>
      </cell>
    </group>
  </div>

</template>

<script>
  import {Loading, Cell, CellBox, Group,XInput  } from 'vux'

  export default {
    components: {
      Cell,
      CellBox,
      Group,
      Loading,
      XInput
    },
    methods: {
      showLoading () {

        this.$vux.loading.show({
          text: '加载中'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 1000)
      }
    },
    data () {
      return {
        value1: true,
        value2: false,
        stringValue: '0'
      }
    }
  }
</script>

<style>



</style>
