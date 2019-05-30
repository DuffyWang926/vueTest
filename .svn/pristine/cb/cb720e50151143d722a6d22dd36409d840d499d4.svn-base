<template>
  <div class="equipmentStatus-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.sblxid" placeholder="请选择设备类型">
            <el-option
              v-for="item in OptionsSBLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.sfzx" placeholder="设备是否在线">
            <el-option
              v-for="item in OptionsONLINE"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="ccmc"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodCCMC"
            :loading="loading"
            placeholder="请输入停车场名称">
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
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>

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
          prop="sbmc"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="sbbh"
          label="设备编号">
        </el-table-column>
        <el-table-column
          prop="sblxid"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="yygs"
          label="运营公司">
        </el-table-column>
        <el-table-column
          prop="ccmc"
          label="停车场">
        </el-table-column>
        <el-table-column
          prop="sbcs"
          label="制造商">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="设备状态">
          <template slot-scope="scope">
            <span>{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sfzx"
          label="在线状态">
          <template slot-scope="scope">
            <span>{{scope.row.sfzx|online}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sbxtsj"
          label="最后心跳">
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row)">查看</el-button>
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
    <SeeParkingEquipmentDialog v-if="SeeEquipmentStatusDialogVisible" :visible.sync="SeeEquipmentStatusDialogVisible" :msg="msgSee"></SeeParkingEquipmentDialog>
  </div>
</template>

<script>
  import  EnumberateSelect  from '@/filters/index'
  import { fetchSSGSList, fetchParkingGarageNamelist, fetchDictlist} from '@/api/CommonSelectApi'
  import { fetchEquipmentStatusList } from '@/api/ConditionMonitoring/EquipmentStatus'
  import SeeParkingEquipmentDialog
    from "../../Resources/ParkingEquipment/ParkingEquipmentDialog/SeeParkingEquipmentDialog";
  import SecondToDate from '@/utils/timeChange'
  import getEnumberate from '@/utils/getDictsEnumberate'

    export default {
        name: "EquipmentStatus",
      components: {SeeParkingEquipmentDialog},
      data(){
        return{
          listQuery:{
            parameter:{
              sblxid:'',
              sfzx:'',
              ccid:'',
              gsid:''
            },
            current:1,
            size:10
          },
          ccmc:'',
          msgSee:{
            Data:{}
          },
          loading: false,
          total:0,
          tableData:[],
          OptionsONLINE:EnumberateSelect.ONLINE,
          OptionsSBLX:[],
          Options:[],
          OptionsCCMC:[],
          SeeEquipmentStatusDialogVisible:false
        }
      },
      created(){
          this.getList();
          this.handleSelectSSGS();
          this.handleSelectCCMC();
          this.handleSelectDict()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          this.listQuery.parameter.ccid = this.ccmc;
          fetchEquipmentStatusList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            for (let i = 0; i<response.result.records.length; i++){
              this.tableData[i].sbxtsj = SecondToDate(response.result.records[i].sbxtsj)
            }
            for (let i = 0; i<response.result.records.length; i++){
              this.tableData[i].sblxid = getEnumberate(response.result.records[i].sblxid)
            }
            for (let i = 0; i<response.result.records.length; i++){
                this.tableData[i].sbcs = getEnumberate(response.result.records[i].sbcs)
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
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          fetchParkingGarageNamelist(sysUser.gsid, this.ccmc).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsCCMC.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //设备类型
        handleSelectDict(){
          fetchDictlist(106).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsSBLX.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
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
        //查询
        handleFilter(){
          this.listQuery.parameter.ccid = this.ccmc;
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.listQuery.parameter.sblxid = "";
          this.listQuery.parameter.sfzx = "";
          this.ccmc = "";
          this.listQuery.parameter.ccid = '';
          this.listQuery.parameter.gsid = "";
          this.listQuery.current = 1;
          this.getList()
        },
        //重置
        resetFilter(){
          this.reset();
          this.OptionsCCMC = [];
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccmc);
        },
        openDialog(data){
          this.SeeEquipmentStatusDialogVisible = true;
          this.msgSee = data;
        },
        remoteMethodCCMC(query) {
          this.ccmc = query;
          let sysUser = JSON.parse(localStorage.getItem("sysUser"));
          if (query !== '') {
            this.handleSelectCCMC(sysUser.gsid, this.ccmc);
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
        }
      }
    }
</script>

<style scoped>

</style>
