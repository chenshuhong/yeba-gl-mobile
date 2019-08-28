<template>

  <div>

    <group>
      <x-input title="分类名称" v-model="name" placeholder="请输入分类名称"  placeholder-align="right"
               label-width="40vw"
               text-align="right"></x-input>
      <my-input title="排序号"
                v-model="sortnum"
                placeholder="请输入排序号"label-width="40vw"
               placeholder-align="right"
               text-align="right"></my-input>
    </group>


    <MyFoot v-on:increment="FootBtn"></MyFoot>

  </div>

</template>

<script>
  import { Group,XInput } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'GoodsCategoryAddNoKeep',
    components: {
      Group,
      XInput,
      MyFoot,
      MyInput
    },
    data () {
      return {
        name:'',
        sortnum:''
      }
    },
    methods: {
       FootBtn(e) {
        if (e) {
          if (this.$util.judgeValue(this.name,'请输入分类名称')){
            return
          }
          if (this.$util.judgeValue(this.sortnum,'请输入排序号')){
            return
          }
          if(params.id){
            let id=params.id
            let data = {
              'name': this.name,
              'sort_number':this.sortnum,
              'bar_id':this.$barId
            }
            this.$api.editGoodsCategory(id,data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'goodCategoryEdit',
                data:item
              })
              this.$router.back()
            })
          }
          else{
            let data = {
              'name': this.name,
              'sort_number':this.sortnum
            }
            this.$api.addGoodsCategory(this.$barId, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'goodCategoryAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          this.$router.back()
        }
      },
    },
    created () {
      params = this.$route.params
      this.name=params.name
      this.sortnum=params.sort_number
    },

  }
</script>

<style>



</style>
