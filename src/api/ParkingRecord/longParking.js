import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//parkingCars数据列表
export function findLongTimePage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findLongTimePage,
        method: 'post',
        data:tmpParams
    })
}






