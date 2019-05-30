import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//appInvoice数据列表
export function findAppInvoicePage(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findAppInvoicePage,
        method: 'post',
        data: tmpParams
    })
}
//APP开票详情
export function getAppInvoice(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.getAppInvoice,
        method: 'post',
        data: tmpParams
    })
}
//APP开票内容
export function findAppInvoiceInfo(query) {
    let tmpParams = InfoFixedParams(query)
    return request({
        url: APIURL.findAppInvoiceInfo,
        method: 'post',
        data: tmpParams
    })
}





