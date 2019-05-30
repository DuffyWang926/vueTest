<template>
    <div class="cardTypeManagement-page">
        <div class="content-card search">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-select
                            v-model="ccmc"
                            filterable
                            placeholder="请选择停车卡类型">
                        <el-option
                                v-for="item in OptionsTCKLX"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-button @click="handleFilter">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="content-card">
            <div class="table-add-button">
                <el-button @click="openDialog">添加</el-button>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="#"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="glybh"
                        label="员工编号">
                </el-table-column>
                <el-table-column
                        prop="zsmc"
                        label="收费员姓名">
                </el-table-column>
                <el-table-column
                        prop="dlmc"
                        label="登录账号">
                </el-table-column>
                <el-table-column
                        prop="sjh"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="gsmc"
                        label="所属运营公司">
                </el-table-column>
                <el-table-column
                        prop="sfqy"
                        label="当前状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.sfqy|sfqy}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="glcc"
                        label="管理车场">
                </el-table-column>
                <el-table-column
                        prop="glcw"
                        label="管理泊位">
                </el-table-column>
                <el-table-column
                        prop="handle"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleDelete(scope.row['id'])">删除</el-button>
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
        <ParkingCardDialog v-if="CardDialogVisible" :visible.sync="CardDialogVisible"></ParkingCardDialog>
    </div>
</template>

<script>
    import ParkingCardDialog from "./Dialogue/ParkingCardDialog";
    import { fetchStaffList, RemoveData } from '@/api/StaffManage/Staff';
    import { parkingCardPageList, parkingCardTypeList ,cancelParkingCardRecord ,stopParkingCardRecord ,downloadParkingCard ,exitParkingCardRecord } from '@/api/ParkingInRoad/ParkingCard/VehicleParkingCard';
    export default {
        name: "cardTypeManagement",
        components: {ParkingCardDialog},
        data() {
            return{
                CardDialogVisible:false,
                ccmc:'',
                OptionsTCKLX:[],
                listQuery:{
                    parameter:{
                        cardTemplateName:'',
                        ggsj:'',
                    },
                    current:1,
                    size:10
                },
                tableData:[],
                total: 0,
            }
        },
        created() {
            this.getList();
            this.handleSelectTCKLX();
        },
        activated(){
            this.reset()
        },
        methods:{
            getList() {
                this.listQuery.parameter.cardTemplateName = this.ccmc;

                //
                let sysUser = JSON.parse(localStorage.getItem("sysUser"));
                this.listQuery.parameter.ggsj = sysUser.gsid;
                fetchStaffList(this.listQuery).then(response => {
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
            //停车卡类型下拉框
            handleSelectTCKLX(){
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
            handleDelete(id) {
                this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    RemoveData(id).then(response => {
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
                        message: '已取消删除'
                    });
                });
            },
            //新增停车卡弹窗
            openDialog(){
                this.CardDialogVisible = true;
            },
            handleFilter() {
                //执行列表方法
                this.getList();
            },
            //翻页
            currentChange(val){
                this.listQuery.current = val;
                this.getList();
            },
            reset(){
                this.listQuery.parameter.cardTemplateName = '';
                this.ccmc = "";
                //重置下方列表
                this.getList();
            },
        },
    }
</script>

<style scoped>

</style>