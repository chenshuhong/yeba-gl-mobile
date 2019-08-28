<template>
  <div>

    <group>
      <x-input
        title="商品名称"
        placeholder="请输入商品名称"
        :max="10" v-model="goods_name"
        placeholder-align="right"
        text-align="right"></x-input>
      <my-input
        title="排序号"
        placeholder="请输入商品排序号"
        v-model="sort_number"
        placeholder-align="right"
        text-align="right"></my-input>
      <popup-picker
        title="分类"
        show-name
        :data="categoryList"
        v-model="value1"
        placeholder="选择分类"></popup-picker>
      <x-input
        title="售价"
        placeholder="请输入售价"
        type="number"
        v-model="goods_price"
        placeholder-align="right"
        text-align="right"></x-input>
      <x-input
        title="描述"
        placeholder="请输入描述"
        v-model="goods_desc"
        placeholder-align="right"
        text-align="right"></x-input>
      <cell title="商品图片" >
        <load-img :url="thumb_pic"  class="gl-photo" slot="icon" v-if="thumb_pic"></load-img>
        <my-photo v-on:uploadSuccess="addgoodPic" upload-type="good">
          <span class="my-green" v-if="thumb_pic">修改图片</span>
          <span class="my-green" v-else>添加图片</span>
        </my-photo>
      </cell>
      <x-switch title="启用" v-model="audit" :value-map="[0,1]"></x-switch>
      <x-switch title="推荐" v-model="recom" :value-map="[0,1]"></x-switch>
    </group>

    <MyFoot v-on:increment="FootBtn"></MyFoot>

  </div>
</template>

<script>
  import {
    Group,
    XInput,
    Cell,
    XSwitch,
    PopupPicker
  } from "vux";
  import MyFoot from "../../components/MyFoot.vue"
  import MyPhoto from '../../components/MyPhoto.vue'
  import LoadImg from '../../components/LoadImg.vue'
  import MyInput from '@/components/MyInput'
  let params
  export default {
    name:'GoodsAddNoKeep',
    components: {
      XSwitch,
      Group,
      XInput,
      Cell,
      PopupPicker,
      MyFoot,
      MyPhoto,
      LoadImg,
      MyInput
    },
    data () {
      return {
        goods_name: "",
        sort_number: "",
        goods_price: "",
        goods_desc: "",
        thumb_pic: "",
        categoryList: [],
        value1: [],
        audit: 1,
        recom: 0
      }
    },
    methods: {
      goodsCategory () {
        this.$api.getGoodsCategory(this.$barId).then(data => {
          let glist = []
          for (let i = 0; i < data.length; i++) {
            let category = {
              name: data[i].name,
              value: data[i].id + ""
            }
            glist.push(category)
          }
          if (glist.length>0){
            this.categoryList.splice(0,1,glist)
          }
        })
      },
      FootBtn (e) {
        if (e) {
          if (this.$util.judgeValue(this.goods_name,'请输入商品名称')){
            return
          }
          if (this.$util.judgeValue(this.sort_number,'请输入排序号')){
            return
          }
          if (this.$util.judgeValue(this.value1.length>0&&this.value1[0]!=='0','请选择分类')){
            return
          }
          if (this.$util.judgeValue(this.goods_price,'请输入售价')){
            return
          }
          if (this.$util.judgeValue(this.thumb_pic,'请上传图片')){
            return
          }
          if (params.id) {
            let id = params.id;
            let data = {
              bar_id: this.$barId,
              audit: this.audit,
              recom: this.recom,
              category_id: parseInt(this.value1[0]),
              sort_number: this.sort_number,
              goods_price: this.goods_price,
              goods_name: this.goods_name,
              goods_desc: this.goods_desc,
              thumb_pic: this.$util.getQiniuKey(this.thumb_pic)
            };
            this.$api.editGoods(id, data).then(item => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'goodEdit',
                data:item
              })
              this.$router.back()
            })
          } else {
            let data = {
              audit: this.audit,
              recom: this.recom,
              category_id: parseInt(this.value1[0]),
              sort_number: this.sort_number,
              goods_price: this.goods_price,
              goods_name: this.goods_name,
              goods_desc: this.goods_desc,
              thumb_pic: this.$util.getQiniuKey(this.thumb_pic)
            };
            this.$api.addGoods(this.$barId, data).then(item => {
              this.$store.commit(this.$config.STORAGE.EVENT_BUS,{
                type:'goodAdd',
                data:item
              })
              this.$router.back()
            })
          }
        } else {
          // false返回
          this.$router.back()
        }
      },
      addgoodPic(key){
        this.thumb_pic = this.$util.getQiniuUrl(key)
      }
    },
    created () {
      this.goodsCategory()
      params = this.$route.params
      if (params.id) {
        this.goods_name = params.goods_name
        this.sort_number = params.sort_number
        this.goods_price = params.goods_price
        this.goods_desc = params.goods_desc
        this.thumb_pic = params.thumb_pic
        this.audit = params.audit
        this.recom = params.recom
        let cat = params.cat_info[0]
        this.value1 = [cat.id+'']
        this.categoryList = [[{
          name:cat.name,
          value:cat.id+''
        }]]
      }
    }
  }
</script>

<style>

</style>
