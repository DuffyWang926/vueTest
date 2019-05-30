import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//retrieveCar数据列表 
export function findmemberFeedbackPage(query) {
    let tmpParams = addFixedParams(query)
    return request({
        url: APIURL.findmemberFeedbackPage,
        method: 'post',
        data: tmpParams
    })
}

