<template>

  <scroll
    ref="scroll"
    :loadStatus='loadStatus'
    :data="allList"
    @pullingDown="getCharroomList"
    @reLoadData="getCharroomList">
    <group slot="top">
      <my-photo v-on:uploadSuccess="addChatroomBg" :cropOptions="cropOptions">
        <div class="my-Add">
          自定义背景
        </div>
      </my-photo>
    </group>
    <group>
      <cell v-for="(item,key) in DefsList" :key="item.id" :title="'官方背景'+(key+1)">
        <load-img :urls="urls" :url="item.bgimg_url" class="gl-photo" slot="icon"></load-img>
        <x-switch title="" v-model="item.status" :value-map="[2,1]" @on-click="onClick(item)"
                  prevent-default></x-switch>
      </cell>
    </group>

    <group>
      <cell v-for="(item,key) in CustomList" :key="item.id"
            :title="'自定义背景'+(key+1)">
        <load-img :urls="urls" :url="item.bgimg_url" class="gl-photo" slot="icon"></load-img>
        <div class="switch-container">
          <span class="my-del del" v-if="item.status==2" @click="deleteChatroom(item)">删除</span>
          <x-switch title="" v-model="item.status" :value-map="[2,1]" @on-click="onClick(item)"
                    prevent-default></x-switch>
        </div>
      </cell>
    </group>
  </scroll>

</template>

<script>
  import {Cell, Group, XSwitch} from 'vux'
  import MyPhoto from '../../components/MyPhoto.vue'
  import LoadImg from '../../components/LoadImg.vue'
  import Scroll from '@/components/scroll'
  import LoadStatusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'

  export default {
    components: {
      Cell,
      Group,
      XSwitch,
      MyPhoto,
      LoadImg,
      Scroll
    },
    mixins: [LoadStatusMixin, BarChangeMixin],
    data () {
      return {
        DefsList: [],
        CustomList: [],
        cropOptions: {
          aspectRatio: 9 / 16
        },
        currentSelect: -1 //当前被选中为背景的id
      }
    },
    methods: {
      getCharroomList () {
        this.onloadStart()
        let that = this
        this.$api.getChatroom(this.$barId).then((data) => {
          this.DefsList = []
          this.CustomList = []
          for (let i in data) {
            let open = data[i].is_default
            let status = data[i].status
            if (open === 0) {
              that.CustomList.push(data[i])
            } else {
              that.DefsList.push(data[i])
            }
            if (status === 1) {
              this.currentSelect = data[i].id
            }
          }
          this.onLoadSuccess()
        })
          .catch(err => {
            this.onLoadError()
          })
      },
      deleteChatroom (item) {
        this.$api.deleteChatroom(item.id, this.$barId).then((res) => {
          console.log(res);
          this.$util.remove(this.CustomList, item.id)
          if (item.id === this.currentSelect) {
            this.currentSelect = -1
          }
        })
      },
      onClick (item) {
        if (item.status === 1) {
          return
        }
        let status = item.status === 1 ? 2 : 1
        let data = {
          'bar_id': this.$barId,
          status
        }
        this.$api.editChatroom(item.id, data)
          .then(res => {
            item.status = status
            if (item.is_default === 0) {
              this.$util.change1(this.CustomList, item)
            } else {
              this.$util.change1(this.DefsList, item)
            }

            let index, that = this
            index = this.DefsList.findIndex((data) => {
              return data.id === this.currentSelect
            })
            if (index >= 0) {
              this.$util.change2(this.DefsList, () => {
                let item = that.DefsList[index]
                item.status = 2
                return {
                  index,
                  item
                }
              })
            }

            index = this.CustomList.findIndex((data) => {
              return data.id === this.currentSelect
            })
            if (index >= 0) {
              this.$util.change2(this.CustomList, () => {
                let item = that.CustomList[index]
                item.status = 2
                return {
                  index,
                  item
                }
              })
            }

            this.currentSelect = item.id
          })
      },
      addChatroomBg (key) {
        return this.$api.addChatroomBg(this.$barId, key)
          .then(data => {
            this.CustomList.push(data)
          })
      },
      onBarChange () {
        this.getCharroomList()
      }
    },
    created () {
      this.getCharroomList()
    },
    computed: {
      allList () {
        return this.DefsList.concat(this.CustomList)
      },
      urls(){
        let urls = []
        for (let item of this.allList){
          urls.push(item.bgimg_url)
        }
        return urls
      }
    }
  }
</script>
