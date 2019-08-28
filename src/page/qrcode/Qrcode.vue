<template>

  <div>

    <group>
      <cell title="小程序二维码">
        <load-img class="gl-photo" slot="icon"
                  :url="'http://api-demo.yeba.im/wxmini/bars/' + bar.id + '/chatroom/qrcode'"></load-img>
        <x-switch title="" v-model="value1" @click.native="onClick(1,value1)" prevent-default></x-switch>
      </cell>
      <cell title="小程序+app二维码">
        <load-img class="gl-photo" slot="icon"
                  :url="'http://pan.baidu.com/share/qrcode?url=http://m.yeba.im/ASQ/index.php/Login/index/barid/'+bar.id"></load-img>
        <x-switch title="" v-model="value2" @click.native="onClick(2,value2)" prevent-default></x-switch>
      </cell>
      <cell title="自定义二维码">
        <load-img class="gl-photo" slot="icon" :url="qr_code_img"></load-img>
        <div class="switch-container">
          <my-photo v-on:uploadSuccess="addCustomQr" upload-type="qr">
            <span class="my-green">修改图片</span>
          </my-photo>
          <x-switch title="" v-model="value3" @click.native="onClick(3,value3)" prevent-default></x-switch>
        </div>
      </cell>
    </group>
  </div>

</template>

<script>
  import {Cell, Group, XSwitch} from 'vux'
  import MyPhoto from '@/components/MyPhoto'
  import LoadImg from '@/components/LoadImg.vue'
  export default {
    components: {
      Cell,
      Group,
      XSwitch,
      MyPhoto,
      LoadImg
    },
    data () {
      return {
        value1: false,
        value2: false,
        value3: false,
        qr_code_img: ''
      }
    },
    methods: {
      onClick (index, value) {
        if (value)
          return
        let data = {
          "qr_code_type": index
        }
        this.$api.changeBarInfo(this.$barId, data).then((data) => {
          this.$store.commit(this.$config.STORAGE.BAR_INFO, data)
        })
      },
      addCustomQr (key) {
        let data = {
          "qr_code_img": key
        }
        this.$api.changeBarInfo(this.$barId, data).then((data) => {
          this.$store.commit(this.$config.STORAGE.BAR_INFO, data)
        })
      }
    },
    created () {
      this.value1 = this.bar.qr_code_type === 1
      this.value2 = this.bar.qr_code_type === 2
      this.value3 = this.bar.qr_code_type === 3
      this.qr_code_img = this.bar.qr_code_img
    },
    computed: {
      bar () {
        return this.$store.state.currentBar
      }
    },
    watch: {
      bar (newVal) {
        console.log(newVal)
        this.value1 = newVal.qr_code_type === 1
        this.value2 = newVal.qr_code_type === 2
        this.value3 = newVal.qr_code_type === 3
        this.qr_code_img = newVal.qr_code_img
      }
    }
  }
</script>

<style scoped>

</style>
