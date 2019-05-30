import request from '@/utils/request'
import { addFixedParams, InfoFixedParams} from '@/utils/addParamsHeader'
import APIURL from './api'


export function login(dlmc, dlmm) {
  const idParam = {dlmc : dlmc, dlmm:dlmm};
  const tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.login,
    method: 'post',
    data: tmpParams,
    headers: {'Content-Type': 'application/json', 'appType': 5, 'version': '1.0.01', 'tenantId':  localStorage.getItem("SHID")},
  })
}

export function fetchOnetBusinessSelect(query) {
  const tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findOnetBusinessSelect,
    method: 'post',
    data: tmpParams,
    headers: {'Content-Type': 'application/json', 'appType': 5, 'version': '1.0.01'},
  })
}

export function logout() {
  return request({
    url: APIURL.logout,
    method: 'post',
  })
}

