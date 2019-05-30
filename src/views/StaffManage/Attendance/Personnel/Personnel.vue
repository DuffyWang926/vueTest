<template>
  <div class="personnel-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.zsmc"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodYGXM"
            :loading="loading"
            placeholder="请输入员工姓名">
            <el-option
              v-for="item in OptionsYGXM"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="cjsj"
            type="month"
            placeholder="选择月"
            :clearable=clearable
            value-format="timestamp">
          </el-date-picker>
        </el-col>
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <div class="table-add-button">
        <el-button type="primary" @click="exportExcel">导出</el-button>
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
          prop="cjsj"
          label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.cjsj|day}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="glybh"
          label="员工编号">
        </el-table-column>
        <el-table-column
          prop="zsmc"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="qdsj"
          label="签到时间"
          width="200">
          <template slot-scope="scope" v-if="scope.row.qdsj">
            <span>{{scope.row.qdsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="qddd"
          label="签到地点">
        </el-table-column>
        <el-table-column
          prop="qtsj"
          label="签退时间"
          width="200">
          <template slot-scope="scope" v-if="scope.row.qtsj">
            <span>{{scope.row.qtsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="qtdd"
          label="签退地点">
        </el-table-column>
        <el-table-column
          prop="gzsc"
          label="工作时长">
          <template slot-scope="scope" v-if="scope.row.gzsc">
            <span>{{scope.row.gzsc}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="handle"-->
          <!--label="操作"-->
          <!--width="250">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small" @click="openDialog(scope.row['id'])">查看轨迹</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
  import {fetchPersonnelList, exportPdaWordDayExcel} from '@/api/StaffManage/Personnel'
  import { fetchPdaUserNamelist } from '@/api/CommonSelectApi'
  import SecondToDate from '@/utils/timeChange'

    export default {
        name: "Personnel",
      data(){
        return{
          tableData:[],
          OptionsYGXM:[],
          total:0,
          cjsj:'',
          clearable:false,
          loading: false,
          listQuery:{
            parameter:{
              zsmc:'',
              yf:'',
              lx:1
            },
            current:1,
            size:10
          }
        }
      },
      created(){
        this.handleSelectYGXM()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList() {
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.listQuery.parameter.glyid = sysUser.gsid;
          fetchPersonnelList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            for (let i = 0; i<response.result.records.length; i++){
              this.tableData[i].gzsc = SecondToDate(response.result.records[i].gzsc)
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
        //导出
        exportExcel(){
          this.handleFilter();
          exportPdaWordDayExcel(this.listQuery).then(response => {
            if(response.code === 0){
              this.$message({
                message: response.result.message,
                type: 'success'
              });
            }
          }).catch((err) => {
              console.log(err)
          })
        },
        currentChange(val){
          this.listQuery.current = val;
          this.getList();
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

        handleFilter(){
          //如果不输入筛选条件点击查询按钮，默认筛选当前月
          let myDate = new Date();
          let FullYear = myDate.getFullYear();
          let Month = myDate.getMonth() +1;
          let timestamp = FullYear + '/' + Month;
          this.listQuery.parameter.yf = this.cjsj/1000;
          if(this.listQuery.parameter.yf === 0){
            this.listQuery.parameter.yf = Date.parse(timestamp)/1000;
          }
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.cjsj = '';
          this.listQuery.parameter.yf = '';
          this.listQuery.parameter.zsmc = '';
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.reset();
          this.OptionsYGXM = [];
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.zsmc)
        },
        remoteMethodYGXM(query) {
          this.listQuery.parameter.zsmc = query;
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          if (query !== '') {
            this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.zsmc);
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
      }

    }
</script>

<style scoped>

</style>
