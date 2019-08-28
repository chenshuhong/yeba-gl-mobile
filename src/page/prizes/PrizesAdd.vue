<template>

  <div >

    <group>
      <x-switch :title="'显示'" :value-map="[2, 1]" v-model="value"></x-switch>
      <x-input title="奖品名称" v-model="name" placeholder="请输入奖品名称" placeholder-align="right" text-align="right"></x-input>
      <x-input title="售价（元）" type="number" v-model="price" placeholder="请输入售价" placeholder-align="right" text-align="right"></x-input>
      <cell title="奖品图片">
        <load-img :url="img" class="gl-photo" slot="icon" v-if="img"></load-img>
        <my-photo v-on:uploadSuccess="addPrizeImg" upload-type="prize" v-if="img">
          <span class="my-green" >修改图片</span>
        </my-photo>
        <my-photo v-on:uploadSuccess="addPrizeImg" upload-type="prize" v-else>
          <span class="my-green" >添加图片</span>
        </my-photo>
      </cell>
    </group>

    <MyFoot v-on:increment="FootBtn"></MyFoot>
  </div>

</template>

<script>
import {
  Cell,
  Group,
  XSwitch,
  XInput
} from "vux"
import MyPhoto from '../../components/MyPhoto.vue'
import MyFoot from "../../components/MyFoot"
import LoadImg from '../../components/LoadImg.vue'
let params
export default {
  name:'PrizesAddNoKeep',
  components: {
    Cell,
    Group,
    XSwitch,
    XInput,
    MyFoot,
    MyPhoto,
    LoadImg
  },
  data() {
    return {
      value:1,
      img:'',
      name:'',
      price:''
    };
  },
  methods: {
    addPrizeImg(key){
      this.img = this.$util.getQiniuUrl(key)
    },
    FootBtn(e) {
      if (e) {
        if (this.$util.judgeValue(this.name, '请输入奖品名称')){
          return
        }
        if (this.$util.judgeValue(this.price, '请输入奖品价格')){
          return
        }
        if (this.$util.judgeValue(this.img,'请上传奖品图片')){
          return
        }
        let data = {
          bar_id: this.$barId,
          prize_name: this.name,
          prize_price: this.price,
          prize_image: this.$util.getQiniuKey(this.img),
          status: this.value
        }
        if (params.id) {
          data.prize_id = params.id
          this.$api.editPrizes(this.$barId, data).then(item => {
            this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
              type:'prizeEdit',
              data:item
            })
            this.$router.back()
          })
        } else {
          this.$api.addPrizes(this.$barId, data).then(item => {
            this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
              type:'prizeAdd',
              data:item
            })
            this.$router.back()
          })
        }
      } else {
        this.$router.back()
      }
    }
  },
  created() {
    params = this.$route.params
    if (params.id){
      this.value = params.status
      this.img = params.prize_image
      this.name = params.prize_name
      this.price = params.prize_price
    }
  }
}
</script>
