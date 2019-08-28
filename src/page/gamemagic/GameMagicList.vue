<template>

    <scroll
      ref="scroll"
      :data="list"
      :loadStatus='loadStatus'
      @pullingDown="getPrizesList"
      @reLoadData="getPrizesList">
      <group slot="top">
        <router-link to="/gamemagic/GameMagicPrizeSet">
          <span class="my-Add">添加奖品</span>
        </router-link>
      </group>
      <group v-for="(item,key) in list" :key="item.id">
        <cell :title="'编号'+(key+1)">
          <span class="my-del" @click="deletePrize(item.id)">删除</span>
          <router-link
            :to="{ name: 'GameMagicPrizeSet', params: item}">
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
    data () {
      return {
      }
    },
    created () {
      this.getPrizesList()
    },
    mixins:[EventBusMixin,LoadStutusMixin,BarChangeMixin],
    methods: {
      changeData(data){
        let obj1 = [{
          label: '奖品',
          value: data.prize_name,
        },{
          label: '押注Y币数',
          value: data.stake_yb
        }]
        Object.assign(obj1,data)
        return obj1
      },
      //获取列表
      getPrizesList () {
        this.onloadStart()
        this.$api.getMagicPrizeList(this.$barId).then((data) => {
          let list = []
          for (let i = 0; i < data.length; i++) {
            list.push(this.changeData(data[i]))
          }
          this.list=list
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      //删除
      deletePrize (id) {
        this.$api.deleteMagicPrize(this.$barId, id).then((res) => {
          this.$util.remove(list,id)
        })
      },
      onEventBus(data){
        if (data.type === 'magicConditionEdit') {
          this.$util.change1(this.list,this.changeData(data.data))
        }else if (data.type === 'magicConditionAdd') (
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
