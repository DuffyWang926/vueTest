import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from '@/api/api'

//密码check
export function checkPassword(dlmm) {
    
    let tmpParams = InfoFixedParams(dlmm)
    return request({
        url: APIURL.checkPassword,
        method: 'post',
        data: tmpParams
    })
}
