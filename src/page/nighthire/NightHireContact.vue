<template>

  <div>

    <group>
      <my-input placeholder="请输入夜吧ID" v-model="user_id">
        <span slot="right" class="my-green add-margin-left" @click="addHr">{{list.length>0?"修改":"添加"}}</span>
      </my-input>
    </group>

    <group v-if="list.length>0">
      <cell-form-preview :list="list"></cell-form-preview>
    </group>

  </div>

</template>

<script>
  import { Group, CellFormPreview } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import BarChangeMixin from '@/js/mixin/barChange'
  import MyInput from '@/components/MyInput'
  export default {
    components: {
      Group,
      MyInput,
      MyFoot,
      CellFormPreview,
    },
    mixins:[BarChangeMixin],
    data () {
      return {
        user_id: '',
        list: []
      }
    },
    created () {
      this.getBarHrList()
    },
    methods: {
      //获取酒吧的夜聘联系人
      getBarHrList () {
        this.$api.getBarHr(this.$barId).then((data) => {
          this.setHr(data)
        })
      },
      //修改酒吧夜聘联系人
      addHr () {
        if (this.$util.judgeValue(this.user_id,'请输入用户id')){
          return
        }
        let data = {
          'bar_id': this.$barId,
          'user_id': this.user_id
        }
        this.$api.updateBarHr(data).then((data) => {
          this.user_id = ''
          this.setHr(data)
        })
      },
      setHr(data){
        if (data.length===0)
          return
        let obj1 = {
          label: '夜吧ID',
          value: data.user_id
        }
        let obj2 = {
          label: '昵称',
          value: data.user.nickname
        }
        this.list = [obj1, obj2]
      }
    },
    onBarChange(){
      this.getBarHrList()
    }
  }
</script>

<style>


</style>
