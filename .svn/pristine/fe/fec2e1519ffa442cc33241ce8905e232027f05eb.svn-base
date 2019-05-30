import { asyncRouterMap, constantRouterMap } from '@/router'

import { fetchPersonVipList,
  findUserMemberToUnbindPage,
  unbindUserMemberCar
} from '@/api/Vipmaintain/PersonVip.js'
import moment from 'moment';
import { Message } from 'element-ui';
moment.locale('zh-cn');
import enumeration from '@/enumeration/enumeration'

const personVip = {
  state: {
    listQuery:
    {
        parameter:  {                //类型：Object  必有字段  备注：业务参数
          dlmc:"",                //类型：String  必有字段  备注：公司名称
          yhxm:"",                 //类型：String  必有字段  备注：负责人姓名
          sjh:""               //类型：number  必有字段  备注：电话
        },
        current:1,                //类型：Number  必有字段  备注：分页页数
        size:10                //类型：Number  必有字段  备注：显示条数
    },
    tableData:{
      records:null
    },
    tableDataLoading:true,
    bindListQuery:{
      "parameter": {                //类型：Object  必有字段  备注：业务参数
          "yhid":0               //类型：String  必有字段  备注：会员ID
      },
      "current":1,                //类型：Number  必有字段  备注：分页页数
      "size":10               //类型：Number  必有字段  备注：显示条数
    },
    bindData:{
      title:'个人会员车辆解绑',
      data: {}
    },
    
    bindDataLoading:true,
    
    

  },

  mutations: {
    // 表格数据
    
    CHANGE_LIST_QUERY:(state,data) =>{
      if(data.hasOwnProperty('dlmc')){
        state.listQuery.parameter.dlmc = data.dlmc
      }else if(data.hasOwnProperty('yhxm')){
        state.listQuery.parameter.yhxm = data.yhxm
      }else if(data.hasOwnProperty('sjh')){
        state.listQuery.parameter.sjh = data.sjh
      }else if(data.current){
        state.listQuery.current = data.current
      }
      if(data.isClear){
        state.listQuery.parameter.dlmc = ''
        state.listQuery.parameter.yhxm = ''
        state.listQuery.parameter.sjh = ''

      }
    },


  },

  actions: {
    // 表格数据
    getPersonalVipData({ commit,state }, data) {
        state.tableDataLoading = true;
        if(data){
          if(data.current){
            state.listQuery.current = data.current;
          }
        }
      return new Promise((resolve, reject) => {
        fetchPersonVipList(state.listQuery).then(response => {
          state.tableDataLoading = false;
          state.tableData = response.result
          state.tableData.records = response.result.records.map((v,i) =>{
            
            if(state.listQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.listQuery.current -1 ) * +state.listQuery.size);
            }
            
            if(v.yhlx == 1){
              v.yhlx = '个人'
            }else if(v.yhlx == 2){
              v.yhlx = '公司'
            }
            v.dlsj = moment(v.dlsj*1000).format('YYYY-MM-DD HH:mm:ss')
            let sex = v.sex;
            let sexName = ''
            if(sex == 1){
              sexName = '男'
            }else if(sex == 2){
              sexName = '女'
            }else{
              sexName = '无'
            }
            v.sex = sexName
            v.sjxh = v.sjxh || '无'
            return v;

          })

          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    changePersonalListQuery({commit},data){
      commit('CHANGE_LIST_QUERY', data)
    },
    //绑定list
    findUserMemberToUnbindPageList({ commit,state }, data) {
        state.bindDataLoading = true;
        if(data){
          if(data.current){
            state.bindListQuery.current = data.current;
          }else if(data.id){
            state.bindListQuery.parameter.yhid = data.id;

          }
          
        }
      return new Promise((resolve, reject) => {
        findUserMemberToUnbindPage(state.bindListQuery).then(response => {
          state.bindDataLoading = false;
          state.bindData = response.result;
          state.bindData.records = response.result.records.map((v,i) =>{
            if(state.bindListQuery.current == 1){
              v.webIndex = i+1;
            }else{
              v.webIndex = i+1+((state.bindListQuery.current -1) * +state.bindListQuery.size);
            }
            
            v.cpysNum = v.cpys
            v.cpys = enumeration.colorList[+v.cpys].label
            v.qfje = v.wzfje/100
            return v
          })

          resolve()
        }).catch(error => {
          console.log(error)



          reject(error)
        })
      })
    },
    //unbind Post
    unbindUserMemberCarPost({dispatch, commit,state }, data) {
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
        dispatch('findUserMemberToUnbindPageList') 


        resolve()
      }).catch(error => {
        
        reject(error)
      })
    })
  },
    
   
    
    

    
  }
}

export default personVip
