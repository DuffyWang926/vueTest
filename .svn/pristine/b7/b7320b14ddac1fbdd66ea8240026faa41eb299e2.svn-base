import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  checkPassword

} from '@/api/PublicApi/checkPassword.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');

const publicUrl = {
  state: {
    isCheck:false

  },

  mutations: {
    



  },

  actions: {
    //check password 
    postCheckPassword({commit,state},data){
      let body ={                //类型：Object  必有字段  备注：业务参数
          "dlmm":data               //类型：String  必有字段  备注：操作密码
      }
      state.isCheck = false;
      return  new Promise((resolve, reject) => {
        checkPassword(body).then(response => {
          state.isCheck=true;
            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    

    
  }
}

export default publicUrl
