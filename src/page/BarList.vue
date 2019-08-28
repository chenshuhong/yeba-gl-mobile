<template>
  <scroll
    ref="scroll"
    :data="list"
    :loadStatus='loadStatus'
    @pullingDown="getBarList"
    @reLoadData="reLoadData">
    <group v-for="bar in list" :key="bar.id">
      <cell @click.native="onEnterBar(bar.bar_id)" is-link :title="bar.bar_id+'.'+bar.bar.name"></cell>
    </group>
  </scroll>
</template>

<script>
  import {Cell, Group} from 'vux'
  import Scroll from '@/components/scroll'
  import LoadStutusMixin from '@/js/mixin/loadStaus'

  export default {
    components: {
      Cell,
      Group,
      Scroll
    },
    name: 'BarList',
    data () {
      return {
        userId: ''
      }
    },
    mixins: [LoadStutusMixin],
    created: function () {
      this.getBarList()
    },
    activated () {
      if (this.userId) {
        if (this.userId !== this.$store.state.userInfo.id) {
          this.list = []
          this.getBarList()
        }
      } else {
        this.userId = this.$store.state.userInfo.id
      }
    },
    methods: {
      /**
       * 获取当前登录用户所绑定的酒吧
       */
      getBarList () {
        this.onloadStart()
        this.$api.getAdminUserBar()
          .then(data => {
            this.list = data
            this.onLoadSuccess(`您(${this.$store.state.userInfo.id})账号下没有任何一家酒吧<br>请联系夜吧客服：yeba98<br><br><span style="text-decoration: underline">点击退出登录</span>`)
            if (data && data.length===1){
              this.onEnterBar(data[0].bar_id,true)
            }
          })
          .catch(err => {
            this.onLoadError()
          })
      },
      onEnterBar (barId,replace) {
        this.$api.getBarInfo(barId)
          .then(data => {
            this.$store.commit(this.$config.STORAGE.BAR_INFO, data)
            if (replace){
              this.$router.replace({name: 'HomeBase'})
            }else {
              this.$router.push({name: 'HomeBase'})
            }
          })
      },
      reLoadData () {
        if (this.loadStatus.type === 1) {
          this.$store.commit(this.$config.STORAGE.USER_TOKEN)
          this.$router.push('/Login')
        } else {
          this.getBarList()
        }
      }
    }
  }
</script>
