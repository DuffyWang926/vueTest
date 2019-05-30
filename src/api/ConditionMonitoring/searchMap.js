import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'



//地图数据列表
export function findParkingGarageMap(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingGarageMap,
        method: 'post',
        data: tmpParams
    })
}

//地图中心
export function findParkingGarageCoordinate(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findParkingGarageCoordinate,
        method: 'post',
        data: tmpParams
    })
}





