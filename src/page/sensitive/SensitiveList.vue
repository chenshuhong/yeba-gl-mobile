<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getSensitiveList"
    @reLoadData="getSensitiveList">
    <group slot="top">
      <x-input placeholder="请输入敏感词" v-model="content">
        <span slot="right" class="my-green add-margin-left" @click="addSensitive">添加</span>
      </x-input>
    </group>
    <group title="已设置的敏感词">
      <cell v-for="(item,key) in list" :title="item" :key="key">
        <span slot class="my-del" @click="deleteSensitive(key)">删除</span>
      </cell>
    </group>
  </scroll>

</template>

<script>
  import {Cell, Group, XInput} from 'vux'
  import Scroll from "@/components/scroll"
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      Scroll,
      XInput
    },
    created () {
      this.getSensitiveList()
    },
    mixins: [LoadStatusMixin, BarChangeMixin],
    methods: {
      getSensitiveList () {
        this.onloadStart()
        this.$api.getSensitive(this.$barId).then((data) => {
          this.list = data.content
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      deleteSensitive (key) {
        this.updateSensitiveList(key)
      },
      updateSensitiveList (key) {
        let content = this.list.slice(0)
        content.splice(key, 1)
        let data = {
          'bar_id': this.$barId,
          content
        }
        this.$api.updataSensitive(data, 'DELETE').then((data) => {
          this.list = JSON.parse(data.content)
          this.content = ''
        })
      },
      onBarChange () {
        this.getSensitiveList()
      },
      addSensitive () {
        if (this.$util.judgeValue(this.content,'请输入敏感词')){
          return
        }
        let content = this.list.slice(0)
        content.push(this.content)
        let data = {
          'bar_id': this.$barId,
          'content': content
        }
        this.$api.updataSensitive(data).then((res) => {
          this.content = ''
          this.list = content
        })
      }
    },
    data () {
      return {
        content: ''
      }
    }
  }
</script>
