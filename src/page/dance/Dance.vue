<template>
  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('点舞功能',status === 2)" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>
    <group v-if="status===1">
      <cell is-link title="" @click.native="$util.openInPc()">
        <span class="gray" slot="title">点舞套餐(稍后上线)</span>
      </cell>
      <cell is-link title="点舞通知" @click.native="$util.openInPc()">
        <span class="gray" slot="title">点舞通知(稍后上线)</span>
      </cell>
      <cell is-link title="点舞入口" @click.native="$util.openInPc()">
        <span class="gray" slot="title">点舞入口(稍后上线)</span>
      </cell>
      <cell is-link title="点舞设置" @click.native="$util.openInPc()">
        <span class="gray" slot="title">点舞设置(稍后上线)</span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
    export default {
      name: "dance",
      components: {
        Cell,
        Group,
        XSwitch
      },
      data () {
        return {
          status: 2
        }
      },
      created () {
        this.getDance()
      },
      methods: {
        onClick (newVal) {
          this.danceUpdate()
        },
//      获取订台开关
        getDance () {
          this.$api.getBarConfigs(this.$barId,'bar_dance').then((data) => {
            this.status = data[0].status
            this.id = data[0].id
          })
        },
//      修改订台开关
        danceUpdate () {
          let status = this.status === 1 ? 2:1
          let data = {
            'bar_id': this.$barId,
            'status': status,
            'cfg_modules_name': 'bar_dance',
            'cfg_type': 1
          }
          this.$api.updateModule(this.id, data).then((res) => {
            this.status=status
          })
        }
      }
    }
</script>

<style scoped>

</style>
