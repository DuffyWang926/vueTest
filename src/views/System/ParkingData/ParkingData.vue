<template>
  <div class="parkingdata-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.shid" @change="handleSHIDSelect" filterable placeholder="请输入商户名称">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" style="padding-top: 10px">
          <span v-show="isShouqiShow" class="iconfont icon-zhankai" style="color:#777; font-size: 18px;" @click="iconShouqi"></span>
          <span v-show="isZhankaiShow" class="iconfont icon-shouqi" style="color:#777; font-size: 18px;" @click="iconZhankai"></span>
        </el-col>
        <el-col :span="10">
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
        <div v-show="isZhankaiShow">
          <el-row>
            <el-col :span="5">
              <el-input
                placeholder="请输入号牌号码"
                v-model="listQuery.parameter.hphm"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input
                placeholder="请输入泊位编号"
                v-model="listQuery.parameter.cwbh"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-input
                placeholder="请输入停车场编号"
                v-model="listQuery.parameter.ccbh"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-select v-model="listQuery.parameter.sjly" placeholder="请选择数据来源">
                <el-option
                  v-for="item in OptionsSJLY"
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
          prop="id"
          label="记录ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sbsn"
          width="180"
          label="设备标识">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="数据来源">
        </el-table-column>
        <el-table-column
          prop="rgjc"
          label="人工检查">
          <template slot-scope="scope">
            <span>{{scope.row.rgjc|rgjc}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="bjxx"
          label="报警信息">
          <template slot-scope="scope">
            <span>{{scope.row.bjxx|bjxx}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ccbh"
          label="停车场编号">
        </el-table-column>
        <el-table-column
          prop="cwbh"
          label="泊位编号">
        </el-table-column>
        <el-table-column
          prop="hphm"
          label="车牌号">
        </el-table-column>
        <el-table-column
          prop="cpys"
          label="车牌颜色">
          <template slot-scope="scope">
            <span>{{scope.row.cpys|cpys}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sjsj"
          label="事件时间"
          width="200">
          <template slot-scope="scope" v-if="scope.row.sjsj">
            <span>{{scope.row.sjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rwqk"
          label="入位情况">
          <template slot-scope="scope">
            <span>{{scope.row.rwqk|rwqk}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="图片">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row['id'], shid)">查看</el-button>
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
    <ParkingDataDialog v-if="ParkingDataDialogVisible" :visible.sync="ParkingDataDialogVisible" :idVal=id :shid=shid></ParkingDataDialog>
  </div>
</template>

<script>
import { fetchParkingDataList } from '@/api/system/parkingData'
import ParkingDataDialog from "./ParkingDataDialog/ParkingDataDialog";
import  EnumberateSelect  from '@/filters/index'
import { fetchSHIDlist } from '@/api/CommonSelectApi'
export default {
  name: "ParkingData",
  components: {ParkingDataDialog},
  data () {
    return {
      listQuery:{
        parameter:{
          hphm:'',
          cwbh: '',
          ccbh: '',
          sjly: '',
          startTime: '',
          endTime: '',
          shid:''
        },
        current:1,
        size:10
      },
      sj:'',
      OptionsSJLY:EnumberateSelect.dataOrigin,
      Options: [],
      tableData: [],
      total:0,
      myMsg:'',
      ParkingDataDialogVisible:false,
      isZhankaiShow:false,
      isShouqiShow:true,
      shid:''
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
    getList(){
      fetchParkingDataList(this.listQuery).then(response => {
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
    //商户下拉框
    handleSelect(){
      fetchSHIDlist().then(response => {
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
    handleSHIDSelect(){
      this.shid = this.listQuery.parameter.shid;
    },
    iconShouqi(){
      this.isZhankaiShow = true;
      this.isShouqiShow = false
    },
    iconZhankai(){
      this.isZhankaiShow = false;
      this.isShouqiShow = true
    },
    handleFilter(){
      this.listQuery.parameter.hphm = this.listQuery.parameter.hphm.trim();
      this.listQuery.parameter.cwbh = this.listQuery.parameter.cwbh.trim();
      this.listQuery.parameter.ccbh = this.listQuery.parameter.ccbh.trim();
      this.listQuery.parameter.startTime = this.sj[0]/1000;
      this.listQuery.parameter.endTime = this.sj[1]/1000;
      this.listQuery.current = 1;
      this.getList()
    },
    resetFilter(){
      this.sj = '';
      this.listQuery.parameter.hphm = '';
      this.listQuery.parameter.cwbh = '';
      this.listQuery.parameter.ccbh = '';
      this.listQuery.parameter.sjly = '';
      this.listQuery.parameter.startTime = '';
      this.listQuery.parameter.endTime = '';
      this.listQuery.parameter.sj = '';
      this.listQuery.current = 1;
      // this.listQuery.parameter.shid = '';
      this.getList()
    },
    openDialog(idVal,shid){
      this.ParkingDataDialogVisible=true;
      this.id = Number(idVal);
      this.shid = shid;
    }
  }
}
</script>

<style lang="less">

</style>
