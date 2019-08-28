<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getOccupyDistributeList"
    @reLoadData="getOccupyDistributeList">
    <group slot="top">
      <router-link :to="{ name: 'OccupyDistributeAdd'}">
        <span class="my-Add">添加霸屏分销人员</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.user.nickname">
        <span class="my-del" @click="deleteDistribute(item.id)">删除</span>
        <router-link
          :to="{ name: 'OccupyDistributeAdd', params: item}">
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
    CellFormPreview
  } from 'vux'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll
    },
    data () {
      return {}
    },
    mixins: [EventBusMixin, LoadStutusMixin, BarChangeMixin],
    created () {
      this.getOccupyDistributeList()
    },
    methods: {
      changeData (data) {
        let obj1 = {
          label: '添加时间',
          value: data.created_at,
        }
        let obj2 = {
          label: '分成比例',
          value: data.user_divide + '%'
        }
        let objArr = [obj1, obj2]
        if (data.remark) {
          objArr.push({
            label: '备注',
            value: data.remark
          })
        }
        Object.assign(objArr, data)
        return objArr
      },
      //获取列表
      getOccupyDistributeList () {
        this.onloadStart()
        this.$api.getOccupyDistribute(this.$barId).then((data) => {
          this.list = []
          for (let i = 0; i < data.length; i++) {
            this.list.push(this.changeData(data[i]))
          }
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      //删除
      deleteDistribute (id) {
        this.$api.deleteOccupyDistribute(this.$barId, id).then((res) => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'occupyDistributeEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'occupyDistributeAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getOccupyDistributeList()
      }
    }
  }
</script>

<style>

</style>
