<template>
    <div class="VehicleParkingCard-page">
        <div class="content-card search">
            <el-row :gutter="20">
                <el-col :span="4">
<!--                    <InputSearch :content='accountCon' :list='companyCount' @inputDataSend='companyCountGet' ref='companyChild'></InputSearch>-->
                    <el-input
                            placeholder="请输入停车卡名称"
                            v-model="listQuery.parameter.cardName">
                    </el-input>
                </el-col>
                <el-col :span="4">
<!--                    <el-select-->
<!--                            v-model="ccmc"-->
<!--                            filterable-->
<!--                            default-first-option-->
<!--                            remote-->
<!--                            :remote-method="remoteMethodCCMC"-->
<!--                            :loading="loading"-->
<!--                            placeholder="请输入停车场名称">-->
<!--                        <el-option-->
<!--                                v-for="item in OptionsSYTCC"-->
<!--                                :key="item.value"-->
<!--                                :label="item.label"-->
<!--                                :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
                    <el-select
                            v-model="ccmc"
                            filterable
                            placeholder="请选择适用停车场">
                        <el-option
                                v-for="item in OptionsSYTCC"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="listQuery.parameter.companyId" filterable placeholder="请选择发卡公司">
                        <el-option
                                v-for="item in OptionsFKGS"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="listQuery.parameter.cardStatus" placeholder="请选择停车卡状态">
                        <el-option
                                v-for="item in OptionsTCZT"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="listQuery.parameter.forbiddenStatus" placeholder="请选择禁用状态">
                        <el-option
                                v-for="item in OptionsJYZT"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button @click="handleFilter">查询</el-button>
                    <el-button @click="resetFilter">重置</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
<!--                    <InputSearch :content='peopleCon' :list='peopleData' @inputDataSend='peopleDataGet' ref='peopleChild'></InputSearch>-->
                    <el-input
                            placeholder="请输入售卡人员姓名"
                            v-model="listQuery.parameter.salesStaffName">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="listQuery.parameter.cardChannel" placeholder="请选择销售渠道">
                        <el-option
                                v-for="item in OptionsXSQD"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-date-picker
                            v-model="scsj"
                            type="date"
                            :clearable="false"
                            placeholder="请选择售出日期"
                            value-format="timestamp">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="listQuery.parameter.cardTemplateName" filterable placeholder="请选择停车卡类型">
                        <el-option
                                v-for="item in OptionsTCKLX"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div class="content-card">
            <div class="table-add-button">
                <el-button @click="openDialog">开通新卡</el-button>
                <el-button @click="formworkDownload">模板下载</el-button>
