import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//车辆认证列表
export function fetchAuthenticationHistoryList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findAuthenticationCarHistoryPage,
    method: 'post',
    data: tmpParams
  })
}

//车辆认证历史详情
export function fetchAuthenticationHistoryInfo(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getAuthenticationCarHistory,
    method: 'post',
    data: tmpParams
  })
}

