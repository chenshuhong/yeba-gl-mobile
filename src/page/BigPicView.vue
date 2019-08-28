<template>
  <previewer :list="list" ref="previewer" @on-close="close"></previewer>
</template>

<script>
  import {Previewer} from 'vux'
  export default {
    name: "BigPicViewNoKeep",
    components: {
      Previewer
    },
    data () {
      return {
        list: [],
        index: 0
      }
    },
    created(){
      let urls = this.$route.params.urls
      let url =this.$route.params.url
      let list = []
      for (let i=0;i<urls.length;i++){
        list.push({
          src:urls[i]
        })
        if (url === urls[i]){
          this.index = i
        }
      }
      this.list = list
      this.show()
    },
    methods: {
      show(){
        this.$nextTick(()=>{
          this.$refs.previewer.show(this.index)
        })
      },
      close(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
