<template>
  <el-dialog title="车辆详情" class="lg-dialog carDetails" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <div  class='leftSide'>

      <el-row :gutter="2" class="leftTop">
        <el-col :span="12">
          <p style="margin-top: 0"><span class="headPlate">{{hphm}}</span><el-tag :style="headColor" class="headColorStyle">{{cpys|cpys}}</el-tag></p>
          <el-tag  :style="headState" v-if="rzzt" class="headStateStyle">{{rzzt|rzzt}}</el-tag>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <p style="margin-top: 0"><span class="ownStyle">{{qkje}}</span></p>
          <p class="headFoot">欠费金额</p>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <p style="margin-top: 0"><span class="ownStyle">{{qkbs}}</span></p>
          <p class="headFoot">欠费订单</p>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col :span="6">车主姓名</el-col>
        <el-col :span="12">{{yhmc}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">车主手机</el-col>
        <el-col :span="12">{{sjh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">认证时间</el-col>
        <el-col :span="12" v-if="rzsj">{{rzsj|time}}</el-col>
      </el-row>
      <div class="midLine">
      </div>
      <el-row :gutter="12">
        <el-col :span="6">业务类型</el-col>
        <el-col :span="12">{{ywlx|ywlx}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">车辆来源</el-col>
        <el-col :span="12">{{clly|clly}}</el-col>
      </el-row>
      <div class="midLine">
      </div>
      <span class="leftFoot" >行驶证信息</span>
      <el-row :gutter="12" class="detailsHeader">
        <el-col :span="6">车牌号码</el-col>
        <el-col :span="12">{{hphm}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">车辆类型</el-col>
        <el-col :span="12">{{clzl|clzl}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">所有人</el-col>
        <el-col :span="12">{{yhmc}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">住址</el-col>
        <el-col :span="12">{{address}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">品牌--型号</el-col>
        <el-col :span="12">{{ccpp}}--{{ccxh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">使用性质</el-col>
        <el-col :span="12">{{syxz|syxz}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">发动机号码</el-col>
        <el-col :span="12">{{fdjhm}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">车辆识别代码</el-col>
        <el-col :span="12">{{clsbdh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">注册登记日期</el-col>
        <el-col :span="12">{{zcrq}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">发证日期</el-col>
        <el-col :span="12">{{fzrq}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">年检有效期</el-col>
        <el-col :span="12">{{njyxq}}</el-col>
      </el-row>
      <el-row :gutter="12" v-if="rzzt !== 1">
        <el-col :span="6">行驶证照片</el-col>
        <el-col :span="12" >
          <span v-if='xsztp' type="text" size="small" class="leftFootUrl" @click="openDialog(xsztp)">行驶证照片文件名称</span>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:65%; position: absolute; right:0; top:90px;">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="欠费订单" name="first">
          <!-- <span slot="label" class="tabHead">我的行程</span> -->
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
        </el-tab-pane>
        <el-tab-pane label="停车记录" name="second"><el-table
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
            width="163"
            label="入场时间">
            <template slot-scope="scope">
              <span>{{scope.row.rwsj|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lwsj"
            width="163"
            label="离场时间">
            <template slot-scope="scope">
              <span>{{scope.row.lwsj|time}}</span>
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
            label="停车金额">
            <template slot-scope="scope">
              <span>{{scope.row.ysje/100}}</span>
            </template>
          </el-table-column>
        </el-table></el-tab-pane>
        <el-tab-pane label="被绑历史" name="third">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  <ImgCarDialog v-if="ImgCarDialogVisible" :visible.sync="ImgCarDialogVisible" :msg="msgImg" ></ImgCarDialog>
  </el-dialog>

</template>

<script>
  import { fetchCarInfoInfo, fetchCarArrearsInfo, fetchCarBindHistoryInfo, fetchCarAuthenticationByHphmAndCpysInfo, CarArrearsInfoInfo } from '@/api/CarManage/CarInfo'
  import { getCarByHphmAndCpys,findOrderHistoryPage } from '@/api/DetailsDataAll/parkingDetails'
  
  import ImgCarDialog from "./ImgCarDialog";

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
        activeName: 'first',
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
        address:'',
        ccpp:'',
        ccxh:'',
        syxz:'',
        fdjhm:'',
        clsbdh:'',
        zcrq:'',
        fzrq:'',
        njyxq:'',
        xszzp:'',
        rzzt:'',
        cpys:'',
        qkbs:'',
        qkje:'',
        msgImg:{
          Data:{}
        },
        ImgCarDialogVisible:false,
        xsztp:'',
        //历史记录参数
        historyQuery:{
              "current": 1,
              "parameter": {
                cpys:'',
                hphm:''
              },
              "size": 10
            },
        headColor:'border:1px solid #219cf4',
        headState:'background:#21c576'
      }
    },
    created(){
      let res ={}
        res.hphm = this.msg.hphm;
        res.cpys = this.msg.cpysNum;
      if(this.msg.rzzt === 3 || this.msg.rzzt === 4){
         
        this.getCarRZInfo(res);
      }else{
        this.getCarInfo(res)
      }
      this.rzzt = this.msg.rzzt;
    },

    methods:{
      getCarRZInfo(res) {
        getCarByHphmAndCpys(res).then(response => {
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.getCarInfoInfo(this.hphm,this.cpys);
          this.getCarArrearsInfo(this.hphm,this.cpys);
          this.getCarArrearsInfoInfo(this.hphm,this.cpys);
          this.getOrderHistoryPage(this.hphm,this.cpys);

          this.rzsj = response.result.rzsj;
          this.ywlx = response.result.ywlx;
          this.clly = response.result.clly;
          this.sjh = response.result.sjh;
          this.clzl = response.result.clzl;

          if(response.result.id){
            this.getCarBindHistoryInfo(response.result.id)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getCarInfo(res) {
        getCarByHphmAndCpys(res).then(response => {
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.getCarArrearsInfo(this.hphm,this.cpys);
          this.getCarArrearsInfoInfo(this.hphm,this.cpys);
          this.getOrderHistoryPage(this.hphm,this.cpys);
          
          this.rzsj = response.result.rzsj;
          this.ywlx = response.result.ywlx;
          this.clly = response.result.clly;
          this.sjh = response.result.sjh;
          this.clzl = response.result.clzl;
          if(response.result.id){
            this.getCarBindHistoryInfo(response.result.id)
          }
          
        }).catch((err) => {
          console.log(err)
        })
      },

      //认证信息
      getCarInfoInfo(hphm,cpys) {
        fetchCarAuthenticationByHphmAndCpysInfo(hphm,cpys).then(response => {
          this.address = response.result.address;
          this.clsbdh = response.result.clsbdh;
          this.fdjhm = response.result.fdjhm;
          this.fzrq = response.result.fzrq;
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
          for (let i = 0; i<response.result.length; i++){
            this.tableDataArrears[i].tcsc = this.SecondToDate(response.result[i].tcsc)
          }
          
        }).catch((err) => {
          console.log(err)
        })
      },
      //停车记录
      getOrderHistoryPage(hphm,cpys) {
        this.historyQuery.parameter.hphm = hphm;
        this.historyQuery.parameter.cpys = cpys;
        findOrderHistoryPage(this.historyQuery).then(response => {
          this.tableDataParkHistoryData = response.result 
          this.tableDataParkHistory = response.result && response.result.records.map((v,i) =>{
            v.tcsc = this.SecondToDate(v.tcsc)
            return v
          })
          
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
      openDialog(xsztp){
        this.ImgCarDialogVisible = true;
        this.msgImg.Data = xsztp
      },
      //  关闭弹框
      cancelModal() {
        this.$emit('update:visible', false)
      },
      SecondToDate(msd) {
        var time =msd
        if (null != time && "" != time) {
          if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
              parseInt(time / 60.0)) * 60) + "秒";
          }
          else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
          } else if (time >= 60 * 60 * 24) {
            time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
              parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
          } else {
            time = parseInt(time) + "秒";
          }
        }
        return time;
      },
    }
  }
</script>

<style lang="less" scoped>
.carDetails{
  font-size: 14px;
  .leftSide{
    width:30%;
    .leftTop{
      background: #f1f2f2;
      padding:20px !important;
      
      .headPlate{
        font-weight: bold;
        font-size: 20px;
        color:#333;
      }
      .headStateStyle{
        color:#fff;
        padding:2px 7px;
        font-size: 12px;
        height:auto !important;

      }
      .headColorStyle{
        font-size:12px;
        padding:2px 10px;
        height:auto !important;
      }
      .ownStyle{
        font-weight: bold;
        font-size: 20px;
        color:#ff3b3b;
        
      }
      .headFoot{
        padding-top:8px;
      }

    }

    .midLine{
      border-top:1px solid #dfdfdf;
      margin-bottom:10px;
    }
    .leftFoot{
      font-size: 14px;
      font-weight: bold;
      color:#333;
      padding-left:20px;
      
    }
    .leftFootUrl{
      padding-top:0px;
      color:#032bff;
      text-decoration: underline;
    }

    

  }

}
  .el-tag{
    margin-left:8px;
    height:24px;
    line-height: 22px;
  }
  .detailsHeader{
    padding-top:20px !important;
  }
  .tabHead{
    color:#61bafe;
  }
</style>
