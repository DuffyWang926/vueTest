<template>
  <div class="ParkingEquipment-page">
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
          <el-select v-model="listQuery.parameter.sbxh" placeholder="请选择设备型号">
            <el-option
              v-for="item in OptionsSBXH"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入设备编号"
            v-model="listQuery.parameter.sbbh">
          </el-input>
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
          prop="sbsn"
          label="S/N编码">
        </el-table-column>
        <el-table-column
          prop="sbbh"
          label="设备编号">
        </el-table-column>
        <el-table-column
          prop="sbmc"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="sblxid"
          label="设备类型">
          <!--<template slot-scope="scope">-->
            <!--<span >{{scope.row.sblxid|sblx}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          prop="sbxh"
          label="设备型号">
        </el-table-column>
        <el-table-column
          prop="sbxtsj"
          label="心跳时间">
        </el-table-column>
        <el-table-column
          prop="bdcw"
          label="绑定车位">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="设备状态">
          <template slot-scope="scope">
            <span >{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDetailDialog(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openDialog(1,scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="openBindDialog(scope.row)">车位绑定</el-button>
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
     <CommonParkingEquipmentDialog  v-if="CommonParkingEquipmentDialogVisible" :visible.sync="CommonParkingEquipmentDialogVisible" :msg="msgData"></CommonParkingEquipmentDialog>
    <BindCWParkingEquipmentDialog v-if="BindCWParkingEquipmentDialogVisible" :visible.sync="BindCWParkingEquipmentDialogVisible" :msg="msgBind"></BindCWParkingEquipmentDialog>
    <SeeParkingEquipmentDialog v-if="SeeParkingEquipmentDialogVisible" :visible.sync="SeeParkingEquipmentDialogVisible" :msg="msgSee"></SeeParkingEquipmentDialog>
  </div>
</template>

<script>
import { fetchParkingEquipmentList, RemoveData } from '@/api/Resources/ParkingEquipment'
import CommonParkingEquipmentDialog from "./ParkingEquipmentDialog/CommonParkingEquipmentDialog";
import BindCWParkingEquipmentDialog from "./ParkingEquipmentDialog/BindCWParkingEquipmentDialog";
import SeeParkingEquipmentDialog from "./ParkingEquipmentDialog/SeeParkingEquipmentDialog";
import  EnumberateSelect from '@/filters/index'
import SecondToDate from '@/utils/timeChange'
import getEnumberate from '@/utils/getDictsEnumberate'
import { fetchDictlist } from '@/api/CommonSelectApi'
export default {
  name: "ParkingEquipment",
  components: {SeeParkingEquipmentDialog, BindCWParkingEquipmentDialog, CommonParkingEquipmentDialog},
  data () {
    return {
      msgData:{
        type:0,
        Data:{}
      },
      msgBind:{},
      listQuery:{
        parameter:{
          sblxid:'',
          sbxh: '',
          sbbh: '',
          gsid:''
        },
        current:1,
        size:10
      },
      total: 0,
      CommonParkingEquipmentDialogVisible:false,
      BindCWParkingEquipmentDialogVisible:false,
      SeeParkingEquipmentDialogVisible:false,
      tableData: [],
      OptionsSBLX:[],
      OptionsSBXH:EnumberateSelect.SBXH,
    }
  },
  created() {
    this.getList();
    this.handleSelectDict();
  },
  activated(){
    this.resetFilter()
  },
  methods: {
    getList(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.listQuery.parameter.gsid = sysUser.gsid;
      fetchParkingEquipmentList(this.listQuery).then(response => {
        this.tableData = response.result.records;
        for (let i = 0; i<response.result.records.length; i++){
          this.tableData[i].sblxid = getEnumberate(response.result.records[i].sblxid)
        }
        for (let i = 0; i<response.result.records.length; i++){
          this.tableData[i].sbxtsj = SecondToDate(response.result.records[i].sbxtsj)
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
          } else {
            this.$message.error('删除失败');
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
    handleFilter(){
      this.listQuery.parameter.sbbh = this.listQuery.parameter.sbbh.trim();
      this.listQuery.current = 1;
      this.getList()
    },
    resetFilter(){
      this.listQuery.parameter.sblxid = '';
      this.listQuery.parameter.sbxh = '';
      this.listQuery.parameter.sbbh = '';
      this.listQuery.current = 1;
      this.getList()
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    openDialog (type,data) {
      this.CommonParkingEquipmentDialogVisible = true;
      this.msgData.type = type;
      this.msgData.Data = data
    },
    openBindDialog (data) {
      this.BindCWParkingEquipmentDialogVisible = true;
      this.msgBind = data
    },
    openDetailDialog (data) {
      this.SeeParkingEquipmentDialogVisible = true;
      this.msgSee = data
    }
  }
}
</script>

<style lang="less">

</style>
