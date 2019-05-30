<template>
    <div class="financial">
        <div class="content-card search">
            <el-row :gutter="24">
                <el-col :span="5">
                <el-select v-model="listQuery.parameter.yygsid" @change="changeGs" filterable clearable placeholder="请选择运营公司">
                    <el-option
                    v-for="item in Options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>

                <el-col :span="5">
                <el-select
                    v-model="listQuery.parameter.ccmc"
                    filterable
                    clearable
                    remote
                    default-first-option
                    :remote-method="remoteMethodCCMC"
                    :loading="loading"
                    @change='changePark'
                    placeholder="请输入停车场名称">
                    <el-option
                    v-for="item in OptionsCCMC"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span='5'>
                <el-select v-model="methodValue" @change="methodChange" placeholder="请选择统计方式">
                    <el-option
                    v-for="item in methodOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span='5' class="rightDate">
                    <el-date-picker
                        @change="changeDate"
                        v-if='methodValue == 1'
                        v-model="valueDate"
                        :clearable='false'
                        type="date"
                        placeholder="请选择日期">
                    </el-date-picker>
                    <el-date-picker
                        @change="changeDate"
                        v-else-if='methodValue == 2'
                        v-model="valueDate"
                        :clearable='false'
                        type="month"
                        placeholder="请选择月份">
                    </el-date-picker>
                    <el-date-picker
                        @change="changeDate"
                        v-else-if='methodValue == 3'
                        v-model="valueDateInterval"
                        type="daterange"
                        :clearable='false'
                        range-separator="至"
                        start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span='4' style="text-align: right; float:right">
                    <el-button type="primary" @click="handleFilter">查询</el-button>
                    <el-button type="primary" @click="resetFilter">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="content-card content-card-table">
            <el-table
                :data="reportData"
                border
                show-summary
                :summary-method='getSum'
                style="width: 100%">
                <el-table-column
                align='center'
                prop="companyName"
                label="所属公司">
                </el-table-column>
                <el-table-column
                align='center'
                prop="parkingName"
                label="停车场">
                </el-table-column>
                <!-- <el-table-column
                align='center'
                prop="parkingType"
                label="停车场类型">
                </el-table-column> -->
                <el-table-column
                align='center'
                label="停车场类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.parkingType == null ? '' : scope.row.parkingType == 1 ? '路内停车场' : '路外停车场' }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align='center'
                prop="allTypeMoney"
                label="营收总额">
                </el-table-column>
                <el-table-column
                align='center'
                prop="weChatMoney"
                label="微信">
                </el-table-column>
                <el-table-column
                align='center'
                prop="aliPayMoney"
                label="支付宝">
                </el-table-column>
                <el-table-column
                align='center'
                prop="unionPay"
                label="银联">
                </el-table-column>
                <el-table-column
                align='center'
                prop="walletMoney"
                label="钱包余额">
                </el-table-column>
                <el-table-column
                align='center'
                prop="cash"
                label="现金">
                </el-table-column>
                <el-table-column
                align='center'
                prop="otherMoney"
                label="其它">
                </el-table-column>
            </el-table>
            <el-pagination
                background
                v-if='isShowPage'
                layout="total, prev, pager, next"
                :total="total"
                :current-page="paramObj.page"
                :page-size="paramObj.limit"
                @current-change="currentChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { financialRequest } from '@/api/AnalysisReports/Operatelog'
import { fetchSSGSList, fetchParkingGarageNameCcbhlist } from '@/api/CommonSelectApi'

