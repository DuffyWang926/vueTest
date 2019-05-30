import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";

//历史订单列表
export function fetchHistoryOrdersList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findOrderHistoryPage,
    method: 'post',
    data: tmpParams
  })
}

