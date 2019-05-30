import request from '@/utils/request'
import downloadrequest from '@/utils/downloadrequest'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//whiteList数据列表
export function findDiscountCarPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findDiscountCarPage,
        method: 'post',
        data: tmpParams
    })
}
//add whiteList数据列表
export function saveDiscountCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.saveDiscountCar,
        method: 'post',
        data: tmpParams

        
    })
}
//update whiteList数据列表
export function updateDiscountCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateDiscountCar,
        method: 'post',
        data: tmpParams
    })
}
//delete whiteList数据列表
export function removeDiscountCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.removeDiscountCar,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function findDiscountCarSpaceList(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findDiscountCarSpaceList,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function updateDiscountCarSpace(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateDiscountCarSpace,
        method: 'post',
        data: tmpParams
    })
}
//导出折扣车 （下载功能）
export function exportDiscountCar(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
      url: "/discountCar/exportDiscountCar",
      method: 'post',
      data: tmpParams
    })
}
