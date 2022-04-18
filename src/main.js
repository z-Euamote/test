/*
 * @Author: your name
 * @Date: 2021-08-17 17:49:13
 * @LastEditTime: 2022-04-02 18:12:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
            .use(Antd)
            .use(VueAxios, axios);
app.mount("#app");
