import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//违停车辆 数据
export function findParkingIllegalByPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingIllegalByPage,
        method: 'post',
        data: tmpParams
    })
}








