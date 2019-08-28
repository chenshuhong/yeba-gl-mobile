<template>
  <div>
    <popup v-model="showPopup" position="top" :show-mask="false">
      <div class="gl-popuptop">
        {{message}}
      </div>
    </popup>
  </div>

</template>

<script>
  import { Popup } from 'vux'

  export default {
    components: {
      Popup
    },
    props: ['message','show'],
    data(){
        return{
          showPopup:this.show
        }
    },
    created(){
    },
    watch:{
      show(newVal){
        this.showPopup = newVal
      }
    }
  }

</script>

<style>
  .gl-popuptop {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 2vw;
  }
</style>
