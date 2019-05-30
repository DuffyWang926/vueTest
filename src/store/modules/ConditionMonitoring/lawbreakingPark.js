import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  findParkingIllegalByPage
} from '@/api/ConditionMonitoring/lawbreakingPark.js'
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
let now = new Date().now;
now = moment(now).unix();

const lawbreakingPark = {
  state: {
    listQuery:{
        "parameter": {                //类型：Object  可有字段  备注：业务参数
          "ccbh":null,                //类型：String  可有字段  备注：停车场编号
          "hphm":null,                //类型：Number  可有字段  备注：车牌号
          "yearMonth":null                //类型：Number  必有字段  备注：年-月份
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
    CHANGE_LAWBREAKING_PARKING_QUERY:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('yearMonth')){
          if(data.yearMonth){
          state.listQuery.parameter.yearMonth = moment(data.yearMonth).unix()
          }else{
            state.listQuery.parameter.yearMonth = null
          }
        }else if(data.hasOwnProperty('hphm')){
          if(data.hphm){
            state.listQuery.parameter.hphm = data.hphm
            }else{
              state.listQuery.parameter.hphm  = null 
            }
          
        }else if(data.hasOwnProperty('ccbh')){
          state.listQuery.parameter.ccbh = data.ccbh
        }else if(data.hasOwnProperty('current')){
          state.listQuery.current = data.current
        }
        if(data.isClear){
          state.listQuery.parameter.yearMonth=null;
          state.listQuery.parameter.ccbh=null;
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
    changeLawbreakingParkingQuery({commit},data){
      commit('CHANGE_LAWBREAKING_PARKING_QUERY',data)
    },
    findParkingIllegalByPageData({ commit,state }, data) {
        state.tableDataLoading = true;
      if(data){
        if(data.current){
          state.listQuery.current = data.current;
        }
      }
      return new Promise((resolve, reject) => {
        findParkingIllegalByPage(state.listQuery).then(response => {
          state.tableDataLoading = false;
          state.tableData= response.result
          state.tableData.records = response.result.records.map((v,i) =>{
            if(state.listQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.listQuery.current -1 ) * +state.listQuery.size);
            }

            v.cpysString = enumeration.colorList[v.cpys*1].label
            v.rwsj = v.rwsj &&　moment(v.rwsj*1000).format('YYYY-MM-DD HH:mm:ss')
              // v.rwsj = moment(v.rwsj).format('YYYY.MM.DD  h:mm:ss')
              // v.rwsjly = enumeration.parkDevice.map( (val,index) =>{
              //   if(val.value == v.rwsjly){
              //     v.rwsjly = val.label
              //   }

              // })
              return v
          })


          resolve()

        }).catch(error => {
           
          reject(error)
        })
      })
    },
  
  }
    
}

export default lawbreakingPark