export default {
    name: "financialReport",
    data() {
        return {
            total: 0,
            valueDate: '',
            valueDateInterval: '',
            listQuery:{
                parameter:{
                    yygsid:'',
                    ccmc: '',
                    ccbh: ''
                },
                current:1,
                size:20
            },
            Options:[],
            OptionsCCMC:[],
            loading: false,
            methodValue: 2,
            methodOption: [
                {
                    value: 1,
                    label: '按日统计'
                },
                {
                    value: 2,
                    label: '按月统计'
                },
                {
                    value: 3,
                    label: '自定义统计'
                }
            ],
            reportData: [],
            paramObj: {
                userCompanyId: '',
                companyId: '',
                parkNumber: "",
                dateType: 2,
                month: '',
                limit: 10,
                page: 1
            },
            isShowPage: false,
            arrTotal: []
        }
    },
    created() {
        let sysUserId = JSON.parse(localStorage.getItem("sysUser")).gsid
        this.paramObj.userCompanyId = sysUserId
        this.handleDate()
        this.getList(true)
        this.handleSelectSSGS();
        this.handleSelectCCMC(sysUserId);
    },
    methods: {
        changeGs(value) {
            this.listQuery.parameter.ccmc = ''
            this.OptionsCCMC = []
            this.handleSelectCCMC(value);
        },
        changePark(value){
            this.paramObj.parkNumber = value
        },
        currentChange(val) {
            // 改变页码
            this.paramObj.page = val
            this.getList()
        },
        changeDate(value) {
            this.handleDate(false, value)
        },
        getSum (param) {
            return this.arrTotal
        },
        methodChange(value) {
            let paramObj = this.paramObj
            paramObj.dateType = value == 1 || value == 3 ? 1 : 2
            this.valueDateInterval = ''
            this.valueDate = ''
            paramObj.endDate = ''
            paramObj.startDate = ''
            paramObj.month = ''
        },
        getList(init = false){
            let methodVal = this.methodValue
            let param = this.paramObj
            let deepCopy = JSON.parse(JSON.stringify(param))
            param.companyId = this.listQuery.parameter.yygsid
            param.parkNumber = this.listQuery.parameter.ccmc
            if (init) {
                this.valueDate = param.startDate
            }
            if (methodVal != 2) {
                delete deepCopy.month
            } else {
                delete deepCopy.startDate
                delete deepCopy.endDate
            }
            financialRequest(deepCopy).then(res => {
                let _result = res.result
                let _size = _result.size
                this.reportData = _result.parkingFeeReports;
                this.total = _size
                if (_size != null && _size != 0) {
                    this.isShowPage = true
                } else {
                    this.isShowPage = false
                }
                let total = _result.total
                let weChatTotalMoney = _result.weChatTotalMoney
                let aliPayTotalMoney = _result.aliPayTotalMoney
                let unionTotalPay = _result.unionTotalPay
                let walletTotalMoney = _result.walletTotalMoney
                let cashTotalMoney = _result.cashTotalMoney
                let otherTotalMoney = _result.otherTotalMoney
                this.arrTotal = [
                    '合计',
                    '',
                    '',
                    total,
                    weChatTotalMoney,
                    aliPayTotalMoney,
                    unionTotalPay,
                    walletTotalMoney,
                    cashTotalMoney,
                    otherTotalMoney
                ]
            }).catch((err) => {
                console.log('初始化错误')
                console.log(err)
            })
        },
        remoteMethodCCMC(query) {
            this.listQuery.parameter.ccmc = query
            let sysUser = JSON.parse(localStorage.getItem("sysUser")).gsid
            let id =  this.listQuery.parameter.yygsid
            let gsid
            if (id != '') {
                gsid = id
            } else {
                gsid = sysUser
            }
            if (query !== '') {
                this.handleSelectCCMC(gsid)
                this.OptionsCCMC = [];
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.OptionsCCMC = this.OptionsCCMC.filter(item => {
                        return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.OptionsCCMC = [];
            }
        },
        handleDate(init = true, param) {
            let method = this.methodValue
            let curDate, curMonth, year, month, startDate, endDate, day

            if (init || method == 2) {
                if (method == 2 && init) {
                    curDate = new Date();
                    year = curDate.getFullYear()
                    month = curDate.getMonth()
                    if (month == 0) {
                        year = year - 1
                        month = 12
                    }
                } else {
                    curDate = new Date(param);
                    year = curDate.getFullYear()
                    month = curDate.getMonth() + 1
                    if (month == 1) {
                        year = year - 1
                        month = 12
                    }
                }
                if (month < 10) {
                    month = `0${month}`
                }
                // 获取当月多少天
                let days = new Date(year, month, 0).getDate()
                startDate = `${year}-${month}-01`
                endDate = `${year}-${month}-${days}`
                this.paramObj.month = `${year}-${month}`
            } else {
                function monthInterval (isDay, param, isFront) {
                    // isFront 是否是时间段的第一个时间
                    curDate = new Date(param)
                    year = curDate.getFullYear()
                    month = curDate.getMonth() + 1
                    day = curDate.getDate()
                    if (month < 10) {
                        month = `0${month}`
                    }
                    if (day < 10) {
                        day = `0${day}`
                    }
                    if (isDay) {
                        startDate = `${year}-${month}-${day}`
                        endDate = `${year}-${month}-${day}`
                    } else {
                        if (isFront) {
                            startDate = `${year}-${month}-${day}`
                        } else {
                            endDate = `${year}-${month}-${day}`
                        }
                    }

                }
                if (method == 1) {
                    monthInterval(true, param)
                } else {
                    // 3
                    monthInterval(false, param[0], true)
                    monthInterval(false, param[1], false)
                }
            }
            this.paramObj.startDate = startDate
            this.paramObj.endDate = endDate
        },
        //运营公司下拉框
        handleSelectSSGS(){
            fetchSSGSList().then(response => {
                for (let i = 0; i < response.result.length; i++) {
                this.Options.push({
                    label: response.result[i].label,//此处是展示内容
                    value: Number(response.result[i].key) //此处是后台需要的值
                });
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        //停车场名称
        handleSelectCCMC(gsid){
            // let sysUser = JSON.parse(localStorage.getItem("sysUser"))
            fetchParkingGarageNameCcbhlist(gsid, this.listQuery.parameter.ccmc).then(response => {
                for (let i = 0; i < response.result.length; i++) {
                this.OptionsCCMC.push({
                    label: response.result[i].label,//此处是展示内容
                    value: response.result[i].key //此处是后台需要的值
                });
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        handleFilter(){
            let methodValue = this.methodValue
            let valueDate = this.valueDate
            let valueDateInterval = this.valueDateInterval
            if (methodValue == 3) {
                if (valueDateInterval == '') {
                    this.$message.error('请选择起止日期')
                    return
                }
            } else {
                if (valueDate == '') {
                    this.$message.error('请选择日期')
                    return
                }
            }
            this.getList()
        },
        reset(){
            this.listQuery.parameter.yygsid = ''
            this.listQuery.parameter.ccmc = ''
            this.paramObj.parkNumber = ''
            this.getList()
        },

        resetFilter(){
            this.reset();
            this.OptionsCCMC = [];
            let sysUser = JSON.parse(localStorage.getItem("sysUser"))
            this.handleSelectCCMC(sysUser.gsid);
        },
    }
}
</script>

<style lang='less' scoped>
.financial {

    .el-table {
        border-bottom: 1px solid #ebeef5;
    }
    .el-range-editor {
        width: 240px;
    }
    .el-picker-panel {
        width: 460px;
    }
    .content-card-table {
        padding: 15px 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        .el-table {
            padding: 0;
        }
    }
}
</style>
<style lang='less'>
    // .financial {
        /*.el-row .el-input .el-input__inner {*/
            /*width: 160px;*/
        /*}*/
    // }
</style>

