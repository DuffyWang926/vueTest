// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/permission' // permission control

import axios from 'axios'
import VeeValidate from 'vee-validate'

axios.defaults.baseURL = 'http://192.168.1.31:1202/onet-oss';// 提交测试服务
//axios.defaults.baseURL = 'http://192.168.1.60:1202/onet-oss';// 开发

//echats
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

//map
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key:'72cc083a39134dad4acf0d47f499a463',
  plugin:['AMap.Geolocation']
});

import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const i18n = new VueI18n({

  locale: 'zh_CN',
});
const config = {
  dictionary: {
    zh_CN
  },
  i18n,
  i18nRootKey: 'validation',
  // errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags',
  // fieldsBagName: 'fields',
};
Vue.use(VeeValidate, config);
// //end
//
Vue.config.productionTip = false;
//
Vue.use(ElementUI)
Vue.use(VeeValidate, { inject: false })

import * as filters from './filters/index'//过滤器
Object.keys(filters).forEach(key => {//过滤器挂载在vue上
  Vue.filter(key, filters[key])
})


// //安装时间过滤器后引入
import moment from 'moment'
//
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});
Vue.filter('day', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});

import store from './store'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;


router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)){
    // 对路由进行验证
    if(localStorage.getItem('authkey')) { // 已经登陆
      next()   // 正常跳转到你设置好的页面
    }
    else{
      next({
        path:'/login',
      })
    }
  }else{
    next()
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
