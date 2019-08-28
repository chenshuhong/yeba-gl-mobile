<template>

  <div>
    <group>
      <cell is-link title="票选大赛" value='' link="/goddess/GoddessList"></cell>
      <cell is-link title="推广链接和二维码" value='' link="/goddess/Extension"></cell>
      <cell is-link title="票选详情" value='' link="/goddess/GoddessDetail"></cell>
    </group>

  </div>

</template>

<script>
  import { Cell, Group } from 'vux'

  export default {
    components: {
      Cell,
      Group
    }
  }
</script>

<style>


</style>