<!--                <el-button @click="offlineImport">线下导入</el-button>-->
                <el-upload
                        class="daoru"
                        ref="fwzs"
                        action=""
                        :auto-upload="true"
                        :http-request="offlineImport"
                        :show-file-list="false">
                    <el-button slot="trigger" size="small" type="primary">线下导入</el-button>
                </el-upload>
                <el-button @click="exportTable">导出</el-button>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="number"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="cardName"
                        label="停车卡名称">
                </el-table-column>
                <el-table-column
                        prop="areaName"
                        label="适用停车场">
                </el-table-column>
                <el-table-column
                        prop="plateNamber"
                        label="车牌号">
                </el-table-column>
                <el-table-column
                        prop="carColor"
                        label="颜色">
                    <template slot-scope="scope">
                        <span>{{scope.row.carColor|cpys}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cardDuration"
                        label="卡总时长">
                </el-table-column>
                <el-table-column
                        prop="actualPrice"
                        label="支付金额">
                    <template slot-scope="scope">
                        <span>{{scope.row.actualPrice|fenmoney}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="yssd"
                        label="约束时段">
                    <template slot-scope="scope">
                        <span>{{scope.row.startTime}}</span>
                        <span>-</span>
                        <span>{{scope.row.endTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cardStartDate"
                        label="起始时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.cardStartDate|sstime|time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="effectiveDate"
                        label="生效时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.effectiveDate|sstime|time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cardEndDate"
                        label="到期时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.cardEndDate|sstime|time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cardChannel"
                        label="售卡渠道">
                    <template slot-scope="scope">
                        <span>{{scope.row.cardChannel|skChannel}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cardStatus"
                        label="期卡状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.cardStatus|qkStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="forbiddenStatus"
                        label="禁用状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.forbiddenStatus|sfqy}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="售出时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime|time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="salesStaffName"
                        label="售卡人员">
                </el-table-column>
                <el-table-column
                        prop="handle"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <div v-if="scope.row.cardStatus == 6">
                            <el-button type="text" disabled size="small" @click="openDetailDialog(scope.row)">查看</el-button>
                            <el-button disabled v-if="scope.row.forbiddenStatus == 1" type="text" size="small" @click="disableBtn(scope.row['id'],0)">禁用</el-button>
                            <el-button disabled v-else type="text" size="small" @click="disableBtn(scope.row['id'],1)">启用</el-button>
                            <el-button type="text" disabled size="small" @click="cancellationBtn(scope.row['id'])">作废</el-button>
                        </div>
                        <div v-else>
                            <el-button type="text" size="small" @click="openDetailDialog(scope.row)">查看</el-button>
                            <el-button v-if="scope.row.forbiddenStatus == 1" type="text" size="small" @click="disableBtn(scope.row['id'],0)">禁用</el-button>
                            <el-button v-else type="text" size="small" @click="disableBtn(scope.row['id'],1)">启用</el-button>
                            <el-button type="text" size="small" @click="cancellationBtn(scope.row['id'])">作废</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page="listQuery.current"
                    :page-size="listQuery.size"
                    @current-change="currentChange">
            </el-pagination>
        </div>
        <CardDialog v-if="CardDialogVisible" :visible.sync="CardDialogVisible"></CardDialog>
        <SeeCardDialog v-if="SeeCardDialogVisible" :visible.sync="SeeCardDialogVisible" :msg="myMsg"></SeeCardDialog>
    </div>
</template>

<script>
    // import InputSearch from '@/components/InputSearch'
    import CardDialog from "./Dialogue/CardDialog";
    import SeeCardDialog from "./Dialogue/SeeCardDialog";
    import { apiUpload, parkingCardPageList, parkingCardTypeList ,cancelParkingCardRecord ,stopParkingCardRecord ,downloadParkingCard ,exitParkingCardRecord , goParkingCardRecord } from '@/api/ParkingInRoad/ParkingCard/VehicleParkingCard';
    import { fetchSSGSList, fetchParkingGarageNamelist} from '@/api/CommonSelectApi';
    export default {
        name: "VehicleParkingCard",
        components: {CardDialog,SeeCardDialog},
        data() {
            return{
                // accountCon:'请输入停车卡名称',
                // peopleCon:'请输入售卡人员姓名',
                fwzs:'',
                tableData: [],
                CardDialogVisible:false,
                SeeCardDialogVisible:false,
                total:0,
                OptionsSYTCC:[],
                OptionsFKGS:[],
                OptionsTCZT: [{
                    value: '1',
                    label: '待销售'
                }, {
                    value: '2',
                    label: '已售出'
                }, {
                    value: '3',
                    label: '已生效'
                },{
                    value: '4',
                    label: '已过期'
                }, {
                    value: '5',
                    label: '已失效'
                }, {
                    value: '6',
                    label: '已作废'
                }],
                OptionsJYZT:[{
                    value: '0',
                    label: '启用'
                }, {
                    value: '1',
                    label: '禁用'
                }],
                OptionsXSQD:[
                    {
                        value: '1',
                        label: '线上售卖'
                    }, {
                        value: '2',
                        label: '后台开通'
                    },{
                        value: '3',
                        label: '线下导入'
                    }
                ],
                OptionsTCKLX:[],
                ccmc:'',
                scsj:'',
                listQuery:{
                    parameter:{
                        endSellingTime:'',
                        parkingLot:'',
                        companyId:'',
                        cardStatus:'',
                        forbiddenStatus:'',
                        cardChannel:'',
                        cardTemplateName:'',
                        cardName:'',
                        salesStaffName:'',
                        ggsj:'',
                    },
                    current:1,
                    size:10
                },
                exitlistQuery:{
                    parameter:{
                        endSellingTime:'',
                        parkingLot:'',
                        companyId:'',
                        cardStatus:'',
                        forbiddenStatus:'',
                        cardChannel:'',
                        cardTemplateName:'',
                        cardName:'',
                        salesStaffName:'',
                    },
                    current:'',
                    size:9999999
                },
                myMsg:{},
                loading:false,
            }
        },
        created() {
            this.getList();
            this.handleSelectSYTCC();
            this.handleSelectFKGS();
            this.handleSelectTCKLX();
        },
        activated(){
            this.reset()
        },
        computed:{
            // companyCount(){
            //     return this.$store.state.searchListAll.searchList.accountList;
            // },
            // peopleData(){
            //     return this.$store.state.searchListAll.searchList.accountList;
            // },
        },
        methods:{
            //参数设置
            // companyCountGet(data){
            //     let dlmc = data
            //     this.$store.dispatch("vipMaintain/changeSuggestQuery",{dlmc})
            //     let hyzh =data
            //     this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{hyzh})
            // },
            // peopleDataGet(data){
            //     let dlmc = data
            //     this.$store.dispatch("vipMaintain/changeSuggestQuery",{dlmc})
            //     let hyzh =data
            //     this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{hyzh})
            // },
            getList() {
                //默认当天数据
                if(this.scsj === ''){
                    let time =Date.parse(new Date().toLocaleDateString());
                    //接口要的是秒值
                    this.listQuery.parameter.endSellingTime = time/1000;
                }else{
                    //接口要的是秒值
                    this.listQuery.parameter.endSellingTime = this.scsj/1000;
                }
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                this.listQuery.parameter.ggsj = sysUser.gsid;
                //这个listQuery是给list接口用的 而那个ccmc是给下拉框接口用的 所以做得区分
                this.listQuery.parameter.parkingLot = this.ccmc;

                //给导出参数赋值
                this.exitlistQuery.parameter.parkingLot = this.listQuery.parameter.parkingLot;
                this.exitlistQuery.parameter.endSellingTime = this.listQuery.parameter.endSellingTime;
                this.exitlistQuery.parameter.companyId = this.listQuery.parameter.companyId;
                this.exitlistQuery.parameter.cardStatus = this.listQuery.parameter.cardStatus;
                this.exitlistQuery.parameter.forbiddenStatus = this.listQuery.parameter.forbiddenStatus;
                this.exitlistQuery.parameter.cardChannel = this.listQuery.parameter.cardChannel;
                this.exitlistQuery.parameter.cardTemplateName = this.listQuery.parameter.cardTemplateName;
                this.exitlistQuery.parameter.cardName = this.listQuery.parameter.cardName;
                this.exitlistQuery.parameter.salesStaffName = this.listQuery.parameter.salesStaffName;
                this.exitlistQuery.current = this.listQuery.current;

                parkingCardPageList(this.listQuery).then(response => {
                    this.tableData = response.result.records;
                    for (let i = 0; i<response.result.records.length; i++){
                        this.tableData[i].number = i+1
                    }
                    this.total = response.result.total;
                    if(response.result.records.length === 0 && response.result.current >= 2){
                        this.listQuery.current = response.result.current-1;
                        this.getList()
                    }else if(response.result.records.length === 0 && response.result.current < 2) {
                        this.listQuery.current = 1;
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //翻页
            currentChange(val){
                this.listQuery.current = val;
                this.getList();
            },
            //适用停车场下拉框
            handleSelectSYTCC(){
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                fetchParkingGarageNamelist(sysUser.gsid, this.ccmc).then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsSYTCC.push({
                            label: response.result[i].label,//此处是展示内容
                            value: Number(response.result[i].key) //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //发卡公司下拉框
            handleSelectFKGS(){
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                fetchSSGSList(sysUser.gsid).then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsFKGS.push({
                            label: response.result[i].label,//此处是展示内容
                            value: Number(response.result[i].key) //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //停车卡类型下拉框
            handleSelectTCKLX(){
                // let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                parkingCardTypeList().then(response => {
                    for (let i = 0; i < response.result.length; i++) {
                        this.OptionsTCKLX.push({
                            // label: response.result[i].label,//此处是展示内容
                            // value: Number(response.result[i].key), //此处是后台需要的值
                            label: response.result[i].cardTemplateName,//此处是展示内容
                            value: response.result[i].cardTemplateName //此处是后台需要的值
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            handleFilter() {
                //执行列表方法
                this.getList();
            },
            reset(){
                this.scsj = '';
                this.listQuery.parameter.parkingLot = '';
                this.listQuery.parameter.companyId = '';
                this.listQuery.parameter.cardChannel = '';
                this.listQuery.parameter.cardStatus = '';
                this.listQuery.parameter.forbiddenStatus = '';
                this.listQuery.parameter.cardTemplateName = '';
                this.listQuery.parameter.endSellingTime = '';
                this.listQuery.parameter.cardName = '';
                this.listQuery.parameter.salesStaffName = '';
                this.ccmc = "";
                //重置下方列表
                this.getList();
            },
            resetFilter() {
                // this.$refs.companyChild.resetCon();
                // this.$refs.peopleChild.resetCon();
                this.reset();
                this.OptionsSYTCC = [];
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                this.handleSelectSYTCC(sysUser.gsid,this.ccmc);
            },
            //新增发卡弹窗
            openDialog(){
                this.CardDialogVisible = true;
            },
            //查看详情
            openDetailDialog(row){
                this.SeeCardDialogVisible = true;
                //给data的myMsg赋值
                this.myMsg = row;
            },
            //禁用
            disableBtn(id,forbiddenStatus){
                //走接口之后重新刷新getList()
                stopParkingCardRecord(id,forbiddenStatus).then(response => {
                    if (response.code === 0) {
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.getList();
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            //作废
            cancellationBtn(id){
                //走接口之后重新刷新getList()
                this.$confirm('是否废弃?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    cancelParkingCardRecord(id).then(response => {
                        if (response.code === 0) {
                            this.$message({
                                message: response.message,
                                type: 'success'
                            });
                            this.getList();
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消废弃'
                    });
                });
            },
            exportTable() {
              //导出
                exitParkingCardRecord(this.exitlistQuery).then(response => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            },
            formworkDownload() {
              //模板下载
                downloadParkingCard().then(response => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            },
            offlineImport(item) {
              //线下导入
                const fileObj = item.file;
                // FormData 对象
                const form = new FormData();
                // 文件对象
                form.append('file', fileObj);
                goParkingCardRecord(form).then(response => {
                    if (response.code === 0) {
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.getList();
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            remoteMethodCCMC(query) {
                //ccmc本来指的是id 因为模糊搜索 所以这里换成了输入的内容query
                this.ccmc = query;
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                if (query !== '') {
                    this.handleSelectSYTCC(sysUser.gsid, this.ccmc);
                    this.OptionsSYTCC = [];
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.OptionsSYTCC = this.OptionsSYTCC.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.OptionsSYTCC = [];
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (row.cardStatus == 6) {
                    //已作废 显示置灰色
                    return 'gray-row';
                }
                return '';
            },
        }
    }
</script>

<style>
    /*需要去除scoped 想要row-class-name生效必须是全局样式*/
    .el-table .gray-row {
        background: lightgray;
    }
    .daoru {
        display: inline !important;
        margin-left: 10px !important;
        margin-right: 10px !important;
    }
    .daoru .el-button--primary {
        background-color: white !important;
        color: #606266 !important;
        border: 1px solid #dcdfe6 !important;
        font-size: 14px !important;
    }
</style>