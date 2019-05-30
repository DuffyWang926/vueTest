<template>
  <el-dialog title="停车场详情" class="sm-dialog seeRoadInParkingLot" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div style="width:56%; height:650px;">
      <img :src="cctp" width="90%" height="300px">
      <div style="padding-bottom: 100px;">
        <p style="font-size: 16px; font-weight: bold; color:#333333">{{ccmc}}</p>
        <p style="font-size: 16px;"><span><i class="el-icon-location" style="padding-right:10px;"></i>{{ccdz}}</span><span style="margin-left:20px;">{{ccbh}}</span></p>
      </div>
    </div>
    <div class="dialog-right" style="width:34%; position: absolute; right:0; top:90px; padding-right: 36px;">

      <div v-show="isBaseInfoShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" @click="baseInfo">基本信息</el-button>
          <el-button type="primary" plain @click="spaceList">停车位</el-button>
        </div>
        <el-row :gutter="12">
          <el-col :span="8">运营公司</el-col>
          <el-col :span="16">{{yygs}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">入账公司</el-col>
          <el-col :span="16">{{rzgs}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">停车场简称</el-col>
          <el-col :span="16">{{ccjc}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">停车场类型</el-col>
          <el-col :span="16">{{cclx|cclx}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">泊位数量</el-col>
          <el-col :span="16">{{cwsl}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">收费区域</el-col>
          <el-col :span="16">{{cclb|cclb}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">服务范围</el-col>
          <el-col :span="16">{{fufw}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">详细地址</el-col>
          <el-col :span="16">{{ccdz}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">地理信息</el-col>
          <el-col :span="16">X: {{cczbjd}} &nbsp;&nbsp;&nbsp; Y:{{cczbwd}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="8">创建时间</el-col>
          <el-col :span="16">{{cjsj|time}}</el-col>
        </el-row>
      </div>
      <div v-show="isSpaceListShow"  class="cwbh-show">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" plain @click="baseInfo">基本信息</el-button>
          <el-button type="primary" @click="spaceList">停车位</el-button>
        </div>
        <p v-for="item in bwbh" class="cwbh-p">
          <span class="cwbh-style">{{item.cwbh}}</span>
        </p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchRoadInParkingInfo, fetchRoadInParkingBwbh, fetchRoadInParkingInfoByCCBH } from '@/api/Resources/RoadInParkingLot'
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
        isBaseInfoShow:true,
        isSpaceListShow:false,
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
      // if(this.msg.ccid){
      //   //如果是车位列表点击
      //   this.getRoadInParkingInfo(this.msg.ccid, this.yygsid);
      // }else{
        this.getRoadInParkingInfo(this.msg.ccbh);
      // }
    },
    methods:{
      //获取详情
      // getRoadInParkingInfo(id, yygs){
      //   fetchRoadInParkingInfo(id, yygs).then(response => {
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // },

      getRoadInParkingInfo(ccbh){
        fetchRoadInParkingInfoByCCBH(ccbh).then(response => {
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
          this.ccid = response.result.id;
          this.getRoadInParkingBwbh(this.ccid)
        }).catch((err) => {
          console.log(err)
        })
      },

      baseInfo(){
        this.isBaseInfoShow = true;
        this.isSpaceListShow = false
      },
      spaceList(){
        this.isBaseInfoShow = false;
        this.isSpaceListShow = true
      },

      //获取停车场车位编号
      getRoadInParkingBwbh(id){
        fetchRoadInParkingBwbh(id).then(response => {
          this.bwbh = response.result
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
  .seeRoadInParkingLot{
      .el-row{
        padding:12px 0!important;
        margin: 0 !important;
        .el-col{
          padding:0 !important
        }
      }
      .cwbh-p{
        margin: 0;
        border-bottom: 1px solid #dfdfdf;
        width:100%;
        .cwbh-style{
          display: inline-block;
          padding :12px 0;
        }
      }
      .bottom-line{
        border-bottom: 1px solid #dfdfdf;
        width:100%
      }
    .cwbh-show{
      height: 560px;
      overflow-y: scroll;
    }
    .cwbh-show::-webkit-scrollbar{
      display: none;
    }
    .el-button{
      padding: 12px 34px;
    }
  }

</style>
