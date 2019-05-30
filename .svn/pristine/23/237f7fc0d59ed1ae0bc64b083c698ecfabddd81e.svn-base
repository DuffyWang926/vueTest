<template>
  <div class="role-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
              placeholder="请输入角色名称"
              v-model="listQuery.parameter.jsmc">
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
          <el-button type="primary" @click="openAddDialog">新增</el-button>
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
          prop="jsmc"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="jsms"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span class="tdcolor">{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="openDialog(1,scope.row['id'])">权限</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row['id'])">删除</el-button>
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
      <CommonRoleManageDialog v-if="CommonRoleManageDialogVisible" :visible.sync="CommonRoleManageDialogVisible" :idVal=id :dialogType=type></CommonRoleManageDialog>
      <AddRoleManageDialog v-if="AddRoleManageDialogVisible" :visible.sync="AddRoleManageDialogVisible" :msg="myMsg"></AddRoleManageDialog>
  </div>
</template>

<script>
    import { fetchRoleManageList, RemoveData } from '@/api/BasisSet/RoleManage'
    import CommonRoleManageDialog from "./RoleManageDialog/CommonRoleManageDialog";
    import AddRoleManageDialog from "./RoleManageDialog/AddRoleManageDialog";
    export default {
      name: "RoleManage",
      components: {AddRoleManageDialog, CommonRoleManageDialog},
      data() {
        return {
          total: 0,
          listQuery:{
            parameter:{
                jsmc:''
            },
            current:1,
            size:10
          },
          tableData: [],
          CommonRoleManageDialogVisible:false,
          AddRoleManageDialogVisible:false,
          myMsg:{}
        }
      },
      //每次进入页面请求重置接口清空输入框
      activated(){
        this.resetFilter()
      },
      created() {
        this.getList()
      },
      methods: {
        getList() {
          fetchRoleManageList(this.listQuery).then(response => {
            this.tableData = response.result.records
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
        handleFilter(){
          this.listQuery.parameter.jsmc = this.listQuery.parameter.jsmc.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.listQuery.parameter.jsmc = '';
          this.listQuery.current = 1;
          this.getList()
        },
        openDialog (type,idVal) {
          this.CommonRoleManageDialogVisible = true;
          this.type = type;
          this.id = Number(idVal);
        },
        openAddDialog(){
          this.AddRoleManageDialogVisible = true;
        },
        handleDelete(id){
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
        }
      }
    }
</script>

<style lang="less">


</style>
