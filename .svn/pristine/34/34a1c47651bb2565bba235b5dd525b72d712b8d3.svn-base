import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//车位设备列表
export function fetchParkingEquipmentList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findParkingDevicePage,
        method: 'post',
        data: tmpParams
    })
}

//设备类型选择框
export function fetchEquipmentTypeSelect(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
      data: tmpParams
    })
}

//设备型号选择框
export function fetchEquipmentGradeSelect(query) {
    let tmpParams = addFixedParams(query)
    return request({
      url: '',
      method: 'post',
      data: tmpParams
    })
}

//设备编号下拉
export function fetchEquipmentNumber(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
      data: tmpParams
    })
}

//查询
export function serchParkingEquipment(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: '',
        method: 'post',
      data: tmpParams
    })
}

//业务绑定 （根据车场查询车位编号 除去已绑定的车位）
export function fetchParkingEquipmentCWBH(sbzjid, idVal) {
  const idParam = {sbzjid: sbzjid, ccid: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findBwbhByCcidBdbw,
    method: 'post',
    data: tmpParams
  })
}

//设备详情
export function fetchParkingEquipmentInfo(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingDevice,
    method: 'post',
    data: tmpParams
  })
}

//设备详情右侧 （设备已分配车场和泊位）
export function fetchParkingEquipmentCCCW(idVal, ccid ) {
  const idParam = {id: idVal, ccid: ccid}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findGarageAndSpaceTree,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateParkingDevice,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveParkingDevice,
    method: 'post',
    data: tmpParams
  })
}

//删除车位设备
export function RemoveData(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
      url: APIURL.removeParkingDevice,
      method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveCWData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.bindParkingSpace,
    method: 'post',
    data: tmpParams
  })
}



//设备详情查看已绑定车场车位
export function fetchParkingEquipmentCCCWInfo(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findGarageSpace,
    method: 'post',
    data: tmpParams
  })
}

//设备详情查看已绑定车场车位
export function fetchParkingGarageIdBySbid(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingGarageIdBySbid,
    method: 'post',
    data: tmpParams
  })
}
