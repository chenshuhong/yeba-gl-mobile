<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getvotelist"
    @reLoadData="getvotelist">
    <group slot="top">
      <router-link to="/vote/VoteAdd">
        <span class="my-Add">创建新投票</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.vote_tile">
        <router-link :to="{name:'VoteAdd',params:item}" v-if="item.status!==3">
          <span class="my-green" >编辑</span>
        </router-link>
      </cell>
      <cell-form-preview :list="item"></cell-form-preview>
    </group>

  </scroll>

</template>

<script>
  import {Cell, Group, CellFormPreview} from 'vux'
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
    data () {
      return {}
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    methods: {
      changeData (data) {
        let price = data.unit_price//票单价
        let crops = data.vote_crops
        let Acount = crops[0].vote_count    //A战队票数
        let Bcount = crops[1].vote_count   //B战队票数
        let Amount = (Acount + Bcount) * price //总收入
        let info = [
          {
            label: "启动时间",
            value: data.begin_time
          },
          {
            label: "截止时间",
            value: data.end_time
          },
          {
            label: "A战队票数",
            value: Acount
          },
          {
            label: "B战队票数",
            value: Bcount
          },
          {
            label: "票单价",
            value: price
          },
          {
            label: "总收入",
            value: Amount
          },
        ];
        Object.assign(info, data)
        return info
      },
      getvotelist () {
        this.$api.getVote(this.$barId).then((data) => {
          this.onloadStart()
          let list = []
          for (let i = 0; i < data.length; i++) {
            list.push(this.changeData(data[i]))
          }
          this.list = list
          this.onLoadSuccess()
        }).catch(err => {
          this.onLoadError()
        })
      },
      onEventBus (data) {
        if (data.type === 'voteEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'voteAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getvotelist()
      }
    },
    created () {
      this.getvotelist();
    }
  }
</script>

<style scoped>

</style>
