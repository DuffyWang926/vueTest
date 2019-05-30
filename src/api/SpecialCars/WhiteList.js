import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'
import downloadrequest from '@/utils/downloadrequest'
//whiteList数据列表
export function findWhiteListCarPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findWhiteListCarPage,
        method: 'post',
        data: tmpParams
    })
}
//add whiteList数据列表
export function saveWhiteListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.saveWhiteListCar,
        method: 'post',
        data: tmpParams

        
    })
}
//update whiteList数据列表
export function updateWhiteListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateWhiteListCar,
        method: 'post',
        data: tmpParams
    })
}
//delete whiteList数据列表
export function removeWhiteListCar(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.removeWhiteListCar,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function findWhiteListCarSpaceList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findWhiteListCarSpaceList,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function updateWhiteListCarSpace(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.updateWhiteListCarSpace,
        method: 'post',
        data: tmpParams
    })
}
//link whiteList数据列表
export function findBwbhByCcid(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findBwbhByCcid,
        method: 'post',
        data: tmpParams
    })
}

//导出 数据列表
export function exportWhiteListCar(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
      url: APIURL.exportWhiteListCar,
      method: 'post',
      data: tmpParams
    })
}

//停车场详情
export function getParkingGarage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.getParkingGarage,
        method: 'post',
        data: tmpParams
    })
}

//获得link table 数据
export function findParkingGarageLink(query) {
    let tmpParams = addFixedParams(query)

    return request({
        url: APIURL.findParkingGarageLink,
        method: 'post',
        data: tmpParams
    })
}

