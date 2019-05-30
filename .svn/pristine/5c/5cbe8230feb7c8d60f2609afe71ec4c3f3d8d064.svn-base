import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";
import downloadrequest from '@/utils/downloadrequest';

//查询部分停车卡类型
export function parkingCardTypeList() {
    const idParam = {}
    const tmpParams = InfoFixedParams(idParam)
    return request({
        url: APIURL.findCardRecordTemplate,
        method: 'post',
        data: tmpParams
    })
}

//查询停车卡分页数据
export function parkingCardPageList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingCardRecordPage,
        method: 'post',
        data: tmpParams
    })
}

//查询停车卡详情
export function checkParkingCardRecord(id) {
    const idParam = {id: id}
    const tmpParams = InfoFixedParams(idParam)
    return request({
        url: APIURL.getParkingCardRecord,
        method: 'post',
        data: tmpParams
    })
}

//废弃停车卡
export function cancelParkingCardRecord(id) {
    const idParam = {id: id}
    const tmpParams = InfoFixedParams(idParam)
    return request({
        url: APIURL.cancellationCardRecord,
        method: 'post',
        data: tmpParams
    })
}

//禁用停车卡
export function stopParkingCardRecord(id,forbiddenStatus) {
    const idParam = {id: id,forbiddenStatus:forbiddenStatus}
    const tmpParams = InfoFixedParams(idParam)
    console.log(tmpParams)
    return request({
        url: APIURL.forbiddenCardRecord,
        method: 'post',
        data: tmpParams
    })
}

//模板下载
export function downloadParkingCard() {
    return downloadrequest({
        url: APIURL.downloadTemplate,
        method: 'get',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}

//停车卡模板导入
export function goParkingCardRecord(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.importParkingCardRecord,
        method: 'post',
        data: tmpParams,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}

//停车卡模板导出
export function exitParkingCardRecord(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
        url: APIURL.exportParkingCardRecord,
        method: 'post',
        data: tmpParams
    })
}

//开通新停车卡
export function newParkingCardPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.saveParkingCardRecord,
        method: 'post',
        data: tmpParams
    })
}

//查询所有停车卡类型
export function getParkingCardTemplatePage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingCardTemplatePage,
        method: 'post',
        data: tmpParams
    })
}

//查询停车卡回填数据
export function getParkingCardinfo(id) {
    const idParam = {id: id}
    const tmpParams = InfoFixedParams(idParam)
    return request({
        url: APIURL.getParkingCardTemplate,
        method: 'post',
        data: tmpParams
    })
}
