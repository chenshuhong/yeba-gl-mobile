<template>
  <div>
    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('点歌功能',status === 2)" :value-map="[2,1]" v-model="status" @on-click="onClick" prevent-default></x-switch>
    </group>
    <group v-if="status===1" label-width="70vw">
      <x-switch :title="$util.switchSuffix('自主选歌唱',autoStatus === 1)" :value-map="[1,2]" v-model="autoStatus" @on-click="onAutoClick" prevent-default></x-switch>
      <cell is-link title="①设置点歌时间" @click.native="$util.openInPc()">
        <span class="gray" slot="title">①设置点歌时间(稍后上线)</span>
      </cell>
      <cell is-link title="②设置点歌数量限制" @click.native="$util.openInPc()">
        <span class="gray" slot="title">②设置点歌数量限制(稍后上线)</span>
      </cell>
      <cell is-link title="③点歌分成设置" @click.native="$util.openInPc()">
        <span class="gray" slot="title">③点歌分成设置(稍后上线)</span>
      </cell>
      <cell is-link title="④歌曲设置" @click.native="$util.openInPc()">
        <span class="gray" slot="title">④歌曲设置(稍后上线)</span>
      </cell>
      <cell is-link title="⑤点歌通知接受人设置" @click.native="$util.openInPc()">
        <span class="gray" slot="title">⑤点歌通知接受人设置(稍后上线)</span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Cell, Group, XSwitch } from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name: "song",
    components: {
      Cell,
      Group,
      XSwitch
    },
    mixins: [BarChangeMixin],
    data () {
      return {
        status: 2,
        autoStatus:1,
        id:'',
        configId:''
      }
    },
    created () {
      this.getSong()
    },

    methods: {
      onBarChange () {
        this.status = 2
        this.autoStatus = 1
        this.id = ''
        this.configId = ''
        this.getSong()
      },
      onClick (newVal) {
        this.danceUpdate()
      },
      onAutoClick (newVal){
        this.autoSongUpdate()
      },
//      获取订台开关
      getSong () {
        this.$api.getBarConfigs(this.$barId,'bar_song').then((data) => {
          this.status = data[0].status
          this.configId = data[0].id
        })
        this.$api.getSongConfig(this.$barId).then(data=>{
          this.autoStatus = data.is_me_sing
          this.id = data.id
        })
      },
//      修改订台开关
      danceUpdate () {
        let status = this.status === 1 ? 2:1
        let data = {
          'bar_id': this.$barId,
          'status': status,
          'cfg_modules_name': 'bar_song',
          'cfg_type': 1
        }
        this.$api.updateModule(this.configId, data).then((res) => {
          this.status=status
        })
      },
      autoSongUpdate(){
        let status  = this.autoStatus ===1?2:1
        let data = {
          'is_me_sing':status
        }
        this.$api.updateSongConfig(this.$barId,this.id,data).then(data=>{
          this.autoStatus = status
        })
      }
    }
  }
</script>

<style scoped>

</style>
