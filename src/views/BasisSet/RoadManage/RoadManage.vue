<template>
  <div class="roadmanage-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="请输入道路名称"
            v-model="listQuery.parameter.dlmc">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.ywqybh" filterable placeholder="请选择道路所属区域">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="content-card">
      <div class="table-add-button">
        <el-button type="primary" @click="openDialog">新增</el-button>
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
          prop="dlbh"
          label="道路编号">
        </el-table-column>
        <el-table-column
          prop="dlmc"
          label="道路名称">
        </el-table-column>
        <el-table-column
          prop="ssqy"
          label="所属区域">
        </el-table-column>
        <el-table-column
          prop="tccsl"
          label="停车场数量">
        </el-table-column>
        <el-table-column
          prop="tcwsl"
          label="停车位数量">
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
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
    <AddRoadManageDialog v-if="AddRoadManageDialogVisible" :visible.sync="AddRoadManageDialogVisible"></AddRoadManageDialog>
  </div>
</template>

<script>
    import {fetchRoadManageList, RemoveData} from "@/api/BasisSet/RoadManage"
    import {fetchSSQYlist} from "@/api/CommonSelectApi"
    import AddRoadManageDialog from "./RoadManageDialog/AddRoadManageDialog";
    export default {
      name: "RoadManage",
      components: {AddRoadManageDialog},
      data(){
        return{
          listQuery:{
            parameter:{
              dlmc:'',
              ywqybh:''
            },
            current:1,
            size:10
          },
          Options:[],
          tableData:[],
          total:0,
          AddRoadManageDialogVisible:false
        }
      },
      created(){
        this.getList();
        this.handleSelect()
      },
      activated(){
        this.resetFilter()
      },
      methods:{
        //列表
        getList() {
          fetchRoadManageList(this.listQuery).then(response => {
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
          console.log(val)
          this.listQuery.current = val;
          this.getList();
        },
        //所属区域下拉框
        handleSelect(){
          fetchSSQYlist().then(response => {
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
          this.listQuery.parameter.dlmc = this.listQuery.parameter.dlmc.trim();
          this.listQuery.current = 1;
          this.getList();
        },
        resetFilter(){
          this.listQuery.parameter.dlmc = "";
          this.listQuery.parameter.ywqybh = "";
          this.listQuery.current = 1;
          this.getList();
        },
        openDialog(){
          this.AddRoadManageDialogVisible = true
        },
        //删除
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
      }
    }
</script>

<style scoped>

</style>
