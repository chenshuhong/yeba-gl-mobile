<template>

  <div>

    <group label-width="60vw">
      <x-switch :title="$util.switchSuffix('分享赠送霸屏',is_open === 1)" :value-map="[1,2]" v-model="is_open" @on-click="onClick"
                prevent-default></x-switch>
    </group>
    <group v-if="is_open === 2">
      <my-input title="分享赠送霸屏时长(秒)"
                v-model="share_len"
                placeholder="请输入"
                placeholder-align="right"
                label-width="50vw"
                text-align="right"></my-input>
      <my-input title="有人扫码进入增加（秒）" v-model="code_come_len"
                placeholder-align="right"
                label-width="65vw"
                placeholder="请输入"
                text-align="right"></my-input>
      <my-input title="引流上限人数（人）" v-model="code_come_limit"
                placeholder-align="right"
                label-width="50vw"
                placeholder="请输入"
                text-align="right"></my-input>
    </group>
    <group class="disc" title="引流说明">

    </group>
    <box gap="0 1rem" class="gray">
      <p>老用户通过分享的二维码吸引到新用户</p>
      <p>进入聊天室时，则该老用户成功引流，</p>
      <p>引入每个新用户都可为老用户获得免费霸屏时间</p>
    </box>
    <my-foot v-on:increment="saveSetting"></my-foot>
  </div>

</template>

<script>
  import {Group, XSwitch, Box} from 'vux'
  import MyInput from '@/components/MyInput'
  import MyFoot from '../../components/MyFoot.vue'

  export default {
    components: {
      Group,
      XSwitch,
      MyInput,
      MyFoot,
      Box
    },
    name: 'OccupyShareNoKeep',
    data () {
      return {
        is_open: 1,
        share_len: 10,
        code_come_len: 2,
        code_come_limit: 5
      }
    },
    created () {
      this.getOccupyShareCongif()
    },
    methods: {
      getOccupyShareCongif () {
        this.$api.getOccupyShareConfig(this.$barId)
          .then(data => {
            if (data) {
              this.is_open = data.is_open
              this.share_len = data.share_len
              this.code_come_len = data.code_come_len
              this.code_come_limit = data.code_come_limit
            }
          })
      },
      onClick () {
        let status = this.is_open === 1 ? 2 : 1
        let data = {
          is_open: status,
          share_len: this.share_len,
          code_come_len: this.code_come_len,
          code_come_limit: this.code_come_limit
        }
        this.$api.occupyShare(this.$barId, data).then((res) => {
          this.is_open = status
        })
      },
      saveSetting (e) {
        if (e) {
          if (this.$util.judgeValue(this.share_len, '请输入分享赠送霸屏时长')) {
            return
          }
          if (this.$util.judgeValue(this.code_come_len, '请输入扫码进入增加秒数')) {
            return
          }
          if (this.$util.judgeValue(this.code_come_limit, '请输入引流上限人数')) {
            return
          }
          let data = {
            share_len: this.share_len,
            code_come_len: this.code_come_len,
            code_come_limit: this.code_come_limit
          }
          this.$api.occupyShare(this.$barId, data).then((res) => {
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      }
    },
  }
</script>
