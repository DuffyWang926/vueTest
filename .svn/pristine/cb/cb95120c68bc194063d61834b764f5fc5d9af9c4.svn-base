<template>
  <div class="dailyattendance-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-date-picker
            v-model="cjsj"
            type="date"
            :clearable="false"
            placeholder="选择日期"
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
        <el-button type="primary" :disabled="isClick" @click="exportExcel">导出</el-button>
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
          prop="glybh"
          label="管理员编号">
        </el-table-column>
        <el-table-column
          prop="zsmc"
          label="管理员姓名">
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
  import {fetchDailyAttendanceList} from '@/api/StaffManage/DailyAttendance'
  import {exportPdaWordDayExcel} from '@/api/StaffManage/Personnel'
  import SecondToDate from '@/utils/timeChange'
    export default {
      name: "DailyAttendance",
      data(){
        return{
          tableData:[],
          cjsj:'',
          listQuery:{
            parameter:{
              yf:'',
              glyid:'',
              lx:2
            },
            current:1,
            size:10
          },
          total:0,
          isClick:false
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
          //默认当天数据
          if(this.cjsj === ''){
            let time =Date.parse(new Date().toLocaleDateString());
            this.listQuery.parameter.yf = time/1000;
          }else{
            this.listQuery.parameter.yf = this.cjsj/1000;
          }
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.listQuery.parameter.glyid = sysUser.gsid;
          fetchDailyAttendanceList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            let result = response.result.records.length;
            if(result === 0){
              this.isClick = true
            }
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
        currentChange(val){
          this.listQuery.current = val;
          this.getList();
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
        handleFilter(){
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.cjsj = '';
          this.listQuery.parameter.yf = '';
          this.listQuery.current = 1;
          this.getList()
        },
        openDialog(){}
      }
    }
</script>

<style scoped>

</style>
