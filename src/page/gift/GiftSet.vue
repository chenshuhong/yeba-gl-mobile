<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getGiftList"
    @reLoadData="getGiftList">
    <group v-for="(item,index) in list" :key="item.id">
      <x-switch :title="item.name" :value-map="[1,0]" v-model="item.status" @on-click="onGiftStatusChange(item)"
                prevent-default></x-switch>
      <cell title="价格(Y币)" @click.native="onPrompt(item)" is-link>
        <span>{{item.yb}}</span>
      </cell>
    </group>
  </scroll>

</template>

<script>
  import {Group, XSwitch, Cell} from 'vux'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Group,
      XSwitch,
      Cell,
      Scroll
    },
    data () {
      return {
        show:false
      }
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    created () {
      this.getGiftList()
    },
    methods: {
//    获取礼物列表
      getGiftList () {
        this.onloadStart()
        this.$api.giftsList(this.$barId).then((data) => {
          let list = []
          let batchData = []
          for (let item of data) {
            item = item.data
            if (item.bar_id === 0){
              batchData.push({
                method:'post',
                url:`gifts`,
                data:{
                  name:item.name,
                  animation:this.$util.getQiniuKey(item.animation),
                  image:this.$util.getQiniuKey(item.image),
                  sort_number:item.sort_number,
                  status:item.status,
                  yb:item.yb,
                  bar_id:this.$barId
                }
              })
            }
            list.push(item)
          }
          if (batchData.length>0) {
            return this.$api.batch(batchData)
          } else {
            return Promise.resolve(list)
          }
        }).then(data => {
          this.list = data
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      onGiftStatusChange (item) {
        let status = item.status === 1 ? 0 : 1
        let data = {
          'yb': item.yb,
          'status': status,
          'bar_id': this.$barId
        }
        this.$api.updateGift(item.id, data).then((res) => {
          item.status = status
          this.$util.change1(this.list, item)
        })
      },
      changePrice (item, price) {
        if (this.$util.judgeValue(price, '请输入礼物价格')) {
          return
        }
        let data = {
          'yb': price,
          'status': item.status,
          'bar_id': this.$barId
        }
        this.$api.updateGift(item.id, data).then((res) => {
          item.yb = price
          this.$util.change1(this.list, item)
        })
      },
      onPrompt (item) {
        let that = this
        this.$vux.confirm.setInputValue(item.yb)
        this.$vux.confirm.prompt(`请输入${item.name}价格`, {
          title: `请输入${item.name}价格`,
          inputAttrs: {type: 'number'},
          onConfirm (msg) {
            that.changePrice(item, msg)
          },
          onShow(){
            that.show = true
          },
          onHide(){
            that.show = false
          }
        })
      },
      onBarChange () {
        this.getGiftList()
      }
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if (this.show){
        this.$vux.confirm.hide()
        next(false)
      }else {
        next()
      }
    }
  }
</script>

<style>

</style>
