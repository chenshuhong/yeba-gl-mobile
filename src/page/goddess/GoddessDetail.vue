<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="goodnessList"
    @reLoadData="goodnessList">
      <group v-for="(item,index) in list" :key="item.id">
        <cell :title="item.goddess_name">
          <div class="switch-container">
            <template  v-if="item.activity_info.status!==3">
              <x-switch title="" :value-map="[1,2]" v-model="item.is_wall"
                        @on-click="onWall(item,index)" prevent-default></x-switch>
              <span class="my-green">{{item.is_wall|capitalize}}</span>
            </template>
            <span v-else>当前活动已结束</span>
          </div>
        </cell>
        <cell-form-preview :list="item"></cell-form-preview>
      </group>
  </scroll>
</template>

<script>
  import {
    Cell,
    Group,
    XSwitch,
    CellFormPreview,
  } from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Cell,
      Group,
      XSwitch,
      CellFormPreview,
      Scroll
    },
    data () {
      return {
      }
    },
    mixins:[LoadStatusMixin,BarChangeMixin],
    created () {
      this.goodnessList()
    },
    methods: {
      changeData(data) {
        let obj1 = {
          label: '活动名称',
          value: data.activity_info.activity_name
        }
        let obj2 = {
          label: '得票数',
          value: data.vote_count
        }
        let obj3 = {
          label: '排名',
          value: data.ranking
        }
        let objArr = [obj1, obj2, obj3]
        Object.assign(objArr,data)
        return objArr
      },
      //获取女神列表
      goodnessList () {
        this.onloadStart()
        this.$api.getGoddessList(this.$barId).then((data) => {
          this.list=[]
          for (let i = 0; i < data.length; i++) {
            this.list.push(this.changeData(data[i]))
          }
          this.onLoadSuccess()
        })
      },
      //上墙
      onWall (item ,index) {
        let status = item.is_wall === 1?2:1
        let data = {
          'is_wall': status
        }
        this.$api.setGoddessWall(this.$barId, item.id, data).then((res) => {
          item.is_wall = status
          this.$util.change1(this.list,item)
        })
      },
      onBarChange(){
        this.goodnessList()
      }
    },
    filters: {
      capitalize: function (value) {
        switch (value) {
          case 1:
            return '未上墙'
            break
          case 2:
            return '已上墙'
            break
        }
      }
    }
  }
</script>

<style>

</style>
