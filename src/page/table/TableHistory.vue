<template>
    <div class="table">
      <div v-for="item in list" :key="item.id">
        <group v-if="item.status == 2">
          <cell title="已付款">
            <img class="my-order-icon" slot="icon" style="display:block;margin-right:5px;"
                 src="../../assets/icon_wait.png">
            <span class="my-green" @click="consume(item.id)">确认已消费</span>
            <span class="my-del">退单</span>
          </cell>
          <cell-form-preview :list="item"></cell-form-preview>
        </group>

        <group v-else-if="item.status == 3">
          <cell title="已消费">
            <img class="my-order-icon" slot="icon" style="display:block;margin-right:5px;"
                 src="../../assets/icon_suc.png">
            <span class="my-green"></span>
            <span class="my-del"></span>
          </cell>
          <cell-form-preview :list="item"></cell-form-preview>
        </group>

        <group v-else-if="item.status == 4">
          <cell title="已退单">
            <img class="my-order-icon" slot="icon" style="display:block;margin-right:5px;"
                 src="../../assets/icon_df.png">
            <span class="my-green"></span>
            <span class="my-del"></span>
          </cell>
          <cell-form-preview :list="item"></cell-form-preview>
        </group>

        <group v-else="item.status == 1">
          <cell title="待付款">
            <img class="my-order-icon" slot="icon" style="display:block;margin-right:5px;"
                 src="../../assets/icon_td.png">
            <span class="my-green"></span>
            <span class="my-green">短信提醒</span>
          </cell>
          <cell-form-preview :list="item"></cell-form-preview>
        </group>
      </div>
    </div>
</template>

<script>
  import {
    Cell,
    Group,
    CellFormPreview
  } from 'vux'

  export default {
    components: {
      Cell,
      Group,
      CellFormPreview
    },
    data () {
      return {
        list: [],
      }
    },
    created () {
      this.barTableList()
    },
    methods: {
//      获取订单列表
      barTableList () {
        this.$api.getBarTableList(this.$barId).then((data) => {
          for (var i = 0; i < data.length; i++) {
            let obj = data[i]
            let obj1 = {
              label: '消费者',
              value: obj.user_name + '(' + obj.user_mobile + ')'
            }
            let obj2 = {
              label: '需付金额',
              value: obj.menu_price
            }
            let obj3 = {
              label: '到场时间',
              value: obj.arrive_at
            }
            let obj4 = {
              label: '营销人员',
              value: obj.marketer_name
            }
            let obj5 = {
              label: '套餐名称',
              value: obj.menu_name
            }
            let objArr
            if (status == 1) {
              objArr = [obj5, obj2, obj3]
            } else if (status == 2) {
              objArr = [obj1, obj2, obj3, obj4, obj5]
            } else if (status == 3) {
              objArr = [obj5, obj2, obj3, obj4]
            } else {
              objArr = [obj5, obj2, obj3, obj4]
            }
            Object.assign(objArr,obj)
            this.list.push(objArr)
          }
        })
      },
//      订单确认消费
      consume (id) {
        let data = {
          'order_id': id,
          'bar_id': this.barinfo.bar_id
        }
        this.$api.orderConsume(data).then((res) => {

        })
      }
    },
    filters: {
      capitalize: function (value) {
        switch (value) {
          case 1:
            return '待付款'
            break
          case 2:
            return '已付款'
            break
          case 3:
            return '已消费'
            break
          case 4:
            return '已退单'
            break
        }
      }
    }
  }
</script>

<style lang="scss">
  .position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
  }

  .table {
    padding: 0 0 2rem 0;
    img.my-order-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    span.weui-form-preview__value {
      color: #979797;
    }
  }


</style>
