<template>

  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('夜聘功能',status === 2)" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>
    <group v-if="status == 1">
      <cell is-link title="" @click.native="$util.openInPc()">
        <span class="gray" slot="title">简历列表</span>
      </cell>
      <cell is-link title="" @click.native="$util.openInPc()">
        <span class="gray" slot="title">职位列表</span>
      </cell>
      <cell is-link title="夜聘联系人设置"  link="/nighthire/NightHireContact">
      </cell>
    </group>
  </div>
</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Cell,
      Group,
      XSwitch
    },
    data () {
      return {
        status: 2,
        id: ''
      }
    },
    created () {
      this.ypSwitch()
    },
    mixins:[BarChangeMixin],
    methods: {
      onClick () {
        this.nightUpdate()
      },
      nightUpdate () {
        let status = this.status === 1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          'status': status,
          'cfg_modules_name': 'bar_job',
          'cfg_type': 1
        }
        this.$api.updateModule(this.id, data).then((res) => {
          this.status = status
        })
      },
      ypSwitch () {
        this.$api.getBarConfigs(this.$barId,'bar_job').then((data) => {
          this.status = data[0].status
          this.id = data[0].id
        })
      },
      onBarChange(){
        this.ypSwitch()
      }
    }
  }
</script>

<style>


</style>
