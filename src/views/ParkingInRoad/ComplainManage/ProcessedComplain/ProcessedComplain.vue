<template>
  <div class="processedComplain-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="请输入订单顺序号"
            v-model="listQuery.parameter.tcddid">
          </el-input>
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
            v-model="listQuery.parameter.yhid"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethodHYZH"
            :loading="loading"
            placeholder="请输入会员账号">
            <el-option
              v-for="item in OptionsHYZH"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="cjsj"
            type="date"
            placeholder="选择投诉日期"
            value-format="timestamp">
          </el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.czyhid" filterable placeholder="请选择处理人姓名">
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
            v-model="czsj"
            type="date"
            placeholder="选择处理日期"
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
          prop="hyzh"
          label="会员账号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openHYDialog(scope.row)">{{scope.row['hyzh']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="tsnr"
          label="问题描述">
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="投诉时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gldd"
          label="关联订单">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDDBHDialog(scope.row)">{{scope.row['gldd']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="czsj"
          label="处理时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.czsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="clfs"
          width="120"
          label="处理方式">
          <template slot-scope="scope">
            <span>{{scope.row.clfs|clfs}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ms"
          label="处理备注">
        </el-table-column>
        <el-table-column
          prop="czyhmc"
          width="120"
          label="处理人">
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
    <DialogueCheckCar :msg='personalMsg' :isPersonal='true' @cancelModal='cancelCheckModal'></DialogueCheckCar>
    <OrderDetailDialog v-if="OrderDetailDialogVisible" :visible.sync="OrderDetailDialogVisible" :msg="myOrderMsg"></OrderDetailDialog>
  </div>
</template>

<script>

  import { fetchProcessedComplainList } from '@/api/ParkingInRoad/ComplainManage/ProcessedComplain'
  import { fetchUserMemberlist, fetchSysUserlist } from '@/api/CommonSelectApi'
  import DialogueCheckCar from "@/components/DetailsDialogue/DialogueCheckCar";
  import OrderDetailDialog from "@/views/ParkingInRoad/TollManage/OrderDetailDialog/OrderDetailDialog";

    export default {
        name: "ProcessedComplain",
      components: { DialogueCheckCar, OrderDetailDialog },
      data(){
          return{
            total:0,
            tableData:[],
            listQuery:{
              parameter:{
                yhid:'',
                cjsj:'',
                czsj:'',
                tcddid:'',
                czyhid:''
              },
              current:1,
              size:10
            },
            cjsj:'',
            czsj:'',
            isZhankaiShow:false,
            isShouqiShow:true,
            OptionsHYZH:[],
            OptionsCLR:[],
            loading:false,
            personalMsg:{
              visible:false,
              title:'会员详情',
              isPersonal:true
            },
            OrderDetailDialogVisible:false,
          }
      },
      created(){
        this.getList();
        this.handleSelectHYZH();
        this.handleSelectCLR()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          fetchProcessedComplainList(this.listQuery).then(response => {
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
        //会员帐号下拉
        handleSelectHYZH(){
          fetchUserMemberlist(this.listQuery.parameter.yhid).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsHYZH.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //处理人下拉
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
        handleFilter(){
          if(this.cjsj !== ''){
            this.listQuery.parameter.cjsj = this.cjsj/1000
          }
          if(this.czsj !== ''){
            this.listQuery.parameter.czsj = this.czsj/1000
          }
          this.listQuery.parameter.tcddid = this.listQuery.parameter.tcddid.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.listQuery.parameter.yhid = '';
          this.listQuery.parameter.cjsj = '';
          this.listQuery.parameter.czsj = '';
          this.listQuery.parameter.tcddid = '';
          this.listQuery.parameter.czyhid = '';
          this.cjsj = '';
          this.czsj = '';
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.reset();
          this.OptionsHYZH = [];
          this.handleSelectHYZH(this.listQuery.parameter.yhid);

        },
        iconShouqi(){
          this.isZhankaiShow = true;
          this.isShouqiShow = false
        },
        iconZhankai(){
          this.isZhankaiShow = false;
          this.isShouqiShow = true
        },
        openHYDialog (data) {
          this.personalMsg.visible =  true;
          let id = data.yhid;
          this.$store.dispatch('detailsDataAll/changeDetailId',{id})
          //弹窗数据
        },
        openDDBHDialog(row){
          this.OrderDetailDialogVisible = true;
          this.myOrderMsg = row;
        },
        cancelCheckModal(){
          this.personalMsg.visible = false;
        },
        //会员帐号模糊查询
        remoteMethodHYZH(query) {
          this.listQuery.parameter.yhid = query;
          if (query !== '') {
            this.handleSelectHYZH(this.listQuery.parameter.yhid);
            this.OptionsHYZH = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.OptionsHYZH = this.OptionsHYZH.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.OptionsHYZH = [];
          }
        },
      }

    }
</script>

<style scoped>

</style>
