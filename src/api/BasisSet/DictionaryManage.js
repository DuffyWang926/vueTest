import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//获取字典所有分类
export function fetchDictionaryManageType(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findDictType,
    method: 'post',
    data: tmpParams
  })
}

//获取列表
export function fetchDictionaryManageList(id) {
  const idParam = {fid: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findDictPage,
    method: 'post',
    data: tmpParams
  })
}
//添加保存
export function AddSaveTypeData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveDictType,
    method: 'post',
    data: tmpParams
  })
}

//字典详情
export function fetchDictionaryManageInfo(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getDictInfo,
    method: 'post',
    data: tmpParams
  })
}

//添加保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveDict,
    method: 'post',
    data: tmpParams
  })
}

//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateDict,
    method: 'post',
    data: tmpParams
  })
}

//删除字典
export function RemoveData(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeDict,
    method: 'post',
    data: tmpParams
  })
}
