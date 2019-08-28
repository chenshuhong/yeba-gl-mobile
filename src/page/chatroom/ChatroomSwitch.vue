<template>
  <group label-width="60vw">
    <x-switch :title="$util.switchSuffix('附近人',nearStatus === 2)" :value-map="[2,1]" :value="nearStatus" @on-click="onNearChange" prevent-default></x-switch>
    <x-switch :title="$util.switchSuffix('排行榜',rankStatus === 2)" :value-map="[2,1]" :value="rankStatus" @on-click="onRankChange" prevent-default></x-switch>
    <x-switch :title="$util.switchSuffix('用户等级展示',levelValue === 1)" :value-map="[1,2]" :value="levelValue" @on-click="onLevelChange" prevent-default></x-switch>
  </group>
</template>

<script>
  import {Group, XSwitch} from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name: "chatroom-switch",
    components: {
      Group,
      XSwitch
    },
    data () {
      return {
        nearStatus: 2,
        nearId: '',
        rankStatus: 2,
        rankId: ''
      }
    },
    mixins: [BarChangeMixin],
    computed:{
      levelValue(){
        return this.$store.state.currentBar.is_level_show
      }
    },
    created () {
      this.getNear()
      this.getRank()
    },
    methods: {
      onLevelChange(){
        let status = this.levelValue === 1 ? 2:1
        this.changeStatus('is_level_show',status)
      },
      onRankChange(){
        this.rankUpdate('',status)
      },
      onNearChange(){
        this.nearUpdate()
      },
      rankUpdate () {
        let status = this.rankStatus ===1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_rank',
          'cfg_type': 1
        }
        this.$api.updateModule(this.rankId, data).then((res) => {
          this.rankStatus = status
        })
      },
      nearUpdate () {
        let status = this.nearStatus ===1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_neighbor',
          'cfg_type': 1
        }
        this.$api.updateModule(this.nearId, data).then((res) => {
          this.nearStatus = status
        })
      },
      changeStatus(type,status){
        let data = {
          [type]:status
        }
        this.$api.changeBarInfo(this.$barId,data).then(data=>{
          this.$store.commit(this.$config.STORAGE.BAR_INFO,data)
        })
      },
      getNear () {
        this.$api.getBarConfigs(this.$barId,'bar_neighbor').then((data) => {
          this.nearStatus = data[0].status
          this.nearId = data[0].id
        })
      },
      getRank () {
        this.$api.getBarConfigs(this.$barId,'bar_rank').then((data) => {
          this.rankStatus = data[0].status
          this.rankId = data[0].id
        })
      },
      onBarChange () {
        this.getNear()
        this.getRank()
      },
    },
  }
</script>

<style scoped>

</style>
