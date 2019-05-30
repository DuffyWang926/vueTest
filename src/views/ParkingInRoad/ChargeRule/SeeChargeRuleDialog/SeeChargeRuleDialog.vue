<template>
  <el-dialog title="收费规则详情" class="lg-dialog seeChargeRule" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div  style="width:48%;">
      <el-row :gutter="12">
        <el-col :span="6">
          <!--<span class="detail-header" style="font-size: 16px; font-weight: 600">{{gzrlx|gzrlx}}收费</span>-->
          <span style="font-size: 16px; font-weight: bold; color:#333">{{gzrlx|gzrlx}}收费</span>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">规则类型</el-col>
        <el-col :span="12">{{sflx|sflx}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">规则编号</el-col>
        <el-col :span="12">{{id}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">日期类型</el-col>
        <el-col :span="12">{{gzrlx|gzrlx}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="6">规则描述</el-col>
        <el-col :span="12">{{ms}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">免费时长</el-col>
        <el-col :span="12">{{mfsc}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">最高价格</el-col>
        <el-col :span="12">{{zgjg/100}}</el-col>
      </el-row>
      <div style="border-bottom: 1px solid #dfdfdf; width:80%"></div>
      <el-row :gutter="12">
        <el-col :span="6">残疾车收费</el-col>
        <el-col :span="12" v-show="!isSFMF" >免停时长{{cjcmfsc}}分钟,折扣收费{{cjczkl}}%</el-col>
        <el-col :span="12" v-show="isSFMF">免费</el-col>
      </el-row>
      <div v-show="isTimeShow">
        <el-row :gutter="12">
          <el-col :span="6">
            <span style="font-size: 16px; font-weight: bold; color:#333"> 收费时段</span>
          </el-col>
        </el-row>

        <el-table
          :data="tableData"
          border
          height="270"
          style="width: 100%">
          <el-table-column
            prop="sfsd"
            width="150"
            label="收费时段">
          </el-table-column>
          <el-table-column
            prop="mfsc"
            width="80"
            label="免费时长">
          </el-table-column>
          <el-table-column
            prop="zgjg"
            width="80"
            label="最高价格">
            <template slot-scope="scope">
              <span>{{scope.row.zgjg/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="jfjt"
            label="计费阶梯">
            <template slot-scope="scope">
              <div v-html="scope.row.jfjt"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-right input-style" style="width:48%; position: absolute; right:0; top:90px;">
      <el-row :gutter="2">
        <el-col :span="6"><span style="font-size: 16px; font-weight: bold; color:#333">关联停车场 </span></el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="8">
          <el-select
            v-model="listQuery.parameter.ccmc"
            filterable
            remote
            :remote-method="remoteMethodCCMC"
            :loading="loading"
            placeholder="请选择停车场">
            <el-option
              v-for="item in OptionsCCMC"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="listQuery.parameter.gsid" filterable placeholder="请选择运营公司">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" style="text-align: right; padding-right: 36px;">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>

      </el-row>

      <el-table
        :data="tableDataTime"
        border
        style="width: 95%">
        <el-table-column
          prop="number"
          label="#"
          type="index"
          width="50">
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
      </el-table>
      <el-pagination
        background
        style="margin-top: 15px; padding-right:30px"
        layout="total, prev, pager, next"
        :total="total"
        :current-page="listQuery.current"
        :page-size="listQuery.size"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchSSGSList, fetchParkingGarageNamelist} from '@/api/CommonSelectApi'
  import { fetchApprovedInfo, fetchApprovedTimeList, getParkingGarageBySfbzid } from '@/api/ParkingInRoad/ChargeRule/Approved'
  export default {
    name: "SeeChargeRuleDialog",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      msg: {
        type: Object,
        default: -1
      }
    },
    data(){
      return{
        appendToBody:true,
        ccmc:'',
        gsid:'',
        Options:[],
        OptionsCCMC:[],
        tableData:[],
        tableDataTime:[],
        sflx:'',
        gzrlx:'',
        ms:'',
        mfsc:'',
        zgjg:'',
        cjcmfsc:'',
        cjczkl:'',
        id:'',
        total:0,
        loading: false,
        isTimeShow:false,
        isSFMF:false,
        listQuery:{
          parameter:{
            sfbzid:'',
            ccmc:'',
            gsid:''
          },
          current:1,
          size:10
        }
      }
    },
    created(){
      this.getInfo(this.msg.Data.id);
      if(this.msg.Data.sflx === 3){
        this.isTimeShow = true;
        this.getTimeInfo(this.msg.Data.id)
      }
      this.getParkingList();
      this.handleSelectSSGS();
      this.handleSelectCCMC()
    },
    methods:{
      //收费 详情
      getInfo(id){
        fetchApprovedInfo(id).then(response => {
          this.sflx = response.result.sflx;
          this.djmc = response.result.djmc;
          this.gzrlx = response.result.gzrlx;
          this.clzl = response.result.clzl;
          this.ms = response.result.ms;
          this.mfsc = response.result.mfsc;
          this.zgjg = response.result.zgjg;
          this.ms = response.result.ms;
          this.cjcmfsc = response.result.cjcmfsc;
          this.cjczkl = response.result.cjczkl;
          this.id = response.result.id;
          if(response.result.cjcmfsc === 0 && response.result.cjczkl === 0){
            this.isSFMF = true
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //收费时段 详情
      getTimeInfo(id){
        fetchApprovedTimeList(id).then(response => {
          this.tableData = response.result;
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
      getParkingList(){
        this.listQuery.parameter.sfbzid = this.msg.Data.id;
        getParkingGarageBySfbzid(this.listQuery).then(response => {
          this.tableDataTime = response.result.records;
          this.total = response.result.total
          if(response.result.records.length === 0 && response.result.current >= 2){
            this.listQuery.current = response.result.current-1;
            this.getList()
          }else if(response.result.records.length === 0 && response.result.current < 2) {
            this.listQuery.current = 1;
          }
        })
      },
      currentChange(val){
        this.listQuery.current = val;
        this.getList();
      },
      //查询
      handleFilter(){
        this.getParkingList()
      },
      resetFilter(){
        this.listQuery.parameter.gsid = "";
        this.listQuery.parameter.ccmc = "";
        this.OptionsCCMC = [];
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccmc);
        this.getParkingList()
      },
      cancelModal() {
        this.$emit("update:visible", false);
      },
      remoteMethodCCMC(query) {
        this.listQuery.parameter.ccmc = query;
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        if (query !== '') {
          this.handleSelectCCMC(sysUser.gsid, this.listQuery.parameter.ccmc);
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
    }
  }
</script>

<style lang="less" >
  .seeChargeRule{
    .el-row{
      padding:12px 0!important;
      margin: 0 !important;
    }
    .input-style{
      .el-row{
        padding-left: 0;
        .el-input--suffix{
          .el-input__inner{
            width:150px;
          }
        }
      }
    }
  }

</style>
