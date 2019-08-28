<template>

  <div>
    <group>
      <router-link to="/table/TableAdd">
        <span class="my-Add">添加套餐</span>
      </router-link>
    </group>
    <group v-for="(item,index) in list" :key="item.id">
      <cell :title="item.menu_name">
        <span class="my-del" @click="menuDelete(item.id)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link
          :to="{ name: 'TableAdd', params: item}">
          <span class="my-green">编辑</span>
        </router-link>
      </cell>
      <cell :title="'套餐价:￥'+item.menu_price">
        <img slot="icon" style="display:block;margin-right:5px;" :src="item.menu_image">
        <div slot="inline-desc">
          <span class="my-grey my-description">适合人数：{{item.menu_peple_min}}-{{item.menu_peple_max}}</span>
        </div>
      </cell>
      <cell-form-preview :list="item.cell_preview"></cell-form-preview>
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
      CellFormPreview,
    },
    data () {
      return {
        list: [],
        barinfo: {}
      }
    },
    created () {
      this.menuList()
    },
    methods: {
      getContent (res) {
        let content = ''
        for (var i = 0; i < res.length; i++) {
          let item = res[i]
          content += item.name + 'X' + item.count + item.spec + '、'
        }
        return content.substr(0, content.length - 1)
      },
//      获取套餐列表
      menuList () {
        this.$api.getMenuList(this.$barId).then((data) => {
          for (var i = 0; i < data.length; i++) {
            console.log(i)
            let contents = JSON.parse(data[i].content)
            data[i].contents = contents
            let obj1 = {
              label: '套餐内容',
              value: this.getContent(contents)
            }
            let obj2 = {
              label: '温馨提示',
              value: data[i].menu_tips
            }
            data[i].cell_preview=[obj1,obj2]
          }
          this.list = data
        })
      },
      //    删除套餐
      menuDelete (id) {
        this.$api.deleteMenu(id).then((res) => {

        })
      }
    },

  }
</script>

<style>

</style>
