<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getmsglist"
    @reLoadData="getmsglist">
    <group slot="top">
      <span class="my-Add" @click="Addmsg">添加新消息(剩余推送次数:{{count}})</span>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.send_timestamp">
        <span v-if="item.send_status=='1'" key="status" class="my-status">待审核</span>
        <span v-else-if="item.send_status=='2'" key="status" class="my-status">待推送</span>
        <span v-else-if="item.send_status=='3'" key="status" class="my-status">不通过</span>
        <span v-else-if="item.send_status=='4'" key="status" class="my-status">成功</span>
        <span v-else="item.send_status=='5'" key="status" class="my-status">失败</span>&nbsp;&nbsp;
        <span class="my-del" @click="deleMsg(item.id)">删除</span>
      </cell>
      <cell class="mssg" :title="item.message">
        <router-link :to="{name:'MsgAdd',params:item}">
          <span v-if="item.send_status=='1'" class="my-green">编辑</span>
        </router-link>
      </cell>
    </group>

  </scroll>

</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview
  } from "vux"
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
      Addmsg () {
        if (this.count === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '您的消息推送次数本月已用完，下月将恢复次数'
          })
        } else {
          this.$router.push({name: 'MsgAdd'});
        }
      },
      getmsglist () {
        this.onloadStart()
        this.$api.getMsg(this.$barId).then(data => {
          this.list = data;
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      deleMsg (id) {
        this.$api.deleteMsg(id).then(res => {
          this.$util.remove(this.list, id)
        })
      },
      onEventBus (data) {
        if (data.type === 'msgEdit') {
          this.$util.change1(this.list, data.data)
        } else if (data.type === 'msgAdd') {
          let bar = this.$store.state.currentBar
          bar.push_count_enable--
          this.$store.commit(this.$config.STORAGE.BAR_INFO, bar)
          this.list.unshift(data.data)
        }
      },
      onBarChange () {
        this.getmsglist()
      }
    },
    created () {
      this.getmsglist()
    },
    computed: {
      count () {
        return this.$store.state.currentBar.push_count_enable
      }
    }
  }
</script>

<style scoped>
  .my-status {
    color: #999;
  }

  .mssg {
    font-size: 16px;
  }
</style>
