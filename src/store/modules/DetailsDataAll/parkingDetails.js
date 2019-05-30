import { asyncRouterMap, constantRouterMap } from '@/router'

import { 
  getParkingRecordLogInfo

} from '@/api/DetailsDataAll/parkingDetails.js'
import { type } from 'os';
import moment from 'moment';
moment.locale('zh-cn');
import enumeration from '@/enumeration/enumeration.js'
import parkingImg from '@/assets/images/parkingImg.png'


const parkingDetails = {
  state: {
    parkingDetailsEnterData:{},
    parkingDetailsLeaveData:{},
    parkingDetailsChangeData:{},
    changeFlag:false

  },

  actions: {
    
    //入位记录详情 
    getParkingRecordInfo({commit,state},data){
      let body;
      if(data){
        body={                //类型：Object  必有字段  备注：业务参数
            "id":data.rwjlid               //类型：Number  必有字段  备注： 记录Id
        }
      }
      return  new Promise((resolve, reject) => {
        getParkingRecordLogInfo(body).then(response => {
          let res =  response.result
          if(res.rwqk >0 && res.rwqk < enumeration.enterState.length){
            res.rwqk = enumeration.enterState[+res.rwqk - 1].label;
          }else{
            res.rwqk = '无'
          }
        
          if(res.bjxx > -1 && res.bjxx < (enumeration.warningInfo.length-1)){
            res.bjxx = enumeration.warningInfo[+res.bjxx].label;
          }else{
            res.bjxx = '无'
          }
          
          res.rwjlid = data.rwjlid;
          let sjlyName = ''
          enumeration.parkDevice.map((v,i) =>{
             if(v.value == res.sjly){
              sjlyName = v.label
             }
          })
          res.sjly = sjlyName;
          res.cpysNum = res.cpys
          if(res.cpys > -1 && res.cpys < (enumeration.colorList.length-1)){
            res.cpys = res.cpys && enumeration.colorList[+res.cpys].label;
          }else{
            res.cpys = '无'
          }

          
          // enumeration.colorListRGB.map((v,i) =>{
          //   if(v.label == res.cpys){
          //     res.colorRGB = v.data
          //   }
          // })

          res.colorRGB = res.cpys &&  enumeration.colorListRGB[+res.cpysNum].data;
          res.sjsj = res.sjsj &&　moment(res.sjsj*1000).format('YYYY-MM-DD HH:mm:ss')
          if(res.sbsn == -1){
            res.sbsn = '无'
          }
          if(res.cwbh == -1){
            res.cwbh = '无'
            
          }
          res.tpdz1 =  res.tpdz1 ? res.tpdz1 : parkingImg;
          res.tpdz2 =  res.tpdz2 ? res.tpdz2 : parkingImg;
          res.tpdz3 =  res.tpdz3 ? res.tpdz3 : parkingImg;

          state.parkingDetailsEnterData =res

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //离位记录详情 
    getParkingRecordLeaveInfo({commit,state},data){
      let body;
      if(data){
        if(data.lwjlid){
          if(data.lwjlid == -1 || data.lwjlid == 0){
            state.parkingDetailsLeaveData={
              isShow:true
            }
            return;
          }

        }else{
          state.parkingDetailsLeaveData={
            isShow:true
          }
          return;
        }
        
        body={                //类型：Object  必有字段  备注：业务参数
            "id":data.lwjlid               //类型：Number  必有字段  备注： 记录Id
        }
      }
      return  new Promise((resolve, reject) => {
        getParkingRecordLogInfo(body).then(response => {
          let res =  response.result
          res.lwjlid = data.lwjlid
          let sjlyName = ''
          enumeration.parkDevice.map((v,i) =>{
             if(v.value == res.sjly){
              sjlyName = v.label
             }
          })
          res.sjly = sjlyName;
         
          res.sjsj = moment(res.sjsj*1000).format('YYYY-MM-DD HH:mm:ss')
          if(res.sbsn == -1){
            res.sbsn = '无'
          }

          res.tpdz1 =  res.tpdz1 ? res.tpdz1 : parkingImg;
          res.tpdz2 =  res.tpdz2 ? res.tpdz2 : parkingImg;
          res.tpdz3 =  res.tpdz3 ? res.tpdz3 : parkingImg;


          state.parkingDetailsLeaveData =res

            resolve()
            
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    //修改记录详情 
    getParkingRecordChangeInfo({commit,state},data){
      let body;
      if(data){
        if(data.xgjlid){
          if(data.xgjlid == -1 || data.xgjlid  == 0){
            state.changeFlag = false;
            return;
          }else{
            state.changeFlag = true;
          }

        }else{
          state.changeFlag = false;

          return
        }
        
        body={                //类型：Object  必有字段  备注：业务参数
            "id":data.xgjlid               //类型：Number  必有字段  备注： 记录Id
        }
      }
      return  new Promise((resolve, reject) => {
        getParkingRecordLogInfo(body).then(response => {
          let res =  response.result;
          res.xgjlid = data.xgjlid 
          if(res.rwqk >0 && res.rwqk < enumeration.enterState.length){
            res.rwqk = enumeration.enterState[+res.rwqk - 1].label;
          }else{
            res.rwqk = '无'
          }
        
          if(res.bjxx > -1 && res.bjxx < (enumeration.warningInfo.length-1)){
            res.bjxx = enumeration.warningInfo[+res.bjxx].label;
          }else{
            res.bjxx = '无'
          }
          res.rwjlid = data.rwjlid;
          let sjlyName = ''
          enumeration.parkDevice.map((v,i) =>{
             if(v.value == res.sjly){
              sjlyName = v.label
             }
          })
          res.sjly = sjlyName;
          
          res.cpys = enumeration.colorList[+res.cpys -1].label;
          res.sjsj = res.cjsj  ? moment(res.cjsj*1000).format('YYYY-MM-DD HH:mm:ss') :'--'
          if(res.sbsn == -1){
            res.sbsn = '无'
          }
          res.tpdz1 =  res.tpdz1 ? res.tpdz1 : parkingImg;

          state.parkingDetailsChangeData =res

            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })  
    },
    
    

    
  }
}

export default parkingDetails
