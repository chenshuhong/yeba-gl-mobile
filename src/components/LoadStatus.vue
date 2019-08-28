<template>
  <div class="csh-status" @click="reLoad">
    <img src="../assets/load_status.png"/>
    <br/>
    <span>{{loadStatus.desc}}</span>
  </div>
</template>

<script>
  export default {
    name: 'LoadStatus',
    data () {
      return {}
    },
    props: {
      loadStatus: {
        type: Object,
        default () {
          return {
            type: 0,
            desc: '正在加载'
          }
        }
      },
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      reLoad () {
        if (this.loadStatus.type !== 0) {
          this.$emit('reLoadData')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .csh-status{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    text-align: center;
  }
  .csh-status img{
    height:60vw;
    margin-top: 20vw;
    margin-bottom: 8vw;
  }
  .csh-status span{
    color: #929297;
    font-size: 4vw;
  }
</style>
