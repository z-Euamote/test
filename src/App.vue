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
</template>

<script>
import filterBar from './components/filterBar'

export default {
  name: 'App',
  components: {
    filterBar
  },
  data() {
    return {
      data: [
        {label: 'AAA', value: 1},
        {label: 'BBB', value: 2},
        {label: 'CCC', value: 3},
        {label: 'DDD', value: 4},
        {label: 'EEE', value: 5},

      ]
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
