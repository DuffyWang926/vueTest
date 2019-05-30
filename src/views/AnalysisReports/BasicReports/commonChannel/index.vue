<template>
    <div class="commonChannel">
        <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type='primary'>对账</el-button>
        <ul>
            <li>
                <p>我方总金额（元）</p>
                <p>{{totalMoney.wfzje / 100}}</p>
            </li>
            <li>
                <p>对方总金额（元）</p>
                <p>{{totalMoney.dfzje / 100}}</p>
            </li>
            <li>
                <p>差额（元）</p>
                <p>{{totalMoney.ce / 100}}</p>
            </li>
        </ul>
        <el-table
            :data="detail.records"
            border
            style="width: 100%">
            <el-table-column
                prop="zfsj"
                label="支付时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="zfddbh"
                label="支付订单号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="shddbh"
                label="商户订单号">
            </el-table-column>
            <el-table-column
                prop="wfjlje"
                label="我方记录金额（元）"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.wfjlje / 100}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="对方记录金额（元）"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.dfjlje / 100}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="ce"
                label="差额（元）">
                <template slot-scope="scope">
                    <span>{{scope.row.ce / 100}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            v-if='isShowPage'
            layout="total, prev, pager, next"
            :total="total"
            :current-page="param.current"
            :page-size="param.size"
            @current-change="currentChange">
        </el-pagination>
        <div class="btn">
            <el-button @click="downLoadFile('my')">下载我方对账文件</el-button>
            <el-button @click="downLoadFile('opposite')">下载对方对账文件</el-button>
            <el-button @click="downLoadFile('diff')">下载差异文件</el-button>
        </div>
    </div>
</template>

<script>
import { totalDiff, accountDetail, downloadOpposite, downloadMy, downloadDiff } from '@/api/AnalysisReports/Operatelog'

export default {
    name: "childChannel",
    props: ['tabType'],
    data() {
        return {
            isShowPage: false,
            dateValue: '',
            detail: {},
            param: {
                current: 1,
                parameter: {
                    jsrq: '',
                    ksrq: '',
                    zfqd: this.tabType
                },
                size: 10
            },
            totalMoney: {
                ce: 0,
                dfzje: 0,
                wfzje: 0
            },
            total: 0
        }
    },
    created() {
        console.log(this.param)
        console.log('created')  
        this.getTime()
        this.getData()

    },
    mounted() {

    },
    methods: {
        currentChange(val) {
            console.log('改变分页')
            console.log(val)
            this.param.current = val
            this.getData(false)
        },
        getTime() {
            let date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                m = this.addZero(month),
                d = this.addZero(day)
            this.param.parameter = {
                ksrq: `${year}-${m}-01`,
                jsrq: `${year}-${m}-${d}`,
                zfqd: this.tabType
            }        
            
        },
        addZero (d) {
            console.log('d')
            console.log(d)
            let time = d < 10 ? '0' + d : d
            return time
        },
        downLoadFile(param) {
            console.log('下载')
            console.log(param)
            console.log(this.tabType)
            let params = this.param
            let downloadRequest
            if (param == 'my') {
                downloadRequest = downloadMy
            } else if (param == 'opposite') {
                downloadRequest = downloadOpposite
            } else {
                downloadRequest = downloadDiff
            }
            downloadRequest(params).then(res => {
                console.log('下载数据')
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        dealPage(resDetail){
            let _result = resDetail.result,
                _total = _result.total
            this.detail = _result
            this.total = _total
            if (_total == 0) {
                this.isShowPage = false
            } else {
                this.isShowPage = true
            }
        },
        getData(init = true) {
            let param = this.param
            if (init) {
                this.$axios.all([totalDiff(param), accountDetail(param)])
                .then(this.$axios.spread((resTotal, resDetail) => {
                    console.log('请求完成')
                    console.log(resTotal)
                    console.log(resDetail)
                    if (resTotal.code == 0) {
                        let _result = resTotal.result
                        this.totalMoney = _result
                    }
                    if (resDetail.code == 0) {
                        this.dealPage(resDetail)
                    }
                }))
                .catch(err => {
                    console.log(err)
                    this.$message.error('获取信息错误')
                })
            } else {
                accountDetail(param).then(res => {
                    console.log('分页数据')
                    console.log(res)
                    if (res.code == 0) {
                        this.dealPage(res)
                    } else {
                        this.$message.error('获取信息错误')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message.error('获取信息错误')
                })
            }
            
        }
        
    },
}
</script>

<style lang='less' scoped>
.commonChannel {
    .el-table {
        padding: 0;
        border-bottom: 1px solid #ebeef5;
    }
    .btn {
        margin-top: 20px;
    }
    .el-button {
        margin-left: 20px;
        background: #61bafe;
        color: #fff;
        border: 1px solid #61bafe;
    }
    ul {
        list-style-type:none;
        display: flex;
        padding: 0;
        li {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            background: #61bafe;
            color: #fff;
            flex: 1;
            width: 150px;
            height: 100px;
            margin: 0 20px;
            padding: 20px;
            text-align: center;
            p {
                margin-top: 0;
            }
        }
    }
    .content-card {
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
