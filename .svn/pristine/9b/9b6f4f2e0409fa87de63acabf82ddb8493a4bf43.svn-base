import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//停车数据列表
export function fetchParkingDataList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingRecordLogPage,
        method: 'post',
        data: tmpParams
    })
}

//停車數據圖片
export function fetchParkingDataImgList(id, shid) {
    const idParam = {id: id, shid: shid}
    let tmpParams = InfoFixedParams(idParam)
    return request({
        url: '/parkingRecordLog/getImage',
        method: 'post',
        data: tmpParams
    })
}
