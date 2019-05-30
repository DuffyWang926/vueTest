import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//后台用户列表
export function fetchBackUserList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findSysUserPage,
    method: 'post',
    data: tmpParams
  })
}

//后台用户详情
export function fetchBackUserInfo(idVal) {
  const idParam = {id : idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysUser,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateSysUser,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveSysUser,
    method: 'post',
    data: tmpParams
  })
}
