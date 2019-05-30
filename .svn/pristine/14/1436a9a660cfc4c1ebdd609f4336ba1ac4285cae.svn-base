import request from '@/utils/request'
import downloadrequest from '@/utils/downloadrequest'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//人员维度列表
export function fetchPersonnelList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findPdaUserWorkPage,
    method: 'post',
    data: tmpParams
  })
}


export function exportPdaWordDayExcel(query) {
    let tmpParams = addFixedParams(query)
    return downloadrequest({
        url: APIURL.exportPdaWordDayExcel,
        method: 'post',
        data: tmpParams
    })
}
