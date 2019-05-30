<template>
  <div class="currentOrder-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
         <el-input v-model="listQuery.parameter.id" placeholder="请输入订单顺序" ></el-input>
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
            <el-select v-model="listQuery.parameter.ddzt" placeholder="请选择订单状态">
              <el-option
                v-for="item in OptionsDDZT"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="rwsj"
              type="datetimerange"
              align="right"
              start-placeholder="入位开始日期"
              end-placeholder="入位结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="timestamp">
            </el-date-picker>
          </el-col>

        </el-row>

        <el-row :gutter="20">
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.cwbh"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodCWBH"
            :loading="loading"
            placeholder="请输入车位编号">
            <el-option
              v-for="item in OptionsCWBH"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
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
          prop="cwbh"
          label="泊位编号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openCWDialog(scope.row)">{{scope.row['cwbh']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="hphm"
          width="100"
          label="车牌号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openHPHMDialog(scope.row)">{{scope.row['hphm']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="cpys"
          width="90"
          label="车牌颜色">
          <template slot-scope="scope">
            <span>{{scope.row.cpys|cpys}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rwsj"
          width="190"
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
          width="90"
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
          prop="handle"
          width="80"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row)">异常处理</el-button>
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
    <HandleCurrentOrdersDialog v-if="HandleCurrentOrdersDialogVisible" :visible.sync="HandleCurrentOrdersDialogVisible" :msg="msgData"></HandleCurrentOrdersDialog>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
    <SeeRoadInParkingSpace v-if="SeeRoadInParkingSpaceVisible" :visible.sync="SeeRoadInParkingSpaceVisible" :msg="mySpaceMsg"></SeeRoadInParkingSpace>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="myCarMsg"></SeeCarInfoDialog>
    <OrderDetailDialog v-if="OrderDetailDialogVisible" :visible.sync="OrderDetailDialogVisible" :msg="myOrderMsg"></OrderDetailDialog>
  </div>
</template>

<script>
  import { fetchCurrentOrderList } from '@/api/ParkingInRoad/TollManage/CurrentOrders'
  import { fetchHPHMlist, fetchParkingSpaceBhlist, fetchSSGSList, fetchParkingGarageNameCcbhlist, fetchSSQYlist } from '@/api/CommonSelectApi'
  import  EnumberateSelect  from '@/filters/index'
  import HandleCurrentOrdersDialog from "./CurrentOrdersDialog/HandleCurrentOrdersDialog";
  import SeeRoadInParkingLot from "@/views/Resources/RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot";
  import SeeRoadInParkingSpace from "@/views/Resources/RoadInParkingSpace/RoadInParkingSpaceDialog/SeeRoadInParkingSpace";
  import SeeCarInfoDialog from "@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog";
  import OrderDetailDialog from "../OrderDetailDialog/OrderDetailDialog";
  import SecondToDate from '@/utils/timeChange'
    export default {
        name: "CurrentOrders",
      components: {
        OrderDetailDialog,
        SeeCarInfoDialog, SeeRoadInParkingSpace, SeeRoadInParkingLot, HandleCurrentOrdersDialog},
      data(){
        return{
          Options:[],
          OptionsCWBH:[],
          OptionsHPHM:[],
          OptionsCCMC:[],
          OptionsSSQY:[],
          OptionsDDZT:EnumberateSelect.DDZT,
          total:0,
          tableData:[],
          msgData:{
            Data:{}
          },
          loading: false,
          listQuery:{
            parameter:{
              hphm:'',
              ddzt:'',
              cwbh:'',
              ccbh:'',
              gsid:'',
              qybh:'',
              kssj:'',
              jssj:'',
              id:''
            },
            current:1,
            size:10
          },
          rwsj:'',
          isZhankaiShow:false,
          isShouqiShow:true,
          HandleCurrentOrdersDialogVisible:false,
          SeeRoadInParkingLotVisible:false,
          SeeRoadInParkingSpaceVisible:false,
          SeeCarInfoDialogVisible:false,
          OrderDetailDialogVisible:false
        }
      },
      created(){
        this.getList();
        this.handleSelectHPHM();
        this.handleSelectCWBH();
        this.handleSelectSSGS();
        this.handleSelectCCMC();
        this.handleSelectSSQY();
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          fetchCurrentOrderList(this.listQuery).then(response => {
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
          this.listQuery.parameter.kssj = this.rwsj[0]/1000;
          this.listQuery.parameter.jssj = this.rwsj[1]/1000;
          this.listQuery.parameter.id = this.listQuery.parameter.id.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.listQuery.parameter.id = '';
          this.listQuery.parameter.hphm = '';
          this.listQuery.parameter.ddzt = '';
          this.listQuery.parameter.cwbh = '';
          this.listQuery.parameter.ccbh = '';
          this.listQuery.parameter.gsid = '';
          this.listQuery.parameter.qybh = '';
          this.listQuery.parameter.kssj = '';
          this.listQuery.parameter.jssj = '';
          this.rwsj = '';
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.reset();
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.OptionsHPHM = [];
          this.handleSelectHPHM(this.listQuery.parameter.hphm);
          this.OptionsCWBH = [];
          this.handleSelectCWBH(sysUser.gsid, this.listQuery.parameter.cwbh);
          this.OptionsCCMC = [];
          this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccbh);
        },
        iconShouqi(){
          this.isZhankaiShow = true;
          this.isShouqiShow = false
        },
        iconZhankai(){
          this.isZhankaiShow = false;
          this.isShouqiShow = true
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
        //停车位编号
        handleSelectCWBH(){
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          fetchParkingSpaceBhlist(sysUser.gsid, this.listQuery.parameter.cwbh).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsCWBH.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
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
        remoteMethodCWBH(query) {
          this.listQuery.parameter.cwbh = query;
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          if (query !== '') {
            this.handleSelectCWBH(sysUser.gsid, this.listQuery.parameter.cwbh)
            this.OptionsCWBH = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.OptionsCWBH = this.OptionsCWBH.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.OptionsCWBH = [];
          }
        },
        remoteMethodCCMC(query) {
          this.listQuery.parameter.ccbh = query
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          if (query !== '') {
            this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccbh)
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
        openDDBHDialog(row){
          this.OrderDetailDialogVisible = true;
          this.myOrderMsg = row;
        },
        openDialog(data){
          this.HandleCurrentOrdersDialogVisible = true;
          this.msgData.Data = data;
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
        }
      }
    }
</script>

<style lang="less">

</style>
