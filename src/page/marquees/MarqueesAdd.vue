<template>

  <div>
    <group>
      <x-textarea v-model="content" :max="50" placeholder="输入新的跑马灯"></x-textarea>
    </group>

    <group></group>

    <MyFoot v-on:increment="marQueeAdd"></MyFoot>

  </div>

</template>

<script>
  import { XTextarea, Group} from 'vux'
  import MyFoot from '../../components/MyFoot'

  export default {
    name:'MarqueesAddNoKeep',
    components: {
      XTextarea,
      Group,
      MyFoot
    },
    data () {
      return {
        content: ''
      }
    },
    created () {
    },
    methods: {
      marQueeAdd (e) {
        if (e) {
          if (this.$util.judgeValue(this.content,'请输入内容')){
            return
          }
          let data = {
            'content': this.content
          }
          this.$api.addMarQuee(this.$barId, data).then((item) => {
            this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
              type:'marqueeAdd',
              data:item
            })
            this.$router.back()
          })
        } else {
          this.$router.back()
        }
      },

    }
  }
</script>

<style>


</style>
