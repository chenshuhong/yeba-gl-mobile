<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getGoodsList"
    @reLoadData="getGoodsList">
    <group slot="top">
      <router-link to="/goods/GoodsAdd">
        <span class="my-Add">添加酒水</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.goods_name|isShow(item.audit)">
        <span v-if="item.recom===1">推荐</span>
        <span v-if="item.recom===0">不推荐</span>
        <span class="my-del" @click="deleGoods(item.id)">删除</span>
        <router-link :to="{ name: 'GoodsAdd', params:item}">
          <span class="my-green">编辑</span>
        </router-link>
      </cell>
      <cell-form-preview :list="item"></cell-form-preview>
    </group>
  </scroll>

</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview,
  } from "vux"
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    data () {
      return {}
    },
    methods: {
      changeData (data) {
        let obj1 = {
          label: '分类',
          value: data.cat_info[0].name
        }
        let obj2 = {
          label: '售价',
          value: '¥' + data.goods_price
        }
        let objArr = [obj1, obj2]
        Object.assign(objArr, data)
        return objArr
      },
      getGoodsList () {
        this.onloadStart()
        this.$api.getGoods(this.$barId).then(data => {
          this.list = []
          for (let item of data) {
            this.list.push(this.changeData(item))
          }
          this.onLoadSuccess()
        }).catch(err => {
          this.onLoadError()
        })
      },
      deleGoods (id) {
        this.$api.deleteGoods(id, this.$barId).then(res => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'goodEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'goodAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getGoodsList()
      }
    },
    created () {
      this.getGoodsList()
    },
    filters: {
      isShow (title, status) {
        if (status === 0) {
          return title + '(已隐藏)'
        }
        return title
      }
    }
  }
</script>

<style scoped>

</style>
