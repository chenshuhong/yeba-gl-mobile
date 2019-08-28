<!-- 这是图片选择并裁剪(可选)的组件 -->
<template>
  <div id="csh-myphoto">
    <input :id="id" name="file" accept="image/*" type="file" ref="inputFile" @change="onSelectImage" hidden />
    <label class="chs-label" :for="id">
      <slot>
        选择图片
      </slot>
    </label>
    <div class="csh-crop" v-if="showCrop">
      <img class="csh-image" ref="cropImg"/>
      <div class="csh-xcancel" @click="destroyCrop">取消</div>
      <div class="csh-xcrop" @click="crop">裁剪</div>
    </div>
  </div>
</template>
<script>
  import Cropper from 'cropperjs'
  import axios from 'axios'
  import { base64 } from 'vux'
  let cropper
  export default {
    name: 'MyPhoto',
    data () {
      return {
        showCrop: false,
        options: Object.assign({
          viewMode: 1,
          aspectRatio: 1
        }, this.cropOptions),
        id:Math.random()
      }
    },
    props: {
      cropOptions: {
        type: Object
      },
      uploadType: {
        type: String,
        default: function () {
          return ['chatroomBg', 'table','barnner','prize','activity','good','vote','gooddess2','qr'][0]
        }
      }
    },
    created () {

    },
    computed: {
      qiniuToken(){
        return this.$store.state.qiniuToken
      }
    },
    methods: {
      getQiniuToken (cb) {
        this.$api.getQiniuToken()
          .then(data => {
            this.$store.commit(this.$config.STORAGE.QINIU_TOKEN,data.upload_token)
            if (cb && typeof cb === 'function') {
              cb()
            }
          })
      },
      onSelectImage (e) {
        console.log(e)
        this.showCrop = true
        if (!cropper) {
          this.initCropper()
        }
        //调用方法转成url格式
        let files = e.target.files || e.dataTransfer.files
        //获取图片文件资源
        let picValue = files[0]
        let originUrl = this.getOriginUrl(picValue)
        //每次替换图片要重新得到新的url
        this.$nextTick(() => {
          if (cropper) {
            cropper.replace(originUrl)
          }
        })
        this.$refs.inputFile.value = '' //清空，防止选择同个文件不触发onchange
      },
      getOriginUrl (file) {
        let url = null
        if (window.createObjectURL) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      upload (cropData) {
        cropData = cropData.replace('data:image/png;base64,', '')
        this.$nextTick(() => {
          let key = this.getKey()
          let base64Key = base64.encode(key)
          console.log(base64Key)
          axios({
            url: `https://upload.qiniu.com/putb64/-1/key/${base64Key}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/octet-stream',
              'Authorization': `UpToken ${this.qiniuToken}`
            },
            data: cropData,
            onUploadProgress: function (progressEvent) {
              // 对原生进度事件的处理
              console.log(progressEvent.loaded,progressEvent.total)
            },
          }).then(data => {
            console.log('上传成功')
            this.$vux.loading.hide()
            this.$emit('uploadSuccess', key)
          }).catch(err => {
            console.log('失败:' + err)
            if (err.response.status === 401 ){
              this.getQiniuToken(() => {
                this.upload(cropData)
              })
            }else {
              this.$vux.loading.hide()
            }
          })
        })
      },
      getKey () {
        if (this.uploadType === 'chatroomBg') {
          return `chatroom/theme/${new Date().getTime()}.jpg`
        } else if (this.uploadType === 'table') {
          return `bar/menu_image/${new Date().getTime()}.jpg`
        } else if (this.uploadType === 'barnner') {
          return `bar/banner/${this.$barId}/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'prize'){
          return `games/prizes/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'activity'){
          return `bar/activity/thumbnail/${this.$barId}/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'good'){
          return `bar/goods/${this.$barId}/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'vote'){
          return `vote/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'gooddess2'){
          return `goddess2/${new Date().getTime()}.jpg`
        }else if (this.uploadType === 'qr'){
          return `qrcode/${new Date().getTime()}.jpg`
        }
      },
      initCropper () {
        let that = this
        this.$nextTick(() => {
          cropper = new Cropper(this.$refs.cropImg, this.options)
        })
      },
      crop () {
        this.$vux.loading.show({
          text: '正在裁剪...'
        })
        let roundedCanvas = cropper.getCroppedCanvas()
        let imgData = roundedCanvas.toDataURL()
        this.destroyCrop()
        this.$vux.loading.show({
          text: '正在上传..'
        })
        if (this.qiniuToken) {
          this.upload(imgData)
        } else {
          this.getQiniuToken(() => {
            this.upload(imgData)
          })
        }
      },
      getRoundedCanvas (sourceCanvas) {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        let width = sourceCanvas.width
        let height = sourceCanvas.height
        canvas.width = width
        canvas.height = height
        context.imageSmoothingEnabled = true
        context.drawImage(sourceCanvas, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-in'
        context.beginPath()
        context.rect(0, 0, width, height)
        context.fill()
        return canvas
      },
      destroyCrop () {
        cropper.destroy()
        cropper = null
        this.showCrop = false
      }
    }
  }
</script>
<style>
  @import "../../node_modules/cropperjs/dist/cropper.css";

  .chs-label {
    display: block;
    width: 100%;
    height: 100%;
  }

  .csh-crop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }

  .csh-image {
    max-width: 100%;
    display: none;
  }

  .csh-xcancel, .csh-xcrop {
    position: absolute;
    bottom: 5vw;
    width: 30vw;
    text-align: center;
    border-radius: 1vw;
    padding: 1.2vw 0vw;
    color: white;
    font-size: 4.5vw;
  }

  .csh-xcancel {
    left: 10vw;
    background-color: #E8413B;
  }

  .csh-xcrop {
    right: 10vw;
    background-color: #0AAF00;
  }
</style>
