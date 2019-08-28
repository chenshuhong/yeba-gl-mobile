<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getBarWifi"
    @reLoadData="getBarWifi">
    <group slot="top">
      <x-input placeholder="请输入Wifi名称" v-model="wifiName">
        <span slot="right" class="my-green add-margin-left" @click="addWifi">添加</span>
      </x-input>
    </group>
    <group>
      <cell v-for="item in list" :key="item.id" :title="item.name">
        <span class="my-del" @click="deleteWifi(item.id)">删除</span>
      </cell>
    </group>
  </scroll>

</template>

<script>
  import {Cell, Group, XInput} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      XInput,
      Scroll
    },
    data () {
      return {
        wifiName: ''
      }
    },
    mixins: [LoadStatusMixin, BarChangeMixin],
    created () {
      this.getBarWifi()
    },
    methods: {
      //获取wifi列表
      getBarWifi () {
        this.onloadStart()
        this.$api.getBarWifi(this.$barId).then((data) => {
          this.list = []
          for (let item of data) {
            this.list.push(item.data)
          }
          this.onLoadSuccess()
        }).catch(err => {
          this.onLoadError()
        })
      },
//      添加wifi
      addWifi () {
        if (this.$util.judgeValue(this.wifiName, '请输入wifi名字')) {
          return
        }
        this.$api.addBarWifi(this.$barId, this.wifiName).then((data) => {
          this.wifiName = ''
          this.list.unshift(data)
        })
      },
//      删除wifi
      deleteWifi (id) {
        this.$api.deleteBarWifi(this.$barId, id).then((res) => {
          this.$util.remove(this.list, id)
        })
      },
      onBarChange () {
        this.getBarWifi()
      }
    }
  }
</script>

<style>


</style>
