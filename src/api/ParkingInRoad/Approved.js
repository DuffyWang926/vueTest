import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//设备状态列表
export function fetchApprovedList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findChargeStandardPage,
    method: 'post',
    data: tmpParams
  })
}
