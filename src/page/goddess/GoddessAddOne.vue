<template>

  <div>
    <group>
      <x-input title="大赛名称"
               placeholder="请输入大赛名称"
               v-model="activity_name"
               placeholder-align="right"
               text-align="right"></x-input>
      <x-textarea title="副标题 "
                  placeholder="请输入副标题"
                  v-model="share_desc" :max="30"></x-textarea>
      <cell title="分享效果">
        <img src="../../assets/px_share.png" class="share_previewer">
      </cell>
    </group>
    <group>
      <datetime
        v-model="begin_time" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="开始日期"
        year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时"
        minute-row="{value}分" placeholder="选择日期"></datetime>
      <datetime
        v-model="end_time" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="结束日期"
        year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时"
        minute-row="{value}分" placeholder="选择日期"></datetime>
    </group>
    <group class="gl-margin-bottom">
      <cell title="背景颜色(请暂时先在电脑版后台设置)">
        <color-picker :value="currentColor" size="small" :colors="colors"></color-picker>
      </cell>
      <cell title="轮播图片">
      </cell>
      <div>
        <load-img :url="logo" class="photo margin" v-for="(logo,key) of activity_logos" :key="key">
          <img src="../../assets/delete.png" class="gl-icon-delete" @click="deleteImg(key)"/>
        </load-img>
        <my-photo @uploadSuccess="addGoddessPic" uploadType="gooddess2" class="photo margin"
                  v-if="activity_logos.length !== 3">
          <img src="../../assets/bar_uplowder.png" class="photo"/>
        </my-photo>
      </div>
      <x-textarea title="描述" :max="100" placeholder="输入描述" v-model="activity_rule"></x-textarea>
    </group>

    <MyFoot v-on:next="nextbtn" :is-next="true"></MyFoot>

    <div>
      <popup v-model="showNext" width="100%" position="right" :hide-on-blur="false">
        <div class="popup">
          <group>
            <x-input title="单票价"
                     v-model="unit_price"
                     placeholder="请输入票价"
                     placeholder-align="right"
                     text-align="right"
                     type="number"></x-input>
            <my-input title="用户分成"
                     v-model="user_divide"
                     placeholder="请输入用户分成"
                     placeholder-align="right"
                     text-align="right"></my-input>
          </group>
          <group title="左侧为投票面额,右侧开关为面额是否默认">
            <cell v-for="denomination of votedenominations" title="" :key="denomination.key">
              <x-input slot="title" v-model="denomination.value" placeholder="请输入票价"
                       type="number"></x-input>
              <x-switch title="" v-model="denomination.isDefalut" :value-map="[0,1]" @on-click="onClick(denomination)"
                        prevent-default></x-switch>
            </cell>
          </group>
          <MyFoot v-on:increment="FootBtn"></MyFoot>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, XSwitch, XInput, Datetime, ColorPicker, XTextarea, Popup} from 'vux'
  import MyFoot from '../../components/MyFoot.vue'
  import MyPhoto from '../../components/MyPhoto.vue'
  import LoadImg from '../../components/LoadImg.vue'
  import MyInput from '@/components/MyInput.vue'
  let params
  export default {
    name: 'GoddessAddNoKeep',
    components: {
      Cell,
      Group,
      XInput,
      Datetime,
      ColorPicker,
      XTextarea,
      MyPhoto,
      LoadImg,
      Popup,
      MyFoot,
      XSwitch,
      MyInput
    },
    data () {
      return {
        begin_time: '',
        end_time: '',
        activity_name: '',
        share_desc: '',
        activity_rule: '',
        activity_logos: [],
        unit_price: '',
        showNext: false,
        votedenominations: [],
        currentSelect: -1,
        colors: ['#D95BFF'],
        currentColor: '#D95BFF',
        user_divide:'',
      }
    },
    created () {
      params = this.$route.params
      if (params.id) {
        this.begin_time = params.begin_time
        this.end_time = params.end_time
        this.currentColor = params.bg_color
        this.activity_name = params.activity_name
        this.share_desc = params.share_desc
        this.activity_rule = params.activity_rule
        this.unit_price = params.unit_price
        this.user_divide = params.user_divide
        this.activity_logos = params.activity_logos || []
        this.decodeDenomination(params.denomination)
      } else {
        this.votedenominations.push({key: 0, value: 1, isDefalut: 1})
        this.votedenominations.push({key: 1, value: 5, isDefalut: 0})
        this.votedenominations.push({key: 2, value: 10, isDefalut: 0})
        this.votedenominations.push({key: 3, value: 20, isDefalut: 0})
        this.votedenominations.push({key: 4, value: 50, isDefalut: 0})
        this.votedenominations.push({key: 5, value: 100, isDefalut: 0})
        this.currentSelect = 0
      }
    },
    methods: {
      getLogos () {
        let list = []
        for (let item of this.activity_logos) {
          list.push(this.$util.getQiniuKey(item))
        }
        return list.join(',')
      },
      getDenomination () {
        let result = {}
        for (let item of this.votedenominations) {
          result[item.value + ''] = item.isDefalut
        }
        return result
      },
      addGoddessPic (key) {
        this.activity_logos.push(this.$util.getQiniuUrl(key))
      },
      nextbtn () {
        if (this.$util.judgeValue(this.activity_name,'请输入大赛名称')){
          return
        }
        if (this.$util.judgeValue(this.begin_time,'请输入开始时间')){
          return
        }
        if (this.$util.judgeValue(this.end_time,'请输入结束时间')){
          return
        }
        if (this.$util.judgeValue(this.activity_rule,'请输入描述')){
          return
        }
        this.showNext = true
      },
      FootBtn (e) {
        if (e) {
          if (this.$util.judgeValue(this.unit_price,'请输入票价')){
            return
          }
          let data = {
            activity_name: this.activity_name,
            begin_time: this.begin_time,
            end_time: this.end_time,
            activity_rule: this.activity_rule,
            share_desc: this.share_desc,
            bg_color: this.currentColor,
            activity_logos: this.getLogos(),
            unit_price: this.unit_price,
            denomination: this.getDenomination(),
            user_divide:this.user_divide
          }
          if (params.id) {
            this.$api.editGoddessActivity(this.$barId, params.id, data)
              .then(item => {
                this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                  type: 'goddessEdit',
                  data: item
                })
                this.$router.back()
              })
          } else {
            this.$api.addGoddessActivity(this.$barId, data).then(item => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS, {
                type: 'goddessAdd',
                data: item
              })
              this.$router.back()
            })
          }
        } else {
          this.showNext = false
        }
      },
      decodeDenomination (jsonString) {
        let denomination = JSON.parse(jsonString)
        let i = 0
        for (let key in denomination) {
          this.votedenominations.push({
            key: i,
            value: key,
            isDefalut: denomination[key]
          })
          if (denomination[key] === 1) {
            this.currentSelect = i
          }
          i++
        }
      },
      onClick (item) {
        if (item.isDefalut === 1) {
          return
        }
        item.isDefalut = 1
        if (this.currentSelect>=0){
          this.votedenominations[this.currentSelect].isDefalut = 0
        }
        this.currentSelect = item.key
      },
      deleteImg(key){
        this.activity_logos.splice(key,1)
      }
    }
  }
</script>

<style scoped>

  .photo {
    position: relative;
    width: 20vw;
    height: 20vw;
    display: inline-block;
  }

  .margin {
    margin-left: 15px;
  }

  .share_previewer {
    width: 60vw;
  }

  .popup {
    width: 100%;
    height: 100%;
  }
</style>
