<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    :pullUpLoad="true"
    @pullingDown="getComsumption(true)"
    @pullingUp="getComsumption"
    @reLoadData="getComsumption">
    <group v-for="(item,key) in list" :key="item.id">
      <cell :title="item.info" :inline-desc="item.created_at">
        <img slot="icon" :src="item.info_image" class="icon">
        <span :class="item.amount>=0?'my-green':'my-del'">{{item.amount}}</span>
      </cell>
    </group>
  </scroll>
</template>

<script>
  import {
    Cell,
    Group
  } from "vux"
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'

  export default {
    name: "UserComsumptionNoKeep",
    data () {
      return {
        user: null
      }
    },
    components: {
      Cell,
      Group,
      Scroll
    },
    mixins: [LoadStutusMixin],
    created () {
      this.user = this.$route.params
      this.getComsumption()
    },
    methods: {
      getComsumption (isRefresh) {
        if (isRefresh){
          this.page = 1
        }
        this.onloadStart()
        this.$api.getComsumption(this.user.id, this.$barId, this.page)
          .then(data => {
            let list = []
            for (let item of data) {
              list.push(item.data)
            }
            if (this.page === 1) {
              this.list = list
              this.page++
            } else if (list.length > 0) {
              // 如果有新数据
              this.list = this.list.concat(list)
              this.page++
            } else {
              this.$refs.scroll.forceUpdate()
            }
            this.onLoadSuccess()
          })
          .catch(err => {
            this.onLoadError()
          })
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 8vw;
    height: 8vw;
    margin-right: 2vw;
    display: block;
  }
</style>
