import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  getUserMemberArrears,
  getUserMemberWallet,
  findUserMemberCarPage,
  findUserMemberRechargePage,
  findUserMemberBuyPage,
  findUserMemberUnbindPage,
  findUserMemberChangePage,
  getUserMemberInfo,
  getUserMemberCompany

} from '@/api/DetailsDataAll/detailsData.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');
let dateZero = new Date(new Date().toLocaleDateString()).getTime();
const companyVip = {
  state: {
    checkData:{
      title:'',
      debtData:{

      },
      walletData:{
        
      },
      personalInfo:{

      }
    },
    companyInfo:{},
    checkDataCarQuery:{                //类型：Object  必有字段  备注：业务参数
      "parameter":{                //类型：Object  必有字段  备注：业务参数
        "yhid":0                //类型：String  必有字段  备注：会员ID
    },
    "current":1,                //类型：Number  必有字段  备注：分页页数
    "size":3               //类型：Number  必有字段  备注：显示条数
    },
    checkDataCar:{

    },
    detailCarData:{

    },
    loadingCar:true,
    rechargeData:{},       //充值数据
    rechargeQuery:{                //类型：Object  必有字段  备注：业务参数
      "parameter":{                //类型：Object  必有字段  备注：业务参数
        "yhid":0                //类型：String  必有字段  备注：会员ID
    },
    "current":1,                //类型：Number  必有字段  备注：分页页数
    "size":10               //类型：Number  必有字段  备注：显示条数
    },
    loadingRecharge:true,
    buyData:{},       //购买数据
    buyQuery:{                //类型：Object  必有字段  备注：业务参数
      "parameter":{                //类型：Object  必有字段  备注：业务参数
        "id":0                //类型：String  必有字段  备注：会员ID
    },
    "current":1,                //类型：Number  必有字段  备注：分页页数
    "size":10                //类型：Number  必有字段  备注：显示条数
    },
    buyLoading:true,
    bindRecordData:{},       //bind数据
    bindRecordQuery:{                //类型：Object  必有字段  备注：业务参数
      "parameter":{                //类型：Object  必有字段  备注：业务参数
        "id":0                //类型：String  必有字段  备注：会员ID
    },
    "current":1,                //类型：Number  必有字段  备注：分页页数
    "size":10                //类型：Number  必有字段  备注：显示条数
    },
    bindRecordLoading:true,
    changeRecordData:{},       //change数据
    changeRecordQuery:{                //类型：Object  必有字段  备注：业务参数
      "parameter":{                //类型：Object  必有字段  备注：业务参数
        "yhid":0                //类型：String  必有字段  备注：会员ID
    },
    "current":1,                //类型：Number  必有字段  备注：分页页数
    "size":10                //类型：Number  必有字段  备注：显示条数
    },
    changeRecordLoading:true,

  },

  mutations: {
    CHANGE_DETAIL_ID:(state,data) =>{
      let id = 0
      if(data){
        id = data.id
      }

      state.id = id;
      state.checkDataCarQuery.parameter.yhid = id;
      state.rechargeQuery.parameter.yhid = id;
      state.buyQuery.parameter.yhid = id;
      state.bindRecordQuery.parameter.yhid = id;
      state.changeRecordQuery.parameter.yhid = id;

    }



  },

  actions: {
    // checkData 
    checkCompanyData({commit,state},data){
      let body ={
        id: state.id*1
      }
      //会员欠费
      let promise1 = new Promise((resolve, reject) => {
        getUserMemberArrears(body).then(response => {
          state.checkData.debtData = response.result
          if(response.result){
            state.checkData.debtData.qkje = response.result.qkje/100 ;
          }
          
          
            resolve()
          }).catch(error => {
            console.log(error)
          })
      }) 
      let bodyWallet ={
        yhid:state.id
      }
      //会员钱包 finished
      
      let promise2 = new Promise((resolve, reject) => {
        getUserMemberWallet(bodyWallet).then(response => {
          state.checkData.walletData = response.result
          if(response.result){
            state.checkData.walletData.zje = response.result.zje/100 ;
            state.checkData.walletData.czje = response.result.czje/100 ;
            state.checkData.walletData.ykpje = response.result.ykpje/100 ;
            state.checkData.walletData.wkpje = response.result.wkpje/100 ;
            state.checkData.walletData.zsje = response.result.zsje/100 ; 
            
            
          }

            resolve()
          }).catch(error => {
            console.log(error)
          })
      })
      

      
      
      return Promise.all([promise1, promise2]).then(function(values) {
            console.log(values);
          }).catch(error => {
            console.log(error)
          })
    },
    //会员绑定车辆 
    findUserMemberCarPageData({commit,state},data){
      if(data){
        if(data.current){
          state.checkDataCarQuery.current = data.current;
        }else if(data.id){
          state.checkDataCarQuery.parameter.yhid =  data.id;
        }
      }
      state.loadingCar = true;
      return  new Promise((resolve, reject) => {
        findUserMemberCarPage(state.checkDataCarQuery).then(response => {
          state.detailCarData = response.result
          state.loadingCar = false;
          if(state.detailCarData){
            let list = state.detailCarData.records
            for(let i = 0,len = list.length; i<len; i++){
              state.detailCarData.records[i].cjsj = state.detailCarData.records[i].bdrq && moment(state.detailCarData.records[i].bdrq*1000).format('YYYY-MM-DD HH:mm:ss')
            }

          }
          

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //会员充值记录 
    findUserMemberRechargePageData({commit,state},data){
      if(data){
        if(data.current){
          state.rechargeQuery.current = data.current;
        }else if(data.id){
          state.rechargeQuery.parameter.yhid = data.id;
        }
      }
      state.loadingRecharge = true;
      return  new Promise((resolve, reject) => {
        findUserMemberRechargePage(state.rechargeQuery).then(response => {
          state.rechargeData = response.result
          state.rechargeData.records = response.result && response.result.records.map((v,i) =>{
            v.czje = v.czje/100
            return v
          })
          state.loadingRecharge = false;

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //会员buy记录 
    findUserMemberBuyPageData({commit,state},data){
      if(data){
        if(data.current){
          state.buyQuery.current = data.current;
        }else if(data.id){
          state.buyQuery.parameter.yhid = data.id;
        }
      }
      state.buyLoading = true;
      return  new Promise((resolve, reject) => {
        findUserMemberBuyPage(state.buyQuery).then(response => {
          state.buyData = response.result
          state.buyData.records = response.result && response.result.records.map((v,i) =>{
            v.zfsj = moment(state.buyData.records[i].zfsj *1000).format('YYYY-MM-DD HH:mm:ss')
            v.zfje = v.zfje/100;

            return v

          })
          state.buyLoading = false;
         


            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //会员bind记录 
    findUserMemberUnbindPageData({commit,state},data){
      if(data){
        if(data.current){
          state.bindRecordQuery.current = data.current;
        }else if(data.id){
          state.bindRecordQuery.parameter.yhid = data.id;
        }
        
      }
      state.bindRecordLoading = true;
      return  new Promise((resolve, reject) => {
        findUserMemberUnbindPage(state.bindRecordQuery).then(response => {
          state.bindRecordData = response.result
          state.bindRecordLoading = false;

          if(state.bindRecordData){
            let list = state.bindRecordData.records
            for(let i = 0,len = list.length; i<len; i++){
              state.bindRecordData.records[i].bdrq = moment(state.bindRecordData.records[i].bdrq*1000).format('YYYY-MM-DD HH:mm:ss')
              if( state.bindRecordData.records[i].jbrq == 0){
                state.bindRecordData.records[i].jbrq = ''
              }else{
                state.bindRecordData.records[i].jbrq =  state.bindRecordData.records[i].jbrq &&　moment(state.bindRecordData.records[i].jbrq*1000).format('YYYY-MM-DD HH:mm:ss')

              }
              
              let data = state.bindRecordData.records[i].jllx;
              switch(data){
                case 1:
                  data = '绑定';
                  break;
                case 2:
                  data = '解绑';
                  break;
                case 3:
                  data = '认证';
                  break;
                case 4:
                  data = '找回';
                  break;
                default:
                  break;
              }
              state.bindRecordData.records[i].jllx = data;
            }

          }

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //会员change记录 
    findUserMemberChangePageData({commit,state},data){
      if(data){
        if(data.current){
          state.changeRecordQuery.current = data.current;
        }else if(data.id){
          state.changeRecordQuery.parameter.yhid = data.id;
        }
         
      }
      state.changeRecordLoading = true;
      return  new Promise((resolve, reject) => {
        findUserMemberChangePage(state.changeRecordQuery).then(response => {
          state.changeRecordData = response.result
          state.changeRecordLoading = false;

          if(state.changeRecordData){
            let list = state.changeRecordData.records
            for(let i = 0,len = list.length; i<len; i++){
              state.changeRecordData.records[i].bgsj = moment(state.changeRecordData.records[i].cjsj *1000).format('YYYY-MM-DD HH:mm:ss')
              let data = state.changeRecordData.records[i].xxlx;
              let bgq =state.changeRecordData.records[i].bgq;
              let bgh =state.changeRecordData.records[i].bgh;
              switch(data){
                case 1:
                  data = '手机号';
                  break;
                case 2:
                  data = '登录密码';
                  break;
                case 3:
                  data = '头像';
                  state.changeRecordData.records[i].imgBefore = state.changeRecordData.records[i].bgq;
                  // state.changeRecordData.records[i].imgBefore = "http://ttpark-test.oss-cn-shenzhen.aliyuncs.com/d930469f-75da-48bc-85ee-244eb27f91f9.png?Expires=1716618412&OSSAccessKeyId=LTAIssxgTmSLbzhs&Signature=R6w3xWLFE4Rboi4eZrf9WM1FzYo%3D&x-oss-process=image%2Fsharpen%2C100"
                  state.changeRecordData.records[i].imgAfter = state.changeRecordData.records[i].bgh;
                  state.changeRecordData.records[i].bgq= '';
                  state.changeRecordData.records[i].bgh = '';
                  break;
                case 4:
                  data = '姓名';
                  break;
                case 5:
                  data = '年龄';
                  
                  break;
                case 6:
                  data = '性别';
                  if(bgq == 1 ){
                    bgq = '男'
                  }else if(bgq == 2){
                    bgq = '女'
                  }else{
                    bgq = ''
                  }
                  if(bgh == 1 ){
                    bgh = '男'
                  }else if(bgh == 2){
                    bgh = '女'
                  }else{
                    bgh = ''
                  }
                  state.changeRecordData.records[i].bgq = bgq;
                  state.changeRecordData.records[i].bgh = bgh;
                  
                  break;
                default:
                  break;
              }
              state.changeRecordData.records[i].xxlx = data;
            }

          }

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    changeDetailId({dispatch,commit},data){
      data && commit('CHANGE_DETAIL_ID', data)
      let id = data.id;
      let yhid = data.id;
      let source = data.source;
      debugger
      dispatch('checkCompanyData',{id})
      dispatch('findUserMemberCarPageData',{id})
      dispatch('findUserMemberRechargePageData',{id})
      dispatch('findUserMemberBuyPageData',{id})
      dispatch('findUserMemberUnbindPageData',{id})
      dispatch('findUserMemberChangePageData',{id})
      if(source == 'personal'){
        dispatch('getUserMemberInfoData',{id})
      }else{
        dispatch('getUserMemberCompanyData',{id})

      }

      
      
    },
    //单位会员详情
    getUserMemberCompanyData({commit,state},data){
      if(data){

        state.changeRecordQuery.current = data.current;
      }
      state.changeRecordLoading = true;
      let companyBody = {                //类型：Object  必有字段  备注：业务参数
          "parameter":{                //类型：Object  必有字段  备注：业务参数
            "id":state.id*1                //类型：String  必有字段  备注：会员ID
            },
            "current":1,                //类型：Number  必有字段  备注：分页页数
            "size":1               //类型：Number  必有字段  备注：显示条数
          };
      return  new Promise((resolve, reject) => {
        getUserMemberCompany(companyBody).then(response => {
          state.companyInfo = response.result
          if(state.companyInfo){
            let time = +dateZero + state.companyInfo.jzsj
            state.companyInfo.jzsj = moment(time).format('HH:mm:ss')
            if(state.companyInfo.jzfs == 1){
              state.companyInfo.jzfs = '普通' 
              state.companyInfo.payMethod = state.companyInfo.jzfs
            }else if(state.companyInfo.jzfs == 2){
              state.companyInfo.jzfs = '月结' 
              if(state.companyInfo.jzrq == 0){
                state.companyInfo.payMethod = state.companyInfo.jzfs+ ', '  + '月底, '+state.companyInfo.jzsj
              }else{
                state.companyInfo.payMethod = state.companyInfo.jzfs+ ', ' +state.companyInfo.jzrq + '日, '+state.companyInfo.jzsj
              }
              
            }else{
              state.companyInfo.jzfs = '无' 
            }
            
            

          }
          

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //个人会员详情
    getUserMemberInfoData({commit,state},data){
      //会员info 
      let userBody = {                //类型：Object  必有字段  备注：业务参数
        "parameter":{                //类型：Object  必有字段  备注：业务参数
          "id":state.id*1                //类型：String  必有字段  备注：会员ID
      },
      "current":1,                //类型：Number  必有字段  备注：分页页数
      "size":1                //类型：Number  必有字段  备注：显示条数
    };
     return new Promise((resolve, reject) => {
      getUserMemberInfo(userBody).then(response => {
        state.checkData.personalInfo = response.result
        if(response.result){
          let sex = response.result && response.result.sex;
          if(sex == 1){
            sex = '男'
          }else if(sex == 2){
            sex = '女'
          }else{
            sex = '无'
          }
          state.checkData.personalInfo.sex = sex;

        }
        
          resolve()
        }).catch(error => {
          console.log(error)
        })
    })
    },
    
    

    
  }
}

export default companyVip
