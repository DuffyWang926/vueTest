import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "../api";

//每日出勤列表
export function fetchDailyAttendanceList(query) {
  let tmpParams = addFixedParams(query)
  return request({
    url: APIURL.findPdaUserWorkDayPage,
    method: 'post',
    data: tmpParams
  })
}
