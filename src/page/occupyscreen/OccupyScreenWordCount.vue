<template>
  <div>
    <group>
      <cell title="霸屏字数" :inline-desc="'调整为: '+currentCount+'个'" primary="content">
        <range v-model="currentCount" :min=30 :max=60></range>
      </cell>
    </group>
    <my-foot v-on:increment="saveSetting"></my-foot>
  </div>
</template>

<script>
  import {Range, Group, Cell} from 'vux'
  import MyFoot from '@/components/MyFoot'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name: "occupy-screen-word-count",
    components: {
      Range,
      Group,
      Cell,
      MyFoot
    },
    mixins: [BarChangeMixin],
    data(){
      return {
        wordCountId:'',
        count:30,
        currentCount:30
      }
    },
    created(){
      this.getWordCount()
    },
    methods:{
      saveSetting (e) {
        if (e) {
          let data = {
            'bar_id': this.$barId,
            'cfg_modules_name': 'bar_bpword',
            'cfg_type': 1,
            'cfg_value': this.currentCount+''
          }
          this.$api.updateModule(this.wordCountId, data).then((res) => {
            this.count = this.currentCount
            this.$router.back()
          })
        }else {
          this.$router.back()
        }
      },
      getWordCount () {
        this.$api.getBarConfigs(this.$barId,'bar_bpword').then((data) => {
          this.wordCountId = data[0].id
          this.count = this.currentCount = ~~data[0].cfg_value
        })
      },
      onBarChange () {
        this.getWordCount()
      },
    },
    activated(){
      this.currentCount = this.count
    }
  }
</script>

<style scoped>

</style>
