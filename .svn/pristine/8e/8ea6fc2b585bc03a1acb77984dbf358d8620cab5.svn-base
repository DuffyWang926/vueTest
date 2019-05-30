import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//商户列表
export function fetchRoleManageList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.sysRole,
        method: 'post',
        data: tmpParams
    })
}

//获取当前角色权限
export function fetchRoleManageInfo(idVal) {
  const idParam = {id : idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysRole,
    method: 'post',
    data: tmpParams
  })
}

//新增保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveSysRole,
    method: 'post',
    data: tmpParams
  })
}

//分配角色权限
export function RoleSaveData(idVal, resourceIds) {
  const idParam = {id : idVal, resourceIds : resourceIds}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.updateSysRole,
    method: 'post',
    data: tmpParams
  })
}

//删除角色
export function RemoveData(id) {
  const idParam = {id : id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeSysRole,
    method: 'post',
    data: tmpParams
  })
}

