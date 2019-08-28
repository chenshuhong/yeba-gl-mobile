<template>
    <div>
      <group>
        <x-input title="请输入套餐名字" v-model="inputMenuName">
          <x-button slot="right" type="primary" mini>添加</x-button>
        </x-input>
      </group>
      <group v-for="(item,key) in table.contents" :key="key">
        <cell :title="item.name"></cell>
      </group>
    </div>
</template>
<script>
  import { Group, XButton, XInput,Cell} from 'vux'
  export default {
    components: {
      Group,
      XButton,
      XInput,
      Cell
    },
    name: 'TableAddContent',
    data() {
      return {
        inputMenuName:'',
        table:{}
      }
    },
    created(){
      this.table = this.$route.params
    }
  }
</script>
<style scoped>

</style>
