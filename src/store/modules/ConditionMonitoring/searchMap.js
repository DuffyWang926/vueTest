import { asyncRouterMap, constantRouterMap } from '@/router'

import {
  findParkingGarageMap,
  findParkingGarageCoordinate

} from '@/api/ConditionMonitoring/searchMap.js'
import { type } from 'os';
import moment from 'moment';
import locationIconBlue from '@/assets/images/locationBlue.png';
import locationIconOrange from '@/assets/images/locationOrange.png';

moment.locale('zh-cn');
let val = JSON.parse(localStorage.getItem('sysUser'))
let companyId = val && val.gsid;

const searchMap = {
  state: {
    regionMapData:{},
    regionQuery:{
      "parameter":{                //类型：Object  必有字段  备注：业务参数
          "ywqybh":null,                //类型：Number  可有字段  备注：区域编号
          "yygsid":null,                //类型：Number  可有字段  备注：运营公司id
          "cclx":null,                //类型：Number  可有字段  备注：车场类型
          "gsid":null                //类型：Number  可有字段  备注：用户id
      }
    },
    undateMarkers:false,
    centerQuery:{
      "gsid":null                //类型：Number  可有字段  备注：用户id
    },
    centerData:{}

  },
  mutations: {
    CHANGE_SEARCH_MAP_QUERY:(state,data) =>{
      if(data){
        if(data.hasOwnProperty('ywqybh')){
          state.regionQuery.parameter.ywqybh = data.ywqybh
        }else if(data.hasOwnProperty('yygsid')){
          state.regionQuery.parameter.yygsid = data.yygsid
        }else if(data.hasOwnProperty('cclx')){
          state.regionQuery.parameter.cclx = data.cclx
        }
      }
    }

  },

  actions: {
    //设置query
    changeSearchMapQuery({dispatch,commit},data){
      commit('CHANGE_SEARCH_MAP_QUERY',data)
      dispatch('getRegionMapData')

    },
    //name
    getRegionMapData({ commit,state },data) {
      return new Promise((resolve, reject) => {
        state.undateMarkers = false;
        let cclxType = state.regionQuery.parameter.cclx;
        if(cclxType == 0){
          state.regionQuery.parameter.cclx = ''
        }

        state.regionQuery.parameter.gsid = companyId
        findParkingGarageMap(state.regionQuery).then(response => {
          state.undateMarkers = true;
          let res = {};
          state.regionMapData  = response.result.map((v,i) =>{
            v.mapCenter = [+v.cczbjd,+v.cczbwd]
            if(v.cclx == 1){
              res = {
                position:v.mapCenter,
                label:{
                        content:v.ccmc,
                        offset:[10,25]
                },
                icon:locationIconOrange
              }
            }else{
              res = {
                position:v.mapCenter,
                label:{
                        content:v.ccmc,
                        offset:[10,25]
                },
                icon:locationIconBlue
              }
            }
            return res
          })
          // if(state.regionMapData.length != 0 && Array.isArray(state.regionMapData)){
          //   state.regionMapData[0].position = [116.405285,39.904989];
          //   state.regionMapData[1].position = [116.310316,39.956074];
          //   state.regionMapData.length=2
          // }
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    //center
    getParkingGarageCoordinate({ commit,state },data) {

        state.centerQuery.gsid = companyId
      return new Promise((resolve, reject) => {
        findParkingGarageCoordinate(state.centerQuery).then(response => {
          if(response.result){
            state.centerData  = [response.result.cczbjd ,response.result.cczbwd]

          }


          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },




  }
}

export default searchMap

