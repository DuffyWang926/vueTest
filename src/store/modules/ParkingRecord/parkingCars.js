import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  findParkingRecordPage,
  getUserMemberInfoPark,
  manualLeaveParking,
  findDictPage
  

} from '@/api/ParkingRecord/parkingCars.js'

import { type } from 'os';
import moment from 'moment';
import { Message } from 'element-ui';
import enumeration from '@/enumeration/enumeration'
import { stat } from 'fs';
import publicUrl from '../PublicApi/publicUrl'
moment.locale('zh-cn');

const appInvoice = {
  state: {
    listQuery:{
        "parameter": {                //类型：Object  可有字段  备注：业务参数
            "hphm":null,                //类型：String  可有字段  备注：车牌号码 
            "cwbh":null,                //类型：String  可有字段  备注：车位编号
            "ccbh":null,               //类型：String  可有字段  备注：停车场编号
            "gsid":null,                //类型：Number  可有字段  备注：公司Id
            "qybh":null,                //类型：Number  可有字段  备注：区域编号
            "arrears":null,               //类型：Boolean  可有字段  备注：是否欠费
            "startTime":null,                //类型：String  可有字段  备注：开始时间
            "endTime":null,               //类型：String  可有字段  备注：结束时间
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
    leaveReasonData:[],
    pageNum:''

    
  },
  mutations: {
    CHANGE_PARKING_CARS_QUERY:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('hphm')){
          if(!data.hphm){
            state.listQuery.parameter.hphm = null;
          }else{
            state.listQuery.parameter.hphm = data.hphm
          }
        }else if(data.hasOwnProperty('startTime')){
          state.listQuery.parameter.startTime = moment(data.startTime).unix()
        }else if(data.hasOwnProperty('qybh')){
          state.listQuery.parameter.qybh = data.qybh
        }else if(data.hasOwnProperty('gsid')){
          state.listQuery.parameter.gsid = data.gsid
        }else if(data.hasOwnProperty('ccbh')){
          state.listQuery.parameter.ccbh = data.ccbh
        }else if(data.hasOwnProperty('cwbh')){
          state.listQuery.parameter.cwbh = data.cwbh
        }else if(data.hasOwnProperty('current')){
          state.listQuery.current = data.current
        }else if(data.hasOwnProperty('arrears')){
          let arrears = data.arrears
          
          if(arrears === '0'){
            arrears = false;
          }else if(arrears == 1){
            arrears = true;
          }else if(!arrears){
            arrears = null;
          }
          state.listQuery.parameter.arrears = arrears
        }
        
        if(data.hasOwnProperty('endTime')){
          state.listQuery.parameter.endTime = moment(data.endTime).unix()
        }
        if(data.isClear){
          state.listQuery.parameter.hphm=null;
          state.listQuery.parameter.cwbh=null;
          state.listQuery.parameter.ccbh=null;
          state.listQuery.parameter.gsid=null;
          state.listQuery.parameter.qybh=null;
          state.listQuery.parameter.arrears=null;
          state.listQuery.parameter.startTime=null;
          state.listQuery.parameter.endTime=null;
          state.listQuery.current = 1;
        }
        
      }
      
    },
    CHANGE_PARKING_CARS_DIALOGUE:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('manualLeaveVisible')){
          state.manualLeaveVisible = data.manualLeaveVisible
        }
      } 
    }



  },

  actions: {
    //设置query
    changeParkingCarsQuery({commit},data){
      commit('CHANGE_PARKING_CARS_QUERY',data)
    },
    findParkingRecordPageData({ commit,state }, data) {
      
      
        state.tableDataLoading = true;
        if(data){
          if(data.current){
          state.listQuery.current = data.current;
          }
        }
      return new Promise((resolve, reject) => {
        findParkingRecordPage(state.listQuery).then(response => {
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
              v.rwsj = moment(v.rwsj*1000).format('YYYY-MM-DD HH:mm:ss')
              v.rwsjly = enumeration.parkDevice.map( (val,index) =>{
                if(val.value == v.rwsjly){
                  v.rwsjly = val.label
                }

              })
              v.arrears = v.arrears/100
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
          let accountId = res.yhid;
          if(accountId == -1 || accountId == 0){
            res.yhid = ''
          }
          // res.cpys = enumeration.colorList[+res.cpysNum -1].label;
          state.manualLeaveData =res

 
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //post 人工离场
    
    postManualLeaveParking({ dispatch,commit,state }, data) {
          let passwordVal = data.password
          if(data.createOrder){
            data.leaveTime = moment(data.leaveTime).unix()
          }else{
            data.leaveTime =''
          }
          if(data.pageNum){
            state.pageNum = data.pageNum;

          }
          
          delete data.password;
          delete data.pageNum;
          let body = data
          dispatch('publicApi/postCheckPassword',passwordVal,{root:true}).then( () =>{
              if(publicUrl.state.isCheck){
                new Promise((resolve, reject) => {
                  manualLeaveParking(body).then(response => {
                    state.manualLeaveVisible = false;
                    Message.success(response.message)
                    if(data.pageNum === 'LonglyCar'){
                      dispatch('parkingRecord/findLongTimePageData','',{root:true})

                    }else{
                      dispatch('findParkingRecordPageData')
                    }
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
    changeParkingCarsDialogue({commit},data){
      commit('CHANGE_PARKING_CARS_DIALOGUE',data)
    },
    //后台离场原因
    findDictPageData({ commit,state }, data) {
      let body = {
        fid:1
      }
    return new Promise((resolve, reject) => {
      findDictPage(body).then(response => {
        state.leaveReasonData = response.result.records.map((v,i) =>{
           let res ={
             value:i +'',
             label:v.zdmc
           }
           
            return res
        })
        state.leaveReasonData.push({
          value: '-1',
          label: '其它'
          })


        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
    
    
  }
    
}

export default appInvoice

