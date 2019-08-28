<template>
  <div >
    <group>
      <x-input v-model="title" title="活动名称" placeholder="请输入活动名称" placeholder-align="right" text-align="right"></x-input>
      <datetime v-model="begin_at" placeholder="选择日期" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="开始日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分"></datetime>
      <datetime v-model="end_at" placeholder="结束日期" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="结束日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分"></datetime>
      <cell title="活动封面">
        <load-img :url="thumbnail" class="gl-photo" slot="icon"  v-if="thumbnail"></load-img>
        <my-photo v-on:uploadSuccess="addActivityCover" upload-type="activity">
          <span class="my-green" v-if="thumbnail">修改图片</span>
          <span class="my-green" v-else>添加图片</span>
        </my-photo>
      </cell>
      <XTextarea v-model="activity_info_url" title="转载链接" placeholder="请输入转载链接" :rows="1" :readonly="type==1" autosize></XTextarea>
    </group>
    <div class="actips">
      <p>微信公众号活动页一般链接为<br>http://mp.weixin.qq.com/s/XXXXXXXXX<br>*注意：需要自己编写原创活动的请到电脑版后台</p>
    </div>
    <group v-show="this.count>0">
      <x-switch :title="'推送到用户手机(剩余' + this.count  +'次)'" v-model="value" :value-map="[2,1]"></x-switch>
    </group>

    <MyFoot v-on:increment="FootBtn"></MyFoot>

  </div>
</template>

<script>
import {
  Datetime,
  Group,
  XInput,
  Cell,
  XSwitch,
  XTextarea
} from "vux"
import LoadImg from '../../components/LoadImg.vue'
import MyFoot from '@/components/MyFoot'
import MyPhoto from '../../components/MyPhoto.vue'
let params
export default {
  name:'ActivityAddNoKeep',
  components: {
    Datetime,
    Group,
    XInput,
    Cell,
    XTextarea,
    MyFoot,
    XSwitch,
    MyPhoto,
    LoadImg
  },
  data() {
    return {
      title: "",
      begin_at: "",
      end_at: "",
      activity_info_url: "",
      thumbnail: "",
      type:2,
      count: 0,
      value:2
    }
  },
  methods: {
    getpush() {
      let data = {
        showLoading: false
      }
      this.$api.getBarInfo(this.$barId, data).then(data => {
        this.count = data.activities_count_enable
      });
    },
    addActivityCover(key){
      this.thumbnail = this.$util.getQiniuUrl(key)
    },
    FootBtn(e) {
      if (e) {
        if (this.$util.judgeValue(this.title,'请输入活动名称')){
          return
        }
        if (this.$util.judgeValue(this.begin_at,'请输入开始时间')){
          return
        }
        if (this.$util.judgeValue(this.end_at,'请输入结束时间')){
          return
        }
        if (this.$util.judgeValue(this.thumbnail,'请上传活动封面')){
          return
        }
        if (this.$util.judgeValue(this.activity_info_url,'请输入转载连接')){
          return
        }
        if (params.id) {
          let id = params.id;
          let type = params.type;
          let data = {
            title: this.title,
            begin_at: this.begin_at,
            end_at: this.end_at,
            is_push:this.value,
            type: type,
            content: type===1?params.content:this.activity_info_url,
            thumbnail: this.$util.getQiniuKey(this.thumbnail)
          };
          this.$api.editActivity(id, this.$barId, data).then(item => {
            this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
              type:'activityEdit',
              data:item
            })
            this.$router.back()
          });
        } else {
          let data = {
            title: this.title,
            begin_at: this.begin_at,
            end_at: this.end_at,
            type: 2,
            content: this.activity_info_url,
            thumbnail:this.$util.getQiniuKey(this.thumbnail),
            is_push:this.value
          };
          this.$api.addActivity(this.$barId, data).then(item => {
            item.audit_status = 1
            this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
              type:'activityAdd',
              data:item
            })
            this.$router.back()
          });
        }
      } else {
        this.$router.back()
      }
    }
  },
  created() {
    params = this.$route.params
    if (params.id) {
      this.title = params.title
      this.begin_at = params.begin_at.substr(0, 16)
      this.end_at = params.end_at.substr(0, 16)
      this.type = params.type
      this.value = params.is_push
      if (this.type === 1) {
        this.activity_info_url = "当前活动为原创活动"
      } else {
        this.activity_info_url = params.activity_info_url
      }
      this.thumbnail = params.thumbnail
    }
    this.getpush()
  }
};
</script>

<style scoped>
.actips {
  margin: 10px 20px -10px 20px;
  color: #999;
  font-size: 14px;
}
</style>
