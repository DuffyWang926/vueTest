
import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";
import axios from 'axios';

//操作日志列表
export function fetchOperatelogList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findSysLogPage,
    method: 'post',
    data: tmpParams
  })
}
//运营分析
// export function operationRequest(query) {
//   let tmpParams = addFixedParams(query)
//   return request({
//     url: APIURL.operationAnalyze,
//     method: 'post',
//     data: tmpParams
//   })
// }
//财务报表
export function financialRequest(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.financialReport,
    method: 'get',
    params: tmpParams
  })
}
//月收入统计
export function monthIncomeRequest(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.monthStatistics,
    method: 'get',
    params: tmpParams
  })
}
//收费员统计
export function payRequest(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.payStatistics,
    method: 'get',
    params: tmpParams
  })
}
//欠费统计
export function arrearageRequest(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.arrearage,
    method: 'get',
    params: tmpParams
  })
}
/**
 * 渠道对账
 */
// 总金额、差额
export function totalDiff(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.totalDiff,
    method: 'post',
    data: tmpParams
  })
}
// 对账明细
export function accountDetail(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.accountDetail,
    method: 'post',
    data: tmpParams
  })
}
// 下载对方对账文件压缩包
export function downloadOpposite(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.downloadOpposite,
    method: 'post',
    data: tmpParams
  })
}
// 下载我方对账文件压缩包
export function downloadMy(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.downloadMy,
    method: 'post',
    data: tmpParams
  })
}
// 下载我方对账文件压缩包
export function downloadDiff(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.downloadDiff,
    method: 'post',
    data: tmpParams
  })
}