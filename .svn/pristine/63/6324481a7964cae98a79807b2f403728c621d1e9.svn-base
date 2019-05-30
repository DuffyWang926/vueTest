<template>
  <div class="toparrears-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.ccbh"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodCCMC"
            :loading="loading"
            placeholder="请选择停车场">
            <el-option
              v-for="item in OptionsCCMC"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.gsid" filterable placeholder="请选择运营公司">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.qybh" filterable placeholder="请选择所属区域">
            <el-option
              v-for="item in OptionsSSQY"
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
      <el-table
        :data="tableData"
        style="width: 100%; padding-bottom: 50px;">
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="ssqy"
          label="所属区域">
        </el-table-column>
        <el-table-column
          prop="ssgs"
          label="所属公司">
        </el-table-column>
        <el-table-column
          prop="ccmc"
          label="停车场">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openCCDialog(scope.row)">{{scope.row['ccmc']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="hphm"
          label="车牌号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openHPHMDialog(scope.row)">{{scope.row['hphm']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="cpys"
          label="车牌颜色">
          <template slot-scope="scope">
            <span>{{scope.row.cpys|cpys}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ysje"
          label="总应付金额">
          <template slot-scope="scope">
            <span>{{scope.row.ysje/100}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="qkje"
          label="总欠费金额">
          <template slot-scope="scope">
            <span>{{scope.row.qkje/100}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-pagination-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--:total="total"-->
        <!--:current-page="listQuery.current"-->
        <!--:page-size="listQuery.size"-->
        <!--@current-change="currentChange">-->
      <!--</el-pagination>-->
    </div>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="myCarMsg"></SeeCarInfoDialog>
  </div>
</template>

<script>
  import { fetchSSGSList, fetchParkingGarageNameCcbhlist, fetchSSQYlist } from '@/api/CommonSelectApi'
  import { fetchTopArrearsList } from '@/api/ParkingInRoad/TollManage/TopArrears'
  import SeeRoadInParkingLot from "@/views/Resources/RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot";
  import SeeCarInfoDialog from "@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog";
    export default {
        name: "TopArrears",
      components: { SeeRoadInParkingLot, SeeCarInfoDialog},
      data(){
        return{
          tableData:[],
          Options:[],
          OptionsCCMC:[],
          OptionsSSQY:[],
          listQuery:{
            parameter:{
              ccbh:'',
              gsid:'',
              qybh:''
            },
            current:1,
            size:10
          },
          loading: false,
          SeeRoadInParkingLotVisible: false,
          SeeCarInfoDialogVisible:false,
        }
      },
      created(){
        this.handleSelectSSGS();
        this.handleSelectCCMC();
        this.handleSelectSSQY();
        this.getList()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          fetchTopArrearsList(this.listQuery).then(response => {
            this.tableData = response.result;
          }).catch((err) => {
            console.log(err)
          })
        },
        handleFilter(){
          this.getList()
        },
        reset(){
          this.listQuery.parameter.ccbh = '';
          this.listQuery.parameter.gsid = '';
          this.listQuery.parameter.qybh = '';
          this.getList()
        },
        resetFilter(){
          this.reset();
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.OptionsCCMC = [];
          this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccbh);
        },
        openCCDialog(row){
          this.SeeRoadInParkingLotVisible = true;
          this.myMsg = row;
        },
        openHPHMDialog(row){
          this.SeeCarInfoDialogVisible = true;
          this.myCarMsg = row;
        },
        //运营公司下拉框
        handleSelectSSGS(){
          fetchSSGSList().then(response => {
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
        //停车场名称
        handleSelectCCMC(){
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          fetchParkingGarageNameCcbhlist(sysUser.gsid, this.listQuery.parameter.ccbh).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsCCMC.push({
                label: response.result[i].label,//此处是展示内容
                value: response.result[i].key //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //所属区域
        handleSelectSSQY(){
          fetchSSQYlist().then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsSSQY.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        remoteMethodCCMC(query) {
          this.listQuery.parameter.ccbh = query;
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          if (query !== '') {
            this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccbh);
            this.OptionsCCMC = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.OptionsCCMC = this.OptionsCCMC.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.OptionsCCMC = [];
          }
        },
      }
    }
</script>

<style lang="less">

</style>
