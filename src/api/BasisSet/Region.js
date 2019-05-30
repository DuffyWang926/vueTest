import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//区域管理列表
export function fetchRegionList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findYwqyPage,
    method: 'post',
    data: tmpParams
  })
}

//区域管理树形列表
export function fetchRegionTreeList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findYwqyTree,
    method: 'post',
    data: tmpParams
  })
}

//区域管理添加
export function AddSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveYwqy,
    method: 'post',
    data: tmpParams
  })
}

//区域管理删除
export function RemoveData(qybh, fqybh) {
  const idParam = {qybh: qybh, fqybh: fqybh}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeYwqy,
    method: 'post',
    data: tmpParams
  })
}

