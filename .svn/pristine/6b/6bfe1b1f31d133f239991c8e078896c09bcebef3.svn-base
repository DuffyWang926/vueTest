<template>
  <div class="carauthentication-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="shzt" placeholder="请选择车辆认证状态">
            <el-option
              v-for="item in OptionsRZZTZT"
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
        <el-col :span="5" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
      <div v-show="isZhankaiShow">
      <el-row>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.cpys" placeholder="请选择车牌颜色">
            <el-option
              v-for="item in OptionsCPYS"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.hphm"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethod"
            :loading="loading"
            placeholder="请输入车牌号码">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
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
          prop="hphm"
          label="车牌号码">
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
          prop="clzl"
          label="车辆类型">
          <template slot-scope="scope">
            <span>{{scope.row.clzl|clzl}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dlmc"
          label="申请会员账号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openHYDialog(scope.row)">{{scope.row['dlmc']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="rzzt"
          label="认证状态">
          <template slot-scope="scope">
            <span>{{scope.row.rzzt|rzzt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="申请时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shsj"
          label="处理时间">
          <template slot-scope="scope" v-if="scope.row.shsj">
            <span>{{scope.row.shsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row['id'])">查看</el-button>
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
    <SeeAuthenticationHistoryDialog v-if="SeeAuthenticationHistoryDialogVisible" :visible.sync="SeeAuthenticationHistoryDialogVisible" :idVal=id></SeeAuthenticationHistoryDialog>
    <DialogueCheckCar :msg='personalMsg' :isPersonal='true' @cancelModal='cancelCheckModal'></DialogueCheckCar>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
  </div>
</template>

<script>
  import {fetchAuthenticationHistoryList} from '@/api/CarManage/AuthenticationHistory'
    import SeeAuthenticationHistoryDialog from "./AuthenticationHistoryDialog/SeeAuthenticationHistoryDialog";
  import DialogueCheckCar from "../../../components/DetailsDialogue/DialogueCheckCar";
  import  EnumberateSelect  from '@/filters/index'
  import { fetchHPHMlist } from '@/api/CommonSelectApi'
  import SeeCarInfoDialog from "../CarInfo/CarInfoDialog/SeeCarInfoDialog";
    export default {
        name: "AuthenticationHistory",
      components: {SeeCarInfoDialog, DialogueCheckCar, SeeAuthenticationHistoryDialog},
      data(){
        return{
          SeeAuthenticationHistoryDialogVisible:false,
          SeeCarInfoDialogVisible:false,
          OptionsRZZTZT:EnumberateSelect.RZZTZT,
          OptionsCPYS:EnumberateSelect.CPYS,
          sj:'',
          shzt:'',
          listQuery:{
            parameter:{
              shzt:'',
              cpys:'',
              hphm:'',
              kssj:'',
              jssj:''
            },
            current:1,
            size:10
          },
          total:0,
          tableData:[],
          Options:[],
          loading: false,
          personalMsg:{
            visible:false,
            title:'会员详情',
            isPersonal:true
          },
          isZhankaiShow:false,
          isShouqiShow:true,
        }
      },
      created(){
          this.getList();
        this.handleSelect()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList(){
          fetchAuthenticationHistoryList(this.listQuery).then(response => {
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
        //号牌号码下拉框
        handleSelect(){
          fetchHPHMlist(this.listQuery.parameter.hphm).then(response => {
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
        iconShouqi(){
          this.isZhankaiShow = true;
          this.isShouqiShow = false
        },
        iconZhankai(){
          this.isZhankaiShow = false;
          this.isShouqiShow = true
        },
        handleFilter(){
          this.listQuery.parameter.kssj = this.sj[0]/1000;
          this.listQuery.parameter.jssj = this.sj[1]/1000;
          if(this.shzt !== ''){
            this.listQuery.parameter.shzt =  this.shzt-2;
          }else{
            this.listQuery.parameter.shzt = ''
          }
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.sj = '';
          this.listQuery.parameter.shzt = '';
          this.shzt = '';
          this.listQuery.parameter.cpys = '';
          this.listQuery.parameter.hphm = '';
          this.listQuery.parameter.kssj = '';
          this.listQuery.parameter.jssj = '';
          this.sj = '';
          this.listQuery.current = 1;
          this.getList()
        },
        resetFilter(){
          this.reset();
          this.Options = [];
          this.handleSelect(this.listQuery.parameter.hphm);
        },
        openDialog(idVal){
          this.SeeAuthenticationHistoryDialogVisible = true;
          this.id = Number(idVal);
        },
        openHYDialog (data) {
          this.personalMsg.visible =  true;
          let id = data.yhid;
          this.$store.dispatch('detailsDataAll/changeDetailId',{id})
          //弹窗数据
        },
        openHPHMDialog (row) {
          this.SeeCarInfoDialogVisible = true;
          this.msgSee = row;
        },
        cancelCheckModal(){
          this.personalMsg.visible = false;
        },
        //号牌号码模糊查询
        remoteMethod(query) {
          this.listQuery.parameter.hphm = query;
          if (query !== '') {
            this.handleSelect(this.listQuery.parameter.hphm);
            this.Options = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.Options = this.Options.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.Options = [];
          }
        }
      }
    }
</script>

<style scoped>

</style>
