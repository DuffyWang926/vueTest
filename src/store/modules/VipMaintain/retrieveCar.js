import {
    findRetrieveCarApplyPage,
    findRetrieveCarDetails,
    postRetrieveCarReply
} from '@/api/Vipmaintain/RetrieveCar'
import { Message } from 'element-ui';
import { resolve } from 'path';
import moment from 'moment';
import enumeration from '@/enumeration/enumeration'
moment.locale('zh-cn');
const retrieveCar = {
    state:{
        retrieveQuery:{
            "parameter":{                //类型：Object  必有字段  备注：业务参数
                "dlmc":"",                //类型：String  必有字段  备注：会员账号
                "yhxm":"",                //类型：String  必有字段  备注：会员姓名
                "hphm":"",                //类型：String  必有字段  备注：车牌号码
                "shzt":0                //类型：Number  必有字段  备注：处理状态(审核状态)
            },
            "current":1,                //类型：Number  必有字段  备注：分页页数
            "size":10                //类型：Number  必有字段  备注：显示条数
        },
        retrieveData:{},
        retrieveDealData:{},
        oldData:{
            hphm:"",                //类型：String  必有字段  备注：车牌号码
            cpys:'',                //类型：Number  必有字段  备注：车牌颜色
        },
        retrieveApplyQuery:{                //类型：Object  必有字段  备注：业务参数
            "id":0,                //类型：Number  必有字段  备注：找回申请ID
            "shzt":0,                //类型：Number  必有字段  备注：审核状态
            "ms":""                //类型：String  必有字段  备注：原因
        },
        loadingRetrieveCar:true,
        dealDialogueVisible:false,

    },
    mutations:{
        CHANGE_RETRIEVE_QUERY:(state,data) =>{
            if(data.hasOwnProperty('dlmc')){
                state.retrieveQuery.parameter.dlmc = data.dlmc
            }else if(data.hasOwnProperty('yhxm')){
                state.retrieveQuery.parameter.yhxm = data.yhxm
            }else if(data.hasOwnProperty('hphm')){
                state.retrieveQuery.parameter.hphm = data.hphm
            }else if(data.hasOwnProperty('shzt')){
                state.retrieveQuery.parameter.shzt = data.shzt
            }
            if(data.hasOwnProperty('current')){
                state.retrieveQuery.current = data.current
            }

        },
        CHANGE_RETRIEVE_FLAG:(state,data) =>{
            if(data.hasOwnProperty('dealDialogueVisible')){
                state.dealDialogueVisible = data.dealDialogueVisible;
            }
        }

    },
    actions:{
        changeRetrieveQuery({commit},data){
            commit('CHANGE_RETRIEVE_QUERY',data)
        },
        changeRetrieveFlag({commit},data){
            commit('CHANGE_RETRIEVE_FLAG',data)
        },
        // 找回车辆tableData
        retrieveListPost({commit,state},data){
            if(data){
                if(data.current){
                    state.retrieveQuery.current = data.current
                } 
            }
            state.loadingRetrieveCar=true;
            return new Promise( (resolve,reject) =>{
                findRetrieveCarApplyPage(state.retrieveQuery).then(response =>{
                    state.loadingRetrieveCar=false;
                    state.retrieveData = response.result
                    state.retrieveData.records = response.result.records.map((v,i) =>{
                        
                        if(state.retrieveQuery.current == 1){
                            v.webIndex = i+1;
                          }else{
                            v.webIndex = i+1+((state.retrieveQuery.current -1) * +state.retrieveQuery.size);
                          }
                        v.sqsj = moment(v.shsj*1000).format('YYYY-MM-DD HH:mm:ss')
                        v.shsj = moment(v.cjsj*1000).format('YYYY-MM-DD HH:mm:ss')
                        v.cpysNum = v.cpys;
                       
                        v.cpys = enumeration.colorList[v.cpys*1].label

                        if(v.shzt === 0){
                            v.shzt = "未审核"
                            v.shztFlag = true;
                            v.shztNum = 0;
                        }
                        if(v.shzt === 1){
                            v.shzt = "审核成功"
                            v.msgFlag = true;
                            v.shztNum = 1;

                        }
                        if(v.shzt === 2){
                            v.shzt = "审核失败"
                            v.shztNum = 2;

                        }

                        return v
                    })
                    resolve()

                }).catch( error =>{
                    reject(error)

                })
            })
        },
        findRetrieveCarDetailsData({commit,state},data){
            let body ={                //类型：Object  必有字段  备注：业务参数
                "id":data.id,               //类型：Number  必有字段  备注：找回申请ID
                shzt:data.shztNum
            }
            state.retrieveApplyQuery.id = data.id;
            
            state.oldData.hphm = data.hphm;
            state.oldData.cpys = data.cpys;
            return new Promise( (resolve,reject) =>{
                findRetrieveCarDetails(body).then(response =>{
                    state.retrieveDealData = response.result
                    resolve()
                    


                }).catch( error =>{
                    reject(error)

                })
            })
        },
        //找回车辆
        postRetrieveCarReplyData({dispatch,commit,state},data){
            if(data){
                if(data.ms){
                    state.retrieveApplyQuery.ms = data.ms
                }
                if(data.shzt){
                    state.retrieveApplyQuery.shzt = data.shzt
                }
            }    
            return new Promise( (resolve,reject) =>{
                postRetrieveCarReply(state.retrieveApplyQuery).then(response =>{
                    Message.success(response.message)
                    state.dealDialogueVisible = false;
                    dispatch('retrieveListPost')
                    resolve()

                }).catch( error =>{
                    reject(error)

                })
            })
        }

    }
}

export default retrieveCar;
