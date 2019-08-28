<template>

  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getOccupyVideoList"
    @reLoadData="getOccupyVideoList">
    <group slot="top">
      <router-link to="/occupyvideo/OccupyVideoAdd">
        <span class="my-Add">自定义套餐</span>
      </router-link>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="'霸屏套餐'+(key+1)">
        <div class="switch-container">
          <x-switch title="" :value-map="[1,0]" v-model="item.status"
                    @on-click="onChange(item)" prevent-default></x-switch>
          <span class="my-del" @click="deleteOccupy(item.id)">删除</span>
          <router-link
            :to="{ name: 'OccupyVideoAdd', params: item}">
            <span class="my-green add-margin-left">编辑</span>
          </router-link>
        </div>
      </cell>
      <cell-form-preview :list="item">
      </cell-form-preview>
    </group>
  </scroll>

</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview,
    XSwitch
  } from 'vux'
  import Scroll from '@/components/scroll'
  import EventBusMixin from '@/js/mixin/eventBus'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {

    components: {
      Cell,
      Group,
      CellFormPreview,
      Scroll,
      XSwitch
    },
    created () {
      this.getOccupyVideoList()
    },
    mixins: [EventBusMixin, LoadStatusMixin, BarChangeMixin],
    methods: {
      changeData (data) {
        let obj1 = {
          label: '播放次数',
          value: data.play_count
        }
        let obj2 = {
          label: '套餐价格',
          value: data.price
        }
        let objArr = [obj1, obj2]
        if (data.remark) {
          objArr.push({
            label: '备注',
            value: data.remark
          })
        }
        Object.assign(objArr, data)
        return objArr
      },
      //      获取列表
      getOccupyVideoList () {
        this.onloadStart()
        this.$api.getOccupyVideo(this.$barId).then((data) => {
          let list = []
          let batchData = []
          for (let item of data) {
            item = item.data
            if(item.bar_id === 0){
              batchData.push({
                method:'post',
                url:`occupyscreen/packages?_include=theme`,
                data:{
                  play_count: item.play_count,
                  price:item.price,
                  remark:item.remark,
                  type:2,
                  bar_id:this.$barId,
                  status:item.status
                }
              })
            }
            if (item.status !== 2) {
              list.push(item)
            }
          }
          if (batchData.length>0) {
            return this.$api.batch(batchData)
          } else {
            return Promise.resolve(list)
          }
        }).then(data=>{
          for (let i=0;i<data.length;i++){
            data[i] = this.changeData(data[i])
          }
          this.list = data
          this.onLoadSuccess()
        })
          .catch(err => {
          this.onLoadError()
        })
      },
      //      根据id删除霸屏套餐
      deleteOccupy (occupyscreen_package_id) {
        this.$api.deleteOccupyImg(occupyscreen_package_id).then((res) => {
          this.$util.remove(this.list, occupyscreen_package_id)
        })
      },
      onEventBus (data) {
        if (data.type === 'occupyVideoEdit') {
          this.$util.change1(this.list, this.changeData(data.data))
        } else if (data.type === 'occupyVideoAdd') (
          this.list.unshift(this.changeData(data.data))
        )
      },
      onBarChange () {
        this.getOccupyVideoList()
      },
      onChange(item){
        let status = item.status === 0?1:0
        let data = {
          status
        }
        this.$api.updateOccupyScreen(item.id, data).then((item) => {
          this.$util.change1(this.list, this.changeData(item))
        })
      }
    },
    data () {
      return {}
    }
  }
</script>

<style>


</style>
