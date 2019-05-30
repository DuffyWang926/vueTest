/**
 * api接口统一管理
 */

// 接口集合
const APIURL = {

    // 公共接口
    checkPassword: '/auth/checkPassword',

    // 登录
    login: '/auth/passwordLogin',
    logout: '/auth/logout',
    findOnetBusinessSelect : '/onetBusiness/findOnetBusinessSelect',//(登录使用)
    findOnetBusinessUserSelect : '/onetBusiness/findOnetBusinessUserSelect',//（停车记录使用,不带系统商户）

    //状态监控
    //today data
    getParkingOrderCount: '/dataToday/getParkingOrderCount',
    //park count
    getParkingCount: '/dailyData/getParkingCount',
    //park duration
    getParkingDuration: '/dailyData/getParkingDuration',
    //users count
    getPdaUserCount: '/dataToday/getPdaUserCount',
    //今日数据
    todayData: 'report/todayData',


    //地图 data
    findParkingGarageMap: '/parkingGarage/findParkingGarageMap',
    //地图 中心
    findParkingGarageCoordinate: '/parkingGarage/findParkingGarageCoordinate',

    //违停车辆 data
    findParkingIllegalByPage: '/parkIllegal/findParkingIllegalByPage',






    //searchList data
    //会员名称
    findUserMemberNameSelect: '/userMember/findUserMemberNameSelect',
    //会员名称
    findUserMemberAccountSelect: '/userMember/findUserMemberAccountSelect',
    //车牌
    findCarSelect: '/car/findCarSelect',
    //区域
    findSsqySelect: '/ywqy/findSsqySelect',
    //公司区域
    findSysOrgSelect: '/sysOrg/findSysOrgSelect',
    //停车场区域
    findParkingGarageNameSelect: '/parkingGarage/findParkingGarageNameSelect',
    //停车位
    findParkingSpaceBhSelect: '/parkingSpace/findParkingSpaceBhSelect',


    //详情接口
    //离位记录详情
    getParkingRecordLogInfo: '/parkingRecordLog/getParkingRecordLogInfo',
    //车辆详情
    getCarByHphmAndCpys: '/car/getCarByHphmAndCpys',
    //停车场详情
    getParkingGarageCcbh: '/parkingGarage/getParkingGarageCcbh',




    /**
     * 路内业务
     */
    //停车记录
    // 在停车辆列表
    findParkingRecordPage: '/parkingRecord/findParkingRecordPage',
    // 人工离场
    manualLeaveParking: '/parkingRecord/leave',

    //超长停车
    findLongTimePage: '/parkingRecord/findLongTimePage',


    //超长停车
    findParkingRecordHistoryPage: '/parkingRecordHistory/findParkingRecordHistoryPage',

    //已离场车辆列表
    parkingLeaveRecord: '/parkingLeaveRecord/findPage',
    //已离场车辆 导出
    parkingLeaveexport: '/parkingLeaveRecord/export',


    //设备状态（列表）
    findParkingDeviceStatePage: '/parkingDevice/findParkingDeviceStatePage',
    //设备状态（列表）
    findParkingSpaceBySbid: '/parkingDevice/findParkingSpaceBySbid',


    //收费管理
    //当前订单列表
    findOrderPage: '/parkingOrder/findOrderPage',
    //处理异常订单（作废）
    parkingOrderDiscard: '/parkingOrderDiscard/saveOrderDiscard',
    //作废订单列表
    saveOrderDiscard: '/parkingOrder/saveOrderDiscard',
    //欠费排行列表
    findOrderArrears: '/parkingOrder/findOrderArrears',
    //历史订单列表
    findOrderHistoryPage: '/parkingOrderHistory/findOrderHistoryPage',
    //异常订单列表
    findOrderDiscardPage: '/parkingOrderDiscard/findOrderDiscardPage',
    //订单详情
    getParkingOrderInfo: '/parkingOrder/getParkingOrderInfo',
    //订单详情，查询停车订单支付记录
    findPaymentRecordInfo: '/parkingOrderPaymentRecord/findPaymentRecordInfo',
    //订单详情，查询停车订单费用明细
    findParkingOrderMoney: '/parkingOrderMoney/findParkingOrderMoney',

    //根据订单Id查询车辆记录信息
    getParkRecordOrHistoryById: '/parkingRecord/getParkRecordOrHistoryById',

    //投诉处理
    //当前投诉列表
    findUserComplaintPage: '/userComplaint/findUserComplaintPage',
    //用户投诉详情
    getUserComplaint: '/userComplaint/getUserComplaint',
    //处理投诉
    saveUserComplaintHistory: '/userComplaint/saveUserComplaintHistory',
    //已处理投诉列表
    findUserComplaintHistoryPage: '/userComplaintHistory/findUserComplaintHistoryPage',

    //特殊车管理
    //白名单列表
    findWhiteListCarPage: '/whiteListCar/findWhiteListCarPage',
    //add单列表
    saveWhiteListCar: '/whiteListCar/saveWhiteListCar',
    //update单列表
    updateWhiteListCar: '/whiteListCar/updateWhiteListCar',
    //delete列表
    removeWhiteListCar: '/whiteListCar/removeWhiteListCar',
    //link 泊位列表
    findWhiteListCarSpaceList: '/whiteListCar/findWhiteListCarSpaceList',
    //return link 泊位
    updateWhiteListCarSpace: '/whiteListCar/updateWhiteListCarSpace',
    //根据车场获得泊位
    findBwbhByCcid: '/parkingSpace/findBwbhByCcid',
    //导出
    exportWhiteListCar: '/whiteListCar/exportWhiteListCar',
    //link 泊位table数据
    findParkingGarageLink: '/parkingGarage/findParkingGarage',


    //黑名单列表
    findBlackListCarPage: '/blackListCar/findBlackListCarPage',
    //add单列表
    saveBlackListCar: '/blackListCar/saveBlackListCar',
    //update单列表
    updateBlackListCar: '/blackListCar/updateBlackListCar',
    //delete列表
    removeBlackListCar: '/blackListCar/removeBlackListCar',
    //导出列表
    exportBlackListCar: '/blackListCar/exportBlackListCar',


    //残疾人列表
    findDisabledCarPage: '/disabledCar/findDisabledCarPage',
    //add单列表
    saveDisabledCar: '/disabledCar/saveDisabledCar',
    //update单列表
    updateDisabledCar: '/disabledCar/updateDisabledCar',
    //delete列表
    removeDisabledCar: '/disabledCar/removeDisabledCar',
     //link 泊位列表
     findDisabledCarSpaceList: '/disabledCar/findDisabledCarSpaceList',
     //return link 泊位
     updateDisabledCarSpace: '/disabledCar/updateDisabledCarSpace',
     //导出列表
     exportDisabledCar: '/disabledCar/exportDisabledCar',



     //折扣车列表
     findDiscountCarPage: '/discountCar/findDiscountCarPage',
     //add列表
     saveDiscountCar: '/discountCar/saveDiscountCar',
     //update单列表
     updateDiscountCar: '/discountCar/updateDiscountCar',
     //delete列表
     removeDiscountCar: '/discountCar/removeDiscountCar',
     //link 泊位列表
     findDiscountCarSpaceList: '/discountCar/findDiscountCarSpaceList',
      //return link 泊位
      updateDiscountCarSpace: '/discountCar/updateDiscountCarSpace',
      //导出列表
      exportDiscountCar: '/discountCar/exportDiscountCar',



    //收费规则
    //收费规则列表
    findChargeStandardPage : '/chargeStandard/findChargeStandardPage',
    //查询收费时段明细
    findChargeStandardDetail : '/chargeStandard/findChargeStandardDetail',
    //查询收费标准时段明细（详情，修改时反显）
    getChargeStandardDetail : '/chargeStandard/getChargeStandardDetail',
    //时段明细修改（保存）
    updateChargeStandardDetail : '/chargeStandard/updateChargeStandardDetail',

    //审核规则列表（待审核）
    findChargeStandardIngPage: '/chargeStandard/findChargeStandardIngPage',
    //已审核规则列表（审核通过）
    // findChargeStandardPage: '/chargeStandard/findChargeStandardPage',
    //添加按天收费规则
    saveChargeStandardDay: '/chargeStandard/saveChargeStandardDay',
    //添加按次收费规则
    saveChargeStandard: '/chargeStandard/saveChargeStandard',
    //添加按时段收费规则
    saveChargeStandardDetail: '/chargeStandard/saveChargeStandardDetail',
    //修改 按天收费规则
    updateChargeStandardDay: '/chargeStandard/updateChargeStandardDay',
    //修改 按次收费规则
    updateChargeStandard: '/chargeStandard/updateChargeStandard',
    //查看 按天收费规则
    getChargeStandardDay: '/chargeStandard/getChargeStandardDay',
    //查看 按次收费规则
    getChargeStandard: '/chargeStandard/getChargeStandard',

    //删除收费标准
    removeChargeStandard: '/chargeStandard/removeChargeStandard',
    //删除收费时段
    removeChargeStandardDetail: '/chargeStandard/removeChargeStandardDetail',
    //根据收费标准id获取收费标准id下的车场
    findParkingGarageBySfbzid: '/parkingGarage/findParkingGarageBySfbzid',

    //发票管理
    //APP开票列表
    findAppInvoicePage: '/appInvoice/findAppInvoicePage',
    //APP开票详情
    getAppInvoice: '/appInvoice/getAppInvoice',
    //APP开票内容
    findAppInvoiceInfo: '/appInvoice/findAppInvoiceInfo',


    /**
     * 员工管理
     */
    //员工列表
    findPdaUserPage: '/pdaUser/findPdaUserPage',
    //员工详情
    getPdaUser: '/pdaUser/getPdaUser',
    //新增员工
    savePdaUser: '/pdaUser/savePdaUser',
    //修改员工
    updatePdaUser: '/pdaUser/updatePdaUser',
    //删除员工
    removePdaUser: '/pdaUser/removePdaUser',
    //分配停车场车位
    savePlaceSpace: '/pdaUser/pdaUser/save',
    //员工姓名选择框
    findPdaUserNameSelect: '/pdaUser/findPdaUserNameSelect',
    //员工已分配车场和车位
    pdaUserfindGarageAndSpaceTree: '/pdaUser/findGarageAndSpaceTree',
    //根据车场id显示车场及车位编号
    findGarageAndSpaceByCcid: '/pdaUser/findGarageAndSpaceByCcid',

    //已分配车场和泊位
    findGarageAndSpaceTree: '/pdaUser/findGarageAndSpaceTree',
    //保存分配数据
    findGarageAndSpace: '/pdaUser/findGarageAndSpace',
    //导出
    exportPdaWordDayExcel: '/pdaUserWorkDay/exportPdaWordDayExcel',




    //考勤查询
    //人员维度
    findPdaUserWorkPage: '/pdaUserWorkDay/findPdaUserWorkPage',
    //每日出勤
    findPdaUserWorkDayPage: '/pdaUserWorkDay/findPdaUserWorkDayPage',


    /**
     * 分析报表
     */
    //运营分析
    // operationAnalyze: ''
    //基础报表
    // 财务报表
    financialReport: '/report/parkingFee',
    // 月收入统计
    monthStatistics: '/report/monthlyIncome',
    // 收费员统计
    payStatistics: '/report/collector',
    //欠费统计
    arrearage: '/report/debt',
    /**
     * 渠道对账
     */
    // 总金额、差额
    totalDiff: '/paymentRecordBillSummary/getPaymentRecordBillSummaryByZfqdAndZdrq',
    // 对账明细
    accountDetail: '/paymentRecordBillSummary/findPaymentRecordBillSummaryResultDataPage',
    // 下载对方对账文件压缩包
    downloadOpposite: '/paymentRecordBillSummary/downloadDfdzwjZip',
    // 下载我方对账文件压缩包
    downloadMy: '/paymentRecordBillSummary/downloadWfdzwjZip',
    // 下载差异文件压缩包
    downloadDiff: '/paymentRecordBillSummary/downloadCywjZip',
    //日志管理

    //查询操作日志
    findSysLogPage: '/sysLog/findByPage',

    /**
     * 会员维护
     */
    //个人会员
    //个人会员列表
    findUserMemberPage: '/userMember/findUserMemberPage',
    //个人会员解绑
    unbindUserMemberCar: '/car/saveUnbindUserMemberCarByAdmin',
    //个人会员解绑表格
    findUserMemberToUnbindPage: '/car/findCarPageByYhid',

    //会员欠费
    getUserMemberArrears: '/parkingOrderArrears/getUserParkingOrderArrearsInfo',
    //会员钱包
    getUserMemberWallet: '/userWallet/getUserMemberWallet',
    //会员车辆
    findUserMemberCarPage: '/car/findCarPageByYhid',

    //会员充值记录
    findUserMemberRechargePage: '/userMember/findUserMemberRechargePage',
    //会员购买记录
    findUserMemberBuyPage: '/userMember/findUserMemberBuyPage',
    //会员bind记录
    findUserMemberUnbindPage: '/userCarRecord/findUserCarRecordPage',
    //会员change记录
    findUserMemberChangePage: '/userInformationChangeRecord/findUserInformationChangeRecordPage',
    //个人会员信息
    getUserMemberInfo: '/userMember/getUserMember',


    //单位会员
    //单位会员详情
    getUserMemberCompany: '/userMemberCompany/getUserMemberCompany',
    //单位会员详情
    exportUserMemberCompany: '/userMemberCompany/exportUserMemberCompany',

    //单位会员列表
    fetchCompanyVipList: '/userMemberCompany/findUserMemberCompanyPage',
    //单位会员bind车辆列表
    findCorpMemberCarPage: '/car/findCarPageByYhid',
    //新增单位会员
    saveCorpMember: '/userMemberCompany/saveUserMemberCompany',
    //修改单位会员
    updateCorpMember: '/userMemberCompany/updateUserMemberCompany',
    //删除单位会员
    deleteCorpMember: '/userMemberCompany/removeUserMemberCompany',
    //单位会员绑定车辆
    bindCorpMemberCar: '/car/saveBindUserMemberCar',
    //批量绑定车辆
    multiBindCorpMemberCar: '/userMember/multiBindCompanyCar',

    //找回车辆
    //找回车辆申请列表
    findRetrieveCarApplyPage: '/retrieveCar/findRetrieveCarApplyPage',
    //找回车辆申请详情
    retrieveCar: '/retrieveCar/getRetrieveCarApply',
    //找回车辆申请审批
    retrieveCarReply: '/retrieveCar/saveRetrieveCarReply',

    //会员建议
    //会员建议列表
    findmemberFeedbackPage: '/userFeedback/findUserFeedbackPage',
    /**
     * 车辆管理
     */
    //车辆信息
    //车辆列表
    findCarPage: '/car/findCarPage',
    //车辆详情（详细信息）
    getCar: '/car/getCar',
    // 车辆欠费金额，欠费笔数
    getHphmParkingOrderArrearsInfo: '/parkingOrderArrears/getHphmParkingOrderArrearsInfo',
    //车辆详情（欠费订单）
    findHphmParkingOrderArrearsList: '/parkingOrderArrears/findHphmParkingOrderArrearsList',

    //车辆详情（被绑历史）
    findCarBindHistoryPage: '/userCarRecord/findCarBindHistoryPage',
    //车辆认证
    //车辆认证列表
    findAuthenticationApplyCarPage: '/car/findAuthenticationApplyCarPage',
    //车辆认证详情
    getAuthenticationApplyCar: '/car/getAuthenticationApplyCar',
    //认证车辆申请审批
    authenticationCarReply: '/car/saveAuthenticationCarReply',

    //车辆认证历史
    //车辆认证历史列表
    findAuthenticationCarHistoryPage: '/car/findAuthenticationCarHistoryPage',
    //车辆认证历史详情
    getAuthenticationCarHistory: '/car/getAuthenticationCarHistory',
    //车辆详情（认证信息）
    getAuthenticationCarHistoryByHphmAndCpys: '/car/getAuthenticationCarHistoryByHphmAndCpys',

    /**
     * 资源维护
     */
    //路内停车场
    //路内停车场列表
    findParkingGarage: '/parkingGarage/findParkingGaragePage',
    //路内停车场详情
    getParkingGarage: '/parkingGarage/getParkingGarage',
    //新增路内停车场
    saveParkingGarage: '/parkingGarage/saveParkingGarage',
    //修改路内停车场
    updateParkingGarage: '/parkingGarage/updateParkingGarage',
    //删除路内停车场
    removeParkingGarage: '/parkingGarage/removeParkingGarage',

    //停车场编号下拉框
    findParkingGarageBhSelect: '/parkingGarage/findParkingGarageBhSelect',

    //停车场下拉框（名称和编号）
    findParkingGarageNameCcbh: '/parkingGarage/findParkingGarageNameCcbh',
    //车场新增配置收费规则
    findChargeStandardList: '/chargeStandard/findChargeStandardList',

    //停车场新增入账公司
    //查看入账公司下拉选择框(有配置账户信息的公司)
    findSysOrgAccountSelect: '/sysOrg/findSysOrgAccountSelect',
    //停车场新增运营公司
     // 查看运营公司下拉选择框(末节点)
    findSysOrgEndNodeSelect: '/sysOrg/findSysOrgEndNodeSelect',

    //路内泊位
    //路内泊位列表
    findParkingGaragePage: '/parkingSpace/findParkingGaragePage',
    //路内泊位详情
    getParkingSpace: '/parkingSpace/getParkingSpace',

    //路内泊位详情根据车位编号查询
    getParkingSpaceByid: '/parkingSpace/getParkingSpaceByid',
    //新增路内泊位
    saveParkingSpace: '/parkingSpace/saveParkingSpace',
    //修改路内泊位
    updateParkingSpace: '/parkingSpace/updateParkingSpace',
    //删除路内泊位
    removeParkingSpace: '/parkingSpace/removeParkingSpace',
    //批量新增
    saveParkingSpaceBatch: '/parkingSpace/saveParkingSpaceBatch',




    //车位设备
    //车位设备列表
    findParkingDevicePage: '/parkingDevice/findParkingDevicePage',
    //车位设备详情
    getParkingDevice: '/parkingDevice/getParkingDevice',
    //新增车位设备
    saveParkingDevice: '/parkingDevice/saveParkingDevice',
    //修改车位设备
    updateParkingDevice: '/parkingDevice/updateParkingDevice',
    //删除车位设备
    removeParkingDevice: '/parkingDevice/removeParkingDevice',

    //获取车场下的车位（除去已绑定的车位）
    findBwbhByCcidBdbw: '/parkingSpace/findBwbhByCcidBdbw',
    //保存绑定车位
    bindParkingSpace:'/parkingDevice/saveParkingSpace',

    //设备详情查看已绑定车场车位
    findGarageSpace:'/parkingDevice/findGarageSpace',
    //获取已绑定车场的车场名称
    getParkingGarageIdBySbid:'/parkingDevice/getParkingGarageIdBySbid',

    //手持终端
    //手持终端列表
    findPdaDevicePage: '/pdaDevice/findPdaDevicePage',
    //手持终端详情
    getPdaDevice: '/pdaDevice/getPdaDevice',
    //新增手持终端
    savePdaDevice: '/pdaDevice/savePdaDevice',
    //修改手持终端
    updatePdaDevice: '/pdaDevice/updatePdaDevice',
    //删除手持终端
    removePdaDevice: '/pdaDevice/removePdaDevice',


    /**
     * 基础设置
     */
    //运营公司列表
    sysOrg: '/sysOrg/findSysOrgPage',
    //修改运营公司
    updateSysOrg: '/sysOrg/updateSysOrg',
    //添加公司
    saveSysOrg:'/sysOrg/saveSysOrg',
    //运营公司详情
    getSysOrg: '/sysOrg/getSysOrg',
    //添加公司账户配置
    saveSysOrgPay: '/sysOrgPay/saveSysOrgPay',
    //测试下单
    saveUnifiedOrder: '/payment/saveUnifiedOrder',
    //测试退款
    saveUnifiedRefund: '/payment/saveUnifiedRefund',
    //查看结果
    getResult: '/payment/getResult',
    //查询支付信息详情(根据公司id zfqd)
    getSysOrgPayInfo: '/sysOrgPay/getSysOrgPayInfo',
    //查询支付信息详情(根据公司id)
    getSysOrgPayListByGsid: '/sysOrgPay/getSysOrgPayListByGsid',


    // 行政区划选择框
    findXzqhSelect: '/ywqy/findXzqhSelect',

    //角色管理列表
    sysRole: '/sysRole/findSysRolePage',
    //角色详情
    getSysRole: '/sysRole/getSysRole',
    //添加角色
    saveSysRole: '/sysRole/saveSysRole',
    //删除角色
    removeSysRole: '/sysRole/removeSysRole',
    //角色权限分配
    updateSysRole: '/sysRole/updateSysRole',
    //角色选择框，获取所有角儿名称
    findSysRoleSelect: '/sysRole/findSysRoleSelect',

    //后台用户列表
    findSysUserPage: '/sysUser/findSysUserPage',
    //后台用户详情
    getSysUser: '/sysUser/getSysUser',
    //添加后台用户
    saveSysUser: '/sysUser/saveSysUser',
    //修改后台用户
    updateSysUser: '/sysUser/updateSysUser',
    //删除后台用户
    removeSysUser: '/sysUser/removeSysUser',

    //获取后台用户下拉框
    findSysUserSelect: '/sysUser/findSysUserSelect',

    //菜单管理
    //菜单树形结构
    findSysResourceTree: '/sysResource/findSysResourceTree',
    //添加菜单
    saveSysResource: '/sysResource/saveSysResource',
    //查询树形菜单list
    findSysResourceList: '/sysResource/findSysResourceList',
    //查看菜单详情
    getSysResource: '/sysResource/getSysResource',
    //修改菜单
    updateSysResource: '/sysResource/updateSysResource',
    //删除菜单
    removeSysResource: '/sysResource/removeSysResource',

    //区域管理列表
    findYwqyPage: '/ywqy/findYwqyPage',
    //区域管理树状图
    findYwqyTree: '/ywqy/findYwqyTree',
    //添加区域
    saveYwqy: '/ywqy/saveYwqy',
    //删除区域
    removeYwqy: '/ywqy/removeYwqy',
    //自定义区域中父级区域查询
    findYwqyExceptCustomSelect:'/ywqy/findYwqyExceptCustomSelect',

    //道路列表
    findParkingRoadPage: '/parkingRoad/findParkingRoadPage',
    //道路选择框
    findParkingRoadSelect: '/parkingRoad/findParkingRoadSelect',
    //新增道路
    saveParkingRoad: '/parkingRoad/saveParkingRoad',
    //删除道路
    removeParkingRoad: '/parkingRoad/removeParkingRoad',


    //节假日列表
    findHolidayPage: '/holiday/findHolidayPage',
    //节假日详情
    getHoliday: '/holiday/getHoliday',
    //新增节假日
    saveHoliday: '/holiday/saveHoliday',
    //修改节假日
    updateHoliday: '/holiday/updateHoliday',
    //删除节假日
    removeHoliday: '/holiday/removeHoliday',

    //参数设置
    //字典管理
    //获取字典所有分类
    findDictType:'/sysDict/findDictType',
    //添加字典分类
    saveDictType:'/sysDict/saveDict',
    //字典列表
    findDictPage:'/sysDict/findDictPage',
    //字典详情
    getDictInfo:'/sysDict/getDict',
    //添加字典
    saveDict:'/sysDict/saveDict',
    //修改字典
    updateDict:'/sysDict/updateDict',
    //删除字典
    removeDict:'/sysDict/removeDict',
    //字典查询下拉框
    findDictSelect:'/sysDict/findDictSelect',

    //业务参数
    findSysParamList:'/sysParam/findSysParamList',
    //保存数据
    updateSysParam:'/sysParam/updateSysParam',


    /**
     * 系统运维
     */
    //商户列表
    findOnetBusinessPage: '/onetBusiness/findOnetBusinessPage',
    //商户详情
    getOnetBusiness: '/onetBusiness/getOnetBusiness',
    //新增时获取商户编号
    getSHBH: '/onetBusiness/getSHBH',
    // 修改商户
    updateOnetBusiness:'/onetBusiness/updateOnetBusiness',
    //添加商户
    saveOnetBusiness:'/onetBusiness/saveOnetBusiness',
    //停车数据记录
    findParkingRecordLogPage:'/parkingRecordLog/findParkingRecordLogPage',
    //支付记录
    findPaymentRecordHistoryPageByTenantid:'/findPaymentRecordHistoryPageByTenantid',

    /**
     * 停车卡管理
     */
    //查询部分停车卡类型
    findCardRecordTemplate: '/parkingCardRecord/findCardRecordTemplate',
    //查询停车卡分页数据
    findParkingCardRecordPage: '/parkingCardRecord/findParkingCardRecordPage',
    //查询停车卡详情
    getParkingCardRecord: '/parkingCardRecord/getParkingCardRecord',
    //废弃停车卡
    cancellationCardRecord: '/parkingCardRecord/cancellationCardRecord',
    //禁用停车卡
    forbiddenCardRecord: '/parkingCardRecord/forbiddenCardRecord',
    //停车卡模板下载
    downloadTemplate: '/parkingCardRecord/downloadTemplate',
    //停车卡模板导入
    importParkingCardRecord: '/parkingCardRecord/importParkingCardRecord',
    //停车卡模板导出
    exportParkingCardRecord: '/parkingCardRecord/exportParkingCardRecord',
    //开通新停车卡
    saveParkingCardRecord: '/parkingCardRecord/saveParkingCardRecord',
    //查询所有停车卡类型
    findParkingCardTemplatePage: '/parkingCardTemplate/findParkingCardTemplatePage',
    //查询停车卡类型回填数据
    getParkingCardTemplate: '/parkingCardTemplate/getParkingCardTemplate',

};
export default APIURL

