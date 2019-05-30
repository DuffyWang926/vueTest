import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//车辆信息列表
export function fetchCarInfoList(query) {
  let tmpParams = addFixedParams(query)
  return request({
      url: APIURL.findCarPage,
      method: 'post',
      data: tmpParams
  })
}

//车辆信息详情
export function fetchCarInfoInfoID(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getCar,
    method: 'post',
    data: tmpParams
  })
}
//车辆信息详情根据号牌号码和号牌颜色查询
export function fetchCarInfoInfo(hphm, cpys) {
  const idParam = {hphm: hphm, cpys: cpys}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getCarByHphmAndCpys,
    method: 'post',
    data: tmpParams
  })
}
export function CarArrearsInfoInfo(hphm, cpys) {
  const idParam = {hphm: hphm, cpys: cpys}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getHphmParkingOrderArrearsInfo,
    method: 'post',
    data: tmpParams
  })
}


//车辆详情（认证信息）
export function fetchCarAuthenticationByHphmAndCpysInfo(hphm, cpys) {
  const idParam = {hphm: hphm, cpys: cpys}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getAuthenticationCarHistoryByHphmAndCpys,
    method: 'post',
    data: tmpParams
  })
}


//车辆信息详情(订单信息)
export function fetchCarArrearsInfo(hphm,cpys) {
  const idParam = {hphm:hphm,cpys:cpys}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findHphmParkingOrderArrearsList,
    method: 'post',
    data: tmpParams
  })
}


//车辆信息详情(被绑历史)
export function fetchCarBindHistoryInfo(idVal) {
  const idParam = {id: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.findCarBindHistoryPage,
    method: 'post',
    data: tmpParams
  })
}

