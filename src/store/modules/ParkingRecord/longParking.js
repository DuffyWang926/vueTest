import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  findLongTimePage
} from '@/api/ParkingRecord/longParking.js'
import { 
  getUserMemberInfoPark,
  manualLeaveParking
} from '@/api/ParkingRecord/parkingCars.js'
import { type } from 'os';
import moment from 'moment';
import { Message } from 'element-ui';
import enumeration from '@/enumeration/enumeration'
import { stat } from 'fs';
import publicUrl from '../PublicApi/publicUrl'
moment.locale('zh-cn');

const longParking = {
  state: {
    listQuery:{
        "parameter": {                //类型：Object  可有字段  备注：业务参数
            "ccbh":null,                //类型：String  可有字段  备注：停车场编号
            "gsid":null,                //类型：Number  可有字段  备注：公司Id
            "qybh":null,                //类型：Number  可有字段  备注：区域编号
            "dayNum":1                //类型：Number  必有字段  备注：超长天数>=?
        },
        "current":1,                //类型：Number  可有字段  备注：分页页数
        "size":10                //类型：Number  可有字段  备注：显示条数
    },
    tableDataLoading:false,
    tableData:{},
    isCheck:false,
    checkData:{},
    manualLeaveData:{},
    manualLeaveVisible:false,

    
  },
  mutations: {
    CHANGE_LONG_PARKING_QUERY:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('qybh')){
          state.listQuery.parameter.qybh = data.qybh
        }else if(data.hasOwnProperty('gsid')){
          state.listQuery.parameter.gsid = data.gsid
        }else if(data.hasOwnProperty('ccbh')){
          state.listQuery.parameter.ccbh = data.ccbh
        }else if(data.hasOwnProperty('dayNum')){
          if(data.dayNum){
            state.listQuery.parameter.dayNum = data.dayNum
          }else{
            state.listQuery.parameter.dayNum = 1
          }
        }else if(data.hasOwnProperty('current')){
          state.listQuery.current = data.current
        }
        if(data.isClear){
          state.listQuery.parameter.ccbh=null;
          state.listQuery.parameter.gsid=null;
          state.listQuery.parameter.qybh=null;
          state.listQuery.parameter.dayNum=1
          
        }
        
      }
      
    },
    CHANGE_LONG_PARKING_DIALOGUE:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('manualLeaveVisible')){
          state.manualLeaveVisible = data.manualLeaveVisible
        }
      } 
    }



  },

  actions: {
    //设置query
    changeLongParkingQuery({commit},data){
      commit('CHANGE_LONG_PARKING_QUERY',data)
    },
    findLongTimePageData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
          }
        }
        
      return new Promise((resolve, reject) => {
        findLongTimePage(state.listQuery).then(response => {
          state.tableDataLoading = false;
          state.tableData= response.result
          state.tableData.records = response.result.records.map((v,i) =>{
              if(state.listQuery.current == 1){
                v.webIndex = i+1;
              }else{
                v.webIndex = i+1+((state.listQuery.current -1 ) * +state.listQuery.size);
              }
              v.cpysNum =  v.cpys
              // v.cpys = enumeration.colorList[v.cpys*1].label
              v.cpysString = enumeration.colorList[v.cpys*1].label

              v.rwsj = moment(v.rwsj*1000).format('YYYY.MM.DD  h:mm:ss')
              v.rwsjly = enumeration.parkDevice.map( (val,index) =>{
                if(val.value == v.rwsjly){
                  v.rwsjly = val.label
                }

              })
              return v
          })


          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //人工离场 data
    getUserMemberInfoParkData({ commit,state }, data) {
      if(data){
        if(data.yhid == -1){
          data.isPersonal = false;
          state.manualLeaveData = data

        }
      }
       
       let body = {
         id:data.yhid
       }
      return new Promise((resolve, reject) => {
        getUserMemberInfoPark(body).then(response => {
          let res = data;
          if(response.result){
            res.yhxm = response.result.yhxm
            res.sjh = response.result.sjh
            
          }
          
          res.isPersonal = true;
          state.manualLeaveData =res

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //post 人工离场
    
    postLongManualLeaveParking({ dispatch,commit,state }, data) {
          let passwordVal = data.password
          data.leaveTime = moment(data.leaveTime).unix()
          delete data.password;
          let body = data

          dispatch('publicApi/postCheckPassword',passwordVal,{root:true}).then( () =>{
              if(publicUrl.state.isCheck){
                new Promise((resolve, reject) => {
                  manualLeaveParking(body).then(response => {
                    state.manualLeaveVisible = false;
                    Message.success(response.message)
                    resolve()
                  }).catch(error => {
                    
                    reject(error)
                  })
                })
    
              }else{
                Message.error('密码错误')
              }
    
            }
            
          )
       
    },
    // 控制弹窗开关
    changeLongParkingCarsDialogue({commit},data){
      commit('CHANGE_LONG_PARKING_DIALOGUE',data)
    }
    
  }
    
}

export default longParking

