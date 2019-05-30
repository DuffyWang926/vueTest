import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//节假日列表
export function fetchHolidayList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findHolidayPage,
    method: 'post',
    data: tmpParams
  })
}
//节假日详情
export function fetchHolidayInfo(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getHoliday,
    method: 'post',
    data: tmpParams
  })
}

//添加节假日
export function AddSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveHoliday,
    method: 'post',
    data: tmpParams
  })
}

//修改节假日
export function UpdateSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateHoliday,
    method: 'post',
    data: tmpParams
  })
}

//删除节假日
export function RemoveData(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.removeHoliday,
    method: 'post',
    data: tmpParams
  })
}
