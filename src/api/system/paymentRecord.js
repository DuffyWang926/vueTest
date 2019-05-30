import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//停车数据列表
export function fetchPaymentRecordList(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findPaymentRecordHistoryPageByTenantid,
        method: 'post',
        data: tmpParams
    })
}
