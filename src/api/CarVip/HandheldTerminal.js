import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'

//手持终端列表 
export function fetchEquipmentList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
        params: tmpParams
    })
}

//设备类型选择框
export function fetchTypeSelect(query) { 
    let tmpParams = addFixedParams(query)
    return request({
        url: '/sysOrg/findSysOrgSelect',
        method: 'post',
        params: tmpParams
    })
}

//设备型号选择框
export function fetchGradeSelect(query) { 
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
        params: tmpParams
    })
}

//设备名称下拉 
export function fetchNameList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
        params: tmpParams
    })
}

//查询手持终端接口
export function changeHolidayInfo(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
        params: tmpParams
    })
}

//删除手持终端
export function deleteHolidayInfo(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '/sysHoliday/queryholiday',
        method: 'post',
        params: tmpParams
    })
}
