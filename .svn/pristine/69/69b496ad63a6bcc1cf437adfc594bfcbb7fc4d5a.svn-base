import { asyncRouterMap, constantRouterMap } from '@/router'
//mock接口未定义
import { 
  
  

} from '@/api/InvoiceManage/appInvoice.js'
import { type } from 'os';
import moment from 'moment';
import { Message } from 'element-ui';
import enumeration from '@/enumeration/enumeration'
import { stat } from 'fs';

moment.locale('zh-cn');

const pdaInvoice = {
  state: {
    listQuery:{
      "parameter": {                //类型：Object  必有字段  备注：业务参数
          "fptt":"",                //类型：String  可有字段  备注：发票抬头
          "nsrsbh":"",                //类型：String  可有字段  备注：纳税人识别号
          "yxdz":"",                //类型：String  可有字段  备注：邮箱地址
          "fpzt":1                //类型：Number  可有字段  备注：发票状态
      },
      "current":1,                //类型：Number  必有字段  备注：分页页数
      "size":1                //类型：Number  必有字段  备注：显示条数
    },
    tableDataLoading:false,
    tableData:{},
    isCheck:false,
    checkData:{}

    
  },
  mutations: {
    CHANGE_APP_QUERY:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('fptt')){
          state.listQuery.parameter.fptt = data.fptt
        }else if(data.hasOwnProperty('nsrsbh')){
          state.listQuery.parameter.nsrsbh = data.nsrsbh
        }else if(data.hasOwnProperty('yxdz')){
          state.listQuery.parameter.yxdz = data.yxdz
        }else if(data.hasOwnProperty('fpzt')){
          state.listQuery.parameter.fpzt = data.fpzt
        }else if(data.hasOwnProperty('current')){
          state.listQuery.current = data.current
        }
      }
    },
    CHANGE_CHECK_DIALOGUE:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('isCheck')){
          state.isCheck = data.isCheck
        }
      }
    }



  },

  actions: {
    //设置query
    // changeAppQuery({commit},data){
    //   commit('CHANGE_APP_QUERY',data)
    // },
    // findAppInvoicePageData({ commit,state }, data) {
    //     state.tableDataLoading = true;
    //     if(data){
    //       state.listQuery.current = data.current;
    //     }
    //   return new Promise((resolve, reject) => {
    //     findAppInvoicePage(state.listQuery).then(response => {
    //       state.tableDataLoading = false;
    //       state.tableData= response.result
    //       state.tableData.records = response.result.records.map((v,i) =>{
    //           v.fplx = enumeration.invoiceType[+v.fplx - 1].label
    //           v.fpzt = enumeration.invoiceState[+v.fpzt - 1].label
    //           v.tsfs = enumeration.sendMethod[+v.tsfs - 1].label
    //           v.cjsj = moment(v.cjsj).format('YYYY.MM.DD  h:mm:ss')
              
    //           return v
    //       })


    //       resolve()
    //     }).catch(error => {
    //        
    //       reject(error)
    //     })
    //   })
    // },
    // //check data
    // getAppInvoiceData({ commit,state }, data) {
    //    state.isCheck=false; 
    //    let body = {
    //      id:data.id
    //    }
    //   return new Promise((resolve, reject) => {
    //     getAppInvoice(body).then(response => {
    //       state.isCheck=true; 
    //       let checkDetails= response.result
    //       if(checkDetails.fpzt == 2){
    //         checkDetails.isFpzt = true;

    //       }
    //       checkDetails.fpzt = enumeration.invoiceState[+checkDetails.fpzt - 1].label
    //       checkDetails.cjsj = moment(checkDetails.cjsj).format('YYYY.MM.DD  h:mm:ss')
    //       checkDetails.fpsj = moment(checkDetails.fpsj).format('YYYY.MM.DD  h:mm:ss')
          
          
    //           // v.fplx = enumeration.invoiceType[+v.fplx - 1].label
    //           // v.tsfs = enumeration.sendMethod[+v.tsfs - 1].label
    //           // v.cjsj = moment(v.cjsj).format('YYYY-MM-DD  h:mm:ss')
              
    //       state.checkData.checkDetails =checkDetails


    //       resolve()
    //     }).catch(error => {
    //        
    //       reject(error)
    //     })
    //   })
    // },
    // //invoice content  data
    // getAppInvoiceInfo({ commit,state }, data) {
    //     state.isCheckTable=true; 
    //       let body = {
    //         fpid:data.id
    //       }
    //     return new Promise((resolve, reject) => {
    //       findAppInvoiceInfo(body).then(response => {
    //         state.isCheckTable=false; 
    //         let checkTable = response.result.map((v,i) =>{
    //           v.ddlx = enumeration.orderType[+v.ddlx -1].label;
    //           v.jysj = moment().format('YYYY.MM.DD  h:mm:ss')
    //           return v
    //         })
            
    //         let data = JSON.parse(JSON.stringify(state.checkData));
    //         data.checkTable = checkTable
    //         state.checkData = data;
            


    //         resolve()
    //       }).catch(error => {
    //          
    //         reject(error)
    //       })
    //     })
    // },
   
    
  }
    
}

export default pdaInvoice

