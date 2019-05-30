<template>
  <el-dialog title="停车场详情" class="lg-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div style="width:52%; height:650px;">
      <img :src="cctp" width="90%" height="400px">
      <div style="padding-bottom: 100px;">
        <p style="font-size: 18px;">{{ccmc}}</p>
        <p style="font-size: 16px;"><span>{{ccdz}}</span><span style="margin-left:20px;">{{ccbh}}</span></p>
      </div>
    </div>
    <div class="dialog-right" style="width:48%; position: absolute; right:0; top:70px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-row :gutter="12">
            <el-col :span="6">运营公司</el-col>
            <el-col :span="12">{{yygs}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">入账公司</el-col>
            <el-col :span="12">{{rzgs}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">停车场简称</el-col>
            <el-col :span="12">{{ccjc}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">停车场类型</el-col>
            <el-col :span="12">{{cclx|cclx}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">泊位数量</el-col>
            <el-col :span="12">{{cwsl}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">收费区域</el-col>
            <el-col :span="12">{{cclb|cclb}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">服务范围</el-col>
            <el-col :span="12">{{fufw}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">详细地址</el-col>
            <el-col :span="12">{{ccdz}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">地理信息</el-col>
            <el-col :span="12">X: {{cczbjd}} &nbsp;&nbsp;&nbsp; Y:{{cczbwd}}</el-col>
          </el-row>
          <div class="bottom-line"></div>
          <el-row :gutter="12">
            <el-col :span="6">创建时间</el-col>
            <el-col :span="12">{{cjsj|time}}</el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="停车位" name="second">
          <span v-for="(item,i) in bwbh" :key='i'>
            <span class="cwbh-style">{{item.cwbh}}</span>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer-btn">
      <el-button class="btn-second" @click="cancelModal">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchRoadInParkingInfo, fetchRoadInParkingBwbh } from '@/api/Resources/RoadInParkingLot'
  import { getParkingGarageCcbh } from '@/api/DetailsDataAll/parkingDetails'
  import getEnumberate from '@/utils/getDictsEnumberate'
  export default {
    name: "SeeRoadInParkingLot",
     props:{
       visible: {
         type: Boolean,
       default: false
       },
       msg: {
         type: Object,
         default:function(){
             return {};
         }
       }
     },
    data(){
      return{
        appendToBody:true,
        showheader:false,
        activeName: 'first',
        cclx:'',
        yygs:'',
        ccdz:'',
        fufw:'',
        ccjc:'',
        cczbjd:'',
        cczbwd:'',
        cjsj:'',
        cwsl:'',
        rzgs:'',
        cclb:'',
        id:'',
        cwbh:'',
        cctp:'',
        ccmc:'',
        ccbh:'',
        bwbh:[]
      }
    },
    created(){
      
      let ccbh = this.msg.ccbh || '-1'
      this.getRoadInParkingInfo(ccbh)
    },
    methods:{
      //获取详情
      getRoadInParkingInfo(ccbh){
        getParkingGarageCcbh(ccbh).then(response => {
          this.cclx = response.result.cclx;
          this.yygs = response.result.yygs;
          this.ccdz = response.result.ccdz;
          this.fufw = getEnumberate(response.result.fufw);
          this.sfbz = response.result.sfbz;
          this.ccjc = response.result.ccjc;
          this.rzgs = response.result.rzgs;
          this.cczbjd = response.result.cczbjd;
          this.cczbwd = response.result.cczbwd;
          this.cjsj = response.result.cjsj;
          this.cwsl = response.result.cwsl;
          this.cclb = response.result.cclb;
          this.cctp = response.result.cctp;
          this.ccmc = response.result.ccmc;
          this.ccbh = response.result.ccbh;
          let id = response.result.id
          if(id){
            this.getRoadInParkingBwbh(id)
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      //获取停车场车位编号
      getRoadInParkingBwbh(id){
        fetchRoadInParkingBwbh(id).then(response => {
          this.bwbh = response.result.records
        }).catch((err) => {
          console.log(err)
        })
      },

      cancelModal(){
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less">

  .el-tab-pane{
    .el-row{padding:0}
    .cwbh-style{
      display: inline-block;
      padding:10px 20px;
      background-color: #65a8da;
      margin-right: 15px;
      margin-top:10px;
      color:#fff;
    }
    .bottom-line{
      border-bottom: 1px solid #dedede;
      margin-bottom:15px;
      width:95%
    }
  }
</style>
