<template>
  <div class="RoadInParkingSpace-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.yygsid" filterable placeholder="请选择运营公司">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.ccid"
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
        <el-col :span="5" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <div class="table-add-button">
        <el-button type="primary" @click="openDialog(0)">新增</el-button>
        <el-button type="primary" @click="batchDialog">批量新增</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%" fit>
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="gsmc"
          label="运营公司">
        </el-table-column>
        <el-table-column
          prop="ccmc"
          label="停车场名称">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openCCDialog(scope.row)">{{scope.row['ccmc']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="cwbh"
          label="停车位编号">
        </el-table-column>
        <el-table-column
          prop="sjly"
          label="管理模式">
          <template slot-scope="scope">
            <span>{{scope.row.sjly|sjly}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="jylx"
          label="经营类型">
          <template slot-scope="scope">
            <span>{{scope.row.jylx|jylx}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="plfs"
          label="排列方式">
          <template slot-scope="scope">
            <span>{{scope.row.plfs|plfs}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sbmc"
          label="绑定设备">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDetailDialog(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openDialog(1,scope.row)">修改</el-button>
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
    <!--新增/修改-->
    <CommonRoadInParkingSpaceDialog  v-if="RoadInParkingSpaceDialogVisible" :visible.sync="RoadInParkingSpaceDialogVisible" :msg="msgData"></CommonRoadInParkingSpaceDialog>
    <!--批量新增-->
    <BatchAddRoadInParkingSpaceDialog v-if="BatchAddDialogVisible" :visible.sync="BatchAddDialogVisible"></BatchAddRoadInParkingSpaceDialog>
    <!--查看详情-->
    <SeeRoadInParkingSpace v-if="RoadInParkingSpaceDetailVisible" :visible.sync="RoadInParkingSpaceDetailVisible" :msg="detailData"></SeeRoadInParkingSpace>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
  </div>
</template>

<script>
import { fetchRoadInParkingSpaceList, RemoveData } from '@/api/Resources/RoadInParkingSpace'
import CommonRoadInParkingSpaceDialog from "./RoadInParkingSpaceDialog/CommonRoadInParkingSpaceDialog";
import BatchAddRoadInParkingSpaceDialog from "./RoadInParkingSpaceDialog/BatchAddRoadInParkingSpaceDialog"
import SeeRoadInParkingSpace from "./RoadInParkingSpaceDialog/SeeRoadInParkingSpace"
import { fetchSSGSList, fetchParkingGarageNamelist, fetchParkingSpaceBhlist } from '@/api/CommonSelectApi'
import SeeRoadInParkingLot from "../RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot";

export default {
  name: "RoadInParkingSpace",
  components: {
    SeeRoadInParkingLot,
    CommonRoadInParkingSpaceDialog,BatchAddRoadInParkingSpaceDialog, SeeRoadInParkingSpace},
  data () {
      return {
        msgData:{
          type:0,
          Data:{}
        },
        detailData:{},
        listQuery:{
          parameter:{
            yygsid:'',
            ccid: '',
            cwbh: '',
            sbzjid:''
          },
          current:1,
          size:10
        },
        total: 0,
        RoadInParkingSpaceDialogVisible:false,
        BatchAddDialogVisible: false,
        RoadInParkingSpaceDetailVisible:false,
        SeeRoadInParkingLotVisible:false,
        showOverflowTooltip:true,
        tableData: [],
        Options:[],
        OptionsCCMC:[],
        OptionsCWBH:[],
        loading: false,
      }
  },
  created() {
    this.getList();
    this.handleSelectSSGS();
    this.handleSelectCCMC();
    this.handleSelectCWBH();
  },
  activated(){
    this.reset()
  },
  methods: {
    getList(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.listQuery.parameter.sbzjid = sysUser.gsid;
      fetchRoadInParkingSpaceList(this.listQuery).then(response => {
        this.tableData = response.result.records
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
      fetchParkingGarageNamelist(sysUser.gsid, this.listQuery.parameter.ccid).then(response => {
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
    //停车位编号
    handleSelectCWBH(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
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
    //删除停车场
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
            this.getList()
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

    handleFilter(){
      this.listQuery.current = 1;
      this.getList()
    },
    reset(){
      this.listQuery.parameter.yygsid = '';
      this.listQuery.parameter.ccid = '';
      this.listQuery.parameter.cwbh = '';
      this.listQuery.current = 1;
      this.getList()
    },
    resetFilter(){
      this.reset();
      this.OptionsCCMC = [];
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccid);
      this.OptionsCWBH = [];
      this.handleSelectCWBH(sysUser.gsid, this.listQuery.parameter.cwbh);
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    openCCDialog(row){
      this.SeeRoadInParkingLotVisible = true;
      this.myMsg = row;
    },
    openDialog (type,data) {
      this.RoadInParkingSpaceDialogVisible = true;
      this.msgData.type = type;
      this.msgData.Data = data;
    },
    openDetailDialog(row){
      this.RoadInParkingSpaceDetailVisible = true;
      this.detailData = row
    },
    batchDialog(){
      this.BatchAddDialogVisible = true
    },
    remoteMethodCCMC(query) {
      this.listQuery.parameter.ccid = query;
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      if (query !== '') {
        this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccid);
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
    remoteMethodCWBH(query) {
      this.listQuery.parameter.cwbh = query;
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      if (query !== '') {
        this.handleSelectCWBH(sysUser.gsid, this.listQuery.parameter.cwbh);
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
    }
  },
}
</script>

<style lang="less">

</style>
