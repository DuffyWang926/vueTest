import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//道路管理列表
export function fetchRoadManageList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findParkingRoadPage,
    method: 'post',
    data: tmpParams
  })
}

//道路管理新增保存
export function AddSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveParkingRoad,
    method: 'post',
    data: tmpParams
  })
}

//道路管理删除
export function RemoveData(idVal) {
  const idParam = {id: idVal}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeParkingRoad,
    method: 'post',
    data: tmpParams
  })
}


