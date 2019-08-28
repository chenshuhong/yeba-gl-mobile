<template>

  <div class="MsgAdd">
    <group>
      <x-textarea :max="100" placeholder="输入新的消息" v-model="value"></x-textarea>
    </group>
    <MyFoot v-on:increment="FootBtn"></MyFoot>


  </div>

</template>

<script>
  import {XTextarea, Group} from 'vux'
  import MyFoot from '../../components/MyFoot'

  let params
  export default {
    components: {
      XTextarea,
      Group,
      MyFoot
    },
    name:'MsgAddNoKeep',
    data() {
      return {
        value: ''
      }
    },
    methods: {
      FootBtn(e) {
        if (e) {
          if (this.$util.judgeValue(this.value,'请输入消息')){
            return
          }
          if (params.id) {
            let id = params.id
            let data = {
              'message': this.value,
            }
            this.$api.editMsg(id, data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'msgEdit',
                data:item
              })
              this.$router.back()
            })
          }
          else {
            let data = {
              'message': this.value,
              'receiver': 'all',
              'extras': {
                'msg_type ': 1,
                'target_id': 1
              },
              'msg_type': 1,
              'bar_id': this.$barId,
              'retry_mode': 2
            }
            this.$api.addMsg(data).then((item) => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'msgAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          // false返回
          this.$router.back()
        }
      }
    },
    created() {
      params = this.$route.params
      this.value = params.message
    }
  }
</script>

<style>


</style>
