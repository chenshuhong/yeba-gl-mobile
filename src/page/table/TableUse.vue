<template>

  <div>
    <group>
      <x-switch title="订台功能" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>
    <group v-if="status==1">
      <cell is-link title="营销人员管理" value='' link="/marketer/MarketerList"></cell>
      <cell is-link title="套餐管理" value='' link="/table/TableList"></cell>
      <cell is-link title="订单管理" value='' link="/table/TableHistory"></cell>
    </group>
  </div>

</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'

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
      this.getTable()
    },
    methods: {
      onClick (newVal,oldVal) {
        this.tableUpdate()
      },
      getTable () {
        this.$api.getBarConfigs(this.$barId,'bar_table').then((data) => {
          this.status = data[0].status
          this.id = data[0].id
        })
      },
      tableUpdate () {
        let status = this.status === 1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_table',
          'cfg_type': 1
        }
        this.$api.updateModule(this.id, data).then((res) => {
          this.status = status
        })
      }
    }
  }
</script>

<style>


</style>
