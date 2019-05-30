import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//路内停车场列表
export function fetchRoadInParkingList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findParkingGarage,
    method: 'post',
    data: tmpParams
  })
}

//路内停车场详情(根据运营公司和车场id)
export function fetchRoadInParkingInfo(idVal,yygs) {
  const idParam = {id: idVal,yygs:yygs}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingGarage,
    method: 'post',
    data: tmpParams
  })
}

//路内停车场详情(根据车位编号查询)
export function fetchRoadInParkingInfoByCCBH(query) {
  // const idParam = query;
  // const tmpParams = addFixedParams(idParam);
  return request({
    url: APIURL.getParkingGarageCcbh,
    method: 'post',
    data: query
  })
}

//根据车场查询车位编号
export function fetchRoadInParkingBwbh(ccid) {
  const idParam = {ccid: ccid}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findBwbhByCcid,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateParkingGarage,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveParkingGarage,
    method: 'post',
    data: tmpParams
  })
}

//路内停车场删除
export function RemoveData(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeParkingGarage,
    method: 'post',
    data: tmpParams
  })
}

