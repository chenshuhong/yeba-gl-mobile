<template>

  <div class="DatrRule">

    <group>
      <x-input class="my-long-label" type="number" v-model="value1" title="比赛时间(分钟) " placeholder="20" novalidate  :show-clear="false"  placeholder-align="left"></x-input>
      <x-input class="my-long-label" type="number" v-model="value2" title="比赛费用(Y币/人)" placeholder="200" novalidate  :show-clear="false"  placeholder-align="left"></x-input>
    </group>

   <MyFoot v-on:increment="FootBtn"></MyFoot>

  </div>

</template>

<script>
import {Group, XInput, XButton } from "vux";
import MyFoot from "../../components/MyFoot.vue";
export default {
  components: {
    Group,
    XInput
  },
  data() {
    return {
      value1: "",
      value2: ""
    };
  },
  methods: {
    getDice() {
      this.$api.getDiceRule(this.$barId).then(data => {
        let time = data.game_time;
        this.value1 = time / 60;
        this.value2 = data.need_yb;
      });
    },
    FootBtn(e) {
      let that = this;
      if (e) {
        // true保存
        let need_yb=this.value2;
        let time=this.value1*60;
        let data ={
          'bar_id':this.$barId,
          'need_yb':need_yb,
          'game_time':time
        }
        this.$api.setDiceRule(data).then(res => {
          console.log(res.data);
        })

      } else {
        // false返回
        that.$router.back()
      }
    }
  },
  created() {
    this.getDice();
  }
};
</script>

<style>

</style>
