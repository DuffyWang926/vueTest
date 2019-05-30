import { asyncRouterMap, constantRouterMap } from '@/router'

import { fetchCompanyVipList,fetchCompanyVipAdd ,fetchCompanyVipChange, fetchCompanyVipDelete, fetchCompanyVipBindList,
  fetchCompanyVipBindCar,
  exportUserMemberCompany,
  getUserMemberInfo
} from '@/api/Vipmaintain/CompanyVip.js'
import {  unbindUserMemberCar} from '@/api/Vipmaintain/PersonVip.js'
import { type } from 'os';
import moment from 'moment';
import { Message } from 'element-ui';
import enumeration from '@/enumeration/enumeration'
moment.locale('zh-cn');

let date = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
let dateZero = new Date(new Date().toLocaleDateString()).getTime();
const companyVip = {
  state: {
    listQuery:{
        parameter:  {                //类型：Object  必有字段  备注：业务参数
            gsmc:"",                //类型：String  必有字段  备注：公司名称
            lxr:"",                //类型：String  必有字段  备注：负责人姓名
        },
        current:1,                //类型：Number  必有字段  备注：分页页数 
        size:10                //类型：Number  必有字段  备注：显示条数 regex:^[[0-9a-zA-Z]|[\u4e00-\u9fa5]]+$
    },
    tableData:{
      records:null
    },
    tableDataLoading:true,
    addDataVisible:false,
    addData:{  //添加弹窗
        title:'新增单位会员',
        inputData:[
          {
            name:'公司名称',
            type:"required|regex:^[\u4e00-\u9fa5]+$",
            data:'',
          },
          {
            name:'联系人姓名',
            type:"required|max:5|regex:^[\u4e00-\u9fa5]+$",
            data:'',
          },
          {
            name:'联系人电话',
            type:"required|numeric|digits:11",
            data:'',
          },
          {
            name:'联系邮箱',
            type:"required|email",
            data:'',
          },
        ],
        checkData:{
          title:'结账方式',
          radio:1,
          data:[{
            name:'普通'
          },
          {
            name:'月结',
            selectData:true
          }
          ]
        },
        selectData:{
          title:'结账时间',
          timeData:'',
          timeDataCon:'00:00:00',
          data:[
            {
              value:'0',
              options: enumeration.dayList,
            },
            
          ]
        }
    },
    changeVipData:{},
    changeData:{  //修改弹窗
      title:'修改单位会员',
      id:0,
      inputData:[
        {
          name:'会员账号',
          data:'',
          type:"",
          disabled:true
        },
        {
          name:'公司名称',
          type:"required|max:15|regex:^[\u4e00-\u9fa5]+$",
          data:'',
        },
        {
          name:'联系人姓名',
          type:"required|max:5|regex:^[\u4e00-\u9fa5]+$",
          data:'',
        },
        {
          name:'联系人电话',
          type:"required|numeric|digits:11",
          data:'',
        },
        {
          name:'联系邮箱',
          type:"required|email",
          data:'',
        }
      ],
      checkData:{
        title:'结账方式',
        radio:1,
        data:[{
          name:'普通'
        },
        {
          name:'月结',
          selectData:true
        }
        ]
      },
      selectData:{
        title:'结账时间',
        timeDataCon:'00:00:00',
        timeData:date,
        data:[
          {
            options: enumeration.dayList,
            value:'0'
            
          },
          
        ]
      }

    },
    bindListQuery:{
      "parameter": {                //类型：Object  必有字段  备注：业务参数
        yhid:0               //类型：String  必有字段  备注：会员ID
      },
      "current":1,                //类型：Number  必有字段  备注：分页页数
      "size":10                //类型：Number  必有字段  备注：显示条数
    },
    bindData:{
      title:'单位会员车辆解绑',
      data:{
        records:null
      }
    },
    bindDataLoading:true,
    bindFormData:{  //添加弹窗
      title:'单位会员绑定车辆',
      // message:{
      //   style:{background:'yellow',fontSize:'14px',width:'300px',height:'200px',top:'25%',left:'55%'},
      //   msg:'1、如果该车有未缴费订单时，提醒操作员，如果绑定，未缴费订单的欠费将归入该公司名下<br><br>2、如果该车已经被绑定，则绑定失败。'
      // },
      inputData:[
        {
          name:'公司名称',
          data:'required|regex:^[\u4e00-\u9fa5]+$',
          disabled:true
        },
        {
          name:'车牌号码',
          type:"required",
          data:'',
        },
        {
          name:'车牌颜色',
          type:"required|max:3|regex:^[\u4e00-\u9fa5]+$",
          data:'',
        },
      ],
      selectList2:{
        listData:[{
          title:'车辆类型',
          data:{
            options:enumeration.carTypeList
            
          },
          value:'1'
        }]
      },
      inputData2:[
        {
          name:'负责人姓名',
          type:"required|max:5|regex:^[\u4e00-\u9fa5]+$",
          data:'',
        },
        {
          name:'负责人电话',
          type:"required|numeric|digits:11",
          data:'',
        },
      ],
      
    },
    

  },

  mutations: {
    // 表格数据
    GET_VIP_DATA: (state, data) => {
      state.tableData = data
    },
    CHANGE_LIST_QUERY:(state,data) =>{
      if(data.hasOwnProperty('gsmc')){
        state.listQuery.parameter.gsmc = data.gsmc
      }else if(data.hasOwnProperty('lxr')){
        state.listQuery.parameter.lxr = data.lxr
      }
    },
//修改弹窗的数据
    CHANGE_COMPANY_DATA: (state, data) => {
      console.log(data)
      state.changeVipData = data;
      let payDay = state.changeVipData.jzrq;
      if(payDay == 0){
        payDay = '最后一天'
      }

      state.changeData.id = state.changeVipData.id;
      state.changeData.inputData[0].data = state.changeVipData.dlmc;
      state.changeData.inputData[1].data = state.changeVipData.gsmc;
      state.changeData.inputData[2].data = state.changeVipData.lxr;
      state.changeData.inputData[3].data = state.changeVipData.sjh;
      // state.changeData.inputData[4].data = state.changeVipData.yxdz;
      let radioString = state.changeVipData.jzfs
      let radio =1
      if(radioString === "普通"){
        radio =1
      }else if(radioString === "月结"){
        radio =2
      }
      state.changeData.checkData.radio = radio;
      
      
      state.changeData.selectData.data[0].value = payDay;
      state.changeData.selectData.timeDataCon = moment(state.changeVipData.jzsj*1000).format('YYYY-MM-DD HH:mm:ss') +'';
    },
    
    //bind弹窗的数据
    BIND_COMPANY_DATA: (state, data) =>{
      state.bindData.data = data;
      state.bindData.data.records = data.records.map((v,i) =>{
        if(state.bindListQuery.current == 1){
          v.webIndex = i+1;
        }else{
          v.webIndex = i+1+((state.bindListQuery.current -1) * +state.bindListQuery.size);
        }
        
        v.cpysNum = v.cpys
        if( v.cpys >= 0 && v.cpys<enumeration.colorList.length){
          v.cpys = enumeration.colorList[v.cpys].label
        }
        v.clzl = enumeration.carTypeList[+v.clzl].label
        v.qfje = v.wzfje
        v.yhxm = v.lxr
        return v
      })
    },
    //change of bindListQuery
    SET_BINDE_QUERY:(state,data) =>{
      if(data.current){
        state.bindListQuery.current = data.current
      }
    },
    CHANGE_DIALOGUE_FLAG:(state,data) =>{
      if(data.hasOwnProperty('addDataVisible')){
        state.addDataVisible = data.addDataVisible
         //init addData
         state.addData.inputData[0].data=''                //类型：String  必有字段  备注：公司名称
         state.addData.inputData[1].data=''                //类型：String  必有字段  备注：联系人名称
         state.addData.inputData[2].data=''                //类型：String  必有字段  备注：联系电话
         state.addData.inputData[3].data=''               //类型：String  必有字段  备注：联系邮箱
         state.addData.checkData.radio=1               //类型：Number  必有字段  备注：结账方式
        state.addData.selectData.data[0].value='' 
        state.addData.selectData.timeData =''

      }else if(data.hasOwnProperty('changeDialogueVisible')){
        state.changeDialogueVisible = data.changeDialogueVisible
        // change 数据 init
        state.changeData.inputData3[0].data = ''
      }
      
    }



  },

  actions: {
    //弹窗开关
    changeDialogueFlag({ commit,state }, data){
      commit('CHANGE_DIALOGUE_FLAG',data)

    },
    // 表格数据
    getVipData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
          }
        }
      return new Promise((resolve, reject) => {
        fetchCompanyVipList(state.listQuery).then(response => {
          let data = response.result
          data.records = response.result.records.map((v,i) =>{
            if(state.listQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.listQuery.current -1 ) * +state.listQuery.size);
            }
            
            
            v.dlmc = v.hyzh;
            if( v.jzfs == 1){
              v.endTime = '--'
            }else if(v.jzfs == 2){
              let hourTime = +dateZero + v.jzsj;
              let hourTimeStrinng = moment(hourTime).format('HH:mm:ss')
              if(v.jzrq == 0){
                v.endTime =  '月底 ' + hourTimeStrinng
              }else{
                v.endTime = v.jzrq + '日 ' + hourTimeStrinng
              }
              
            }

           v.jzfs = enumeration.companyPayList[+v.jzfs -1].label;
            
            return v;
          })
          state.tableDataLoading = false;
          // state.addData.inputData[0].data = response.result.records[0].dlmc
          commit('GET_VIP_DATA', data)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    
    changeListQuery({commit},data){
      commit('CHANGE_LIST_QUERY', data)
    },
    //添加数据更改
    addCompanyData({ dispatch,commit,state }, data) {
      let timeData = state.addData.selectData.timeData || date;
      let momentData = +timeData - +dateZero
      let endTime = momentData ;
      let monthDay = state.addData.selectData.data[0].value || '0'
          let body = {
            "parameter": {                //类型：Object  必有字段  备注：业务参数
                // "dlmc": state.addData.inputData[0].data,                //类型：String  必有字段  备注：会员账号
                "gsmc": state.addData.inputData[0].data,                //类型：String  必有字段  备注：公司名称
                "lxr": state.addData.inputData[1].data,                //类型：String  必有字段  备注：联系人名称
                "sjh": state.addData.inputData[2].data,                //类型：String  必有字段  备注：联系电话
                "yxdz": state.addData.inputData[3].data,                //类型：String  必有字段  备注：联系邮箱
                "jzfs": state.addData.checkData.radio,                //类型：Number  必有字段  备注：结账方式
                "jzrq":  monthDay,                //类型：String  必有字段  备注：月结日期
                "jzsj": endTime          //类型：String  必有字段  备注：月结时间
            }
        }
        return new Promise((resolve, reject) => {
            console.log(state)
            fetchCompanyVipAdd(body).then(response => {

              dispatch('getVipData')
              //init addData
               state.addData.inputData[0].data=''                //类型：String  必有字段  备注：公司名称
               state.addData.inputData[1].data=''                //类型：String  必有字段  备注：联系人名称
               state.addData.inputData[2].data=''                //类型：String  必有字段  备注：联系电话
               state.addData.inputData[3].data=''               //类型：String  必有字段  备注：联系邮箱
               state.addData.checkData.radio=1               //类型：Number  必有字段  备注：结账方式
              state.addData.selectData.data[0].value='' 
              state.addData.selectData.timeData =''


              resolve()
            }).catch(error => {
              console.log(error)
              reject(error)
            })
          })
        
          //修改弹窗的数据
        },
    changeCompanyData({commit },data){
      commit('CHANGE_COMPANY_DATA', data)
    },
    getUserMemberInfoData({ commit,state }, data) {
        let body = {                //类型：Object  必有字段  备注：业务参数
              "id": data.id                //类型：Number  必有字段  备注：个人会员ID
          }
      return new Promise((resolve, reject) => {
        getUserMemberInfo(body).then(response => {
          if(response.result){
            state.changeData.inputData[4].data = response.result.yxdz;
          }
          commit('CHANGE_COMPANY_DATA', data)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    

    //修改弹窗的数据提交
    changeCompanyDataCommit( {dispatch,commit,state },data){
      let momentData = moment(state.changeData.selectData.timeData).format('YYYY-MM-DD HH:mm:ss')
      let endTime = moment(momentData).unix() ;
      let jzrq = state.changeData.selectData.data[0].value;
      if(jzrq === '最后一天'){
        jzrq = 0
      }
      let body = {
        "parameter": {                //类型：Object  必有字段  备注：业务参数
            "id": state.changeData.id,                //类型：String  必有字段  备注：单位会员ID
            "dlmc": state.changeData.inputData[0].data,                //类型：String  必有字段  备注：会员账号
            "gsmc": state.changeData.inputData[1].data,                //类型：String  必有字段  备注：公司名称
            "lxr": state.changeData.inputData[2].data,                //类型：String  必有字段  备注：联系人名称
            "sjh": state.changeData.inputData[3].data,                //类型：String  必有字段  备注：联系电话
            "yxdz": state.changeData.inputData[4].data,                //类型：String  必有字段  备注：联系邮箱
            "jzfs": state.changeData.checkData.radio,                //类型：Number  必有字段  备注：结账方式
            "jzrq": jzrq,                //类型：String  必有字段  备注：结账日期
            "jzsj": endTime             //类型：String  必有字段  备注：结账时间
        }
      }
      return new Promise((resolve, reject) => {
        fetchCompanyVipChange(body).then(response => {
          Message.success(response.message)
          dispatch('getVipData')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //删除数据提交
    deleteCompanyData( {dispatch,commit,state },data){
      let body = {
        "parameter": {                //类型：Object  必有字段  备注：业务参数
              "id":data.id                //类型：Number  必有字段  备注：会员ID
          }
      }
      let dataLength = state.tableData.records.length;
      return new Promise((resolve, reject) => {
        fetchCompanyVipDelete(body).then(response => {
          Message.success(response.message)
          if(dataLength == 1){
            if(state.listQuery.current >1){
              state.listQuery.current -= 1;
            }
          }
          dispatch('getVipData')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //bind弹窗的数据
    bindCompanyData({commit, state},data){
      state.bindDataLoading = true;
      
      return new Promise((resolve, reject) => {
        if(data){
          state.bindListQuery.parameter.yhid = data.id
          state.bindFormData.inputData[0].data = data.gsmc
        }
        fetchCompanyVipBindList(state.bindListQuery).then(response => {
          state.bindDataLoading = false;
          const data = response.result
          commit('BIND_COMPANY_DATA', data)
          resolve()
          
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //change of bindListQuery
    setBindQuery({commit},data){
      commit('SET_BINDE_QUERY', data)
    },
    // commit the data of bindCar
    postBindCar({dispatch,state}){
      let color = state.bindFormData.inputData[2].data;
      let colorNum = 0;
      enumeration.colorList.map((v,i) =>{
        if(v.label == color){
          colorNum = +v.value
        }
      })
      let carType = state.bindFormData.selectList2.listData[0].value || 1;
      
      let carTypeNum = +enumeration.carTypeList[+carType-1].value;
      
      let body ={
            "parameter": {                //类型：Object  必有字段  备注：业务参数
                "yhid":state.bindListQuery.parameter.yhid,                //类型：Number  必有字段  备注：用户ID
                // "gsmc":state.bindFormData.inputData[0].data,                //类型：String  必有字段  备注：公司名称
                "hphm":state.bindFormData.inputData[1].data,                //类型：String  必有字段  备注：车牌号码
                "cpys":colorNum,                //类型：Number  必有字段  备注：车牌颜色
                "clzl":carTypeNum,                //类型：Number  必有字段  备注：车辆种类
                "lxr":state.bindFormData.inputData2[0].data,                //类型：String  必有字段  备注：负责人姓名
                "sjh":state.bindFormData.inputData2[1].data                //类型：String  必有字段  备注：负责人电话
            }
      }
      //init data 
      state.bindFormData.inputData[1].data='',                //类型：String  必有字段  备注：车牌号码
      state.bindFormData.inputData[2].data='',                //类型：Number  必有字段  备注：车牌颜色
      state.bindFormData.selectList2.listData[0].value = '',                //类型：Number  必有字段  备注：车辆种类
      state.bindFormData.inputData2[0].data='',                //类型：String  必有字段  备注：负责人姓名 
      state.bindFormData.inputData2[1].data='' 
      return new Promise((resolve, reject) => {
        fetchCompanyVipBindCar(body).then(response => {
          Message.success(response.message)
          dispatch('bindCompanyData')
                       //类型：String  必有字段  备注：负责人电话

            resolve()
          }).catch((error,response) => {
          // Message.error(error)
            reject(error)
          })
      })  
      
    },
    // 解绑
    unbindUserMemberCarCompany({dispatch, commit,state }, data) {
        let body = {
          "parameter":  {                //类型：Object  必有字段  备注：业务参数
              yhid:data.yhid,               //类型：Number  必有字段  备注：车辆ID
              "cpys": data.cpysNum,
              "hphm": data.hphm,
          }
      }
      
      return new Promise((resolve, reject) => {
        unbindUserMemberCar(body).then(response => {
          let msg = response.message
          Message.success(msg);
          dispatch('bindCompanyData') 
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 导出
    pustExportUserMemberCompany({ commit,state }, data) {
      return new Promise((resolve, reject) => {
        exportUserMemberCompany(state.listQuery).then(response => {
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    
    
    
    

    
  }
}
export default companyVip

