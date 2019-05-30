import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'



//会员欠费 
export function getUserMemberArrears(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getUserMemberArrears,
        method: 'post',
        data: tmpParams
    })
}
//会员钱包 
export function getUserMemberWallet(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getUserMemberWallet,
        method: 'post',
        data: tmpParams
    })
}
//会员绑定车辆 
export function findUserMemberCarPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberCarPage,
        method: 'post',
        data: tmpParams
    })
}
//会员充值记录 
export function findUserMemberRechargePage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberRechargePage,
        method: 'post',
        data: tmpParams
    })
}
//会员充值记录 
export function findUserMemberBuyPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberBuyPage,
        method: 'post',
        data: tmpParams
    })
}
//会员bind记录 
export function findUserMemberUnbindPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberUnbindPage,
        method: 'post',
        data: tmpParams
    })
}
//会员change记录 
export function findUserMemberChangePage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberChangePage,
        method: 'post',
        data: tmpParams
    })
}
//个人会员详情
export function getUserMemberInfo(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.getUserMemberInfo,
        method: 'post',
        data: tmpParams
    })
}
//单位会员详情
export function getUserMemberCompany(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.getUserMemberCompany,
        method: 'post',
        data: tmpParams
    })
}


