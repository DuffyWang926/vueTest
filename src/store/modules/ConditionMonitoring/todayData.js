import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  getParkingOrderCount,
  getParkingCount,
  getParkingDuration,
  getPdaUserCount,
  getTodayData
} from '@/api/ConditionMonitoring/todayData.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');


const todayData = {
  state: {
    dataQuery:{
      userCompanyId:2  //当前登录用户，所属公司id
    },
    parkRateData:{},   //营收pie data
    parkRateCon:'',
    parkCount:{   
    },
    parkDuration:{},
    userCount:{},     //员工pie data
    userStateData:{},
    userStateCon:{},
    parkDataX:['周一','周二','周三','周四','周五','周六','周日'],     //停车 data
    parkDataSeries:[
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [320, 332, 301, 334, 390, 330, 320],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ],
    profitDataX:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],   //收益 data
    profitDataSeries:[120, 200, 150, 80, 70, 110, 130]  

  },
  mutations: {



  },

  actions: {
    //今日数据
    getTodayDataObject({ commit,state },data) {
      debugger
      return new Promise((resolve, reject) => {
        getTodayData(state.dataQuery).then(response => {
         if(response.result){
           //营收数据
           let list= [
              {value:80, name:'1'},
              {value:20, name:'2'},
          ]
          list[0].value = +response.result.paymentRate;
          list[1].value = 100 - list[0].value;
          state.parkRateData = list;
          state.parkRateData.income = response.result.income ? +response.result.income/100 : '123';
          

         }
            resolve()
         debugger

        }).catch(error => {
          console.log(error)
          debugger
          reject(error)
        })
      })
    },
    // //pie data 
    // getParkingOrderCountData({ commit,state },data) {
    //   let body ={}
    //   return new Promise((resolve, reject) => {
    //     getParkingOrderCount(body).then(response => {
    //       let list= [
    //           {value:80, name:'1'},
    //           {value:20, name:'2'},
            
    //       ]
            
    //       list[0].value = +response.result.qksl
    //       list[1].value = +response.result.jfsl
    //       list.qksl = +response.result.qksl
    //       state.parkRateData = list;
    //       let sum = 0;
    //       for(let i=0,len = list.length;i <len;i++){
    //         sum += list[i].value
    //       }
    //       state.parkRateCon = parseInt((list[0].value/sum)*100) + '%';
            
    //         resolve()
    //     }).catch(error => {
    //       console.log(error)
    //       reject(error)
    //     })
    //   })
    // },
    // // park count
    // getParkingCountData({ commit,state },data) {
    //   let body ={}
    //   return new Promise((resolve, reject) => {
    //     getParkingCount(body).then(response => {
    //       let res = {} ;
    //       res.lntccs = response.result.lntccs;
    //       res.lwtccs = response.result.lwtccs;
    //       res.sum = +response.result.lntccs + +response.result.lwtccs;
        
    //       state.parkCount = res;
    //       resolve()
    //     }).catch(error => {
    //       console.log(error)
    //       reject(error)
    //     })
    //   })
    // },
    // // park duration
    // getParkingDurationData({ commit,state },data) {
    //   let body ={}
    //   return new Promise((resolve, reject) => {
    //     getParkingDuration(body).then(response => {
    //       let res = {} ;
    //       res.lntcsc = response.result.lntcsc;
    //       res.lwtcsc = response.result.lwtcsc;
    //       res.sum = +response.result.lntcsc + +response.result.lwtcsc;
        
    //       state.parkDuration = res;
    //       resolve()
    //     }).catch(error => {
    //       console.log(error)
    //       reject(error)
    //     })
    //   })
    // },
    // // user count
    // getPdaUserCountData({ commit,state },data) {
    //   let body ={}
    //   return new Promise((resolve, reject) => {
    //     getPdaUserCount(body).then(response => {
    //       let res = {} ;
    //       res.ygzs = response.result.ygzs;
    //       res.zgygs = response.result.zgygs;
    //       state.userCount = res;
    //       let list= [
    //         {value:80, name:'1'},
    //         {value:20, name:'2'},
    //     ]
    //     list[0].value = +response.result.ygzs
    //     list[1].value = +response.result.zgygs
    //     state.userStateData=list;
    //     let sum = 0;
    //     for(let i=0,len = list.length;i <len;i++){
    //       sum += list[i].value
    //     }
    //     state.userStateCon = parseInt((list[0].value/sum)*100) + '%';

    //       resolve()
    //     }).catch(error => {
    //       console.log(error)
    //       reject(error)
    //     })
    //   })
    // },
    

    
  }
}

export default todayData

