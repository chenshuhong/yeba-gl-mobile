<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getPrizeslist"
    @reLoadData="getPrizeslist">
    <group slot="top">
      <router-link to="/prizes/PrizesAdd">
        <span class="my-Add">添加奖品</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="(item.status===1)?item.prize_name:item.prize_name+'（已隐藏）'" >
        <span class="my-del" @click="delePrize(item.id)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link
          :to="{name:'PrizesAdd',params:item}">
          <span class="my-green">编辑</span>
        </router-link>
      </cell>
      <cell title="">
        <load-img :urls="urls" :url="item.prize_image" class="gl-photo" slot="icon"></load-img>
        <span>售价：￥{{item.prize_price}}</span>
      </cell>
    </group>

  </scroll>
</template>

<script>
  import {
    Cell,
    CellBox,
    Group,
  } from "vux"
  import LoadImg from '../../components/LoadImg.vue'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      CellBox,
      Group,
      Scroll,
      LoadImg
    },
    data () {
      return {}
    },
    methods: {
      getPrizeslist () {
        this.onloadStart()
        this.$api.getPrizesList(this.$barId)
          .then(data => {
            this.list = data
            this.onLoadSuccess()
          })
          .catch(err => {
            this.onLoadError()
          })
      },
      delePrize (id) {
        this.$api.deletePrizes(this.$barId, id).then(data => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'prizeEdit') {
          this.$util.change1(this.list, data.data)
        } else if (data.type === 'prizeAdd') (
          this.list.unshift(data.data)
        )
      },
      onBarChange () {
        this.getPrizeslist()
      }
    },
    computed:{
      urls(){
        let urls = []
        for (let item of this.list){
          urls.push(item.prize_image)
        }
        return urls
      }
    },
    created () {
      this.getPrizeslist()
    },
    mixins: [EventBusMixin, LoadStutusMixin, BarChangeMixin]
  }
</script>

<style scoped>

</style>
