<template>

  <div class="DartPrizeSet">

    <group>
      <x-input type="number" class="my-long-label" v-model="yb" title="当押注的所有Y币数大于" text-align="right" placeholder="请输入Y币个数" novalidate  :show-clear="false"  placeholder-align="right"></x-input>
      <popup-picker title="选择奖品" show-name :data="list1" v-model="value1" placeholder="请选择奖品"></popup-picker>
    </group>

    <MyFoot v-on:increment="FootBtn"></MyFoot>


  </div>

</template>

<script>
import {
  Group,
  XInput,
  PopupPicker,
} from "vux";
import MyFoot from "../../components/MyFoot.vue";
export default {
  components: {
    Group,
    XInput,
    PopupPicker,
    MyFoot
  },
  data() {
    return {
      barinfor:{},
      yb: "",
      value1: [],
      list1: [],
      name: ""
    };
  },
  methods: {
    getprize() {
      let that = this;
      let prizelist = [];
      this.$api.getPrizes(this.barinfo.bar_id).then(data => {
        for (let i = 0; i < data.length; i++) {
          let prize = data[i].prize_name;
          let price = data[i].prize_price;
          let arr = {
            name: prize + "（￥" + price + "）",
            value: data[i].id + ""
          };
          prizelist.push(arr);
        }
        that.list1.push(prizelist);
        console.log(prizelist)
      });
    },
    FootBtn(e) {
      let that = this;
      if (e) {
        let params = this.$route.params;
        let data = {
            prize_id: parseInt(this.value1[0]),
            condition: this.yb,
            status:1,
            game_type:2
          };
        if (Object.keys(params).length == 0) { //添加
          this.$api.addDartPrize(this.$barId,data).then(res=>{
            that.$router.back()
          })
        }else{   //修改
          let id = params.id;
          this.$api.editDartPrize(this.$barId,id,data).then(res=>{
            that.$router.back()
          })
        }
      } else {
        // false返回
        that.$router.back()
      }
    }
  },
  created() {
    this.barinfo = this.$store.state.currentBar
    this.getprize();
    let params = this.$route.params;
    if (Object.keys(params).length != 0) {
      this.yb = params.yb;
      this.value1[0] = params.prize_id + '';
      console.log(this.yb,this.value1)
    }
  }
};
</script>

<style>

</style>
