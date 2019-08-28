<template>
  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('播报开关',broadcastStatus === 2)" :value-map="[2,1]" :value="broadcastStatus"
                @on-click="onBroadcastChange" prevent-default></x-switch>
    </group>
    <group v-if="broadcastStatus === 1">
      <cell is-link title="播报人员管理" value='' link="/broadcast/user"></cell>
    </group>
  </div>
</template>

<script>
  import {Cell, Group, XSwitch} from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    name: "Broadcast",
    components: {
      Cell,
      Group,
      XSwitch
    },
    mixins: [BarChangeMixin],
    data () {
      return {
        broadcastStatus: 2,
        broadcastScreenId: '',
      }
    },
    created () {
      this.getBroadcastStatus()
    },
    methods: {
      getBroadcastStatus () {
        this.$api.getBarConfigs(this.$barId, 'bar_broadcast').then((data) => {
          this.broadcastStatus = data[0].status
          this.broadcastScreenId = data[0].id
        })
      },
      onBroadcastChange () {
        let status = this.broadcastStatus === 1 ? 2 : 1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_broadcast',
          'cfg_type': 1
        }
        this.$api.updateModule(this.broadcastScreenId, data).then((res) => {
          this.broadcastStatus = status
        })
      },
      onBarChange () {
        this.getBroadcastStatus()
      },
    }
  }
</script>

<style scoped>

</style>
