<template>

  <div>

    <group title="活动推广链接">
      <cell :title="value"  placeholder-align="left">
        <span class="my-green"
              v-clipboard:copy="value"
              v-clipboard:success="onCopy">复制链接</span>
      </cell>
    </group>
    <group title="">
      <cell title="活动二维码" is-link>
        <load-img class="gl-photo" :url="img" v-if="img"></load-img>
      </cell>
    </group>
  </div>

</template>

<script>
  import { Cell, Group } from 'vux'
  import LoadImg from '@/components/LoadImg'
  import BarChangeMixin from '@/js/mixin/barChange'
  export default {
    name:'ExtentsionNoKeep',
    components: {
      Cell,
      Group,
      LoadImg
    },
    data () {
      return {
        value: '',
        img:''
      }
    },
    mixins:[BarChangeMixin],
    created () {
      this.getActivity()
    },
    methods: {
      getActivity () {
        let that = this
        this.$api.getLatestGoddessDetail(this.$barId).then((data) => {
          console.log(data)
          if (data){
            this.value = data.goddess_url
            this.getQrcodeImg()
          }else {
            this.$vux.alert.show({
              title: '提示',
              content: '当前无进行中的票选活动',
              onHide () {
                that.$router.back()
              }
            })
          }
        })
      },
      //生成二维码
      getQrcodeImg () {
        let data = {
          'url': this.value,
          'qiniu_key': `${encodeURIComponent(this.value).replace(/[^0-9a-zA-Z]|http|https/g,'')}.jpg`,
          'qrcode_type': 2,
          'size': 400
        }
        this.$api.getQrcode(data).then((res) => {
          this.img = res.qiniu_key
        })
      },
      onCopy: function (e) {
        this.$vux.alert.show({
          title: '提示',
          content: '已复制到剪贴板'
        })
      },
      onBarChange(){
        this.value=''
        this.img=''
        this.getActivity()
      }
    }
  }
</script>

<style>

</style>
