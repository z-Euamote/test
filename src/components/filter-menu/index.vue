<!--
* @Description:
 * @Author: Liyz
 * @Date:2022-04-18 13:42:46
 * @LastEditTime:2022-04-18 13:42:46
-->
<template>
  <div>
    机型大小：
    <span class="air-text" :style="allStyle" @click="allClick" v-if="show">全部</span>
    <span class="air-text" :key="index" v-for="(item,index) in airList" @click="handelClick(item,index)" :class="{active:show?(chooseOne==index):(chooseAfterValue.indexOf( item )!=-1)}">{{item}}</span>
  </div>
</template>

<script>
export default {
  name:'index',
  props:{
    airArr:{
      type:Array,
      default(){
        return [];
      }
    },
    model:{
      type:String,
      default:'single'
    }
  },
  data() {
    //这里存放数据",
    return {
      airList:[],
      chooseAfterValue:[],
      show:false,
      chooseOne:-1,
    };
  },
  //监听属性 类似于data概念",
  computed: {
    allStyle(){
      let style={};
      if(this.chooseAfterValue.length == this.airList.length){
        style.color= '#87ceeb';
      }else{
        style.color ='#000000'
      }
      return style;
    }
  },
  //监控data中的数据变化",
  watch: {
    airArr() {
      this.airList = this.airArr.length ? this.airArr : []
    }
  },
  //方法集合",
  methods: {
    handelClick(item,index){
      if(this.show){
        this.chooseOne=index
      }else {
        if(this.chooseAfterValue.indexOf( item )!=-1){
          this.chooseAfterValue.splice( this.chooseAfterValue.indexOf( item ), 1 )
        }else{
          this.chooseAfterValue.push(item)
        }
      }

    },
    allClick(){
      if (this.chooseAfterValue.length==this.airList.length){
        this.chooseAfterValue=[]
      }else{
        this.chooseAfterValue=JSON.parse(JSON.stringify(this.airList))
      }
    },
  },

  created() {
  },

  mounted() {
    this.airList = this.airArr;
    if(this.model == 'single'){
      this.show=false;
    }
  },

}
</script>

<style  scoped>
.air-text{
  margin: 0 20px;
  cursor:pointer;
}
.active{
  color: #87ceeb;
}
</style>
