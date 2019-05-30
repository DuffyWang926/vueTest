import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//parkingCars数据列表
export function findParkingRecordPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingRecordPage,
        method: 'post',
        data:tmpParams
    })
}
//个人信息数据
export function getUserMemberInfoPark(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getUserMemberInfo,
        method: 'post',
        data:tmpParams
    })
}
//人工离场
export function manualLeaveParking(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.manualLeaveParking,
        method: 'post',
        data:tmpParams
    })
}
//离场原因
export function findDictPage(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findDictPage,
        method: 'post',
        data:tmpParams
    })
}





