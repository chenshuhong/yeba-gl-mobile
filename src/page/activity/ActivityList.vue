<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getActivitylist"
    @reLoadData="getActivitylist">
    <group slot="top">
      <router-link to="/activity/ActivityAdd">
        <span class="my-Add">添加新活动</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.title">
        <span class="my-del" @click="deleAct(item.id)">删除</span>&nbsp;&nbsp;&nbsp;
        <router-link :to="{name:'ActivityAdd',params:item}">
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
  } from "vux";
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
    methods: {
      changeData (data) {
        let begin = data.begin_at
        let end = data.end_at
        let begintime = begin.substr(0, 10) //开始时间
        let endtime = end.substr(0, 10) //结束时间
        let audit_status = data.audit_status
        let astatus
        if (audit_status == 1) {
          astatus = "待审核"
        } else if (audit_status == 2) {
          astatus = "通过"
        } else {
          astatus = "不通过"
        }
        let stulist = [
          {
            label: "状态",
            value: astatus
          },
          {
            label: "活动时间",
            value: begintime + "~" + endtime
          }
        ]
        Object.assign(stulist, data)
        return stulist
      },
      getActivitylist () {
        this.onloadStart()
        this.$api.getActivity(this.$barId, "-created_at").then(data => {
          let list = []
          for (let i = 0; i < data.length; i++) {
            list.push(this.changeData(data[i].data))
          }
          this.list = list
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      deleAct (id) {
        this.$api.deleteActivity(id, this.$barId).then(res => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'activityEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'activityAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getActivitylist()
      }
    },
    created () {
      this.getActivitylist()
    },
    filters: {
      activityStatus (status) {
        if (status === 1) {
          return "待审核"
        } else if (audit_status === 2) {
          return "通过"
        } else {
          return "不通过"
        }
      }
    }
  }
</script>

<style scoped>

</style>
