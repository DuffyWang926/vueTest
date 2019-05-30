<template>
  <div class="holiday-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="请输入节假日名称"
            v-model="listQuery.parameter.jqmc">
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
          prop="jqmc"
          label="节假日名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="kssj"
          label="节假日开始时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.kssj|day}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="jssj"
          label="节假日结束时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.jssj|day}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="txrq1"
          label="调休上班日期1"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.txrq1|day}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="txrq2"
          label="调休上班日期2"
          width="200">
          <template slot-scope="scope" v-if="scope.row.txrq2 !== 0">
            <span>{{scope.row.txrq2|day}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="当前状态">
          <template slot-scope="scope">
            <span>{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间"
          width="200">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(1,scope.row['id'])">修改</el-button>
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
    <CommonHolidayDialog  v-if="CommonHolidayeDialogVisible" :visible.sync="CommonHolidayeDialogVisible" :idVal=id :dialogType=type></CommonHolidayDialog>
  </div>
</template>

<script>
  import { fetchHolidayList,RemoveData }  from '@/api/BasisSet/Holiday'
  import CommonHolidayDialog from './HolidayDialog/CommonHolidayDialog'
    export default {
      name: "Holiday",
      components: {CommonHolidayDialog},
      data() {
        return{
          listQuery:{
            parameter:{
              jqmc:''
            },
            current:1,
            size:10
          },
          tableData: [],
          CommonHolidayeDialogVisible:false,
          total:0
        }
      },
      created() {
        this.getList()
      },
      activated(){
        this.resetFilter()
      },
      methods: {
        //获取节假日列表
        getList() {
          fetchHolidayList(this.listQuery).then(response => {
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
        //删除事件
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

        //查询
        handleFilter() {
          this.listQuery.parameter.jqmc = this.listQuery.parameter.jqmc.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.listQuery.parameter.jqmc = '';
          this.listQuery.current = 1;
          this.getList()
        },
        //新增和修改弹框
        openDialog(type,idVal){
          this.CommonHolidayeDialogVisible = true;
          this.type = type;
          this.id = Number(idVal);
        }
      }
    }
</script>

<style scoped>

</style>
