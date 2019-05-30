import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import { objectCompare} from "@/utils/objectCompare.js"
import moment from 'moment'
// 创建axios实例

let downloadservice = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url

  timeout: 10000, // 请求超时时间
  headers:{
    "Content-Type":'application/json;charset=UTF-8',
    'Cache-Control': 'no-cache',
    // "authKey" :store.getters.authkey,
    "authKey" : localStorage.getItem('authkey'),
    "appType":5,
    "version":'1.0.01'
  },
  responseType:"blob"

});
let lastUrl = '';
let queryData = '';
downloadservice.interceptors.request.use(
  config => {
    console.log(config,'config')

    let flag = false;
    if( queryData && config.data){
       flag = objectCompare(queryData,config.data)
    }
    let date = new Date();
    if(lastUrl === config.url && flag){
      while (new Date() - date < 200) {
        continue;
      }

    }
    lastUrl = config.url;
    queryData = config.data;

    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// response 拦截器
downloadservice.interceptors.response.use(
  response => {
    console.log(response)
    const content = response.data
    const blob = new Blob([content], {type: "application/vnd.ms-excel;charset=UTF-8"})
    const fileName = moment().format('YYMMDDhhmmss')+'.xls'
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
    return response.status;
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

export default downloadservice