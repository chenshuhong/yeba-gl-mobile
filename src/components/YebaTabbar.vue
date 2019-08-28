<template>

		<tabbar icon-class="item" class="fixed-bottom" v-model="index">
			<tabbar-item  :link="{path:'/Home/Home',replace:true}">
				<img slot="icon" src="../assets/tab_home_normal.png" class="icon">
				<img slot="icon-active" src="../assets/tab_home_select.png" class="icon">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item  :link="{path:'/Home/GameList',replace:true}">
				<img slot="icon" src="../assets/tab_game_normal.png" class="icon">
				<img slot="icon-active" src="../assets/tab_game_select.png" class="icon">
				<span slot="label">游戏</span>
			</tabbar-item>
			<tabbar-item :link="{path:'/Home/BarSet',replace:true}">
				<img slot="icon" src="../assets/tab_set_normal.png" class="icon">
				<img slot="icon-active" src="../assets/tab_set_select.png" class="icon">
				<span slot="label">设置</span>
			</tabbar-item>

		</tabbar>

</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
export default {
  components: {
    index:0,
    Tabbar,
    TabbarItem
  },
  data(){
    return {
      index:0
    }
  },
  created(){
    this.changeIndex()
  },
  activated(){
    this.changeIndex()
  },
  methods:{
    changeIndex(){
      let routeName = this.$route.name
      this.index = ['HomeHome','HomeGameList','HomeBarSet'].findIndex((item)=>{
        return routeName === item
      })
      console.log(this.index)
    }
  }
}
</script>
<style scoped>
  .icon{
    object-fit: contain;
  }
</style>
