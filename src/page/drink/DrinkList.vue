<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getDrinkList"
    @reLoadData="getDrinkList">
    <group slot="top">
      <router-link to="/drink/DrinkAdd">
        <span class="my-Add">新增酒类</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.name">&nbsp;
        <router-link :to="{name:'DrinkAdd',params:item}">
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
  } from 'vux'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    name: "drink-list",
    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll,
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created () {
      this.getDrinkList()
    },
    methods: {
      getDrinkList () {
        this.onloadStart()
        this.$api.getDrinkList(this.$barId)
          .then(data => {
            let list = []
            for (let i = 0; i < data.length; i++) {
              list.push(this.changeData(data[i]))
            }
            this.list = list
            this.onLoadSuccess()
          })
          .catch(err => {
            console.log(err)
            this.onLoadError()
          })
      },
      changeData (data) {
        let stulist = [
          {
            label: '酒水类别',
            value: data.type
          },
          {
            label: '酒水规格',
            value: data.spec,
          },
          {
            label: '单价',
            value: '¥' + data.unit_price
          },
          {
            label: '存酒有效期',
            value: data.store_term + '天'
          },
          {
            label: '已存数量',
            value: data.store_amount
          },
          {
            label: '存酒总价值',
            value: '¥' + data.store_subtotal
          }
        ]
        Object.assign(stulist, data)
        return stulist
      },
      onEventBus (data) {
        if (data.type === 'drinkEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'drinkAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getDrinkList()
      }
    }
  }
</script>

<style scoped>

</style>
