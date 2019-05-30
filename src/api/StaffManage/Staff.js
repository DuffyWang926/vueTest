import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//员工列表
export function fetchStaffList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findPdaUserPage,
    method: 'post',
    data: tmpParams
  })
}


//员工详情
export function fetchStaffInfo(idVal) {
  const idParam = {id : idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getPdaUser,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updatePdaUser,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.savePdaUser,
    method: 'post',
    data: tmpParams
  })
}

//员工删除
export function RemoveData(id) {
  const idParam = {id : id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removePdaUser,
    method: 'post',
    data: tmpParams
  })
}


//员工根据车场id展示车场和车位
export function fetchStaffCCCWList(glyid ,idVal) {
  const idParam = {glyid:glyid, ccid: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findGarageAndSpaceByCcid,
    method: 'post',
    data: tmpParams
  })
}


//员工已分配车场和车位
export function fetchStaffCCCWTree(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findGarageAndSpaceTree,
    method: 'post',
    data: tmpParams
  })
}


//添加保存
export function AddSaveCWData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findGarageAndSpace,
    method: 'post',
    data: tmpParams
  })
}

