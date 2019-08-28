<template>

  <div>
    <group>
      <router-link to="/marketer/MarketerAdd">
        <span class="my-Add">添加营销人员</span>
      </router-link>
    </group>
    <group>
      <group v-for="(item,key) in list" :key="item.id">
        <cell :title="item.marketer_name">
          <span class="my-del" @click="marketerDelete(item.id)">删除</span>
          <router-link
            :to="{ name: 'MarketerAdd', params: item}">
            <span class="my-green">编辑</span>
          </router-link>

        </cell>
        <cell-form-preview :list="item">
        </cell-form-preview>
      </group>
    </group>

  </div>

</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview,
  } from 'vux'

  export default {
    components: {
      Cell,
      Group,
      CellFormPreview
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      this.marketerList()
    },
    methods: {
//      获取营销人员列表
      marketerList () {
        this.$api.getMarketerList(this.$barId).then((data) => {
          this.list = []
          for (let i = 0; i < data.length; i++) {
            let obj1 = {
              label: '手机号',
              value: data[i].mobile
            }
            let obj2 = {
              label: '夜吧号',
              value: data[i].user_id
            }
            let objArr = [obj1, obj2]
            Object.assign(objArr,data[i])
            this.list.push(objArr)
          }
        })
      },
//      删除营销人员
      marketerDelete (id) {
        this.$api.deleteMarketer(id).then((res) => {
          this.$util.remove(this.list,id)
        })
      }
    },

  }
</script>

<style>

</style>
