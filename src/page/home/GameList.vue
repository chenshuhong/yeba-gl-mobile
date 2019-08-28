<template>
  <div>

    <group>
      <cell title="奖品库" is-link link="/prizes/PrizesList"></cell>
    </group>

    <group>
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(6) ? 'up' : 'down'"
        @click.native="changeContent(6)">
        <span slot="title" :class="{gray:isShow(6)}">台号抽奖</span>
        <img slot="icon" src="../../assets/icon_table.png" class="icon"/>
      </cell>
      <template v-if="isShow(6)">
        <cell-box class="sub-item" is-link link="/table/TablePrizeUser">推送设置</cell-box>
        <cell-box class="sub-item" is-link link="/table/TableSetting">台号设置</cell-box>
      </template>
    </group>

    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(7) ? 'up' : 'down'"
        @click.native="changeContent(7)">
        <span slot="title" :class="{gray:isShow(7)}">砸金蛋</span>
        <img slot="icon" src="../../assets/icon_egg.png" class="icon"/>
      </cell>
      <template v-if="isShow(7)">
        <cell-box class="sub-item" is-link link="/egg/EggSetting">游戏设置</cell-box>
        <cell-box class="sub-item" is-link link="/egg/EggList">奖品设置</cell-box>
      </template>
    </group>

    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(1) ? 'up' : 'down'"
        @click.native="changeContent(1)">
        <span slot="title" :class="{gray:isShow(1)}">大话骰</span>
        <img slot="icon" src="../../assets/icon_dice.png" class="icon"/>
      </cell>
      <template v-if="isShow(1)">
        <cell-box class="sub-item" is-link link="/liarsdice/LiarsDiceAdd">游戏设置</cell-box>
        <cell-box class="sub-item" is-link link="/liarsdice/LiarsDiceList">奖品设置</cell-box>
      </template>
    </group>


    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(2) ? 'up' : 'down'"
        @click.native="changeContent(2)">
        <span slot="title" :class="{gray:isShow(2)}">摇摇赛跑</span>
        <img slot="icon" src="../../assets/icon_yaoyao.png" class="icon"/>
      </cell>
      <template v-if="isShow(2)">
        <cell-box class="sub-item" is-link link="/rockruning/RockRuningSet">游戏设置</cell-box>
        <!--<cell-box class="sub-item" is-link link="/rockruning/RockRuningPrizeList">奖品设置</cell-box>-->
      </template>
    </group>


    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(3) ? 'up' : 'down'"
        @click.native="changeContent(3)">
        <span slot="title" :class="{gray:isShow(3)}">转动魔方</span>
        <img slot="icon" src="../../assets/icon_magic.png" class="icon"/>
      </cell>
      <template v-if="isShow(3)">
        <cell-box class="sub-item" is-link link="/gamemagic/GameMagicSet">游戏设置</cell-box>
        <cell-box class="sub-item" is-link link="/gamemagic/GameMagicList">奖品设置</cell-box>
      </template>
    </group>


    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(4) ? 'up' : 'down'"
        @click.native="changeContent(4)">
        <span slot="title" :class="{gray:isShow(4)}">跑马场</span>
        <img slot="icon" src="../../assets/icon_horse.png" class="icon"/>
      </cell>
      <template v-if="isShow(4)">
        <cell-box class="sub-item" is-link link="/horse/HorseAdd">游戏设置</cell-box>
        <cell-box class="sub-item" is-link link="/horse/HorseList">奖品设置</cell-box>
      </template>
    </group>


    <group gutter="0.5rem">
      <cell
        title=""
        is-link
        :border-intent="false"
        :arrow-direction="isShow(5) ? 'up' : 'down'"
        @click.native="changeContent(5)">
        <span slot="title" :class="{gray:isShow(5)}">在线抽奖</span>
        <img slot="icon" src="../../assets/icon_prize.png" class="icon"/>
      </cell>
      <template v-if="isShow(5)">
        <cell-box class="sub-item" is-link link="/gameonline/GameOnlineSet">游戏设置</cell-box>
      </template>
    </group>

  </div>
</template>



<script>
  import {Cell, CellBox, Group} from 'vux'

  export default {
    components: {
      Group,
      Cell,
      CellBox,
    },
    data () {
      return {
        showContent:0
      }
    },
    methods: {
      changeContent(index){
        if(this.showContent === index){
          this.showContent = 0
        }else {
          this.showContent = index
        }
      },
      isShow(index){
        return this.showContent === index
      }
    }
  }
</script>

<style scoped>
  .icon{
    width: 8vw;
    height: 8vw;
    display: block;
    margin-right: 2vw;
  }
</style>
