import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";

//欠费排行列表
export function fetchCurrentComplainList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findUserComplaintPage,
    method: 'post',
    data: tmpParams
  })
}

export function fetchCurrentComplainInfo(idVal) {
  const idParam = {id: idVal}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getUserComplaint,
    method: 'post',
    data: tmpParams
  })
}

//处理投诉
export function HandleUserComplaint(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveUserComplaintHistory,
    method: 'post',
    data: tmpParams
  })
}
