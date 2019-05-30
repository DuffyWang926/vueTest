<template>
  <div class="operate-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
              placeholder="请输入公司名称"
              v-model="listQuery.parameter.gsmc">
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <div class="table-add-button">
        <el-button type="primary" @click="openDialog(0)">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="sjgsmc"
          label="上级公司">
        </el-table-column>
        <el-table-column
          prop="gsmc"
          label="公司名称">
        </el-table-column>
        <el-table-column
          prop="lxr"
          label="联系人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sjh"
          label="联系人电话">
        </el-table-column>
        <el-table-column
          prop="yxdz"
          label="邮箱地址">
        </el-table-column>
        <el-table-column
          prop="gsdz"
          label="注册地址">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(1,scope.row['id'])">修改</el-button>
            <el-button type="text" size="small" @click="AccountOperate(scope.row)">账户配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page="listQuery.current"
        :page-size="listQuery.size"
        @current-change="currentChange">
      </el-pagination>
    </div>
    <CommonOperateDialog  v-if="CommonOperateDialogVisible" :visible.sync="CommonOperateDialogVisible" :idVal=id  :dialogType=type></CommonOperateDialog>
    <AccountOperateDialog  v-if="AccountOperateDialogVisible" :visible.sync="AccountOperateDialogVisible" :msg="myMsg"></AccountOperateDialog>
  </div>
</template>

<script>
  import {fetchAllCompany,fetchOperateList,searchCompanyDetail}  from '@/api/BasisSet/Operate'
  import CommonOperateDialog from './OperateDialog/CommonOperateDialog'
  import AccountOperateDialog from "./OperateDialog/AccountOperateDialog";
    export default {
      name: "Operate",
      components: {AccountOperateDialog, CommonOperateDialog },
      data() {
        return{
          listQuery:{
            parameter:{
              gsmc:'',
            },
            current:1,
            size:10
          },
          tableData: [],
          CommonOperateDialogVisible:false,
          AccountOperateDialogVisible:false,
          myMsg:{},
          total:0
        }
      },
      created() {
        this.listQuery.parameter.gsmc = "";
        this.getList()
      },
      activated(){
        this.resetFilter()
      },
      methods:{
        //获取运营公司列表
        getList(){
          fetchOperateList(this.listQuery).then(response => {
            this.tableData = response.result.records;
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
        currentChange(val){
          this.listQuery.current = val;
          this.getList();
        },
        //新增和修改弹框
        openDialog(type,idVal){
          this.CommonOperateDialogVisible = true;
          this.type = type;
          this.id = Number(idVal);
        },
        //账户配置
        AccountOperate(row){
          this.AccountOperateDialogVisible = true;
          this.myMsg = row
        },
        //查询
        handleFilter(){
          this.listQuery.parameter.gsmc = this.listQuery.parameter.gsmc.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        //重置
        resetFilter(){
          this.listQuery.parameter.gsmc = "";
          this.listQuery.current = 1;
          this.getList()
        }
      }
    }
</script>

<style scoped>

</style>
