<template>
    <div class="month">
        <div class="content-card search">
            <el-row :gutter="15">
                <el-col :span="5">
                <el-select v-model="listQuery.parameter.yygsid" clearable filterable placeholder="请选择运营公司">
                    <el-option
                    v-for="item in Options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span='5'>
                    <el-date-picker
                        @change="changeDate"
                        v-model="valueDate"
                        :clearable='false'
                        type="month"
                        placeholder="请选择月份">
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
                :span-method="mergeMethod"
                border
                style="width: 100%">
                <el-table-column
                    align='center'
                    prop="companyName"
                    label="所属公司">
                </el-table-column>
                <el-table-column
                    align='center'
                    prop="monthBeginTotal"
                    label="月初余额">
                    <el-table-column
                        align='center'
                        prop="monthBeginParkingFee"
                        label="停车费">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthBeginWallet"
                        label="钱包余额">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthBeginCardIncome"
                        label="月卡收入">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop="monthMidTotal"
                    label="本月收入">
                    <el-table-column
                        align='center'
                        prop="monthMidParkingFee"
                        label="停车费">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthMidWallet"
                        label="钱包余额">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthMidCardIncome"
                        label="月卡收入">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop="monthEndTotal"
                    label="月末累计">
                    <el-table-column
                        align='center'
                        prop="monthEndParkingFee"
                        label="停车费">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthEndWallet"
                        label="钱包余额">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="monthEndCardIncome"
                        label="月卡收入">
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { monthIncomeRequest } from '@/api/AnalysisReports/Operatelog'
import { fetchSSGSList } from '@/api/CommonSelectApi'

export default {
    name: "MonthlyFinancialReports",
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
            reportData: [],
            paramObj: {
                userCompanyId: '',
                companyId: '',
                month: ''
            }
        }
    },
    created() {
        let sysUserId = JSON.parse(localStorage.getItem("sysUser")).gsid
        this.paramObj.userCompanyId = sysUserId
        this.handleDate()
        this.getList(true)
        this.handleSelectSSGS();
    },
    methods: {
        mergeMethod(param) {
            let { row, column, rowIndex, columnIndex } = param
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
            if (rowIndex % 2 === 1) {
                if (columnIndex != 0) {
                    if (columnIndex == 1 || columnIndex == 4 || columnIndex == 7) {
                        return [1, 3]
                    } else {
                        return [0, 0]
                    }
                }
            }

        },
        changeDate(value) {
            this.handleDate(false, value)
        },
        getSum (param) {
        },
        getList(init = false){

            let param = this.paramObj
            param.companyId = this.listQuery.parameter.yygsid
            if (init) {
                this.valueDate = param.month
            }
            monthIncomeRequest(param).then(res => {
                console.log('初始化列表数据')
                console.log(res)
                let _result = res.result
                let _lgh = _result.length
                let _index = 1
                _result.forEach((item, index, arr) => {
                    let arrIndex = arr[_index - 1]
                    arr.splice(_index, 0, arrIndex)
                    _index += 2
                })
                let dealArr = JSON.parse(JSON.stringify(_result))
                dealArr.forEach((item, index, arr) => {
                    if (index % 2 == 1) {
                        let arrIndexPre = arr[index - 1]
                        let _arrIndex = arr[index]
                        let begin = arrIndexPre.monthBeginTotal
                        let mid = arrIndexPre.monthMidTotal
                        let end = arrIndexPre.monthEndTotal
                        _arrIndex.monthBeginParkingFee = begin
                        _arrIndex.monthMidParkingFee = mid
                        _arrIndex.monthEndParkingFee = end
                    }
                })
                this.reportData = dealArr

            }).catch((err) => {
                console.log('初始化错误')
                console.log(err)
            })
        },
        handleDate(init = true, param) {
            let curDate, year, month, startDate, endDate, day
            if (init) {
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
            }
            if (month < 10) {
                month = `0${month}`
            }
            startDate = `${year}-${month}`
            this.paramObj.month = startDate
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
        handleFilter(){
            this.getList()
        },
        reset(){
            this.listQuery.parameter.yygsid = '';
            this.getList()
        },

        resetFilter(){
            this.reset();
        },
    }
}
</script>

<style lang='less' scoped>
.month {
    .el-table {
        // border-bottom: 1px solid #ebeef5;
    }
    .el-table::before {
        position: relative;
    }
    /*.el-col{*/
        /*margin-right: 30px;*/
    /*}*/
    .el-range-editor {
        width: 240px;
    }
    .rightDate {
        margin-left: 30px
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
