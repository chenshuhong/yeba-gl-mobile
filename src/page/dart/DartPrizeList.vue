<template>

  <div>

    <group>
      <router-link to="/dart/DartPrizeSet">
        <span class="my-Add" @click.native="showLoading">添加条件</span>
      </router-link>
    </group>

    <group v-for="(item, key) in prizelist" :key="item.id">
      <cell v-if="item.condition==0" key="tip" title="无条件" >
        <span class="my-del" @click="delePrize(item.id)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
       <router-link :to="{name:'DartPrizeSet',params:{yb:item.condition,id:item.id,prize_id:item.prize_id,price:item.prize_price,name:item.prize_name}}">
          <span class="my-green">编辑</span>
        </router-link>
      </cell>
      <cell v-else key="tip" :title="'当押注的Y币总数 >' + item.condition">
        <span class="my-del" @click="delePrize(item.id)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link :to="{name:'DartPrizeSet',params:{yb:item.condition,id:item.id,prize_id:item.prize_id,price:item.prize_price,name:item.prize_name}}">
          <span class="my-green">编辑</span>
        </router-link>
      </cell>
      <cell-form-preview :list="item.list"></cell-form-preview>

    </group>


  </div>

</template>

<script>
import {
  Cell,
  Group,
  CellFormPreview,
} from "vux";
export default {
  components: {
    Cell,
    Group,
    CellFormPreview,
  },
  data() {
    return {
      prizelist: [],
      title: ""
    };
  },
  methods: {
    getDiceprize() {
      let that = this;
      this.$api.getDartPrize(this.barinfo.bar_id).then(data => {
        this.prizelist = [];
        for (let i = 0; i < data.length; i++) {
          let condition = data[i].condition;
          let id = data[i].id;
          let prize_price = data[i].prize_price;
          let prize_name = data[i].prize_name;
          let prize_id = data[i].prize_id;
          let list = [
            {
              label: "奖&nbsp;品",
              value: prize_name
            }
          ];

          let arr = { condition, id, prize_id, prize_name, prize_price, list };
          that.prizelist.push(arr);
        }
      });
    },
    delePrize(id) {
      let data = {
        game_type: 2
      };
      this.$api.deleteDartPrize(this.barinfo.bar_id, id, data).then(res => {

      })
    }
  },
  created() {
    this.barinfo = this.$store.state.currentBar
    this.getDiceprize();
  }
};
</script>

<style scoped>

</style>
