import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//获取所有参数
export function fetchBusinessParameterList() {
  return request({
    url: APIURL.findSysParamList,
    method: 'post',
    data: ''
  })
}

export function saveData(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateSysParam,
    method: 'post',
    data: tmpParams
  })
}
