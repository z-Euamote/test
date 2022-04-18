<!--
 * @Author: yuan
 * @Date: 2022-04-18 15:47:17
 * @FilePath: \test\src\components\filterBar\index.vue
 * @Description: 
-->
<template>
  <div>
    <a-form>
      <a-form-item :label="title">
        <div class="filter-item-box">
          <p v-if="multiple" class="filter-item" :class="isActiveAll" @click="handleClickAll">全部</p>
          <p class="filter-item" :class="isActive(item.value)" v-for="item in data" :key="item.value" @click="handleClickItem(item.value)">
            {{item.label}}
          </p>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form } from 'ant-design-vue'
import _ from 'lodash'

export default {
  components: {
    'a-form': Form,
    'a-form-item': Form.Item
  },
  props: {
    title: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeData: this.multiple ? [] : null
    }
  },
  created() {

  },
  computed: {
    isActive() {
      return val => {
        let res 
        if(this.multiple) res = this.activeData.find(item => val === item)
        else res = this.activeData == val
        return res ? 'active' : ''
      }
    },
    isActiveAll() {
      return this.activeData.length == this.data.length ? 'active' : ''
    }
  },
  methods: {
    // 点击全部
    handleClickAll() {
      if(this.activeData.length != this.data.length) this.activeData = this.data.map(item => item.value)
      else this.activeData = []
    },
    // 点击单个
    handleClickItem(val) {
      if(this.multiple) {
        if(this.activeData.find(item => item === val)) _.remove(this.activeData, item => item === val)
        else this.activeData.push(val)
      } else {
        this.activeData = val
      }
    },
  }
}
</script>

<style lang='less' scoped>
.filter-item-box {
  display: flex;
  .filter-item {
    margin: 10px 20px 10px 0;
    cursor: pointer;
  }
  .active {
    color: blue;
  }
}
 
</style>
