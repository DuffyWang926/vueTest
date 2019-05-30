<template>
    <div class="arrearage">
        <div class="content-card search">
            <el-row :gutter="15">
                <el-col :span="5">
                <el-select v-model="listQuery.parameter.yygsid"  @change="changeGs" filterable placeholder="请选择运营公司">
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
                    remote
                    default-first-option
                    :remote-method="remoteMethodCCMC"
                    :loading="loading"
                    @change="changePark"
                    placeholder="请输入停车场名称">
                    <el-option
                    v-for="item in OptionsCCMC"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>
              <el-col :span='4' style="text-align: right; float:right">
                <el-button type="primary" @click="handleFilter">查询</el-button>
                <el-button type="primary" @click="resetFilter">重置</el-button>
              </el-col>
                <!--<el-col :span='5'>-->
                    <!--<el-button @click="handleFilter">查询</el-button>-->
                    <!--<el-button @click="resetFilter">重置</el-button>-->
                <!--</el-col>-->
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
                <el-table-column
                align='center'
                label="停车场类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.parkingType == null ? '' : scope.row.parkingType == 1 ? '路内停车场' : '路外停车场' }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align='center'
                prop="truckSpaceNumber"
                label="泊位数">
                </el-table-column>
                <el-table-column
                align='center'
                prop="receivableMoney"
                label="应收总金额">
                </el-table-column>
                <el-table-column
                align='center'
                prop="receivedMoney"
                label="实收总金额">
                </el-table-column>
                <el-table-column
                align='center'
                prop="debtMoney"
                label="欠费总金额">
                </el-table-column>
                <el-table-column
                align='center'
                prop="singleReceivableMoney"
                label="单泊位应收">
                </el-table-column>
                <el-table-column
                align='center'
                prop="singleReceivedMoney"
                label="单泊位实收">
                </el-table-column>
                <el-table-column
                align='center'
                label="缴费率">
                <template slot-scope="scope">
                    <span>{{ scope.row.paymentRate + '%'}}</span>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                v-if='isShowPage'
                layout="total, prev, pager, next"
                :total="total"
                :current-page="paramObj.page"
                :page-size="listQuery.size"
                @current-change="currentChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { arrearageRequest } from '@/api/AnalysisReports/Operatelog'
import { fetchSSGSList, fetchParkingGarageNameCcbhlist } from '@/api/CommonSelectApi'

export default {
    name: "arrearage",
    data() {
        return {
            total: 0,
            valueDate: '',
            valueDateInterval: '',
            listQuery:{
                parameter:{
                    yygsid:'',
                    ccmc: '',
                    cwbh: ''
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
        this.getList(true)
        this.handleSelectSSGS();
        this.handleSelectCCMC(sysUserId);
    },
    methods: {
        changeGs(value) {
            console.log('选择公司')
            console.log(value)
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
        getSum (param) {
            return this.arrTotal
        },
        getList(init = false){

            let param = this.paramObj
            param.companyId = this.listQuery.parameter.yygsid
            arrearageRequest(param).then(res => {
                console.log('欠费统计初始化列表数据')
                console.log(res)
                let _result = res.result
                let _size = _result.size
                this.reportData = _result.debtReports;
                this.total = _size
                if (_size != null && _size != 0) {
                    this.isShowPage = true
                } else {
                    this.isShowPage = false
                }
                let totalTruckSpaceNumber = _result.totalTruckSpaceNumber
                let totalReceivableMoney = _result.totalReceivableMoney
                let totalReceivedMoney = _result.totalReceivedMoney
                let totalDebtMoney = _result.totalDebtMoney
                let avePaymentRate = _result.avePaymentRate + '%'
                this.arrTotal = [
                    '合计',
                    '',
                    '',
                    totalTruckSpaceNumber,
                    totalReceivableMoney,
                    totalReceivedMoney,
                    totalDebtMoney,
                    '',
                    '',
                    avePaymentRate
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
                this.handleSelectCCMC(gsid, this.listQuery.parameter.ccmc)
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
            this.getList()
        },
        reset(){
            this.listQuery.parameter.yygsid = '';
            this.listQuery.parameter.ccmc = '';
            this.paramObj.parkNumber = ''
            this.getList()
        },

        resetFilter(){
            this.reset();
            this.OptionsCCMC = [];
            let sysUser = JSON.parse(localStorage.getItem("sysUser")).gsid
            this.handleSelectCCMC(sysUser);
        },
    }
}
</script>

<style lang='less' scoped>
.arrearage {
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
