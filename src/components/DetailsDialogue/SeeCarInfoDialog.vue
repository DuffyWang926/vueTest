<template>
  <el-dialog title="车辆详情" class="lg-dialog seeCarInfoDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <div style="width:30%; padding-bottom: 30px">
      <el-row :gutter="2" style="background-color:#f1f2f2">
        <el-col :span="11" style="margin-left: 20px">
          <p style="margin-top: 0"><span class="hphm">{{hphm}}</span>
            <span class="white" v-if="this.cpys === 5">{{cpys|cpys}}</span>
            <span class="yellow" v-if="this.cpys === 2">{{cpys|cpys}}</span>
            <span class="green" v-if="this.cpys === 3">{{cpys|cpys}}</span>
            <span class="blue" v-if="this.cpys === 1">{{cpys|cpys}}</span>
            <span class="black" v-if="this.cpys === 4">{{cpys|cpys}}</span>
            <span class="other" v-if="this.cpys === 0">{{cpys|cpys}}</span>
          </p>
          <!--已认证-->
          <span class="rzzt-already" v-if="this.rzzt === 3">{{rzzt|rzzt}}</span>
          <!--未认证-->
          <span class="rzzt-un" v-if="this.rzzt === 1">{{rzzt|rzzt}}</span>
          <!--审核中-->
          <span class="rzzt-in" v-if="this.rzzt === 2">{{rzzt|rzzt}}</span>
          <!--认证失败-->
          <span class="rzzt-fail" v-if="this.rzzt === 4">{{rzzt|rzzt}}</span>
        </el-col>
        <el-col :span="5" style="text-align: center">
          <p style="margin-top: 0"><span class="money">{{qkje}}</span></p>
          <p>欠费</p>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <p style="margin-top: 0"><span class="money">{{qkbs}}</span></p>
          <p>欠费订单数</p>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col :span="10">车主姓名</el-col>
        <el-col :span="14">{{yhmc}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="10">车主手机</el-col>
        <el-col :span="14">{{sjh}}</el-col>
      </el-row>
      <!--已认证显示认证时间-->
      <el-row :gutter="12" v-if="this.msg.rzzt === 3 || this.msg.rzzt === 4">
        <el-col :span="10">认证时间</el-col>
        <el-col :span="14">{{rzsj|time}}</el-col>
      </el-row>
      <!--未认证不显示认证时间-->
      <el-row :gutter="12" v-else>
        <el-col :span="14">认证时间</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="10">业务类型</el-col>
        <el-col :span="14">{{ywlx|ywlx}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="10">车辆来源</el-col>
        <el-col :span="14">{{clly|clly}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <p style="color:#333333; font-weight: bold; margin-bottom: 0">行驶证信息</p>
      <el-row :gutter="12">
        <el-col :span="10">车牌号码</el-col>
        <el-col :span="14">{{hphm}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="10">车辆类型</el-col>
        <el-col :span="14">{{clzl|clzl}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="10">所有人</el-col>
        <el-col :span="14">{{yhmc}}</el-col>
      </el-row>
      <!--<el-row :gutter="12">-->
        <!--<el-col :span="6">住址</el-col>-->
        <!--<el-col :span="12">{{address}}</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="12">
        <el-col :span="10">品牌--型号</el-col>
        <el-col :span="14">{{ccpp}}--{{ccxh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="10">使用性质</el-col>
        <el-col :span="14">{{syxz|syxz}}</el-col>
      </el-row>
      <!--<el-row :gutter="12">-->
        <!--<el-col :span="6">发动机号码</el-col>-->
        <!--<el-col :span="12">{{fdjhm}}</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="12">-->
        <!--<el-col :span="6">车辆识别代码</el-col>-->
        <!--<el-col :span="12">{{clsbdh}}</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="12">
        <el-col :span="10">注册登记日期</el-col>
        <el-col :span="14">{{zcrq}}</el-col>
      </el-row>
      <!--<el-row :gutter="12">-->
        <!--<el-col :span="6">发证日期</el-col>-->
        <!--<el-col :span="12">{{fzrq}}</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="12">
        <el-col :span="10">年检有效期</el-col>
        <el-col :span="14">{{njyxq}}</el-col>
      </el-row>
      <el-row :gutter="12" >
        <el-col :span="10">行驶证照片</el-col>
        <el-col :span="14" v-if="rzzt !== 1">
          <el-button type="text" size="small" @click="openDialog(xsztp)">行驶证图片</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:65%; position: absolute; right:0; top:90px; padding-right: 36px;">

      <div v-show="isFirstShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" @click="first">欠费订单</el-button>
          <el-button type="primary" plain @click="second">停车记录</el-button>
          <el-button type="primary" plain @click="third">被绑历史记录</el-button>
        </div>
        <el-table
          :data="tableDataArrears"
          border
          style="width: 98%">
          <el-table-column
            prop="ddbh"
            width="140"
            label="订单编码">
          </el-table-column>
          <el-table-column
            prop="ccmc"
            label="停车场">
          </el-table-column>
          <el-table-column
            prop="rwsj"
            width="163"
            label="入场时间">
            <template slot-scope="scope">
              <span>{{scope.row.rwsj|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tcsc"
            width="100"
            label="停车时长">
          </el-table-column>
          <el-table-column
            prop="ysje"
            width="80"
            label="停车费用">
            <template slot-scope="scope">
              <span>{{scope.row.ysje/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="qkje"
            width="80"
            label="欠费金额">
            <template slot-scope="scope">
              <span>{{scope.row.ysje/100}}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div v-show="isSecondShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" plain  @click="first">欠费订单</el-button>
          <el-button type="primary" @click="second">停车记录</el-button>
          <el-button type="primary" plain @click="third">被绑历史记录</el-button>
        </div>
        <el-table
          :data="tableDataParkHistory"
          border
          style="width: 98%">
          <el-table-column
            prop="ccmc"
            label="停车场">
          </el-table-column>
          <el-table-column
            prop="cwbh"
            label="泊位编号">
          </el-table-column>
          <el-table-column
            prop="rwsj"
            width="160"
            label="入场时间">
            <template slot-scope="scope">
              <span>{{scope.row.rwsj|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lwsj"
            width="160"
            label="离场时间">
            <template slot-scope="scope">
              <span>{{scope.row.lwsj|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tcsc"
            width="130"
            label="停车时长">
          </el-table-column>
          <el-table-column
            prop="ysje"
            width="80"
            label="停车金额">
            <template slot-scope="scope">
              <span>{{scope.row.ysje/100}}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div v-show="isThirdShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" plain @click="first">欠费订单</el-button>
          <el-button type="primary" plain @click="second">停车记录</el-button>
          <el-button type="primary" @click="third">被绑历史记录</el-button>
        </div>
        <el-table
          :data="tableDataBindHistory"
          border
          style="width: 98%">
          <el-table-column
            prop="dlmc"
            label="绑定会员账号">
          </el-table-column>
          <el-table-column
            prop="yhxm"
            label="绑定会员姓名">
          </el-table-column>
          <el-table-column
            prop="bdrq"
            label="绑定时间">
            <template slot-scope="scope">
              <span>{{scope.row.bdrq|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="jbrq"
            label="解绑时间">
            <template slot-scope="scope">
              <span>{{scope.row.jbrq|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="jllx"
            label="绑定状态">
            <template slot-scope="scope">
              <span>{{scope.row.jllx|jllx}}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  <ImgCarDialog v-if="ImgCarDialogVisible" :visible.sync="ImgCarDialogVisible" :msg="msgImg" ></ImgCarDialog>
  </el-dialog>

</template>

<script>
  import { fetchCarInfoInfo, fetchCarArrearsInfo, fetchCarBindHistoryInfo, fetchCarAuthenticationByHphmAndCpysInfo, CarArrearsInfoInfo, fetchCarInfoInfoID } from '@/api/CarManage/CarInfo'
  import ImgCarDialog from "./ImgCarDialog";
  import SecondToDate from '@/utils/timeChange'
  export default {
    name: "SeeCarInfoDialog",
    components: {ImgCarDialog},
    props:{
      visible: {
        type: Boolean,
        default: false
      },
      msg: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data(){
      return{
        appendToBody:true,
        isFirstShow:true,
        isSecondShow:false,
        isThirdShow:false,
        tableDataArrears:[],
        tableDataParkHistory:[],
        tableDataBindHistory:[],
        yhmc:'',
        sjh:'',
        rzsj:'',
        ywlx:'',
        clly:'',
        hphm:'',
        clzl:'',
        // address:'',
        ccpp:'',
        ccxh:'',
        syxz:'',
        // fdjhm:'',
        // clsbdh:'',
        zcrq:'',
        // fzrq:'',
        njyxq:'',
        xsztp:'',
        rzzt:'',
        cpys:'',
        qkbs:'',
        qkje:'',
        msgImg:{
          Data:{}
        },
        ImgCarDialogVisible:false
      }
    },
    created(){
      if(this.msg.rzzt === 3 || this.msg.rzzt === 4){
            // this.getCarRZInfo(this.msg.id);
        this.getCarInfoInfoInfo(this.msg.hphm,this.msg.cpys);
      }else{
        // this.getCarInfo(this.msg.id)
        this.getCarInfo(this.msg.hphm,this.msg.cpys);
      }
      this.rzzt = this.msg.rzzt;
    },

    methods:{
      //认证过的车辆信息详情(需要查询认证信息)
      getCarInfoInfoInfo(hphm,cpys) {
        fetchCarInfoInfo(hphm,cpys).then(response => {
          this.id = response.result.id;
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.getCarInfoInfo(this.hphm,this.cpys);
          this.getCarArrearsInfo(this.hphm,this.cpys);
          this.getCarArrearsInfoInfo(this.hphm,this.cpys);
          this.getCarBindHistoryInfo(this.id);
          if(response.result.rzsj){
            this.rzsj = response.result.rzsj;
          }
          this.ywlx = response.result.ywlx;
          this.clly = response.result.clly;
          this.sjh = response.result.sjh;
          this.clzl = response.result.clzl;
        }).catch((err) => {
          console.log(err)
        })
      },

      //未认证车辆信息详情
      getCarInfo(hphm,cpys) {
        fetchCarInfoInfo(hphm,cpys).then(response => {
          this.id = response.result.id;
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.getCarArrearsInfo(this.hphm,this.cpys);
          this.getCarArrearsInfoInfo(this.hphm,this.cpys);
          this.getCarBindHistoryInfo(this.id);
          this.rzsj = response.result.rzsj;
          this.rzzt = response.result.rzzt;
          this.ywlx = response.result.ywlx;
          this.clly = response.result.clly;
          this.sjh = response.result.sjh;
          this.clzl = response.result.clzl;
        }).catch((err) => {
          console.log(err)
        })
      },

      //认证信息
      getCarInfoInfo(hphm,cpys) {
        fetchCarAuthenticationByHphmAndCpysInfo(hphm,cpys).then(response => {
          // this.address = response.result.address;
          // this.clsbdh = response.result.clsbdh;
          // this.fdjhm = response.result.fdjhm;
          // this.fzrq = response.result.fzrq;
          this.njyxq = response.result.njyxq;
          this.zcrq = response.result.zcrq;
          this.syxz = response.result.syxz;
          this.yhmc = response.result.yhmc;
          this.ccpp = response.result.ccpp;
          this.ccxh = response.result.ccxh;
          this.xsztp = response.result.xsztp;
        }).catch((err) => {
          console.log(err)
        })
      },

      //欠款信息
      getCarArrearsInfoInfo(hphm,cpys) {
        CarArrearsInfoInfo(hphm,cpys).then(response => {
          this.qkbs = response.result.qkbs;
          this.qkje = response.result.qkje/100
        }).catch((err) => {
          console.log(err)
        })
      },
      //欠费订单
      getCarArrearsInfo(hphm,cpys) {
        fetchCarArrearsInfo(hphm,cpys).then(response => {
          this.tableDataArrears = response.result;
          this.tableDataParkHistory = response.result;
          for (let i = 0; i<response.result.length; i++){
            this.tableDataArrears[i].tcsc = SecondToDate(response.result[i].tcsc)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //被绑历史
      getCarBindHistoryInfo(id) {
        fetchCarBindHistoryInfo(id).then(response => {
          this.tableDataBindHistory = response.result.records;
        }).catch((err) => {
          console.log(err)
        })
      },
      first(){
        this.isFirstShow = true;
        this.isSecondShow = false;
        this.isThirdShow = false
      },
      second(){
        this.isFirstShow = false;
        this.isSecondShow = true;
        this.isThirdShow = false
      },
      third(){
        this.isFirstShow = false;
        this.isSecondShow = false;
        this.isThirdShow = true
      },
      openDialog(xsztp){
        this.ImgCarDialogVisible = true;
        this.msgImg.Data = xsztp
      },
      //  关闭弹框
      cancelModal() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="less">
  .seeCarInfoDialog{
    .el-row{
      padding:12px 0!important;
      margin: 0 !important;
      .el-col{
        padding-left: 0 !important;
      }
      .hphm{
        font-size: 20px;
        font-weight: bold;
        color:#333333
      }
      .rzzt-already{
        padding:4px 7px 5px;
        background-color: #21c576;
        font-size: 12px;
        color:#ffffff;
        border-radius: 3px;
      }
      .rzzt-un{
        padding:4px 7px 5px;
        background-color: #c3c3c3;
        font-size: 12px;
        color:#ffffff;
        border-radius: 3px;
      }
      .rzzt-in{
        padding:4px 7px 5px;
        background-color: #64bbfa;
        font-size: 12px;
        color:#ffffff;
        border-radius: 3px;
      }
      .rzzt-fail{
        padding:4px 7px 5px;
        background-color: #ff6666;
        font-size: 12px;
        color:#ffffff;
        border-radius: 3px;
      }
      .white{
        padding:3px 10px 4px;
        border:1px solid #999999;
        font-size: 12px;
        color:#999999;
        border-radius: 3px;
      }
      .yellow{
        padding:3px 10px 4px;
        border:1px solid #fcbe2d;
        font-size: 12px;
        color:#fcbe2d;
        border-radius: 3px;
      }
      .green{
        padding:3px 10px 4px;
        border:1px solid #0dce8c;
        font-size: 12px;
        color:#0dce8c;
        border-radius: 3px;
      }
      .blue{
        padding:3px 10px 4px;
        border:1px solid #219cf4;
        font-size: 12px;
        color:#219cf4;
        border-radius: 3px;
      }
      .black{
        padding:3px 10px 4px;
        border:1px solid #020202;
        font-size: 12px;
        color:#020202;
        border-radius: 3px;
      }
      .other{
        padding:3px 10px 4px;
        border:1px solid #ff4141;
        font-size: 12px;
        color:#ff4141;
        border-radius: 3px;
      }
      .money{
        font-size: 20px;
        font-weight: bold;
        color:#ff3b3b
      }
    }
    .el-tag{
      margin-left:8px;
      height:24px;
      line-height: 22px;
    }
    .bottom-line{
      border-bottom: 1px solid #dfdfdf;
      width:80%
    }
  }

</style>
