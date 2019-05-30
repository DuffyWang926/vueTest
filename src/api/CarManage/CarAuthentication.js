import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//车辆认证列表
export function fetchCarAuthenticationList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findAuthenticationApplyCarPage,
        method: 'post',
        data: tmpParams
    })
}

//车辆详情
export function fetchCarAuthenticationInfo(id) {
  const idParam = {id: id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getAuthenticationApplyCar,
    method: 'post',
    data: tmpParams
  })
}

//车辆认证申请审批
export function CarauthenticationCarReply(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.authenticationCarReply,
    method: 'post',
    data: tmpParams
  })
}
