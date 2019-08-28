<template>

  <div>
    <group label-width="60vw">
        <x-switch :title="$util.switchSuffix('霸屏开关',occupyValue === 2)" :value-map="[2,1]" :value="occupyValue" @on-click="onOccupyChange" prevent-default></x-switch>
        <x-switch :title="$util.switchSuffix('位置限制',locationValue === 1)" :value-map="[1,2]" :value="locationValue" @on-click="onLocationChange" prevent-default></x-switch>
        <x-switch :title="$util.switchSuffix('幻灯片排行榜',rankValue === 2)" :value-map="[2,1]" :value="rankValue" @on-click="onRankChange" prevent-default></x-switch>
        <x-switch :title="$util.switchSuffix('体验霸屏',freeOccupyScreenStatus === 2)" :value-map="[2,1]" :value="freeOccupyScreenStatus" @on-click="onFreeOccupyScreenChange" prevent-default></x-switch>
    </group>

    <group>
      <cell is-link title="聊天室功能开关" value=''link="/chatroom/ChatroomSwitch"></cell>
      <cell is-link title="走马灯设置" value='' link="/marquees/MarqueesList"></cell>
      <cell is-link title="聊天背景设置" value='' link="/chatroombg/ChatroomBg"></cell>
      <cell is-link title="二维码设置" value=''link="/qrcode/Qrcode"></cell>
    </group>

    <group>
      <cell is-link title="图片霸屏套餐设置" value='' link="/occupyimg/OccupyImgList"></cell>
      <cell is-link title="视频霸屏套餐设置" value='' link="/occupyvideo/OccupyVideoList"></cell>
      <cell is-link title="礼物价格设置" value='' link="/gift/GiftSet"></cell>
      <cell is-link title="敏感词设置" value='' link="/sensitive/SensitiveList"></cell>
    </group>

    <group>
      <cell is-link title="红包分成设置" value='' link="/redpack/RedpackSet"></cell>
      <cell is-link title="组件设置" value='' link="/ComponentSetting"></cell>
      <cell is-link title="霸屏分享设置" value='' link="/occupyshare/OccupyShare"></cell>
      <cell is-link title="免费发图功能设置" value='' link="/occupyfree/OccupyFree"></cell>
      <cell is-link title="霸屏字数设置" value='' link="/OccupyScreenWordCount"></cell>
    </group>

    <group></group>

  </div>

</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    components: {
      Cell,
      Group,
      XSwitch
    },
    created(){
      this.getFreeOccupyScreen()
    },
    mixins: [BarChangeMixin],
    methods: {
      onOccupyChange(){
        let status = this.occupyValue ===1 ? 2:1
        this.changeStatus('is_occupyscreening',status)
      },
      onLocationChange(){
        let status = this.locationValue ===1 ? 2:1
        this.changeStatus('is_region_restriction',status)
      },
      onRankChange(){
        let status = this.rankValue ===1 ? 2:1
        this.changeStatus('bar_ranking_banner',status)
      },
      getFreeOccupyScreen () {
        this.$api.getBarConfigs(this.$barId,'bar_occupyscreen_free_taste').then((data) => {
          this.freeOccupyScreenStatus = data[0].status
          this.freeOccupyScreenId = data[0].id
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
      onFreeOccupyScreenChange(){
        let status = this.freeOccupyScreenStatus ===1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          status,
          'cfg_modules_name': 'bar_occupyscreen_free_taste',
          'cfg_type': 1
        }
        this.$api.updateModule(this.freeOccupyScreenId, data).then((res) => {
          this.freeOccupyScreenStatus = status
        })
      },
      onBarChange () {
        this.getFreeOccupyScreen()
      },
    },
    data () {
      return {
        freeOccupyScreenStatus: 2,
        freeOccupyScreenId: '',
      }
    },
    computed:{
      occupyValue(){
        return this.$store.state.currentBar.is_occupyscreening
      },
      locationValue(){
        return this.$store.state.currentBar.is_region_restriction
      },
      rankValue(){
        return this.$store.state.currentBar.bar_ranking_banner
      }
    }
  }
</script>

<style>

</style>
