<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getTables"
    @reLoadData="getTables">
    <group slot="top">
      <x-input placeholder="请输入台号名称" v-model="searchValue">
        <div slot="right" class="input-right">
          <span @click="search" class="my-green">搜索</span>
          <span class="my-green add-margin-left" @click="showPopupPicker=true">台号筛选</span>
        </div>
      </x-input>
      <popup-picker
        title="当前所属分类"
        popup-title="筛选分类"
        show-name
        :data="conditionGroups"
        v-model="groupValue"
        placeholder="设为"
        :show.sync="showPopupPicker"
        :show-cell="false"
        @on-change="onGroupChange"></popup-picker>
      <popup-picker
        title="当前所属分类"
        show-name
        :data="groups"
        v-model="itemValue"
        :show.sync="itemShowPopupPicker"
        placeholder="设为"
        :show-cell="false"
        @on-change="onChange"></popup-picker>
    </group>
    <group>
      <cell v-for="item in list" :key="item.id" :title="item.table_name" :value="(item.the_default===1)?'内定':'非内定'" @click.native="onCellClick(item)" is-link></cell>
    </group>
  </scroll>
</template>

<script>
  import {Cell, Group, PopupPicker,XInput} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      Scroll,
      PopupPicker,
      XInput
    },
    data () {
      return {
        showPopupPicker:false,
        searchValue:'',
        groupValue: [],
        conditionGroups: [[
          {
            name: '全部',
            value: '0'
          },
          {
            name: '内定',
            value: '1'
          },
          {
            name: '非内定',
            value: '2'
          },
        ]],
        groups: [[
          {
            name: '内定',
            value: '1'
          },
          {
            name: '非内定',
            value: '2'
          },
        ]],
        itemValue: [],
        item:null,
        itemShowPopupPicker:false
      }
    },
    created () {
      this.getTables()
    },
    mixins: [LoadStutusMixin, BarChangeMixin],
    methods: {
      getTables () {
        this.onloadStart()
        this.$api.getTables(this.$barId,this.groupValue,this.searchValue)
          .then(data => {
            this.list = data
            this.onLoadSuccess()
          }).catch(err => {
            console.log(err)
          this.onLoadError()
        })
      }
      ,search(){
        this.list = []
        this.getTables()
      },
      onGroupChange(){
        this.list = []
        this.getTables()
      },
      onCellClick(item){
        this.item = item
        this.itemShowPopupPicker = true
      },
      onChange (value) {
        let data = {
          the_default: ~~value,
          category_id:this.item.category_id
        }
        this.$api.changeTableDefault(this.$barId, this.item.id, data)
          .then(item => {
            this.$util.change1(this.list, item)
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-right {
    display: inline-block;
    margin-left: 1rem;
  }
</style>
