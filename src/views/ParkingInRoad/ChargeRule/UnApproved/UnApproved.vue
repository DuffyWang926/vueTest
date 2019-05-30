<template>
  <div class="unapproved-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
              placeholder="请输入收费规则名称"
              v-model="listQuery.parameter.djmc">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.sflx" placeholder="请选择规则类型">
            <el-option
              v-for="item in OptionsSFLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.gzrlx" placeholder="请选择规则日期类型">
            <el-option
                v-for="item in OptionsGZRLX"
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
          style="width: 100%">
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="id"
          label="规则编号">
        </el-table-column>
        <el-table-column
          prop="djmc"
          label="收费规则名称">
        </el-table-column>
        <el-table-column
          prop="sflx"
          label="规则类型">
          <template slot-scope="scope">
            <span >{{scope.row.sflx|sflx}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gzrlx"
          label="日期类型">
          <template slot-scope="scope">
            <span >{{scope.row.gzrlx|gzrlx}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shzt"
          label="审核状态">
          <template slot-scope="scope">
            <span >{{scope.row.shzt|shzt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span >{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openPassDialog(scope.row)">通过审核</el-button>
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
      <PassUnApprovedDialog v-if="PassUnApprovedDialogVisible" :visible.sync="PassUnApprovedDialogVisible" :msg="msgPass"></PassUnApprovedDialog>
    <SeeChargeRuleDialog v-if="SeeChargeRuleDialogVisible" :visible.sync="SeeChargeRuleDialogVisible" :msg="msgData"></SeeChargeRuleDialog>
  </div>
</template>

<script>
    import PassUnApprovedDialog from "./UnApprovedDialog/PassUnApprovedDialog";
    import { fetchApprovedList } from '@/api/ParkingInRoad/ChargeRule/Approved'
    import SeeChargeRuleDialog from "../SeeChargeRuleDialog/SeeChargeRuleDialog";
    import  EnumberateSelect  from '@/filters/index'
    export default {
      name: "UnApproved",
      components: {SeeChargeRuleDialog, PassUnApprovedDialog},
      data(){
        return{
          SeeChargeRuleDialogVisible:false,
          PassUnApprovedDialogVisible:false,
          tableData:[],
          options:[],
          listQuery:{
            parameter:{
              djmc:'',
              sflx:'',
              gzrlx:'',
              shzt:0
            },
            current:1,
            size:10
          },
          OptionsGZRLX:EnumberateSelect.GZRLX,
          OptionsSFLX:EnumberateSelect.SFLX,
          total:0,
          msgData:{
            Data:{}
          },
          msgPass:{
            Data:{}
          }
        }
      },
      created(){
        this.getList()
      },
      activated(){
        this.resetFilter()
      },
      methods:{
        getList(){
          fetchApprovedList(this.listQuery).then(response => {
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
        //查询
        handleFilter(){
          this.listQuery.parameter.djmc = this.listQuery.parameter.djmc.trim()
          this.listQuery.current = 1;
          this.getList()
        },
        //重置
        resetFilter(){
          this.listQuery.parameter.djmc = "";
          this.listQuery.parameter.sflx = "";
          this.listQuery.parameter.gzrlx = "";
          this.listQuery.current = 1;
          this.getList()
        },
        openDialog(data){
          this.SeeChargeRuleDialogVisible = true;
          this.msgData.Data = data;
        },
        openPassDialog(data){
          this.PassUnApprovedDialogVisible = true;
          this.msgPass.Data = data;
        }
      }
    }
</script>

<style scoped>

</style>
