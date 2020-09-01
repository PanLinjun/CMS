import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css

import './icons' // icon

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './permission' // permission control

import echarts from "echarts"

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

Vue.prototype.$echarts = echarts
