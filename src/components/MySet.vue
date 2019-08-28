<template>
  <div class="set">
    <group title="功能设置"></group>
    <flexbox :gutter="15">
      <flexbox-item>
        <group gutter="0">
          <cell is-link link="/SqOccupySet">
            <span class="black">上墙霸屏</span>
            <img slot="icon" src="../assets/home_bp_icon.png" class="icon">
          </cell>
        </group>

      </flexbox-item>
      <flexbox-item>
        <group gutter="0">
          <cell is-link link="/bar/UserManager">
            <span class="black">用户管理</span>
            <img slot="icon" src="../assets/home_user_icon.png" class="icon">
          </cell>
        </group>
      </flexbox-item>
    </flexbox>
  </div>

</template>

<script>
  import {Group, Cell, Flexbox, FlexboxItem} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      FlexboxItem,
      Flexbox
    }
  }
</script>

<style lang="scss">
  .set {
    margin-left: 1rem;
    margin-right: 1rem;
    .weui-cells__title{
      padding-left: 0;
    }
    .icon {
      width: 5vw;
      height: 5vw;
      display: block;
    }
    .weui-cells {
      border-radius: 1vw;
      &:after {
        border: none;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid #D9D9D9;
        border-radius: 2vw;
        transform: scale(0.5);
        transform-origin: left top;
        width: 200%;
        height: 200%;
        box-sizing: border-box;
      }
    }
  }
</style>
