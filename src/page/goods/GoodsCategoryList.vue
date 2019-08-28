<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getGoodsCategoryList"
    @reLoadData="getGoodsCategoryList">
    <group slot="top">
      <router-link to="/goods/GoodsCategoryAdd">
        <span class="my-Add">新增分类</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.name">
        <span class="my-del" @click="deleGoodsCategory(item.id)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link :to="{ name: 'GoodsCategoryAdd', params: item}">
          <span class="my-green">编辑</span>
        </router-link>

      </cell>
      <cell title="排序号" :value="item.sort_number"></cell>
    </group>
  </scroll>
</template>

<script>
  import {
    Cell,
    Group
  } from "vux"
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import EventBusMixin from '@/js/mixin/eventBus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      Scroll
    },
    data () {
      return {}
    },
    mixins: [EventBusMixin, LoadStutusMixin, BarChangeMixin],
    methods: {
      getGoodsCategoryList () {
        this.onloadStart()
        this.$api.getGoodsCategory(this.$barId, "sort_number").then(data => {
          this.list = data
          this.onLoadSuccess()
        }).catch(err => {
          this.onLoadError()
        })
      },
      deleGoodsCategory (id) {
        this.$api.deleteGoodsCategory(id, this.$barId).then(res => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'goodCategoryEdit') {
          this.$util.change1(this.list, data.data)
        } else if (data.type === 'goodCategoryAdd') (
          this.list.unshift(data.data)
        )
      },
      onBarChange () {
        this.getGoodsCategoryList()
      }
    },
    created () {
      this.getGoodsCategoryList()
    }
  }
</script>

<style scoped>

</style>
