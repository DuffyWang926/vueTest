<template>
  <div class="OperateLog-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="操作员账号"
            v-model="listQuery.parameter.userName">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.optType" filterable placeholder="请输入操作类型">
            <el-option
              v-for="item in OptionsOPTType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="sj"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-col>
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <el-table
        :data="tableData"
        style="width: 100%;padding-top: 15px;">
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="modelName"
          label="模块名称">
        </el-table-column>
        <el-table-column
          prop="optName"
          label="模块描述">
        </el-table-column>
        <el-table-column
          prop="optType"
          label="操作类型">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="访问IP">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="操作人姓名">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="操作人账号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作时间">
          <template slot-scope="scope" v-if="scope.row.createTime">
            <span>{{scope.row.createTime|time}}</span>
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
  </div>
</template>

<script>
  import { fetchOperatelogList } from "@/api/AnalysisReports/Operatelog"
  import  EnumberateSelect  from '@/filters/index'
    export default {
        name: "OperateLog",
      data(){
          return{
            listQuery:{
              parameter:{
                userName:'',
                optType:'',
                startTime:'',
                endTime:''
              },
              current:1,
              size:10
            },
            sj:'',
            tableData:[],
            total:0,
            OptionsOPTType:EnumberateSelect.OPTType,
          }
      },
      created(){
          this.getList()
      },
      activated(){
        this.resetFilter()
      },
      methods:{
        getList() {
          fetchOperatelogList(this.listQuery).then(response => {
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

        handleFilter(){
          this.listQuery.parameter.userName = this.listQuery.parameter.userName.trim();
          this.listQuery.parameter.optType = this.listQuery.parameter.optType.trim();
          this.listQuery.parameter.startTime = this.sj[0]/1000;
          this.listQuery.parameter.endTime = this.sj[1]/1000;
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.listQuery.parameter.userName = '';
          this.listQuery.parameter.optType = '';
          this.listQuery.parameter.startTime = '';
          this.listQuery.parameter.endTime = '';
          this.sj = '';
          this.listQuery.current = 1;
          this.getList()
        },
        openDialog(){},
      }

    }
</script>

<style scoped>

</style>
