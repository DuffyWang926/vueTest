import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'
import downloadrequest from '@/utils/downloadrequest'

//whiteList数据列表
export function findDisabledCarPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findDisabledCarPage,
        method: 'post',
        data: tmpParams
    })
}
//add whiteList数据列表
export function saveDisabledCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.saveDisabledCar,
        method: 'post',
        data: tmpParams

        
    })
}
//update whiteList数据列表
export function updateDisabledCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateDisabledCar,
        method: 'post',
        data: tmpParams
    })
}
//delete whiteList数据列表
export function removeDisabledCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.removeDisabledCar,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function findDisabledCarSpaceList(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findDisabledCarSpaceList,
        method: 'post',
        data: tmpParams
    })
}
//update link whiteList数据列表
export function updateDisabledCarSpace(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateDisabledCarSpace,
        method: 'post',
        data: tmpParams
    })
}

//导出数据列表
export function exportDisabledCar(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
      url: "/disabledCar/exportDisabledCar",
      method: 'post',
      data: tmpParams
    })
}