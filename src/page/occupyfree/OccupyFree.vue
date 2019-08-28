<template>
  <div>
    <group>
      <x-switch title="所有用户都可以免费发图"  v-model="isAll" @on-click="onClick(1,isAll)" prevent-default></x-switch>
      <x-switch title="只有管理员才可以发图"  v-model="isAdmin" @on-click="onClick(2,isAdmin)" prevent-default></x-switch>
      <x-switch title="不可以免费发图"  v-model="isNoBody" @on-click="onClick(3,isNoBody)" prevent-default></x-switch>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    XSwitch
  } from "vux"
  export default {
    name: "OccupyFree",
    data() {
      return {
        isAll:false,
        isAdmin:false,
        isNoBody:false,
      }
    },
    created(){
      let type = this.$store.state.currentBar.publish_pic_type
      this.isAll = type === 1
      this.isAdmin = type === 2
      this.isNoBody = type === 3
    },
    components: {
      XSwitch,
      Group
    },
    computed: {
      status(){
        return this.$store.state.currentBar.publish_pic_type
      }
    },
    watch:{
      status(newVal){
        let type = newVal
        this.isAll = type === 1
        this.isAdmin = type === 2
        this.isNoBody = type === 3
      }
    },
    methods:{
      onClick(type,newVal){
        console.log(type,newVal)
        if (!newVal){
          let data = {
            'publish_pic_type':type
          }
          this.$api.changeBarInfo(this.$barId,data)
            .then(data=>{
              this.$store.commit(this.$config.STORAGE.BAR_INFO,data)
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
