<!--
 * @Author: yuan
 * @Date: 2021-08-17 17:49:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-18 17:12:01
 * @FilePath: \test\src\App.vue
 * @Description:
 *
-->
<template>
  <filterBar :data="data" :multiple="false" title="单选"/>
  <filterBar :data="data" title="多选"/>

  <filter-menu ref="filterMenu" :air-arr="airList" v-model="airValue" :model="model"></filter-menu>
</template>

<script>
import filterBar from './components/filterBar'
import FilterMenu from './components/filter-menu'

export default {
  name: 'App',
  components: {
    filterBar,
    FilterMenu
  },
  data() {
    return {
      data: [
        {label: 'AAA', value: 1},
        {label: 'BBB', value: 2},
        {label: 'CCC', value: 3},
        {label: 'DDD', value: 4},
        {label: 'EEE', value: 5},

      ],
      // filter-menu
      airList:['小型','中大型','超远程','超大型'],
      airValue:"",
      model:"single",
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
