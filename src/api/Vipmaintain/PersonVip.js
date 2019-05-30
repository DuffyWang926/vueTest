import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//个人会员数据列表
export function fetchPersonVipList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberPage,
        method: 'post',
        data: tmpParams
    })
}
//个人会员解绑数据列表
export function findUserMemberToUnbindPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findUserMemberToUnbindPage,
        method: 'post',
        data: tmpParams
    })
}
//解绑车辆
export function unbindUserMemberCar(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.unbindUserMemberCar,
        method: 'post',
        data: tmpParams
    })
}
