<template>

  <div >

    <group>
      <x-input title="*添加姓名" placeholder="输入营销人员姓名" novalidate :show-clear="true" placeholder-align="left"
               v-model="marketer_name"></x-input>
      <x-input title="*手机号 " placeholder="输入手机号" novalidate :show-clear="true" placeholder-align="left"
               v-model="mobile"></x-input>
      <x-input title="*夜吧号 " placeholder="输入夜吧号" novalidate :show-clear="true" placeholder-align="left"
               v-model="user_id"></x-input>
    </group>

    <MyFoot v-on:increment="marketerAdd"></MyFoot>

  </div>

</template>

<script>
  import { Group,XInput} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'

  export default {
    name: 'MarketerAddNoKeep',
    components: {
      Group,
      XInput,
      MyFoot,
    },
    data () {
      return {
        user_id: '',
        marketer_name: '',
        mobile: ''
      }
    },
    created () {
//      存在user_id,说明是修改
      let params = this.$route.params
      if (params.id) {
        this.user_id = params.user_id
        this.marketer_name = params.marketer_name
        this.mobile = params.mobile
      }
    },
    methods: {
      marketerAdd (e) {
        if (e) {
          let data = {
            'bar_id': this.$barId,
            'user_id': this.user_id,
            'marketer_name': this.marketer_name,
            'mobile': this.mobile
          }
//          编辑
          if (this.$route.params.id) {
            this.$api.updateMarketer(this.$barId, this.$route.params.id, data).then((res) => {
              this.$router.back()
            })
          } else {
//            添加
            this.$api.addMarketer(data).then((res) => {
              this.$router.back()
            })
          }
        } else {
          this.$router.back()
        }
      }
    },

  }
</script>

<style>


</style>
