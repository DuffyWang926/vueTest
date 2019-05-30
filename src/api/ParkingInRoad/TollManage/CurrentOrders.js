import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../../api";

//当前订单列表
export function fetchCurrentOrderList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findOrderPage,
    method: 'post',
    data: tmpParams
  })
}

//处理异常订单（作废）
export function HandleOrderDiscard(id,zfyy) {
  const idParam = {id:id, zfyy: zfyy }
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.parkingOrderDiscard,
    method: 'post',
    data: tmpParams
  })
}


//订单详情
export function fetchCurrentOrderInfo(id) {
  const idParam = {id:id}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getParkingOrderInfo,
    method: 'post',
    data: tmpParams
  })
}


//订单详情  查询停车订单支付记录
export function fetchCurrentOrderPayList(ddid) {
  const idParam = {ddid:ddid}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findPaymentRecordInfo,
    method: 'post',
    data: tmpParams
  })
}

//订单详情  查询停车订单费用明细
export function fetchCurrentOrderArrearsList(ddid) {
  const idParam = {ddid:ddid}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findParkingOrderMoney,
    method: 'post',
    data: tmpParams
  })
}

//订单详情  获取在停车辆记录信息
export function fetchParkRecordOrHistoryById(parkId,rwsj) {
    const idParam = {parkId:parkId, rwsj:rwsj}
    const tmpParams = InfoFixedParams(idParam)
    return request({
        url: APIURL.getParkRecordOrHistoryById,
        method: 'post',
        data: tmpParams
    })
}


