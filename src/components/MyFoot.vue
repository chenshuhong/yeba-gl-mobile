<template>
  <div class="fixed-bottom gl-foot">
    <div v-on:click="next" class="save" v-if="isNext">下一步</div>
    <template v-else>
      <div v-on:click="cancel" class="cancle">取消</div>
      <div v-on:click="save" class="save">保存</div>
    </template>
  </div>
</template>
<script>
  export default{
    props: {
      isNext: {
        type: Boolean,
        default:false
      }
    },
    methods:{
      save(){
        this.$emit('increment',true)
      },
      cancel(){
        this.$emit('increment',false)
      },
      next(){
        this.$emit('next')
      }
    }
  }

</script>

<style lang="scss">
  $green-color:#00BC00;
  $cancle-color:#fff;

  @mixin footer{
    flex-grow: 1;
    text-align: center;
    line-height:12vw;
    position: relative;
  }

  .gl-foot{
    display: flex;
    width: 100%;
    background: #fff;
    &:after{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 12vw;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 0 top;
      transform: scaleY(0.5);
      z-index: -1;
    }
    .cancle{
      background: $cancle-color;
      @include footer;
    }
    .save{
      color:#fff ;
      @include footer;
      background:$green-color;
    }
  }

  .cancle:active:after,.save:active:after {
    content:"";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color:rgba(0,0,0,0.1);
  }
</style>
