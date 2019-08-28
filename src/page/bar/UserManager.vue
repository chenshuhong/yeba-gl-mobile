<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    :pullUpLoad="true"
    @pullingDown="getUsers(true)"
    @pullingUp="getUsers"
    @reLoadData="getUsers">
    <group slot="top">
      <x-input placeholder="请输入用户昵称/ID" v-model="searchValue">
        <div slot="right" class="input-right">
          <span @click="search" class="my-green">搜索</span>
          <span class="my-green add-margin-left" @click="showPopupPicker=true">用户组筛选</span>
        </div>
      </x-input>
      <popup-picker
        title="当前所属用户组"
        popup-title="筛选用户组"
        show-name
        :data="conditionGroups"
        v-model="groupValue"
        placeholder="设为"
        :show.sync="showPopupPicker"
        :show-cell="false"
        @on-change="onGroupChange"></popup-picker>
      <popup-picker
        title="当前所属用户组"
        show-name
        :data="groups"
        v-model="itemValue"
        :show.sync="itemShowPopupPicker"
        placeholder="设为"
        :show-cell="false"
        @on-change="onChange"></popup-picker>
      <popup-picker
        title="当前用户状态"
        show-name
        :data="userStatus"
        v-model="userStatuValue"
        :show.sync="statuShowPopupPicker"
        placeholder="设为"
        :show-cell="false"
        @on-change="onStatusChange"></popup-picker>
    </group>
    <group v-for="(item,key) in list" :key="item.id">
      <cell is-link>
        <span class="expand" @click="jumpConsumption(item.user)">消费情况</span>
        <span slot="title"
              :class="item.user.gender===1?'male':'female'">{{'('+item.user.id+')'+item.user.nickname}}</span>
        <load-img slot="icon" :url="item.user.avatar" class="avatar" border-radius="50%"></load-img>
      </cell>
      <cell :title="level(item)" :value="groups[0][item.group_id].name" @click.native="onCellClick(item)" is-link></cell>
      <cell title="用户状态" :value="item.disabled_chat===0?'正常':'禁言'" @click.native="onStatusClick(item)" is-link></cell>
    </group>
  </scroll>


</template>

<script>
  import {
    Cell,
    Group,
    PopupPicker,
    XInput,
    XButton,
  } from "vux"
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'
  import BarChangeMixin from '@/js/mixin/barChange'
  import LoadImg from '@/components/LoadImg'

  export default {
    name: "UserManager",
    components: {
      Cell,
      Group,
      Scroll,
      LoadImg,
      PopupPicker,
      XInput,
      XButton
    },
    data () {
      return {
        showPopupPicker: false,
        itemShowPopupPicker: false,
        statuShowPopupPicker: false,
        groupValue: [],
        itemValue: [],
        userStatuValue: [],
        userId: '',
        searchValue: '',
        groups: [[
          {
            name: '普通用户',
            value: '0'
          },
          {
            name: 'VIP用户',
            value: '1'
          },
          {
            name: '马甲用户',
            value: '2'
          },
          {
            name: '管理员',
            value: '3'
          },
          {
            name: '免费霸屏用户(1次)',
            value: '4'
          },
          {
            name: '免费霸屏用户(2次)',
            value: '5'
          },
          {
            name: '免费霸屏用户(5次)',
            value: '6'
          },
          {
            name: '免费霸屏用户(10次)',
            value: '7'
          },
          {
            name: '免费霸屏用户(20次)',
            value: '8'
          }
        ]],
        conditionGroups: [[
          {
            name: '全部',
            value: '-1'
          },
          {
            name: '普通用户',
            value: '0'
          },
          {
            name: 'VIP用户',
            value: '1'
          },
          {
            name: '马甲用户',
            value: '2'
          },
          {
            name: '管理员',
            value: '3'
          },
          {
            name: '免费霸屏用户(1次)',
            value: '4'
          },
          {
            name: '免费霸屏用户(2次)',
            value: '5'
          },
          {
            name: '免费霸屏用户(5次)',
            value: '6'
          },
          {
            name: '免费霸屏用户(10次)',
            value: '7'
          },
          {
            name: '免费霸屏用户(20次)',
            value: '8'
          }
        ]],
        userStatus: [[
          {
            name: '正常',
            value: '0'
          }, {
            name: '禁言',
            value: '1'
          }
        ]]
      }

    },
    mixins: [LoadStutusMixin, BarChangeMixin],
    methods: {
      getUsers (isRefresh) {
        if (isRefresh){
          this.page = 1
        }
        this.onloadStart()
        this.$api.getBarUsers(this.$barId, this.groupValue[0], this.page)
          .then(data => {
            let list = []
            for (let item of data) {
              if (!(item.user.id + '').includes(this.searchValue) && !item.user.nickname.includes(this.searchValue)) {
                continue
              }
              list.push(item)
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
      },
      onBarChange () {
        this.list = []
        this.getUsers(true)
      },
      onGroupChange (value) {
        this.list = []
        this.getUsers(true)
      },
      search () {
        this.list = []
        this.getUsers(true)
      },
      onChange (value) {
        let data = {
          group_id: ~~value,
        }
        this.$api.changeUserGroup(this.$barId, this.userId, data)
          .then(item => {
            this.$util.change1(this.list, item)
          })
      },
      onStatusChange(value){
        let data = {
          disabled_chat: ~~value
        }
        this.$api.changeUserGroup(this.$barId, this.userId, data)
          .then(item => {
            this.$util.change1(this.list, item)
          })
      },
      onCellClick (item) {
        this.userId = item.user_id
        this.itemShowPopupPicker = true
      },
      onStatusClick (item) {
        this.userId = item.user_id
        this.statuShowPopupPicker = true
      },
      level (item) {
        if (item.user.level) {
          return item.user.level.title
        } else {
          return '没有等级'
        }
      },
      jumpConsumption (user) {
        this.$router.push({
          name: 'UserComsumption',
          params: user
        })
      }
    },
    created () {
      this.page = 1
      this.getUsers()
    }
  }
</script>

<style scoped>
  .avatar {
    width: 8vw;
    height: 8vw;
    margin-right: 2vw;
    border-radius: 50%;
  }

  .input-right {
    display: inline-block;
    margin-left: 1rem;
  }

  .expand{
    position: relative;
  }
  .expand:before{
    content: '';
    position: absolute;
    top: -15px;
    right: -30px;
    bottom: -15px;
    left: -15px;
  }
</style>
