import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'
import downloadrequest from '@/utils/downloadrequest'


//单位会员数据列表
export function fetchCompanyVipList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.fetchCompanyVipList,
        method: 'post',
        data: tmpParams
    })
}
//添加会员数据
export function fetchCompanyVipAdd(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.saveCorpMember,
        method: 'post',
        data: tmpParams
    })
}
//修改会员数据
export function fetchCompanyVipChange(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.updateCorpMember,
        method: 'post',
        data: tmpParams
    })
}
//delete会员数据
export function fetchCompanyVipDelete(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.deleteCorpMember,
        method: 'post',
        data: tmpParams
    })
}
//bind会员数据
export function fetchCompanyVipBindList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findCorpMemberCarPage,
        method: 'post',
        data: tmpParams
    })
}
//bind car 
export function fetchCompanyVipBindCar(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.bindCorpMemberCar,
        method: 'post',
        data: tmpParams
    })
}
//单位会员详情 
export function fetchCompanyVipCheckData(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getCorpMember,
        method: 'post',
        data: tmpParams
    })
}

//单位会员详情 
export function exportUserMemberCompany(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
        url: APIURL.exportUserMemberCompany,
        method: 'post',
        data: tmpParams
      })
    // request({
    //     url: APIURL.,
    //     method: 'post',
    //     data: tmpParams
    // })
}

//单位会员详情 
export function getUserMemberInfo(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getUserMemberInfo,
        method: 'post',
        data: tmpParams
    })
}

