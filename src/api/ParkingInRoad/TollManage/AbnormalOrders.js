import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";

//欠费排行列表
export function fetchAbnormalOrdersList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findOrderDiscardPage,
    method: 'post',
    data: tmpParams
  })
}

