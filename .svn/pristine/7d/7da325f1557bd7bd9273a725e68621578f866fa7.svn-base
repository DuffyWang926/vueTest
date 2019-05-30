import { asyncRouterMap, constantRouterMap } from '@/router'

import { findWhiteListCarPage,
  saveWhiteListCar,
  updateWhiteListCar,
  removeWhiteListCar,
  findWhiteListCarSpaceList,
  updateWhiteListCarSpace,
  findBwbhByCcid,
  exportWhiteListCar,
  getParkingGarage,
  findParkingGarageLink

} from '@/api/SpecialCars/WhiteList.js'
import { 
  findParkingGarageNameSelect,

} from '@/api/SearchList/searchList.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');
import {Message} from 'element-ui';
import enumeration from '@/enumeration/enumeration'
import searchList from '../SearchListAll/searchList'
import publicUrl from '../PublicApi/publicUrl'
import { stat } from 'fs';
let typeList = JSON.parse(localStorage.getItem('sysDicts'))
let colorList = enumeration.colorList 
let typeValue = ''   //分类默认值


const whiteList = {
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
      title:'添加白名单',
      inputData:[
        {
          name:'车牌号码：',
          data:'',
          // type:"required",
        },
        
      ],
      selectData:[
          {
            value:'0',
            title:'车牌颜色：',
            options:colorList
          },
          {
            value:'',
            title:'白名单车分类：',
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
      title:'修改白名单',
      inputData:[
        {
          name:'车牌号码：',
          data:'',
          disabled:true
        },
        
      ],
      selectData:[
          {
            value:'0',
            title:'车牌颜色：',
            options:colorList 
          },
          {
            value:'',
            title:'白名单车分类：',
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
        "cccws": [],
        sycw:0
    },
    linkDialogueVisible:false,
    linkList:[],                 //泊位列表 d
    parkingPost:{                //类型：Object  必有字段  备注：业务参数
        "yygsid":"",                //类型：String  必有字段  备注：登录用户的公司ID
        "ccmc":""                //类型：String  可有字段  备注：车场名称
    },
    parkingList:[],
    parkingListRes:[],      //停车场列表总和
    parkingListResFlag:true,  //停车场数据是否变化
    parkingPlaceList:{},
    parkingListNum:0   ,   //计算获得泊位次数
    linkNum:''  ,                  //关联泊位的页面来源
    parkingGarageQuery:{
      parameter:{
        yygsid:'',             // 公司id
        dlid:'',               // 道路id
        id:'',                //停车场id
        rzgsid:'',             //登录公司id
        ccmc:''
      },
      "current":1,                //类型：Number  必有字段  备注：分页页数
      "size":4                //类型：Number  必有字段  备注：显示条数 
    },
    parkingDetailList:[],
    tableLinkLoading:false,
    parkingDetailAddList:[],

    },

  mutations: {
    // 表格数据
    CHANGE_LIST_QUERY: (state, data) => {
      if(data.hasOwnProperty('hphm')){
        state.listQuery.parameter.hphm = data.hphm
      }else if(data.hasOwnProperty('cpys')){
        state.listQuery.parameter.cpys = data.cpys
      }else if(data.hasOwnProperty('mdfx')){
        state.listQuery.parameter.mdfx = data.mdfx
      }else if(data.hasOwnProperty('kssj')){
        if(data.kssj){
          // state.listQuery.parameter.kssj = moment(data.kssj).unix() + ''
          let time2 =  + ''
          state.listQuery.parameter.kssj = moment(data.kssj).unix() + ''
          let time1 = +data.kssj/1000 + '';

        }else{
          state.listQuery.parameter.kssj = 0
        }
         
      }
      if(data.hasOwnProperty('jssj')){
        if(data.jssj){
          let time =  moment(data.jssj).unix() + ''
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
    CHANGE_ADD_DIALOGUE:(state,data) =>{
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
        if(!data.linkDialogueVisible){
          state.parkingDetailList =[]
          state.parkingDetailAddList =[]
          state.tableLinkLoading=false
        }

      }
      
    },
    INIT_CHANGE_DATA:(state,data) =>{
      if(data){
        state.changeData.inputData[0].data = data.hphm;
        state.changeData.selectData[0].value = data.cpysNum + '';
        state.changeData.selectData[1].value = data.mdfxNum + '';
        state.changeData.inputData2[0].data = data.sjh;
        state.changeData.id = data.id
      }
    }

  },

  actions: {
    // 表格数据
    findWhiteListCarPageData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
            // state.listQuery.parameter.kssj = 1558596716
            // state.listQuery.parameter.jssj = 1558596716
          }
        }
      return new Promise((resolve, reject) => {
        findWhiteListCarPage(state.listQuery).then(response => {
          state.tableDataLoading = false;
          state.tableData= response.result
          console.log(enumeration.colorList)
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
            
            // v.rzzt = enumeration.state.examinationList[v.shzt*1].label

            
            //获得具体分类
            let typeName = ''
            Array.isArray(typeList) && typeList.map((item,index) =>{
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
    changeListQuery({commit},data){
      commit('CHANGE_LIST_QUERY',data)
    },
    changeAddDialogue({commit},data){
      commit('CHANGE_ADD_DIALOGUE',data)
    },
    //add数据
    postSaveWhiteListCar({ dispatch,commit,rootState,state }, data) {
      
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
              saveWhiteListCar(body).then(response => {
                Message.success(response.message)
                dispatch('findWhiteListCarPageData')
                state.addDialogueVisible = false
                // add 数据 init
                state.addData.inputData[0].data = '';
                state.addData.selectData[0].value = '0',                //类型：String  必有字段  备注：车牌颜色
                state.addData.selectData[1].value = typeValue,                //类型：String  必有字段  备注：白名单分类
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
    initChangeData({commit},data){
      commit('INIT_CHANGE_DATA',data)
    },
    // change 表格数据
    postUpdateWhiteListCar({ dispatch,commit,rootState,state }, data) {
      
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
              updateWhiteListCar(body).then(response => {
                state.changeDialogueVisible = false
                Message.success(response.message)
                dispatch('findWhiteListCarPageData')
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
    removeWhiteListCarData({ dispatch,commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数 
          "id":data.id                //类型：Number  必有字段  备注：车辆记录ID
      }
      let dataLength = state.tableData.records.length;
      return new Promise((resolve, reject) => {
        removeWhiteListCar(body).then(response => {
          Message.success(response.message)
          if(dataLength == 1){
            if(state.listQuery.current >1){
              state.listQuery.current -= 1;
            }
          }

          dispatch('findWhiteListCarPageData')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // link 表格数据
    // 停车场列表
    getParkingGarageNameSelectList({ dispatch,commit,state },data) {
        if(data){
          if(data.id){
            state.parkingPost.yygsid = 2
            // data.id;
            state.linkQuery.cljlid = +data.id;

          }else if(data.ccmc){
            state.parkingPost.ccmc = data.ccmc;
          }
          if(data.linkNum){
            state.linkNum = data.linkNum;
          }
  
        }

        return new Promise((resolve, reject) => {
          findParkingGarageNameSelect(state.parkingPost ).then(response => {
            //停车场列表
            state.parkingList = response.result.map( (v,i) =>{
              let res ={
                value:v.label,
                key:v.key
              }
              let isKey = true;
              if(state.parkingListRes.length !== 0){
                state.parkingListRes.map((val,index) =>{
                  if(val.key === v.key){
                    isKey = false;
                  }
                })
              }
              if(isKey){
                state.parkingListRes.push({value:v.label,
                  key:v.key });
                state.parkingListResFlag = true;

              }else{
                state.parkingListResFlag = false;

              }
              return res;
            })
            // if(i == response.result.length-1){
              // state.parkingListNum = 0;
              // state.parkingListRes.map((val,index) =>{
              //   dispatch('findBwbhByCcidData',val.key)
              // })
            // }
            // }else{
              let linkDialogueVisible = true;
              dispatch("changeAddDialogue",{linkDialogueVisible})
            // }
            
            resolve()

          }).catch(error => {
            console.log(error)
            reject(error)
          })
        })
      },
    //根据车场获得泊位
    findBwbhByCcidData({ dispatch,commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数
          "ccid":+data                //类型：Number  必有字段  备注：车场id
      }
      
      return new Promise((resolve, reject) => {
        findBwbhByCcid(body).then(response => {

          if(response.result){
          state.parkingPlaceList[data] = Array.isArray(response.result) ? response.result.map((v,i) =>{
              if(!v.ccid){
                v.ccid = data
              }
              return v
            }) : {};
          }
          state.parkingListNum +=1;
          if(state.parkingListNum === state.parkingListRes.length){
            dispatch('postWhiteListCarSpaceList')
            let linkDialogueVisible = true;
            dispatch("changeAddDialogue",{linkDialogueVisible})
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    postWhiteListCarSpaceList({ commit,state }, data) {
          state.linkList = state.parkingListRes;
          let list = state.parkingListRes;
          let resList = [];
          let childrenList = [];
          for(let i=0,len = list.length; i<len;i++){
            let res ={
              id: list[i].key,
              pid: 0,
              label: list[i].value,
            }
            let keyVal = list[i].key;
            childrenList = state.parkingPlaceList[keyVal] || [];

            if(childrenList.length === 0){
              resList.push(res)
            }else{
              for(let j=0,lenj=childrenList.length; j<lenj;j++){
                if(childrenList[j].ccid == list[i].key){
                  
                  if(res.children){
                    res.children.push({
                      id: list[i].key + '-' + childrenList[j].id,
                      pid: list[i].key,
                      label: '车位：'+childrenList[j].cwbh,
                      cwid:childrenList[j].id,
                    })
                  }else{
                    res.children = []
                    res.children.push({
                      id: list[i].key + '-' + childrenList[j].id,
                      pid: list[i].key,
                      label: '车位：'+childrenList[j].cwbh,
                      cwid:childrenList[j].id,
                    })
  
                  }
                }
              }
              resList.push(res)

            }
          }
          state.linkData = resList;


    },
    //获得泊位数据
    getParkPlaceData({ dispatch,commit,state }, data) {
      let body ={                //类型：Object  必有字段  备注：业务参数
          "id":data.id                //类型：Number  必有字段  备注：车辆记录ID
      }
      return new Promise((resolve, reject) => {
        removeWhiteListCar(body).then(response => {
          Message.success(response.message)
          dispatch('findWhiteListCarPageData')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    
     // 导出数据
     postExportWhiteListCar({ commit,state }, data) {
        
      return new Promise((resolve, reject) => {
        exportWhiteListCar(state.listQuery).then(response => {
          if(response === 200) Message.success("导出成功")

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //添加白名单分类数据
    addWhiteListData({ commit,state },data){
      state.addData.selectData[1].options = data;
      state.addData.selectData[1].value = Array.isArray(data) && data[0].value;
      typeValue = Array.isArray(data) && data[0].value;
      state.changeData.selectData[1].options = data;
      
    },
    //修改停车场参数
    
    changeParkingGarageQuery({ dispatch,commit,state }, data) {
      if(data){
        if(data.companyListId){
          state.parkingGarageQuery.parameter.yygsid = data.companyListId
        }else if(data.roadId){
          state.parkingGarageQuery.parameter.dlid = data.roadId
        }else if(data.parkId){
          state.parkingGarageQuery.parameter.id = data.parkId
        }else if(data.ccmc){
          state.parkingGarageQuery.parameter.ccmc = data.ccmc
        }
        if(data.isClear){
          state.parkingGarageQuery.parameter.yygsid = ''
          state.parkingGarageQuery.parameter.dlid = ''
          state.parkingGarageQuery.parameter.id = ''
          state.parkingGarageQuery.parameter.ccmc = ''

        }
      }
      
      
    }, 
    //获得停车场详情
    // getParkingGarageData({ dispatch,commit,state }, data) {
    //   state.tableLinkLoading = true
    //   return new Promise((resolve, reject) => {
    //     getParkingGarage(state.parkingGarageQuery).then(response => {
    //       state.tableLinkLoading = false
    //       let res =[]
    //       let resultList = []
    //       if(response.result){
    //         res.push({
    //           ccbh:response.result.ccbh,
    //           ccmc:response.result.ccmc,
    //           yygs:response.result.yygs,
    //           xzqhmc:response.result.xzqhmc,
    //           dlmc:response.result.dlmc,
              
    //         })
    //         resultList = res.map((v,i) =>{
    //           if(state.parkingGarageQuery.current == 1){
    //             v.webIndex = i+1;
    //           }else{
    //             v.webIndex = i+1+(+state.parkingGarageQuery.current * +state.parkingGarageQuery.size);
    //           }

    //           return v
    //         })


    //       }
          
    //       state.parkingDetailList = resultList
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }, 
    //添加停车场
    addParkingGarageData({ dispatch,commit,state }, data) {
      state.parkingDetailList.records.map((v,i) =>{
        if(v.ccbh == data.ccbh){
          state.parkingDetailList.records.splice(i,1)
        }
      })

      state.parkingDetailList.records.map((v,i) =>{
        if(state.parkingGarageQuery.current == 1){
          v.webIndex = i+1;
        }else{
          v.webIndex = i+1+((state.parkingGarageQuery.current-1) * +state.parkingGarageQuery.size);
        }
        return v
      })


      let addFlag = true

      state.parkingDetailAddList.map((v,i) =>{
        if(v.ccbh == data.ccbh){
          addFlag = false;
        }
        

      })
      if(addFlag){
        state.parkingDetailAddList.push(data)
      }
      let addList = state.parkingDetailAddList.map( (v,i) =>{
        v.webIndex = i+1;
        return v
      })
      state.parkingDetailAddList = addList
      
    }, 
    //delete停车场
    deleteParkingGarageData({ dispatch,commit,state }, data) {
      state.parkingDetailAddList.map((v,i) =>{
        if(v.ccbh == data.ccbh){
          state.parkingDetailAddList.splice(i,1)
        }
      })
      state.parkingDetailAddList.map((v,i) =>{
        if(state.parkingGarageQuery.current == 1){
          v.webIndex = i+1;
        }else{
          v.webIndex = i+1+((state.parkingGarageQuery.current -1) * +state.parkingGarageQuery.size);
        }
        return v
      })
      let addFlag = true

      state.parkingDetailList.records.map((v,i) =>{
        if(v.ccbh == data.ccbh){
          addFlag = false;
        }
        

      })
      if(addFlag){
        state.parkingDetailList.records.push(data)
      }
      let addList = state.parkingDetailList.records.map( (v,i) =>{
        v.webIndex = i+1;
        return v
      })
      state.parkingDetailList.records = addList

    },
    // link表格数据
    findParkingGarageData({ commit,state }, data) {
      let resources = JSON.parse(localStorage.getItem('sysUser'))
      let companyId = resources && resources.gsid;
        state.tableLinkLoading = true;
        state.parkingGarageQuery.parameter.rzgsid = companyId
        if(data){
          if(data.current){
            state.parkingGarageQuery.current = data.current;
          }
      
        }
      return new Promise((resolve, reject) => {
        findParkingGarageLink(state.parkingGarageQuery).then(response => {
          state.tableLinkLoading = false;

          state.parkingDetailList= response.result
          state.parkingDetailList.records = response.result && response.result.records.map((v,i) =>{
            if(state.parkingGarageQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.parkingGarageQuery.current-1) * +state.parkingGarageQuery.size);
            }
            return v
          })


          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }, 
    // 查询关联泊位
    getWhiteListCarSpaceList({ commit,state }, data) {
      let body ={
            "current": 1,
            "parameter": {
              "cccws": [
                {
                  "ccid": 0,
                  "ccmc": "",
                  "zkl": 0
                }
              ],
              "cljlid": 0
            },
            "size": 20
          }
      
      if(data){
        if(data.id){
          body.parameter.cljlid = data.id
        }else if(data.id){
          body.parameter.zkl = data.zkl
        }
      }
      return new Promise((resolve, reject) => {
        findWhiteListCarSpaceList(body).then(response => {
          state.parkingDetailAddList = Array.isArray(response.result) && response.result.map((v,i) =>{
            v.webIndex = i+1+((state.parkingGarageQuery.current-1) * +state.parkingGarageQuery.size);
            return v

          })

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }, 
    // confirm 泊位数据
    postUpdateWhiteListCarSpace({ dispatch,commit,rootState,state }, data) {
      
      let passwordData = data.passwordData;
      let list = [];
      let resList = [];
      let radio = data.radio;
      if(radio == '1'){
        // list = state.parkingList;
        // for(let i=0,len=list.length; i<len;i++){
        //   resList.push({
        //     ccid:list[i].key,
        //     ccmc:list[i].value
        //   })
        // }
        state.linkQuery.sycw = 1

      }else{
        // list = data.toData
        list = state.parkingDetailAddList
        
        for(let i=0,len=list.length; i<len;i++){
          
            resList.push({
              ccid:list[i].id,
              ccmc:list[i].ccmc,
              ccbh:list[i].ccbh
              
            })
        }
        state.linkQuery.sycw = 0

      }
     
      state.linkQuery.cccws = resList
      dispatch('publicApi/postCheckPassword',passwordData,{root:true}).then( () =>{
          if(publicUrl.state.isCheck){
             new Promise((resolve, reject) => {
              updateWhiteListCarSpace(state.linkQuery).then(response => {
                state.linkDialogueVisible = false;
                let linkDialogueVisible = false;
                dispatch("changeAddDialogue",{linkDialogueVisible})

                Message.success(response.message)
                if(state.linkNum === 'DiscountCars'){
                  dispatch('specialCars/findDiscountCarPageData','',{root:true})
                }else if(state.linkNum === 'DisabledCars'){
                  dispatch('specialCars/findDisabledCarPageData',passwordData,{root:true})

                }else if(state.linkNum === 'WhiteListCars'){
                dispatch('findWhiteListCarPageData')
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

  }
}

export default whiteList
