import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//路内停车位列表
export function fetchRoadInParkingSpaceList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findParkingGaragePage,
    method: 'post',
    data: tmpParams
  })
}

//路内停车位详情
export function fetchRoadInParkingSpaceInfo(idVal,ccmc) {
  const idParam = {id: idVal,ccmc:ccmc}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingSpace,
    method: 'post',
    data: tmpParams
  })
}


//路内停车位详情(根据泊位编号查询)
export function fetchRoadInParkingSpaceInfoByCWBH(cwbh) {
  const idParam = {cwbh: cwbh}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingSpaceByid,
    method: 'post',
    data: tmpParams
  })
}


//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateParkingSpace,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveParkingSpace,
    method: 'post',
    data: tmpParams
  })
}

//路内停车位删除
export function RemoveData(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeParkingSpace,
    method: 'post',
    data: tmpParams
  })
}

//批量添加保存
export function AddBatchSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveParkingSpaceBatch,
    method: 'post',
    data: tmpParams
  })
}
