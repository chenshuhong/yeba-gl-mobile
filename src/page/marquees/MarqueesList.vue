<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getMarqueesList"
    @reLoadData="getMarqueesList">
    <group slot="top">
      <router-link to="/marquees/MarqueesAdd">
        <span class="my-Add">添加新的跑马灯</span>
      </router-link>
    </group>
    <group>
      <cell v-for="(item,key) in list" :title="item.content" :key="item.id">
        <div class="switch-container">
          <span class="my-del" @click="deleteMarQuee(item.id)">删除</span>
          <x-switch title="" :value-map="[2,1]" v-model="item.status" @on-click="onClick(item)"
                    prevent-default></x-switch>
        </div>
      </cell>
    </group>
  </scroll>

</template>

<script>

  import {Cell, Group, XSwitch} from 'vux'
  import Scroll from "@/components/scroll"
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Scroll,
      Cell,
      Group,
      XSwitch
    },
    data () {
      return {
        currentSelect: -1 //当前被选中为背景的id
      }
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created () {
      this.getMarqueesList()
    },
    methods: {
      getMarqueesList () {
        this.onloadStart()
        this.$api.getMarQuee(this.$barId).then((data) => {
          this.list = data
          for (let i in data) {
            let status = data[i].status
            if (status === 1) {
              this.currentSelect = data[i].id
            }
          }
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      deleteMarQuee (id) {
        this.$api.deletMarQuee(id).then((res) => {
          this.$util.remove(this.list, id)
          if (id === this.currentSelect) {
            this.currentSelect = -1
          }
        })
      },
      onClick (item) {
        if (item.status === 1) {
          return
        }
        let status = item.status === 1 ? 2 : 1
        let data = {
          status
        }
        this.$api.updateMarQuee(item.id, data)
          .then(res => {
            item.status = status
            this.$util.change1(this.list, item)
            let that = this
            let index = this.list.findIndex((data) => {
              return data.id === this.currentSelect
            })
            console.log(index)
            if (index >= 0) {
              this.$util.change2(this.list, () => {
                let item = that.list[index]
                item.status = 2
                return {
                  index,
                  item
                }
              })
            }
            this.currentSelect = item.id
          })
      },
      onEventBus (data) {
        if (data.type === 'marqueeAdd') {
          this.list.unshift(data.data)
        }
      },
      onBarChange () {
        this.getMarqueesList()
      }
    }
  }
</script>

<style>

</style>
