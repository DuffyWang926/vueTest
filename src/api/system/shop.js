import request from '@/utils/request'
import formrequest from '@/utils/formrequest'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//商户列表
export function fetchShopList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findOnetBusinessPage,
    method: 'post',
    data: tmpParams
  })
}
//商户详情
export function fetchShopInfo(idVal) {
  const idParam = {shid: idVal}
  const tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getOnetBusiness,
    method: 'post',
    data: tmpParams
  })
}
//新增时获取默认商户编号
export function fetchShopShbh() {
  return request({
    url: APIURL.getSHBH,
    method: 'post',
    data: {}
  })
}
//修改保存
export function UpdateSaveData(query) {
  const tmpParams = addFixedParams(query)
  return formrequest({
    url: APIURL.updateOnetBusiness,
    method: 'post',
    data: tmpParams
  })
}

//新增保存
export function AddSaveData(query) {
  const tmpParams = addFixedParams(query)
  return formrequest({
    url: APIURL.saveOnetBusiness,
    method: 'post',
    data: tmpParams
  })
}
