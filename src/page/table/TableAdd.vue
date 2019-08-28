<template>
  <div class="activity-add">
    <group>
      <x-input title="套餐名称" placeholder="输入套餐名称" novalidate :show-clear="true" placeholder-align="right"
               v-model="table.menu_name"></x-input>
      <x-input title="套餐价格" placeholder="输入套餐价格" novalidate :show-clear="true" placeholder-align="right"
               v-model="table.menu_price" type="number"></x-input>
      <x-input title="套餐原价" placeholder="输入套餐原价" novalidate :show-clear="true" placeholder-align="right"
               v-model="table.original_price" type="number"></x-input>
      <popup-picker title="适合人数" :data="list" v-model="value" @on-change="change"
                    :display-format="format"></popup-picker>
    </group>

    <group title="">
      <cell-box>
        <div class="flex-pic">
          <span>套餐图片</span>
          <div>
            <load-img :url="key" class="photo" v-if="tablePicKey"></load-img>
            <my-photo v-on:uploadSuccess="addTablePic" :cropOptions="cropOptions" uploadType="table" v-else>
              <img class="photo" src="../../assets/bar_uplowder.png"/>
            </my-photo>
          </div>
        </div>
      </cell-box>
    </group>
    <group>
      <x-textarea autosize :max="100" placeholder="温馨提示" :height="40" v-model="table.menu_tips"></x-textarea>
    </group>
    <group>
      <span class="my-Add" @click="goTableAddContent">下一步</span>
    </group>
  </div>
</template>


<script>
  import { Datetime, Group, XButton, XInput, Cell, CellBox, XTextarea, XSwitch, PopupPicker, } from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyPhoto from '../../components/MyPhoto.vue'
  import LoadImg from '../../components/LoadImg.vue'
  import config from '../../config/config'

  export default {
    components: {
      XSwitch,
      Datetime,
      Group,
      XButton,
      XInput,
      Cell,
      CellBox,
      XTextarea,
      MyFoot,
      PopupPicker,
      MyPhoto,
      LoadImg
    },
    data () {
      return {
        list: [],
        value: ['选择'],
        barinfo: {},
        table: {},
        cropOptions: {
          aspectRatio: 1
        },
        tablePicKey: ''
      }
    },
    created () {
      this.barinfo = this.$util.getStorage(this.$config.STORAGE.BAR_INFO)
      this.getNum()
      //      存在id,说明是修改
      console.log(this.$route.params)
      if (this.$route.params.id) {
        this.table = this.$route.params
        this.value[0] = this.$route.params.menu_peple_min
        this.value[1] = this.$route.params.menu_peple_max
        let menu_image = this.$route.params.menu_image
        this.tablePicKey = menu_image.substring(menu_image.indexOf('bar/menu_image'))
      }
    },
    computed: {
      key () {
        return config.QINIU_URL + this.tablePicKey
      }
    },
    methods: {
      getNum () {
        let list_min = []
        let list_max = []
        for (let i = 1; i < 13; i++) {
          list_min.push(i)
          list_max.push(i + 1)
        }
        this.list.push(list_min, list_max)
      },
      format: function (value, name) {
        if (!value[1]) {
          return value[0]
        }
        return `${value[0]}-${value[1]}`
      },
      change () {
        var value1 = this.value[0]
        var value2 = this.value[1]
//        当最少人数大于最多人数
        if (~~this.value[0] > ~~this.value[1]) {
          this.value[0] = value2
          this.value[1] = value1
        }
      },
//      添加套餐
      menuAdd (e) {
        if (e) {
          let data = {
            'bar_id': this.barinfo.barid,
            'menu_name': this.menu_name,
            'menu_price': this.menu_price,
            'original_price': this.original_price,
            'menu_peple_min': this.value[0],
            'menu_peple_max': this.value[1],
            'menu_image': 'occupyscreen/image/10143_1488280617.png',
            'menu_tips': this.menu_tips,
//            'content': "[ {'name':'啤酒','count':'8','spec':'瓶'}, {'name':'啤酒','count':'8','spec':'瓶'}, {'name':'啤酒','count':'8','spec':'瓶'}  ]"
          }
//          编辑
          if (this.$route.params.id) {

          } else {
//            添加
            this.$api.addMenu(data).then((res) => {
              console.log(res)
            })
          }
        } else {
          this.$router.go(-1)
        }
      },
      addTablePic (key) {
        this.tablePicKey = key
        this.$vux.loading.hide()
      },
      goTableAddContent () {
        let table = this.table
        if (table && table.menu_name && table.menu_price && table.original_price && table.menu_tips && this.tablePicKey && this.value.length === 2) {
          console.log(table)
          this.$router.push({
            name: 'TableAddContent',
            params: table
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .center {
    padding-top: 10px;
    padding-left: 15px;
    color: green;
  }

  .flex-pic {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .flex-photo {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .photo {
    width: 30vw;
    height: 30vw;
  }
</style>
