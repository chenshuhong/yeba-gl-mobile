<template>
  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('存酒功能',status === 2)" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>
    <group v-if="status==1">
      <cell is-link title="仓库酒类管理" link="/drink/DrinkList">
      </cell>
      <cell is-link title="仓库管理员管理" link="/drink/DrinkManager">
      </cell>
      <cell is-link title="存取申请管理" link="/drink/DrinkGet">
      </cell>
      <cell is-link title="服务员管理" link="/drink/DrinkWaiter">
      </cell>
      <cell is-link title="存酒入口" link="/drink/DrinkEntry">
      </cell>
      <cell is-link title="" value='' @click.native="$util.openInPc()">
        <span class="gray" slot="title">存酒用户管理(请在PC端查看)</span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  export default {
    name: "drink",
    components: {
      Cell,
      Group,
      XSwitch
    },
    data () {
      return {
        status: 2,
      }
    },
    created () {
      this.getDrink()
    },
    methods: {
      onClick (newVal) {
        this.drinkUpdate()
      },
//      获取订台开关
      getDrink () {
        this.$api.getBarConfigs(this.$barId,'bar_keep_wine').then((data) => {
          this.status = data[0].status
          this.id = data[0].id
        })
      },
//      修改订台开关
      drinkUpdate () {
        let status = this.status === 1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_keep_wine',
          'cfg_type': 1
        }
        this.$api.updateModule(this.id, data).then((res) => {
          this.status = status
        })
      }
    }
  }
</script>

<style scoped>

</style>
