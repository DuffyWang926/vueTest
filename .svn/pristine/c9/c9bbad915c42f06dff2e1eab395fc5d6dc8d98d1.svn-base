import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//区域管理树形列表
export function fetchMenuManageTreeList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findSysResourceTree,
    method: 'post',
    data: tmpParams
  })
}


//查询树形菜单list
export function fetchMenuManageList(id) {
  const idParam = {id : id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findSysResourceList,
    method: 'post',
    data: tmpParams
  })
}


//菜单详情
export function fetchMenuManageInfo(id) {
  const idParam = {id : id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysResource,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveSysResource,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateSysResource,
    method: 'post',
    data: tmpParams
  })
}

//删除
export function RemoveData(id) {
  const idParam = {id : id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeSysResource,
    method: 'post',
    data: tmpParams
  })
}
