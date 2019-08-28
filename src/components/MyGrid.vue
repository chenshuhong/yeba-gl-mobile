<template>
	<div class="my-grid">

		<!--<group-title>功能与设置</group-title>-->
		<grid :cols="4">
      <grid-item label="点单" :link="$config.YZG" v-if="showTable">
        <img slot="icon" src="../assets/home_table_icon.png">
      </grid-item>
			<grid-item label="播报" link="/broadcast">
				<img slot="icon" src="../assets/home_zf_icon.png">
			</grid-item>
			<grid-item label="票选" link="/goddess/GoddessUse">
				<img slot="icon" src="../assets/home_px_icon.png">
			</grid-item>
			<grid-item label="夜聘" link='/nighthire/NightHireUse'>
				<img slot="icon" src="../assets/home_yp_icon.png">
			</grid-item>
			<grid-item label="酒水牌" link="/goods/GoodsUse">
				<img slot="icon" src="../assets/home_js_icon.png">
			</grid-item>
			<grid-item label="活动" link="/activity/ActivityList">
				<img slot="icon" src="../assets/home_hds_icon.png">
			</grid-item>
			<grid-item label="消息" link="/msg/MsgList">
				<img slot="icon" src="../assets/home_xx_icon.png">
			</grid-item>
			<grid-item label="投票" link="/vote/Vote">
				<img slot="icon" src="../assets/home_tp_icon.png">
			</grid-item>
      <grid-item label="存酒" link="/drink/Drink">
        <img slot="icon" src="../assets/home_drink_icon.png">
      </grid-item>
      <grid-item label="点舞" link="/dance/Dance">
        <img slot="icon" src="../assets/home_dance_icon.png">
      </grid-item>
      <grid-item label="点歌" link="/song/Song">
        <img slot="icon" src="../assets/home_song_icon.png">
      </grid-item>
		</grid>
	</div>
</template>

<script>
	import { Grid, GridItem } from 'vux'
  import BarChangeMixin from '@/js/mixin/barChange'
	export default {
		components: {
			Grid,
			GridItem
		},
    mixins: [BarChangeMixin],
    data(){
		  return {
        showTable:false
      }
    },
    created(){
      this.getTable()
    },
    methods:{
      getTable(){
        this.$api.getAdminRole(this.$barId,this.$store.state.userInfo.id)
          .then((data)=>{
            let auth = data.role.role_auth_route
            this.showTable = (auth.indexOf('tablePay')>0)
          })
      },
      onBarChange () {
        this.showTable = false
        this.getTable()
      },
    }
	}
</script>

<style lang="scss">
	div.my-grid {
    margin: 1rem 1rem 0rem 1rem;
		.weui-grid{
			&:before,
			&:after {
				border: none;
			}
			padding: .6rem;
		}
		.weui-grids {
			background: #fff;
      border-radius: 1vw;
      &:after{
        border: none;
      }
      &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #D9D9D9;
        border-radius: 2vw;
        transform: scale(0.5);
        transform-origin: 0 0;
        width: 200%;
        height: 199%;
        box-sizing: border-box;
      }
    }
		.weui-grid__icon {
			width: 2.94rem!important;
			height: 2.94rem!important;
		}
		.weui-grid__label span{
			font-size: .8rem;
		}
	}

</style>
