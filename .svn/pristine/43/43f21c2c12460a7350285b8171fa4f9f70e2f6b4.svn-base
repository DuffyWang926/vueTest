import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//设备状态列表
export function fetchEquipmentStatusList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findParkingDeviceStatePage,
    method: 'post',
    data: tmpParams
  })
}

//设备查看
export function findParkingSpaceBySbid(query) {
  let tmpParams = InfoFixedParams(query)
  return request({
    url: APIURL.findParkingSpaceBySbid,
    method: 'post',
    data: tmpParams
  })
}

