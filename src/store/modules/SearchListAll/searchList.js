import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  findUserMemberNameSelect,
  findUserMemberAccountSelect,
  findCarSelect,
  findSsqySelect,
  findSysOrgSelect,
  findParkingGarageNameSelect,
  findParkingSpaceBhSelect,
  findDictType,
  findDictSelect,
  findParkingRoadSelect

} from '@/api/SearchList/searchList.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');

const searchList = {
  state: {
    namePost:{                //类型：Object  必有字段  备注：业务参数
        "yhxm":"",                //类型：String  必有字段  备注：会员姓名
        "yhlx":0               //类型：Number  必有字段  备注：用户类型 1：个人 2：公司
    },
    nameList:[],
    accountPost:{                //类型：Object  必有字段  备注：业务参数
        "hyzh":"",                //类型：String  必有字段  备注：会员账号
        "yhlx":0              //类型：Number  必有字段  备注：用户类型 1：个人 2：公司
    },
    accountList:[],
    platePost:{                //类型：Object  必有字段  备注：业务参数
      "hphm":""                //类型：String  必有字段  备注：号牌号码
    },
    plateList:[],
    regionPost:{},
    regionList:[],
    companyPost:{                //类型：Object  必有字段  备注：业务参数
        "gsid":1                //类型：Number  必有字段  备注：登录用户的公司ID
    },
    companyList:[],
    parkingPost:{                //类型：Object  必有字段  备注：业务参数
        "yygsid":"",                //类型：String  必有字段  备注：登录用户的公司ID
        "ccmc":""                //类型：String  可有字段  备注：车场名称
    },
    parkingList:[],
    parkingPlacePost:{                //类型：Object  必有字段  备注：业务参数
        "sbzjid":"",                //类型：String  必有字段  备注：登录用户的公司ID
        "cwbh":""                //类型：String  必有字段  备注：车位编号
    },
    parkingPlaceList:[],
    //字典
    dictionaryList:[],
    whiteListTypeNum:0,
    whiteListTypeList:[],
    blackListTypeList:[],
    discountListTypeList:[],
    roadPost:{
      dlmc:''
    },
    roadList:[]

  },
  mutations: {



  },

  actions: {
    //name
    findUserMemberNameSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("yhlx")){
          state.namePost.yhlx = data.yhlx;
        }else if(data.hasOwnProperty("hyxm")){
          state.namePost.yhxm = data.hyxm;
        }

      }
      return new Promise((resolve, reject) => {
        findUserMemberNameSelect(state.namePost).then(response => {
          state.nameList = response.result.map( (v,i) =>{
            console.log(v)
            let res ={
              value:v.label
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //account
    findUserMemberAccountSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("yhlx")){
          state.accountPost.yhlx = data.yhlx;
        }else if(data.hasOwnProperty("hyzh")){
          state.accountPost.hyzh = data.hyzh;
        }

      }
      return new Promise((resolve, reject) => {
        findUserMemberAccountSelect(state.accountPost ).then(response => {
          state.accountList = response.result.map( (v,i) =>{
            console.log(v)
            let res ={
              value:v.label
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //车牌
    findCarPlateSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("hphm")){
          state.platePost.hphm = data.hphm;
        }

      }
      return new Promise((resolve, reject) => {
        findCarSelect(state.platePost ).then(response => {
          state.plateList = response.result.map( (v,i) =>{
            let res ={
              value:v.label
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
     //region
     findSsqySelectList({ commit,state },data) {
      
      return new Promise((resolve, reject) => {
        findSsqySelect(state.regionPost ).then(response => {
          state.regionList = response.result.map( (v,i) =>{
            let res ={
              value:v.label,
              key:v.key
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //company
    findSysOrgSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("gsid")){
          state.companyPost.gsid = data.gsid;
        }

      }
      
      return new Promise((resolve, reject) => {
        findSysOrgSelect(state.companyPost ).then(response => {
          state.companyList = response.result.map( (v,i) =>{
            let res ={
              value:v.label,
              key:v.key
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //停车场list
    findParkingGarageNameSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("yygsid")){
          state.parkingPost.yygsid = data.yygsid;
        }else if(data.hasOwnProperty("ccmc")){
          state.parkingPost.ccmc = data.ccmc;
        }
        if(data.hasOwnProperty("gsid")){
          state.parkingPost.yygsid =data.gsid;
        }

      }
      return new Promise((resolve, reject) => {
        findParkingGarageNameSelect(state.parkingPost ).then(response => {
          state.parkingList = response.result.map( (v,i) =>{
            let res ={
              value:v.label,
              key:v.key
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //停车位list
    findParkingSpaceBhSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("yygsid")){
          state.parkingPlacePost.sbzjid = data.yygsid;
        }else if(data.hasOwnProperty("cwbh")){
          state.parkingPlacePost.cwbh = data.cwbh;
        }
        if(data.hasOwnProperty("gsid")){
          state.parkingPlacePost.sbzjid = data.gsid;
        }

      }
      return new Promise((resolve, reject) => {
        findParkingSpaceBhSelect(state.parkingPlacePost ).then(response => {
          state.parkingPlaceList = response.result.map( (v,i) =>{
            let res ={
              value: v.label+ '',
              key:v.key
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    //字典全部列表
    findDictTypeList({ commit,state },data) {
     let body = {}
      return new Promise((resolve, reject) => {
        findDictType(body ).then(response => {
          state.dictionaryList = response.result
          response.result.map((v,i) =>{
            if(v.zdmc == '白名单分类'){
              state.whiteListTypeNum = v.sbm;
            }
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    //字典详情
    findDictTypeList({ dispatch,commit,state },data) {
      let body = {}
       return new Promise((resolve, reject) => {
         findDictType(body ).then(response => {
           state.dictionaryList = response.result
           response.result.map((v,i) =>{
             if(v.zdmc == '白名单分类'){
               state.whiteListTypeNum = v.sbm;
               let res = {
                 name:'白名单分类',
                 typeNum: v.sbm
               }
               dispatch('findDictSelectList',res)
             }
           })
           resolve()
         }).catch(error => {
           console.log(error)
           reject(error)
         })
       })
     },

     //字典详情选择框
     findDictSelectList({ dispatch,commit,state },data) {
      let body={
        sbm:data

      }
       return new Promise((resolve, reject) => {
        findDictSelect(body).then(response => {
          let list =  response.result.map((v,i) =>{
            let res = {
              value:v.key,
              key:v.key,
              label:v.label
            }
            return res;
          })
            if(data == "102"){  //'白名单分类'
              state.whiteListTypeList = list;
              dispatch('specialCars/addWhiteListData',list,{root:true})

            }else if(data == "103"){  //'hei名单分类'
              state.blackListTypeList = list;
              dispatch('specialCars/addBlackListData',list,{root:true})
            }else if(data == "104"){  //'折扣名单分类'
              state.discountListTypeList = list;
              dispatch('specialCars/addDiscountListData',list,{root:true})
            }
           resolve()
         }).catch(error => {
           console.log(error)
           reject(error)
         })
       })
     },
     //road list
     findParkingRoadSelectList({ commit,state },data) {
      if(data){
        if(data.hasOwnProperty("dlmc")){
          state.roadPost.dlmc = data.dlmc;
        }

      }
      return new Promise((resolve, reject) => {
        findParkingRoadSelect(state.roadPost ).then(response => {
          state.roadList = response.result.map( (v,i) =>{
            let res ={
              value: v.label+ '',
              key:v.key
            }
            return res;
          })
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

     

    

    
  }
}

export default searchList

