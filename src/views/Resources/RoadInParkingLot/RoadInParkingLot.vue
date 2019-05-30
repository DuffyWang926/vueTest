<template>
  <div class="RoadInParkingLot-page">
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
              v-model="listQuery.parameter.ccmc"
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
            :remote-method="remoteMethodCCBH"
            :loading="loading"
            placeholder="请输入停车场编号">
            <el-option
              v-for="item in OptionsCCBH"
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
          prop="yygs"
          label="运营公司">
        </el-table-column>
        <el-table-column
          prop="ccbh"
          label="停车场编号">
        </el-table-column>
        <el-table-column
          prop="ccmc"
          label="停车场名称">
        </el-table-column>
        <el-table-column
          prop="ccdz"
          label="详细地址"
          width="400">
        </el-table-column>
        <el-table-column
          prop="cwsl"
          label="总泊位数">
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
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="SeeDialog(scope.row)">查看</el-button>
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
    <CommonRoadInParkingLotDialog  v-if="RoadInParkingLotDialogVisible" :visible.sync="RoadInParkingLotDialogVisible" :msg="msgData"></CommonRoadInParkingLotDialog>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
  </div>
</template>

<script>
import { fetchRoadInParkingList, RemoveData } from '@/api/Resources/RoadInParkingLot'
import { fetchSSGSList, fetchParkingGarageNamelist, fetchParkingGarageBhlist } from '@/api/CommonSelectApi'
import CommonRoadInParkingLotDialog from "./RoadInParkingLotDialog/CommonRoadInParkingLotDialog";
import SeeRoadInParkingLot from "./RoadInParkingLotDialog/SeeRoadInParkingLot";
export default {
  name: "RoadInParkingLot",
  components: {SeeRoadInParkingLot, CommonRoadInParkingLotDialog},
  data () {
      return {
        listQuery:{
          parameter:{
            yygsid:'',
            ccmc: '',
            ccbh: '',
            rzgsid:''
          },
          current:1,
          size:10
        },
        Options:[],
        OptionsCCMC:[],
        OptionsCCBH:[],
        total: 0,
        loading: false,
        RoadInParkingLotDialogVisible:false,
        SeeRoadInParkingLotVisible:false,
        showOverflowTooltip:true,
        msgData:{
          type:0,
          Data:{}
        },
        myMsg:{},
        tableData: [],
      }
  },
  created() {
    this.getList();
    this.handleSelectSSGS();
    this.handleSelectCCMC();
    this.handleSelectCCBH();
  },
  activated(){
    this.reset()
  },
  methods: {
    getList(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.listQuery.parameter.rzgsid = sysUser.gsid;
      fetchRoadInParkingList(this.listQuery).then(response => {
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
      fetchParkingGarageNamelist(sysUser.gsid, this.listQuery.parameter.ccmc).then(response => {
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
    //停车场编号
    handleSelectCCBH(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"))
      fetchParkingGarageBhlist(sysUser.gsid, this.listQuery.parameter.ccbh).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsCCBH.push({
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
      this.listQuery.parameter.ccmc = '';
      this.listQuery.parameter.ccbh = '';
      this.listQuery.current = 1;
      this.getList()
    },

    resetFilter(){
      this.reset();
      this.OptionsCCMC = [];
      let sysUser = JSON.parse(localStorage.getItem("sysUser"))
      this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccmc);
      this.OptionsCCBH = [];
      this.handleSelectCCBH(sysUser.gsid, this.listQuery.parameter.ccbh);
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    openDialog (type,data) {
      this.RoadInParkingLotDialogVisible = true;
      this.msgData.type = type;
      this.msgData.Data = data;
    },

    //打开查看路内停车场详情弹框
    SeeDialog(row){
      this.myMsg = row;
      this.SeeRoadInParkingLotVisible = true
    },

    remoteMethodCCMC(query) {
      // console.log(query)
      this.listQuery.parameter.ccmc = query
      let sysUser = JSON.parse(localStorage.getItem("sysUser"))
      if (query !== '') {
        this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccmc)
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
    remoteMethodCCBH(query) {
      // console.log(query)
      this.listQuery.parameter.ccbh = query
      let sysUser = JSON.parse(localStorage.getItem("sysUser"))
      if (query !== '') {
        this.handleSelectCCBH(sysUser.gsid, this.listQuery.parameter.ccbh)
        this.OptionsCCBH = [];
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.OptionsCCBH = this.OptionsCCBH.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.OptionsCCBH = [];
      }
    }

  }

}
</script>

<style lang="less">

</style>
