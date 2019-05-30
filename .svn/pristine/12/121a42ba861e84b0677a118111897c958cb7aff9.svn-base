import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  findDisabledCarPage,
  saveDisabledCar,
  updateDisabledCar,
  removeDisabledCar,
  findDisabledCarSpaceList,
  updateDisabledCarSpace,
  exportDisabledCar

} from '@/api/SpecialCars/DisabledList.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');
import {Message} from 'element-ui';
import enumeration from '@/enumeration/enumeration'

import publicUrl from '../PublicApi/publicUrl'
let typeList = JSON.parse(localStorage.getItem('sysDicts'))
let colorList = enumeration.colorList 
const disabledList = {
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
      title:'添加残疾人车辆',
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
            options:colorList 
            
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
      title:'修改残疾人车辆',
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
    CHANGE_DISABLED_LIST_QUERY: (state, data) => {
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
    CHANGE_DISABLED_DIALOGUE:(state,data) =>{
      if(data.hasOwnProperty('addDialogueVisible')){
        state.addDialogueVisible = data.addDialogueVisible

        // add 数据 init
        state.addData.inputData[0].data = '';
        state.addData.selectData[0].value = '0',                //类型：String  必有字段  备注：车牌颜色
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
    INIT_DISABLED_CHANGE_DATA:(state,data) =>{
      if(data){
        state.changeData.inputData[0].data = data.hphm;
        state.changeData.selectData[0].value = data.cpysNum + '';
        state.changeData.inputData2[0].data = data.sjh;
        state.changeData.id = data.id
      }
    }

  },

  actions: {
    // 表格数据
    findDisabledCarPageData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
          }
        }
      return new Promise((resolve, reject) => {
        findDisabledCarPage(state.listQuery).then(response => {
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
            // v.mdfxNum = v.mdfx;
            // v.rzztNum = +v.shzt;
            // v.cpys = enumeration.colorList[v.cpys*1].label
            v.cpysString = enumeration.colorList[v.cpys*1].label

            // v.rzzt = enumeration.examinationList[v.shzt*1].label
            return v
        })

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // //修改数据
    changeDisabledListQuery({commit},data){
      commit('CHANGE_DISABLED_LIST_QUERY',data)
    },
    changeDisabledDialogue({commit},data){
      commit('CHANGE_DISABLED_DIALOGUE',data)
    },
    //add数据
    postSaveDisabledCar({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = state.addData.inputData3[0].data
      let body = {                //类型：Object  必有字段  备注：业务参数
          "hphm":state.addData.inputData[0].data,                //类型：String  必有字段  备注：车牌号码
          "cpys":state.addData.selectData[0].value,                //类型：String  必有字段  备注：车牌颜色
          // "mdfx":state.addData.selectData[1].value,                //类型：String  必有字段  备注：白名单分类
          "sjh":state.addData.inputData2[0].data,                //类型：String  必有字段  备注：绑定手机号
          // "shzt":state.addData.selectData2[0].value,                //类型：String  必有字段  备注：审核状态
      }
      
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( response =>{
          if(publicUrl.state.isCheck){
            
            return new Promise((resolve, reject) => {
              saveDisabledCar(body).then(response => {
                Message.success(response.message)
                state.addDialogueVisible = false
                dispatch('findDisabledCarPageData')
                // add 数据 init
                state.addData.inputData[0].data = '';
                state.addData.selectData[0].value = '0',                //类型：String  必有字段  备注：车牌颜色
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
    initDisabledChangeData({commit},data){
      commit('INIT_DISABLED_CHANGE_DATA',data)
    },
    // change 表格数据
    postUpdateDisabledCar({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = state.changeData.inputData3[0].data
      let body = {               
          "id":state.changeData.id,                //类型：String  必有字段  备注：白名单ID
          "hphm":state.changeData.inputData[0].data,                //类型：String  必有字段  备注：车牌号码
          "cpys":state.changeData.selectData[0].value,                //类型：String  必有字段  备注：车牌颜色
         
          "sjh":state.changeData.inputData2[0].data,                //类型：String  必有字段  备注：绑定手机号
          // "shzt":state.changeData.selectData2[0].value,                //类型：String  必有字段  备注：审核状态
      }
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( () =>{
          if(publicUrl.state.isCheck){
             new Promise((resolve, reject) => {
              updateDisabledCar(body).then(response => {
                state.changeDialogueVisible = false
                Message.success(response.message)
                dispatch('findDisabledCarPageData')
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
    removeDisabledCarData({ dispatch,commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数
          "id":data.id                //类型：Number  必有字段  备注：车辆记录ID
      }
      let dataLength = state.tableData.records.length;
      return new Promise((resolve, reject) => {
        removeDisabledCar(body).then(response => {
          Message.success(response.message)
          if(dataLength == 1){
            if(state.listQuery.current >1){
              state.listQuery.current -= 1;
            }
          }
          dispatch('findDisabledCarPageData')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // link 表格数据
    postDisabledCarSpaceList({ commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数
          "cljlid":data.id                //类型：Number  必有字段  备注：车辆记录ID
      }
      state.linkQuery.cljlid = data.id  ;

      return new Promise((resolve, reject) => {
        findDisabledCarSpaceList(body).then(response => {
          state.linkList = response.result.records;
          let list = response.result.records;
          let resList = [];
          for(let i=0,len = list.length; i<len;i++){
            let res ={
              id: list[i].ccid,
              pid: 0,
              label: list[i].ccmc,
            }
            if(resList.length == 0){
              resList.push(res)

            }
            for(let j=0,lenj=resList.length; j<lenj;j++){
              if(resList[j].id == list[i].ccid){
                if(resList[j].children){
                  resList[j].children.push({
                    id: list[i].ccid + '-' + list[i].cwid,
                    pid: list[i].ccid,
                    label: '车位：'+list[i].cwbh,
                    cwid:list[i].cwid,
                  })
                }else{
                  resList[j].children = []
                  resList[j].children.push({
                    id: list[i].ccid + '-' + list[i].cwid,
                    pid: list[i].ccid,
                    label: '车位：'+list[i].cwbh,
                    cwid:list[i].cwid,
                  })

                }
              }else{
                res.children = []
                res.children.push({
                  id: list[i].ccid + '-' + list[i].cwid,
                  pid: list[i].ccid,
                  label: '车位：'+list[i].cwbh,
                  cwid:list[i].cwid,
                })
                resList.push(res)
              }
            }

          }
          state.linkData = resList;


          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // change 泊位数据
    postUpdateDisabledCarSpace({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = data.passwordData;
      let list = [];
      let resList = [];
      let radio = data.radio;
      if(radio == '1'){
        list = state.linkList;
        for(let i=0,len=list.length; i<len;i++){
          resList.push({
            ccid:list[i].ccid,
            cwid:list[i].cwid
          })
        }

      }else{
        list = data.toData
        for(let i=0,len=list.length; i<len;i++){
          for(let j=0,lenj=list[i].children.length; j<lenj;j++){
            resList.push({
              ccid:list[i].id,
              cwid:list[i].children[j].cwid
            })
          }
        }

      }
     
      state.linkQuery.cccws = resList
      
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( () =>{
          if(publicUrl.state.isCheck){
             new Promise((resolve, reject) => {
              updateDisabledCarSpace(state.linkQuery).then(response => {
                state.linkDialogueVisible = false
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

        

   // 导出数据
   postExportDisabledCar({ commit,state }, data) {
      
    return new Promise((resolve, reject) => {
      exportDisabledCar(state.listQuery).then(response => {
        
        if(response === 200) Message.success("导出成功")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },   
    
    
    
    

    
  }
}

export default disabledList

