<template>
  <div>
    <group>
      <x-input
        v-model="name"
        title="酒水名称"
        placeholder="请输入活动名称"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="type"
        title="酒水类别"
        placeholder="请输入类别，如洋酒"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        v-model="spec"
        title="酒水规格"
        placeholder="请输入规格，如瓶"
        placeholder-align="right"
        text-align="right"></x-input>
      <my-input
        v-model="unit_price"
        title="酒水单价（元）"
        placeholder-align="right"
        text-align="right"></my-input>
      <my-input
        v-model="store_term"
        title="存酒有效期（天）"
        placeholder-align="right"
        text-align="right"></my-input>
    </group>
    <MyFoot v-on:increment="FootBtn"></MyFoot>
  </div>
</template>

<script>
  import {
    Group,
    XInput,
    Cell
  } from "vux"
  import MyFoot from '@/components/MyFoot'
  import MyInput from '@/components/MyInput'

  let params
  export default {
    name: "DrinkAddNoKeep",
    components: {
      Group,
      XInput,
      Cell,
      MyFoot,
      MyInput
    },
    data () {
      return {
        name: '',
        type: '',
        spec: '',
        unit_price: '',
        store_term: ''
      }
    },
    created () {
      params = this.$route.params
      if (params.id) {
        this.name = params.name
        this.type = params.type
        this.spec = params.spec
        this.unit_price = params.unit_price
        this.store_term = params.store_term
      }
    },
    methods: {
      FootBtn (e) {
        if (e) {
          if (this.$util.judgeValue(this.name, '请输入酒水名称')) {
            return
          }
          if (this.$util.judgeValue(this.type, '请输入酒水类别')) {
            return
          }
          if (this.$util.judgeValue(this.spec, '请输入酒水规格')) {
            return
          }
          if (this.$util.judgeValue(this.unit_price, '请输入酒水单价')) {
            return
          }
          if (this.$util.judgeValue(this.store_term, '请输入存酒有效期')) {
            return
          }
          let data = {
            name: this.name,
            type: this.type,
            spec: this.spec,
            unit_price: this.unit_price,
            store_term: this.store_term,
            bar_id: this.$barId
          }
          if (params.id) {
            this.$api.editDrink(params.id, data).then(item => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'drinkEdit',
                data: item
              })
              this.$router.back()
            });
          } else {

            this.$api.addDrink(data).then(item => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'drinkAdd',
                data: item
              })
              this.$router.back()
            });
          }
        } else {
          this.$router.back()
        }
      }
    }
  }
</script>

<style scoped>

</style>
