import { asyncRouterMap, constantRouterMap } from '@/router'

import { findBlackListCarPage,
  saveBlackListCar,
  updateBlackListCar,
  removeBlackListCar,
  exportBlackListCar

} from '@/api/SpecialCars/BlackList.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');
import {Message} from 'element-ui';
import enumeration from '@/enumeration/enumeration'
import publicUrl from '../PublicApi/publicUrl'

let typeList = JSON.parse(localStorage.getItem('sysDicts'))
let colorList = typeList && enumeration.colorList
let typeValue = ''   //分类默认值

const blackList = {
  state: {
    listQuery:{
        "parameter":{                //类型：Object  必有字段  备注：业务参数
            "mdfx":'',                //类型：Number  必有字段  备注：白名单分类 1未认证 2审核中 3已认证 4认证失败
            "cpys":'',                //类型：Number  必有字段  备注：车牌颜色 0白色1黄色2蓝色3黑色4其他
            "hphm":"",                //类型：String  必有字段  备注：车辆号牌
            "kssj":0,                //类型：Number  必有字段  备注：开始时间
            "jssj":0                //类型：Number  必有字段  备注：结束时间
        },
        "current":1,                //类型：Number  必有字段  备注：分页页数
        "size":10                //类型：Number  必有字段  备注：显示条数
    },
    tableDataLoading:true,
    tableData:{},
    addData:{  //添加弹窗
      title:'添加黑名单',
      inputData:[
        {
          name:'车牌号码：',
          data:'',
          type:"required",
        },
        
      ],
      selectData:[
          {
            value:'0',
            title:'车牌颜色：',
            options: colorList
               
            
          },
          {
            value:'',
            title:'黑名单车分类：',
            options: []
            
          },
          
        ],
      inputData2:[
        {
          name:'绑定手机号：',
          data:'',
          type:"required|numeric|digits:11",
        },
        
      ],
      
      inputData3:[
        {
          name:'操作员密码：',
          data:'',
          type:"required",
        },
        
      ],
      
    },
    addDialogueVisible:false,
    changeData:{  //添加弹窗
      title:'修改黑名单',
      inputData:[
        {
          name:'车牌号码：',
          data:'',
          type:"required",
          disabled:true
        },
        
      ],
      selectData:[
          {
            value:'0',
            title:'车牌颜色：',
            options: colorList
          },
          {
            value:'',
            title:'黑名单车分类：',
            options: []
            
            
          },
          
        ],
      inputData2:[
        {
          name:'绑定手机号：',
          data:'',
          type:"required|numeric|digits:11",
        },
        
      ],
      
      inputData3:[
        {
          name:'操作员密码：',
          data:'',
          type:"required",
        },
        
      ],
      
    },
    changeDialogueVisible:false,
    linkData:[],
    linkQuery: {                //类型：Object  必有字段  备注：业务参数
        "cljlid":0,                //类型：Number  必有字段  备注：车辆记录ID
        "cccws": []
    },
    linkDialogueVisible:false,
    linkList:[]                 //泊位列表

    },

  mutations: {
    // 表格数据
    CHANGE_BACK_LIST_QUERY: (state, data) => {
      if(data.hasOwnProperty('hphm')){
        state.listQuery.parameter.hphm = data.hphm
      }else if(data.hasOwnProperty('cpys')){
        state.listQuery.parameter.cpys = data.cpys
      }else if(data.hasOwnProperty('mdfx')){
        state.listQuery.parameter.mdfx = data.mdfx
      }else if(data.hasOwnProperty('kssj')){
        if(data.kssj){
          state.listQuery.parameter.kssj = moment(data.kssj).unix() + ''
        }else{
          state.listQuery.parameter.kssj = 0
        }
         
      }
      if(data.hasOwnProperty('jssj')){
        if(data.kssj){
          state.listQuery.parameter.jssj =  moment(data.jssj).unix() + ''
        }else{
          state.listQuery.parameter.jssj = 0
        }
          
      }
      let isClear = data && data.isClear;
      if(isClear){
        state.listQuery.parameter.hphm = ''
        state.listQuery.parameter.cpys = ''
        state.listQuery.parameter.mdfx = ''
        state.listQuery.parameter.kssj = 0
        state.listQuery.parameter.jssj = 0
        state.listQuery.current = 1;


      }
    },
    //对话框开关
    CHANGE_BLACK_DIALOGUE:(state,data) =>{
      if(data.hasOwnProperty('addDialogueVisible')){
        state.addDialogueVisible = data.addDialogueVisible

         // add 数据 init
         state.addData.inputData[0].data = '';
         state.addData.selectData[0].value = '0',                //类型：String  必有字段  备注：车牌颜色
         state.addData.selectData[1].value = typeValue,                //类型：String  必有字段  备注：白名单分类
         state.addData.inputData2[0].data = '',                //类型：String  必有字段  备注：绑定手机号
         state.addData.inputData3[0].data = ''
      }else if(data.hasOwnProperty('changeDialogueVisible')){
        state.changeDialogueVisible = data.changeDialogueVisible
        // change 数据 init
        state.changeData.inputData3[0].data = ''

      }else if(data.hasOwnProperty('linkDialogueVisible')){
        state.linkDialogueVisible = data.linkDialogueVisible
      }
    },
    INIT_BLACK_CHANGE_DATA:(state,data) =>{
      if(data){
        state.changeData.inputData[0].data = data.hphm;
        state.changeData.selectData[0].value = data.cpysNum + '';
        state.changeData.selectData[1].value = data.mdfxNum+ '';
        state.changeData.inputData2[0].data = data.sjh;
        state.changeData.id = data.id
      }
    }

  },

  actions: {
    // 表格数据
    findBlackListCarPageData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
          }
        }
      return new Promise((resolve, reject) => {
        findBlackListCarPage(state.listQuery).then(response => {
          state.tableDataLoading = false;
          state.tableData= response.result
          state.tableData.records = response.result.records.map((v,i) =>{
            if(state.listQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.listQuery.current -1 ) * +state.listQuery.size);
            }
            v.cjsj = moment(v.cjsj*1000).format('YYYY-MM-DD HH:mm:ss')
            v.cpysNum = v.cpys;
            v.mdfxNum = v.mdfx;
            // v.rzztNum = v.shzt;
            // v.cpys = enumeration.colorList[v.cpys*1].label
            v.cpysString = enumeration.colorList[v.cpys*1].label

            // v.mdfx = enumeration.state.whiteList[v.mdfx*1-1].label
            // v.rzzt = enumeration.examinationList[v.shzt*1].label

            //获得具体分类
            let typeName = ''
            Array.isArray(typeList) && typeList.map((item,i) =>{
              if(item.key == v.mdfx){
                typeName = item.label

              }
            })
            if(!typeName){
              typeName = "其他"
            }
            v.mdfx = typeName
           
            return v
        })

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改数据
    changeBackListQuery({commit},data){
      commit('CHANGE_BACK_LIST_QUERY',data)
    },
    changeBlackDialogue({commit},data){
      commit('CHANGE_BLACK_DIALOGUE',data)
    },
    //add数据
    postSaveBlackListCar({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = state.addData.inputData3[0].data
      let body = {                //类型：Object  必有字段  备注：业务参数
          "hphm":state.addData.inputData[0].data,                //类型：String  必有字段  备注：车牌号码
          "cpys":state.addData.selectData[0].value,                //类型：String  必有字段  备注：车牌颜色
          "mdfx":state.addData.selectData[1].value,                //类型：String  必有字段  备注：白名单分类
          "sjh":state.addData.inputData2[0].data,                //类型：String  必有字段  备注：绑定手机号
          // "shzt":state.addData.selectData2[0].value,                //类型：String  必有字段  备注：审核状态
      }
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( response =>{
          if(publicUrl.state.isCheck){
            
            return new Promise((resolve, reject) => {
              saveBlackListCar(body).then(response => {
                Message.success(response.message)
                state.addDialogueVisible = false
                dispatch('findBlackListCarPageData')
                 // add 数据 init
                 state.addData.inputData[0].data = '';
                 state.addData.selectData[0].value = '0',                //类型：String  必有字段  备注：车牌颜色
                 state.addData.selectData[1].value = '',                //类型：String  必有字段  备注：白名单分类
                 state.addData.inputData2[0].data = '',                //类型：String  必有字段  备注：绑定手机号
                 state.addData.inputData3[0].data = ''

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
    initBlackChangeData({commit},data){
      commit('INIT_BLACK_CHANGE_DATA',data)
    },
    // change 表格数据
    postUpdateBlackListCar({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = state.changeData.inputData3[0].data
      let body = {               
          "id":state.changeData.id,                //类型：String  必有字段  备注：白名单ID
          "hphm":state.changeData.inputData[0].data,                //类型：String  必有字段  备注：车牌号码
          "cpys":state.changeData.selectData[0].value,                //类型：String  必有字段  备注：车牌颜色
          "mdfx":state.changeData.selectData[1].value,                //类型：String  必有字段  备注：白名单分类
          "sjh":state.changeData.inputData2[0].data,                //类型：String  必有字段  备注：绑定手机号
          // "shzt":state.changeData.selectData2[0].value,                //类型：String  必有字段  备注：审核状态
      }
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( () =>{
          if(publicUrl.state.isCheck){
             new Promise((resolve, reject) => {
              updateBlackListCar(body).then(response => {
                state.changeDialogueVisible = false
                Message.success(response.message)
                dispatch('findBlackListCarPageData')
                state.changeData.inputData3[0].data = ''
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
    // delete表格数据
    removeBlackListCarData({ dispatch,commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数
          "id":data.id                //类型：Number  必有字段  备注：车辆记录ID
      }
      let dataLength = state.tableData.records.length;
      return new Promise((resolve, reject) => {
        removeBlackListCar(body).then(response => {
          Message.success(response.message)
          if(dataLength == 1){
            if(state.listQuery.current >1){
              state.listQuery.current -= 1;
            }
          }
          dispatch('findBlackListCarPageData')

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //添加白名单分类数据
    addBlackListData({ commit,state },data){
      state.addData.selectData[1].options = data;
      state.addData.selectData[1].value = Array.isArray(data) && data[0].value;
      typeValue = Array.isArray(data) && data[0].value;
      state.changeData.selectData[1].options = data;
      
    },
    // 导出数据
    postExportBlackListCar({ commit,state }, data) {
      
    return new Promise((resolve, reject) => {
      exportBlackListCar(state.listQuery).then(response => {
        
        if(response === 200) Message.success("导出成功")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
    


    
  }
}

export default blackList
