<template>
  <div class="abnormalOrders-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="listQuery.parameter.id" placeholder="请输入订单顺序"></el-input>
        </el-col>
        <el-col :span="1" style="padding-top: 10px">
          <span v-show="isShouqiShow" class="iconfont icon-zhankai" style="color:#777; font-size: 18px;" @click="iconShouqi"></span>
          <span v-show="isZhankaiShow" class="iconfont icon-shouqi" style="color:#777; font-size: 18px;" @click="iconZhankai"></span>
        </el-col>
        <el-col :span="6" style="color:#aaa; padding-top: 10px">
          <i class="el-icon-warning"></i><span style="padding-left:5px;">订单编号DC00000001的顺序号为1</span>
        </el-col>
        <el-col :span="5" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    <div v-show="isZhankaiShow">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.hphm"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodHPHM"
            :loading="loading"
            placeholder="请输入车牌号码">
            <el-option
              v-for="item in OptionsHPHM"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.czyhid"
            filterable
            placeholder="请输入操作员姓名">
            <el-option
              v-for="item in OptionsCLR"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="zfsj"
            type="datetimerange"
            align="right"
            start-placeholder="作废开始时间"
            end-placeholder="作废结束时间"
            :default-time="['00:00:00', '23:59:59']"
            value-format="timestamp">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    </div>
    <div class="content-card">
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
          prop="ddbh"
          label="订单编号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDDBHDialog(scope.row)">{{scope.row['ddbh']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="ccmc"
          label="停车场">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openCCDialog(scope.row)">{{scope.row['ccmc']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="cwbh"
          label="泊位编号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openCWDialog(scope.row)">{{scope.row['cwbh']}}</el-button>
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
          prop="rwsj"
          width="170"
          label="入位时间">
          <template slot-scope="scope" v-if="scope.row.rwsj">
            <span>{{scope.row.rwsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tcsc"
          label="停车时长">
        </el-table-column>
        <el-table-column
          prop="ysje"
          label="应付金额">
          <template slot-scope="scope">
            <span>{{scope.row.ysje/100}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="qkje"
          width="90"
          label="欠费金额">
          <template slot-scope="scope">
            <span>{{scope.row.qkje/100}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="czr"
          label="操作员姓名">
        </el-table-column>
        <el-table-column
          prop="zfsj"
          width="170"
          label="作废时间">
          <template slot-scope="scope" v-if="scope.row.zfsj">
            <span>{{scope.row.zfsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="zfyy"
          label="作废原因">
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
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
    <SeeRoadInParkingSpace v-if="SeeRoadInParkingSpaceVisible" :visible.sync="SeeRoadInParkingSpaceVisible" :msg="mySpaceMsg"></SeeRoadInParkingSpace>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="myCarMsg"></SeeCarInfoDialog>
    <OrderDetailDialog v-if="OrderDetailDialogVisible" :visible.sync="OrderDetailDialogVisible" :msg="myOrderMsg"></OrderDetailDialog>
  </div>
</template>

<script>
  import { fetchPdaUserNamelist, fetchHPHMlist, fetchSysUserlist } from '@/api/CommonSelectApi'
  import { fetchAbnormalOrdersList } from '@/api/ParkingInRoad/TollManage/AbnormalOrders'
  import OrderDetailDialog from "../OrderDetailDialog/OrderDetailDialog";
  import SeeRoadInParkingLot from "@/views/Resources/RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot";
  import SeeRoadInParkingSpace from "@/views/Resources/RoadInParkingSpace/RoadInParkingSpaceDialog/SeeRoadInParkingSpace";
  import SeeCarInfoDialog from "@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog";
  import SecondToDate from '@/utils/timeChange'
    export default {
        name: "AbnormalOrders",
      components: {
        OrderDetailDialog,
        SeeCarInfoDialog, SeeRoadInParkingSpace, SeeRoadInParkingLot },
      data(){
          return{
            OptionsYGXM:[],
            OptionsHPHM:[],
            OptionsCLR:[],
            tableData:[],
            total:0,
            zfsj:'',
            loading:false,
            listQuery:{
              parameter:{
                ddbh:'',
                hphm:'',
                czyhid:'',
                kssj:'',
                jssj:'',
              }
            },
            isZhankaiShow:false,
            isShouqiShow:true,
            SeeRoadInParkingLotVisible:false,
            SeeRoadInParkingSpaceVisible:false,
            SeeCarInfoDialogVisible:false,
            OrderDetailDialogVisible:false
          }
      },
      created(){
        this.handleSelectHPHM();
        this.handleSelectYGXM();
        this.handleSelectCLR();
        this.getList()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          fetchAbnormalOrdersList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            for (let i = 0; i<response.result.records.length; i++){
              this.tableData[i].tcsc = SecondToDate(response.result.records[i].tcsc)
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
        handleFilter(){
          this.listQuery.parameter.kssj = this.zfsj[0]/1000;
          this.listQuery.parameter.jssj = this.zfsj[1]/1000;
          this.listQuery.current = 1;
          this.getList();
        },
        reset(){
          this.listQuery.parameter.id = '';
          this.listQuery.parameter.hphm = '';
          this.listQuery.parameter.czyhid = '';
          this.listQuery.parameter.kssj = '';
          this.listQuery.parameter.jssj = '';
          this.zfsj = '';
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.reset();
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.OptionsYGXM = [];
          this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.zsmc);
          this.OptionsHPHM = [];
          this.handleSelectHPHM(this.listQuery.parameter.hphm);
        },
        iconShouqi(){
          this.isZhankaiShow = true;
          this.isShouqiShow = false
        },
        iconZhankai(){
          this.isZhankaiShow = false;
          this.isShouqiShow = true
        },
        openDDBHDialog(row){
          this.OrderDetailDialogVisible = true;
          this.myOrderMsg = row;
        },
        openCCDialog(row){
          this.SeeRoadInParkingLotVisible = true;
          this.myMsg = row;
        },
        openCWDialog(row){
          this.SeeRoadInParkingSpaceVisible = true;
          this.mySpaceMsg = row;
        },
        openHPHMDialog(row){
          this.SeeCarInfoDialogVisible = true;
          this.myCarMsg = row;
        },
        //号牌号码下拉框
        handleSelectHPHM(){
          fetchHPHMlist(this.listQuery.parameter.hphm).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsHPHM.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //员工姓名下拉框
        handleSelectYGXM(){
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          fetchPdaUserNamelist(sysUser.gsid, this.listQuery.parameter.czyhid).then(response => {
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
        //操作人下拉框
        handleSelectCLR(){
          fetchSysUserlist().then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsCLR.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //号牌号码模糊查询
        remoteMethodHPHM(query) {
          this.listQuery.parameter.hphm = query;
          if (query !== '') {
            this.handleSelectHPHM(this.listQuery.parameter.hphm);
            this.OptionsHPHM = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.OptionsHPHM = this.OptionsHPHM.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.OptionsHPHM = [];
          }
        },
        remoteMethodYGXM(query) {
          this.listQuery.parameter.czyhid = query;
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          if (query !== '') {
            this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.czyhid);
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
        }
      }
    }
</script>

<style lang="less">

</style>
