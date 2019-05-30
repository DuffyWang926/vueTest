<template>
  <div class="HandheldTerminal-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.pdalx" placeholder="请选择设备类型">
            <el-option
              v-for="item in OptionsPDALX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入设备编号"
            v-model="listQuery.parameter.pdabh">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="请输入设备名称"
            v-model="listQuery.parameter.pdamc">
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
          prop="gsmc"
          label="所属公司">
        </el-table-column>
        <el-table-column
          prop="pdabh"
          label="设备编号">
        </el-table-column>
        <el-table-column
          prop="pdamc"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="pdalx"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="pdaxh"
          label="品牌型号">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="启用状态">
          <template slot-scope="scope">
            <span >{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(2,scope.row)">查看</el-button>
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
     <CommonHandheldTerminalDialog  v-if="HandheldTerminalDialogVisible" :visible.sync="HandheldTerminalDialogVisible" :msg="msgData"></CommonHandheldTerminalDialog>
  </div>
</template>

<script>
import { fetchHandheldTerminalList, RemoveData } from '@/api/Resources/HandheldTerminal'
import CommonHandheldTerminalDialog from "./HandheldTerminalDialog/CommonHandheldTerminalDialog";
import  EnumberateSelect  from '@/filters/index'
import { fetchDictlist } from '@/api/CommonSelectApi'
import getEnumberate from '@/utils/getDictsEnumberate'
export default {
  name: "HandheldTerminal",
  components: {CommonHandheldTerminalDialog},
  data () {
      return {
        msgData:{
          type:0,
          Data:{}
        },
        listQuery:{
          parameter:{
            pdalx:'',
            pdabh: '',
            pdamc: '',
            gsid:''
          },
          current:1,
          size:10
        },
        total: 0,
        HandheldTerminalDialogVisible:false,
        tableData: [],
        OptionsPDALX:[],
        OptionsSBXH:EnumberateSelect.SBXH,
      }
  },
  created() {
    this.getList();
    this.handleSelectDict()
  },
  activated(){
    this.resetFilter()
  },
  methods: {
    getList(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.listQuery.parameter.gsid = sysUser.gsid;
      fetchHandheldTerminalList(this.listQuery).then(response => {
        this.tableData = response.result.records;
        for (let i = 0; i<response.result.records.length; i++){
          this.tableData[i].pdalx = getEnumberate(response.result.records[i].pdalx)
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
          this.OptionsPDALX.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleFilter(){
      this.listQuery.parameter.pdamc = this.listQuery.parameter.pdamc.trim();
      this.listQuery.parameter.pdabh = this.listQuery.parameter.pdabh.trim();
      this.listQuery.current = 1;
      this.getList();
    },
    resetFilter(){
      this.listQuery.parameter.pdalx = '';
      this.listQuery.parameter.pdabh =  '';
      this.listQuery.parameter.pdamc =  '';
      this.listQuery.current = 1;
      this.getList()
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    openDialog (type,data) {
      this.HandheldTerminalDialogVisible = true;
      this.msgData.type = type;
      this.msgData.Data = data;
    },
  }
}
</script>

<style lang="less">

</style>
