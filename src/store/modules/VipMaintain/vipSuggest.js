import {
    findmemberFeedbackPage
} from '@/api/Vipmaintain/VipSuggest'
import { Message } from 'element-ui';
import { resolve } from 'path';
import moment from 'moment';
moment.locale('zh-cn');
const vipSuggest = {
    state:{
        suggestQuery:{
            "parameter": {                //类型：Object  必有字段  备注：业务参数
                "dlmc":"",                //类型：String  必有字段  备注：会员账号
                "kssj":"",                //类型：String  必有字段  备注：开始时间
                "jssj":""                //类型：String  必有字段  备注：结束时间
            },
            "current":1,                //类型：Number  必有字段  备注：分页页数
            "size":10                //类型：Number  必有字段  备注：显示条数
        },
        loadingSuggest:true,
        suggestData:{}

    },
    mutations:{
        CHANGE_SUGGEST_QUERY:(state,data) =>{
            if(data){
                if(data.hasOwnProperty('dlmc')){
                    state.suggestQuery.parameter.dlmc = data.dlmc
                }else if(data.hasOwnProperty('kssj')){
                    if(data.kssj){
                        state.suggestQuery.parameter.kssj = moment(data.kssj).unix() + ''
                      }else{
                        state.suggestQuery.parameter.kssj = ''
                      }
                    
                }else  if(data.hasOwnProperty('current')){
                    state.suggestQuery.current = data.current
                }
                if(data.hasOwnProperty('jssj')){
                    if(data.kssj){
                        state.suggestQuery.parameter.jssj =  moment(data.jssj).unix() + ''
                      }else{
                        state.suggestQuery.parameter.jssj = ''
                      }
                    
                }
                if(data.isClear){
                    state.suggestQuery.parameter.jssj = '';
                    state.suggestQuery.parameter.kssj = '';
                }

            }
        }

    },
    actions:{
        changeSuggestQuery({commit},data){
            commit('CHANGE_SUGGEST_QUERY',data)
        },
        // 找回车辆tableData 
        findmemberFeedbackPageData({commit,state},data){
            if(data){
                if(data.current){
                    state.suggestQuery.current = data.current
                }
            }
            state.loadingSuggest=true;
            return new Promise( (resolve,reject) =>{
                findmemberFeedbackPage(state.suggestQuery).then(response =>{
                    state.loadingSuggest=false;
                    state.suggestData = response.result
                    state.suggestData.records = response.result.records.map((v,i) =>{
                        if(state.suggestQuery.current == 1){
                            v.webIndex = i+1;
                          }else{
                            v.webIndex = i+1+((state.suggestQuery.current -1) * +state.suggestQuery.size);
                          }
                          
                        v.cjsj = moment(v.cjsj*1000).format('YYYY-MM-DD  h:mm:ss')
                       

                        return v
                    })
                    resolve()
 
                }).catch( error =>{
                    reject(error)

                })
            })
        },
        
    }
}

export default vipSuggest;
