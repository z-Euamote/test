<!--
 * @Author: yuan
 * @Date: 2021-08-17 17:49:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 16:49:52
 * @FilePath: \test\src\App.vue
 * @Description: 
 * 
-->
<template>
  <test/>
</template>

<script>
import test from './page/test.vue'

export default {
  name: 'App',
  components: {
    test,
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
