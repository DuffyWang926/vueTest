<template>
    <div class="pay">
        <div class="content-card search">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-select
                        v-model="listQuery.parameter.zsmc"
                        filterable
                        remote
                        clearable
                        default-first-option
                        :remote-method="remoteMethodYGXM"
                        @change="changeStaff"
                        :loading="loading"
                        placeholder="请输入员工姓名">
                        <el-option
                            v-for="item in OptionsYGXM"
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
                </el-col>
              <el-col :span='4' style="text-align: right; float:right">
                <el-button type="primary" @click="handleFilter">查询</el-button>
              </el-col>
            </el-row>
        </div>
        <div class="content-card content-card-table">
          <div class="table-add-button-payreports">
            <el-button type="primary"  :disabled='!isShowPage' @click="exportExcel">导出</el-button>
          </div>
            <el-table
                class="table"
                :data="reportData"
                border
                show-summary
                :summary-method='getSum'
                style="width: 100%">
                <el-table-column
                    align='center'
                    prop="operationName"
                    label="收费员姓名">
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="总金额">
                    <el-table-column
                        align='center'
                        prop="allPayNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="allPayAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="微信">
                    <el-table-column
                        align='center'
                        prop="weChatNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="weChatAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="支付宝">
                    <el-table-column
                        align='center'
                        prop="aliPayNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="aliPayAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="银联">
                    <el-table-column
                        align='center'
                        prop="unionPayNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="unionPayAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="现金">
                    <el-table-column
                        align='center'
                        prop="walletPayNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="walletPayAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    align='center'
                    prop=""
                    label="其它">
                    <el-table-column
                        align='center'
                        prop="otherPayNow"
                        label="现收">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="otherPayAfter"
                        label="追缴">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if='isShowPage'
                background
                layout="total, prev, pager, next"
                :current-page="paramObj.page"
                :page-size="paramObj.limit"
                :total="total"
                @current-change="currentChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { payRequest } from '@/api/AnalysisReports/Operatelog'
import { fetchStaffList } from '@/api/StaffManage/Staff'
import { fetchPdaUserNamelist } from '@/api/CommonSelectApi'

export default {
    name: "payReports",
    data() {
        return {
            total: 0,
            valueDate: '',
            valueDateInterval: '',
            listQuery:{
                parameter:{
                    glybh:'',
                    zsmc:'',
                    gsid:'',
                    yhlx:''
                },
                current:1,
                size:20
            },
            Options:[],
            OptionsCCMC:[],
            OptionsYGXM:[],
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
                }
            ],
            reportData: [],
            paramObj: {
                userCompanyId: '',
                operationUser: '',
                month: '',
                dateType: 2,
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
        this.handleSelectYGXM()
        this.getList(true)
    },
    methods: {
        changeStaff(val) {
            this.paramObj.page = 1
            this.paramObj.operationUser = val
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
            paramObj.dateType = value
            this.valueDate = ''
            paramObj.endDate = ''
            paramObj.startDate = ''
            paramObj.month = ''

        },

        getList(init = false){
            let methodVal = this.methodValue
            let param = this.paramObj
            let deepCopy = JSON.parse(JSON.stringify(param))
            if (init) {
                this.valueDate = param.startDate
            }
            if (methodVal == 1) {
                delete deepCopy.month
            } else {
                delete deepCopy.startDate
                delete deepCopy.endDate
            }
            payRequest(deepCopy).then(res => {
                let _result = res.result
                let _size = _result.size
                this.reportData = _result.collectorReports == null ? [] : _result.collectorReports;
                this.total = _size
                if (_size != null && _size != 0) {
                    this.isShowPage = true
                } else {
                    this.isShowPage = false
                }
                let _totalAllPayNow = _result.totalAllPayNow
                let _totalAllPayAfter = _result.totalAllPayAfter
                let _totalWeChatNow = _result.totalWeChatNow
                let _totalWeChatAfter = _result.totalWeChatAfter
                let _totalAliPayNow = _result.totalAliPayNow
                let _totalAliPayAfter = _result.totalAliPayAfter
                let _totalUnionPayNow = _result.totalUnionPayNow
                let _totalUnionPayAfter = _result.totalUnionPayAfter
                let _totalCashPayNow = _result.totalCashPayNow
                let _totalCashPayAfter = _result.totalCashPayAfter
                let _totalOtherPayNow = _result.totalOtherPayNow
                let _totalOtherPayAfter = _result.totalOtherPayAfter
                this.arrTotal = [
                    '合计',
                    _totalAllPayNow,
                    _totalAllPayAfter,
                    _totalWeChatNow,
                    _totalWeChatAfter,
                    _totalAliPayNow,
                    _totalAliPayAfter,
                    _totalUnionPayNow,
                    _totalUnionPayAfter,
                    _totalCashPayNow,
                    _totalCashPayAfter,
                    _totalOtherPayNow,
                    _totalOtherPayAfter
                ]
            }).catch((err) => {
                console.log('初始化错误')
                console.log(err)
            })
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
                    }

                }
                if (method == 1) {
                    monthInterval(true, param)
                }
            }
            this.paramObj.startDate = startDate
            this.paramObj.endDate = endDate
        },
        //员工姓名下拉框
        handleSelectYGXM(){
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            fetchPdaUserNamelist(sysUser.gsid, this.listQuery.parameter.zsmc).then(response => {
              for (let i = 0; i < response.result.length; i++) {
                this.OptionsYGXM.push({
                  label: response.result[i].label,//此处是展示内容
                  value: Number(response.result[i].key) //此处是后台需要的值
                });
              }
            }).catch((err) => {
              console.log(err)
            })
        },
        remoteMethodYGXM(query) {
            this.listQuery.parameter.zsmc = query
            let sysUser = JSON.parse(localStorage.getItem("sysUser"))
            if (query !== '') {
              this.handleSelectYGXM()
              this.OptionsYGXM = [];
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.OptionsYGXM = this.OptionsYGXM.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.OptionsYGXM = [];
            }
        },
        handleFilter(){
            let valueDate = this.valueDate
            if (valueDate == '') {
                this.$message.error('请选择日期')
                return
            }
            this.getList()
        },
        exportExcel () {
            let wb = XLSX.utils.table_to_book(document.querySelector('.table'));
            let wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: 'application/octet-stream' }),
                    '收费员统计.xlsx'
                );
            } catch (e) {
                if (typeof console !== 'undefined')
                    console.log(e, wbout)
            }
            return wbout
        },
    }
}
</script>

<style lang='less' scoped>
.pay {
    .el-table {
        border-bottom: 1px solid #ebeef5;
    }
    /*.el-col, .btn {*/
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
  .table-add-button-payreports{
    text-align: right;
    padding: 20px 0;
    .el-button{
      padding:13px 26px;
    }
    .el-button--primary{
      background-color: #64bbfa;
      border-color: #64bbfa;
    }
  }
    .content-card-table {
        padding: 0 20px 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        .el-table {
            padding: 0;
        }
    }
}
</style>
