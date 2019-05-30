import request from '@/utils/request'
import formrequest from '@/utils/formrequest'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'
//运营公司列表
export function fetchOperateList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.sysOrg,
    method: 'post',
    data: tmpParams
  })
}

//查询公司详情
export function fetchOperateInfo(idVal) {
  const idParam = {id: idVal}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysOrg,
    method: 'post',
    data: tmpParams
  })
}

//添加公司
export function AddSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.saveSysOrg,
    method: 'post',
    data: tmpParams
  })
}

//修改公司信息
export function UpdateSaveData(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateSysOrg,
    method: 'post',
    data: tmpParams
  })
}

//原来bug
export function addCompanyAccountSet(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.updateSysOrg,
    method: 'post',
    data: tmpParams
  })
}


//添加账户
export function SaveCompanyAccount(query) {
  let tmpParams = addFixedParams(query)
  return formrequest({
    url: APIURL.saveSysOrgPay,
    method: 'post',
    data: tmpParams
  })
}

//测试下单
export function TestOrderAccount(gsid, zfqd) {
  const idParam = {gsid: gsid, zfqd: zfqd}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.saveUnifiedOrder,
    method: 'post',
    data: tmpParams
  })
}


//测试退款
export function TestOrderRefund(jlid, zfqd) {
  const idParam = {jlid: jlid, zfqd: zfqd}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.saveUnifiedRefund,
    method: 'post',
    data: tmpParams
  })
}
//查看结果
export function SeeResultAccount(id) {
  const idParam = {id:id}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getResult,
    method: 'post',
    data: tmpParams
  })
}

//查询支付信息详情(公司id，zfqd)
export function getOrgPayInfo(gsid, zfqd) {
  const idParam = {gsid: gsid, zfqd: zfqd}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysOrgPayInfo,
    method: 'post',
    data: tmpParams
  })
}

//查询支付信息详情(公司id)
export function getOrgPayInfoForGSID(gsid) {
  const idParam = {gsid: gsid}
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.getSysOrgPayListByGsid,
    method: 'post',
    data: tmpParams
  })
}


