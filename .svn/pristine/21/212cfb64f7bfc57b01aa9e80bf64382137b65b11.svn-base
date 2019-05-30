import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

import store from '../store'
// 创建axios实例

let service = axios.create({

  timeout: 10000, // 请求超时时间
  headers:{
    "Content-Type":'application/json',
    // "authKey" :store.getters.authkey,
    "authKey" :localStorage.getItem("authkey"),
    "appType":5,
    "version":'1.0.01'
    }
});
// console.log(store.getters.authkey)
// request拦截器
service.interceptors.request.use(
  config => {
    console.log(config,'config')
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// // get拦截器
// service.interceptors.get.use(
//   config => {
//     console.log(config,'config')
//     return config
//   },
//   error => {
//     // Do something with get error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (Number(res.code) !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 2 * 1000
      })

      if (Number(res.code) === 1002 ) {
        MessageBox.confirm(
          '登陆已过期，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          window.location.href = "/login";
          localStorage.removeItem('authkey');
          localStorage.removeItem('resources');
          localStorage.removeItem('sysUser')
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
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




export default service
