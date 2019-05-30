import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'



//停车记录详情 
export function getParkingRecordLogInfo(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getParkingRecordLogInfo,
        method: 'post',
        data: tmpParams
    })
}

//车辆详情 
export function getCarByHphmAndCpys(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getCarByHphmAndCpys,
        method: 'post',
        data: tmpParams
    })
}

//停车场详情 
export function getParkingGarageCcbh(query) {
 
    return request({
        url: APIURL.getParkingGarageCcbh,
        method: 'post',
        data: query 
    })
}

//历史停车订单 
export function findOrderHistoryPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findOrderHistoryPage,
        method: 'post',
        data: tmpParams
    })
}



