<template>

    <scroll
      ref="scroll"
      :data="list"
      :loadStatus='loadStatus'
      @pullingDown="getPrizesList"
      @reLoadData="getPrizesList">
      <group slot="top">
        <router-link to="/rockruning/RockRuningConditionAdd">
          <span class="my-Add" @click.native="showLoading">添加条件</span>
        </router-link>
      </group>
      <group v-for="item in list" :key="item.id">
        <cell :title="item.conditionDesc">
          <span class="my-del" @click="deletePrize(item.id)">删除</span>
          <router-link
            :to="{ name: 'RockRuningConditionAdd', params: item}">
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
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll
    },
    mixins:[EventBusMixin,LoadStutusMixin,BarChangeMixin],
    data () {
      return {
      }
    },
    created () {
      this.getPrizesList()
    },
    methods: {
      changeData(data){
        let obj1 = [{
          label: '奖品',
          value: data.prize_name,
        }]
        Object.assign(obj1,data)
        obj1.conditionDesc = data.condition === 0?'无条件':'当押注的Y币总数>'+data.condition
        return obj1
      },
      //获取列表
      getPrizesList () {
        this.onloadStart()
        this.$api.getGamesPrizesList(this.$barId, 1).then((data) => {
          let list = []
          for (let i = 0; i < data.length; i++) {
            list.push(this.changeData(data[i]))
          }
          this.list = list
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
//      删除奖品
      deletePrize (id) {
        let data = {
          'game_type': 1
        }
        this.$api.deleteGamesPrize(this.$barId, id, data).then((res) => {
          this.$util.remove(this.list,id)
        })
      },
      onEventBus(data){
        if (data.type === 'rockConditionEdit') {
          this.$util.change1(this.list,this.changeData(data.data))
        }else if (data.type === 'rockConditionAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange(){
        this.getPrizesList()
      }
    },
  }
</script>

<style>

</style>
