import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//手持终端列表
export function fetchHandheldTerminalList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findPdaDevicePage,
        method: 'post',
        data: tmpParams
    })
}

//手持终端详情
export function fetchHandheldTerminalInfo(idVal, gsmc) {
  const idParam = {id: idVal, gsmc: gsmc}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getPdaDevice,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updatePdaDevice,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.savePdaDevice,
    method: 'post',
    data: tmpParams
  })
}

//删除手持终端
export function RemoveData(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removePdaDevice,
    method: 'post',
    data: tmpParams
  })
}

//设备类型选择框
export function fetchTypeSelect(query) {
    let tmpParams = addFixedParams(query)
    return request({
      url: '/sysOrg/findSysOrgSelect',
      method: 'post',
      data: tmpParams
    })
}

//设备型号选择框
export function fetchGradeSelect(query) {
    let tmpParams = addFixedParams(query)
    return request({
      url: '',
      method: 'post',
      data: tmpParams
    })
}

//设备名称下拉
export function fetchNameList(query) {
    let tmpParams = addFixedParams(query)
    return request({
      url: '',
      method: 'post',
      data: tmpParams
    })
}

//查询手持终端接口
export function changeHolidayInfo(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
      data: tmpParams
    })
}
