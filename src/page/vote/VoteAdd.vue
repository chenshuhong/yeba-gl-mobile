<template>
  <div>

    <group class="gl-margin-bottom">
      <x-input title="活动名称" v-model="vote_tile" placeholder="请输入大赛名称"
               placeholder-align="right" text-align="right"></x-input>
      <datetime v-model="begin_time" placeholder="请选择开始日期" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="开始日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分"></datetime>
      <datetime v-model="end_time" placeholder="请选择结束日期" :min-year=2018 :max-year=2060 format="YYYY-MM-DD HH:mm" title="结束日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分"></datetime>
      <x-textarea v-model="rule_explain" title="规则说明" placeholder="请输入规则说明" ></x-textarea>
      <x-input v-model="nameA" title="A战队名称" placeholder="请输入A战队的名称" placeholder-align="right" text-align="right"></x-input>
      <cell title="A战队图片" >
          <load-img :url="imgA" class="gl-photo" slot="icon" v-if="imgA"></load-img>
        <my-photo @uploadSuccess="addVotaAPic" upload-type="vote">
          <span class="my-green" v-if="imgA">修改图片</span>
          <span class="my-green" v-else>添加图片</span>
        </my-photo>
      </cell>
      <x-input v-model="nameB" title="B战队名称" placeholder="请输入B战队的名称"placeholder-align="right" text-align="right"></x-input>
      <cell title="B战队图片">
        <load-img class="gl-photo" slot="icon" v-if="imgB" :url="imgB"></load-img>
        <my-photo @uploadSuccess="addVotaBPic" upload-type="vote">
          <span class="my-green" v-if="imgB">修改图片</span>
          <span class="my-green" v-else>添加图片</span>
        </my-photo>
      </cell>
    </group>

    <MyFoot v-on:next="nextbtn" :is-next="true"></MyFoot>

    <div>
      <popup v-model="showNext" width="100%" position="right" :hide-on-blur="false">
        <div class="popup">
          <group>
            <x-input title="单票价" v-model="unit_price" placeholder="请输入票价"
                     placeholder-align="right" text-align="right" type="number"></x-input>
          </group>
          <group title="左侧为投票面额,右侧开关为面额是否默认">
            <cell v-for="(denomination,key) of votedenominations" title="" :key="denomination.key">
              <x-input slot="title" v-model="denomination.value" placeholder="请输入票价"
                       placeholder-align="left" text-align="left"></x-input>
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
  import { Datetime, Group,XInput,Cell,Popup ,XSwitch,XTextarea} from 'vux'
  import MyPhoto from '../../components/MyPhoto.vue'
  import MyFoot from "../../components/MyFoot"
  import LoadImg from '../../components/LoadImg.vue'
  let params
  export default {
    name:'VoteAddNoKeep',
    components: {
      Datetime,
      Group,
      XInput,
      Cell,
      MyPhoto,
      Popup,
      XSwitch,
      MyFoot,
      LoadImg,
      XTextarea
    },
    data () {
      return {
        vote_tile:'',
        begin_time:'',
        end_time:'',
        rule_explain:'',
        nameA:'',
        nameB:'',
        imgA:'',
        imgB:'',
        unit_price:'',
        showNext:false,
        votedenominations:[],
        currentSelect:-1
      }
    },
    created(){
      params = this.$route.params
      if (params.id){
        this.vote_tile=params.vote_tile
        this.begin_time = params.begin_time
        this.end_time =params.end_time
        this.rule_explain = params.rule_explain
        let crop = params.vote_crops
        this.unit_price = params.unit_price
        this.nameA = crop[0].crops_name
        this.nameB = crop[1].crops_name
        this.imgA = crop[0].crops_logo
        this.imgB = crop[1].crops_logo
        this.decodeDenomination(params.denomination)
      }else {
        this.votedenominations.push({key:0,value:10,isDefalut:1})
        this.votedenominations.push({key:1,value:20,isDefalut:0})
        this.votedenominations.push({key:2,value:50,isDefalut:0})
        this.votedenominations.push({key:3,value:100,isDefalut:0})
        this.votedenominations.push({key:4,value:150,isDefalut:0})
        this.votedenominations.push({key:5,value:200,isDefalut:0})
        this.currentSelect = 0
      }
    },
    methods: {
      nextbtn(){
        if (this.$util.judgeValue(this.vote_tile,'请输入活动名称')){
          return
        }
        if (this.$util.judgeValue(this.begin_time,'请输入活动开始时间')){
          return
        }
        if (this.$util.judgeValue(this.end_time,'请输入活动结束时间')){
          return
        }
        if (this.$util.judgeValue(this.rule_explain,'请输入活动规则')){
          return
        }
        if (this.$util.judgeValue(this.nameA,'请输入A战队名称')){
          return
        }
        if (this.$util.judgeValue(this.imgA,'请输入A战队图片')){
          return
        }
        if (this.$util.judgeValue(this.nameB,'请输入B战队名称')){
          return
        }
        if (this.$util.judgeValue(this.imgB,'请输入B战队图片')){
          return
        }
        this.showNext = true
      },
      addVotaAPic(key){
        this.imgA = this.$util.getQiniuUrl(key)
      },
      addVotaBPic(key){
        this.imgB = this.$util.getQiniuUrl(key)
      },
      onClick(item){
        if (item.isDefalut === 1){
          return
        }
        item.isDefalut = 1
        if (this.currentSelect>=0){
          this.votedenominations[this.currentSelect].isDefalut = 0
        }
        this.currentSelect = item.key
      },
      FootBtn(e){
        if (e) {
          if (this.$util.judgeValue(this.unit_price,'请输入票价')){
            return
          }
          let data={
            vote_tile:this.vote_tile,
            unit_price:this.unit_price,
            begin_time:this.begin_time,
            end_time:this.end_time,
            crops_one_name:this.nameA,
            crops_one_logo:this.$util.getQiniuKey(this.imgA),
            crops_two_name:this.nameB,
            crops_two_logo:this.$util.getQiniuKey(this.imgB),
            rule_explain:this.rule_explain,
            denomination:this.getDenomination()
          }
          if (params.id){
            this.$api.editVote(this.$barId,params.id,data).then(item=>{
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'voteEdit',
                data:item
              })
              this.$router.back()
            })
          }else {
            this.$api.addVote(this.$barId,data).then(item=>{
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'voteAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          this.showNext = false
        }
      },
      getDenomination(){
        let result = {}
        for (let item of this.votedenominations){
          result[item.value+''] = item.isDefalut
        }
        return result
      },
      decodeDenomination(jsonString){
        let denomination = JSON.parse(jsonString)
        let i=0
        for (let key in denomination){
          this.votedenominations.push({
            key:i,
            value:key,
            isDefalut:denomination[key]
          })
          if (denomination[key] === 1) {
            this.currentSelect = i
          }
          i++
        }
      }
    }
  }
</script>

<style scoped>
  .popup{
    width: 100%;
    height: 100%;
  }
</style>
