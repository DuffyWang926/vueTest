import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import router from '@/router'
// 创建axios实例

const formservice = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000, // 请求超时时间
  headers:{
    "Content-Type":"multipart/form-data",
    // "authKey" :store.getters.authkey,
    "authKey" : localStorage.getItem('authkey'),
    "appType":5,
    "version":'1.0.01',
    'Cache-Control': 'no-cache'
  }
});

formservice.interceptors.request.use(
  config => {
    // console.log(config,'config')
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// response 拦截器
formservice.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(res)
    if (Number(res.code) !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 2 * 1000
      });

      if (Number(res.code) === 1002 || Number(res.code) === 1003) {
        MessageBox.confirm(
          '登陆已过期，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          localStorage.removeItem('authkey');
          localStorage.removeItem('SHID');
          localStorage.removeItem('sysUser');
          localStorage.removeItem('resources');
          localStorage.removeItem('sysDicts');
          router.replace({
            path: 'login',
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)


export default formservice



