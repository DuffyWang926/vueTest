import request from '@/utils/request'
import { addFixedParams, InfoFixedParams } from '@/utils/addParamsHeader'
import APIURL from "./api";

//校验系统密码
export function checkXTPassword(dlmm) {
  const idParam = {dlmm: dlmm};
  let tmpParams = InfoFixedParams(idParam)
  return request({
    url: APIURL.checkPassword,
    method: 'post',
    data: tmpParams
  })
}

//获取所属公司下拉框值
export function fetchSSGSList(id) {
  const idParam = {gsid: id};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSysOrgSelect,
    method: 'post',
    data: tmpParams
  })
}

//获取运营公司下拉框值（停车场新增页面）
export function fetchParkingSSGSList() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSysOrgEndNodeSelect,
    method: 'post',
    data: tmpParams
  })
}
//获取入账公司下拉框值（停车场新增页面）
export function fetchParkingRZGSList() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSysOrgAccountSelect,
    method: 'post',
    data: tmpParams
  })
}


//获取所有角色
export function fetchJSMCList(id) {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSysRoleSelect,
    method: 'post',
    data: tmpParams
  })
}

//行政区划三级联动下拉框
export function fetchXZQHBHList(qybh) {
  const idParam = {qybh : qybh};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findXzqhSelect,
    method: 'post',
    data: tmpParams
  })
}

//区域管理中自定义区域筛选父级区域
export function fetchFJQYList() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findYwqyExceptCustomSelect,
    method: 'post',
    data: tmpParams
  })
}

//道路所属区域
export function fetchSSQYlist() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSsqySelect,
    method: 'post',
    data: tmpParams
  })
}

//根据区域查询所有道路
export function fetchDLlist(id) {
  const idParam = {ywqybh: id};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findParkingRoadSelect,
    method: 'post',
    data: tmpParams
  })
}

//停车场名称(返回车场名称，车场id)
export function fetchParkingGarageNamelist(id, ccmc) {
  const idParam = {yygsid:id, ccmc:ccmc};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findParkingGarageNameSelect,
    method: 'post',
    data: tmpParams
  })
}

//停车场名称(返回车场名称，车场编号)
export function fetchParkingGarageNameCcbhlist(id, ccmc) {
  const idParam = {yygsid:id, ccmc:ccmc};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findParkingGarageNameCcbh,
    method: 'post',
    data: tmpParams
  })
}


//停车场编号
export function fetchParkingGarageBhlist(id, ccbh) {
  const idParam = {yygsid:id, ccbh:ccbh};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findParkingGarageBhSelect,
    method: 'post',
    data: tmpParams
  })
}

//停车位编号
export function fetchParkingSpaceBhlist(id, cwbh) {
  const idParam = {sbzjid:id, cwbh:cwbh};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findParkingSpaceBhSelect,
    method: 'post',
    data: tmpParams
  })
}

//员工姓名
export function fetchPdaUserNamelist(id, zsmc) {
  const idParam = {gsid:id, zsmc:zsmc};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findPdaUserNameSelect,
    method: 'post',
    data: tmpParams
  })
}
//会员帐号
export function fetchUserMemberlist(dlmc) {
  const idParam = {dlmc:dlmc};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findUserMemberAccountSelect,
    method: 'post',
    data: tmpParams
  })
}
//获取后台用户下拉框（操作人）
export function fetchSysUserlist() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findSysUserSelect,
    method: 'post',
    data: tmpParams
  })
}

//号牌号码
export function fetchHPHMlist(hphm) {
  const idParam = {hphm:hphm};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findCarSelect,
    method: 'post',
    data: tmpParams
  })
}


//获取商户（除系统商户外）
export function fetchSHIDlist() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findOnetBusinessUserSelect,
    method: 'post',
    data: tmpParams
  })
}



//停车场新增（查询收费规则）
export function fetchSFZZlist() {
  const idParam = {};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findChargeStandardList,
    method: 'post',
    data: tmpParams
  })
}


//字典（获取该识别码下的所有字典名称及字典值）
export function fetchDictlist(sbm) {
  const idParam = {sbm:sbm};
  let tmpParams = InfoFixedParams(idParam);
  return request({
    url: APIURL.findDictSelect,
    method: 'post',
    data: tmpParams
  })
}
