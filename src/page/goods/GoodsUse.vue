<template>

  <div >

    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('酒水牌功能',status===2)" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>

    <group v-if="status==1">
      <cell is-link title="分类列表" value='' link="/goods/GoodsCategoryList"></cell>
      <cell is-link title="酒水列表" value='' link="/goods/GoodsList"></cell>
    </group>

  </div>

</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Cell,
      Group,
      XSwitch
    },
    data () {
      return {
        status: 2,
      }
    },
    mixins:[BarChangeMixin],
    methods: {
      getGoodsOpen(){
        this.$api.getBarConfigs(this.$barId,'bar_wine').then((data) => {
          this.status = data[0].status
          this.id = data[0].id
        })
      },
      onClick (Val) {
        let status = this.status === 1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          'status': status,
          'cfg_modules_name': 'bar_wine',
          'cfg_type': 1
        }
        this.$api.updateModule(this.id, data).then((res) => {
          this.status = status
        })
      },
      onBarChange(){
        this.getGoodsOpen()
      }
    },
    created () {
      this.getGoodsOpen()
    }
  }
</script>

<style scoped>

</style>
