import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'
import downloadrequest from '@/utils/downloadrequest'
//whiteList数据列表
export function findBlackListCarPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findBlackListCarPage,
        method: 'post',
        data: tmpParams
    })
}
//add whiteList数据列表
export function saveBlackListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.saveBlackListCar,
        method: 'post',
        data: tmpParams

        
    })
}
//update whiteList数据列表
export function updateBlackListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateBlackListCar,
        method: 'post',
        data: tmpParams
    })
}
//delete whiteList数据列表
export function removeBlackListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.removeBlackListCar,
        method: 'post',
        data: tmpParams
    })
}
//导出 数据列表

export function exportBlackListCar(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
      url: APIURL.exportBlackListCar,
      method: 'post',
      data: tmpParams
    })
}