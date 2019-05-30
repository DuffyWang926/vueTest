import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//retrieveCar数据列表
export function findRetrieveCarApplyPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findRetrieveCarApplyPage,
        method: 'post',
        data: tmpParams
    })
}
//找回车辆详情
export function findRetrieveCarDetails(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.retrieveCar,
        method: 'post',
        data: tmpParams
    })
}
//找回车辆处理
export function postRetrieveCarReply(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.retrieveCarReply,
        method: 'post',
        data: tmpParams
    })
}
