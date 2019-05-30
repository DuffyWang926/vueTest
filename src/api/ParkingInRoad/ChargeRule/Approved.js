import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";

//添加收费规则列表
export function fetchApprovedList(query) {
  let tmpParams = addFixedParams(query);
  return request({
    url: APIURL.findChargeStandardPage,
    method: 'post',
    data: tmpParams
  })
}

//添加收费规则（第一步先保存）
export function SaveApproved(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveChargeStandard,
    method: 'post',
    data: tmpParams
  })
}


//添加收费规则（下一步  添加时段）
export function SaveApprovedTime(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveChargeStandardDetail,
    method: 'post',
    data: tmpParams
  })
}

//查看时段明细列表
export function fetchApprovedTimeList(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findChargeStandardDetail,
    method: 'post',
    data: tmpParams
  })
}


//查询收费规则详情
export function fetchApprovedInfo(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getChargeStandard,
    method: 'post',
    data: tmpParams
  })
}


//修改收费时段详情
export function fetchApprovedUpdateInfo(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getChargeStandardDetail,
    method: 'post',
    data: tmpParams
  })
}

//修改收费时段（保存）
export function updateApprovedTime(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateChargeStandardDetail,
    method: 'post',
    data: tmpParams
  })
}

//修改收费规则（保存）
export function updateApproved(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateChargeStandard,
    method: 'post',
    data: tmpParams
  })
}

//通过审核
export function passApproved(id, shzt) {
  const idParam = {id: id, shzt:shzt}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.updateChargeStandard,
    method: 'post',
    data: tmpParams
  })
}

//删除收费时段
export function removeApprovedTime(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeChargeStandardDetail,
    method: 'post',
    data: tmpParams
  })
}

//删除收费时段
export function removeApproved(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeChargeStandard,
    method: 'post',
    data: tmpParams
  })
}

//删除收费时段
export function getParkingGarageBySfbzid(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findParkingGarageBySfbzid,
    method: 'post',
    data: tmpParams
  })
}
