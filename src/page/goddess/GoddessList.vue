<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="goodnessActivityList"
    @reLoadData="goodnessActivityList">
    <group slot="top">
      <router-link to="/goddess/GoddessAddOne">
        <span class="my-Add">创建比赛</span>
      </router-link>
    </group>
    <group v-for="item in list" :key="item.id">
      <cell :title="item.activity_name">
        <router-link
          :to="{ name: 'GoddessAddOne', params: item}">
          <span class="my-green" v-if="item.status !== 3">编辑</span>
        </router-link>
      </cell>
      <cell-form-preview :list="item[0]"></cell-form-preview>
      <cell-form-preview :list="item[1]"></cell-form-preview>
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
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Scroll,
      Cell,
      Group,
      CellFormPreview
    },
    data () {
      return {}
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created () {
      this.goodnessActivityList()
    },
    methods: {
      changeData (data) {
        let obj1 = {
          label: '启动时间',
          value: data.begin_time
        }
        let obj2 = {
          label: '结束时间',
          value: data.end_time
        }
        let obj3 = {
          label: '参赛人数',
          value: data.play_user_count || 0
        }
        let obj5 = {
          label: '用户分成',
          value: data.user_divide + '%'
        }
        let obj6 = {
          label: '总票数',
          value: data.vote_count
        }
        let obj4 = {
          label: '冠军票数',
          value: data.first_goddess ? data.first_goddess.vote_count : 0
        }
        let objArr1 = [obj1, obj2]
        let objArr2 = [obj3, obj5, obj6, obj4]
        let listArr = []
        listArr.push(objArr1, objArr2)
        Object.assign(listArr, data)
        return listArr
      },
//      获取比赛列表
      goodnessActivityList () {
        this.onloadStart()
        this.$api.getGoddessActivity(this.$barId).then((data) => {
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
      onEventBus (data) {
        if (data.type === 'goddessEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'goddessAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.goodnessActivityList()
      }
    }
  }
</script>

<style>

</style>
