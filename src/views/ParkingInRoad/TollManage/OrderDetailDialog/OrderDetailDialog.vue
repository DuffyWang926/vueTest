<template>
  <el-dialog title="订单详情" class="lg-dialog orderDetailDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <div style="width:45%; padding-bottom: 30px;">
      <el-row :gutter="12">
        <el-col :span="6">订单编号</el-col>
        <el-col :span="12">{{ddbh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">车牌号码</el-col>
        <el-col :span="12">
         <span>{{hphm}}</span>
          <span class="white" v-if="this.cpys === 5">{{cpys|cpys}}</span>
          <span class="yellow" v-if="this.cpys === 2">{{cpys|cpys}}</span>
          <span class="green" v-if="this.cpys === 3">{{cpys|cpys}}</span>
          <span class="blue" v-if="this.cpys === 1">{{cpys|cpys}}</span>
          <span class="black" v-if="this.cpys === 4">{{cpys|cpys}}</span>
          <span class="other" v-if="this.cpys === 0">{{cpys|cpys}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col :span="6">停车场</el-col>
        <el-col :span="12">{{ccmc}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">泊位编号</el-col>
        <el-col :span="12">{{cwbh}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">订单状态</el-col>
        <el-col :span="12">{{ddzt|ddzt}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">创建类型</el-col>
        <el-col :span="12">{{ddcjlx|ddcjlx}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">计费开始时间</el-col>
        <el-col :span="12" v-if="this.rwsj">{{rwsj|time}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">计费结束时间</el-col>
        <el-col :span="12" v-if="this.lwsj">{{lwsj|time}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">订单创建时间</el-col>
        <el-col :span="12" v-if="this.cjsj">{{cjsj|time}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">停车记录编号</el-col>
        <el-col :span="12">
          <el-button type="text" class="small-button" size="small" @click="parkDetails(data)">{{id}}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">订单总金额</el-col>
        <el-col :span="12">{{ddje/100}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">折扣车减免金额</el-col>
        <el-col :span="12">{{zkje/100}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">议价减免金额</el-col>
        <el-col :span="12">{{yjje/100}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">应收金额</el-col>
        <el-col :span="12">{{ysje/100}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">已支付金额</el-col>
        <el-col :span="12">{{zfje/100}}</el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="6">欠费金额</el-col>
        <el-col :span="12">{{qkje/100}}</el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:65%; position: absolute; right:0; top:90px; padding-right: 36px;">
      <div v-show="isFirstShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" @click="first">停车费明细</el-button>
          <el-button type="primary" plain @click="second">支付金额记录</el-button>
        </div>
        <el-table
          :data="tableDataArrears"
          border
          height="600"
          style="width: 100%;">
          <el-table-column
            prop="kssj"
            width="180"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="jssj"
            width="180"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="ddje"
            label="费用(元)">
            <template slot-scope="scope">
              <span>{{scope.row.ddje/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sfms"
            width="240"
            label="费用描述">
          </el-table-column>
          <el-table-column
            prop="sfmc"
            label="收费规则">
          </el-table-column>
        </el-table>
      </div>

      <div v-show="isSecondShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" plain @click="first">停车费明细</el-button>
          <el-button type="primary" @click="second">支付金额记录</el-button>
        </div>
        <el-table
          :data="tableDataPay"
          border
          height="600"
          style="width: 100%">
          <el-table-column
            prop="zflx"
            label="支付类型">
          </el-table-column>
          <el-table-column
            prop="zffs"
            label="支付方式">
          </el-table-column>
          <el-table-column
            prop="zfqd"
            width="163"
            label="支付渠道">
          </el-table-column>
          <el-table-column
            prop="jyje"
            width="163"
            label="支付金额">
            <template slot-scope="scope">
            <span>{{scope.row.jyje/100}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cjsj"
            width="180"
            label="完成时间">
            <template slot-scope="scope">
            <span>{{scope.row.cjsj|time}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <ParkingLeaveDetails :visible="isParkingDetails" :msg='parkingDetailsData' @cancelModal='cancelParkingLeaveModal'></ParkingLeaveDetails>
  </el-dialog>

</template>

<script>
import { fetchCurrentOrderInfo, fetchCurrentOrderPayList, fetchCurrentOrderArrearsList, fetchParkRecordOrHistoryById } from '@/api/ParkingInRoad/TollManage/CurrentOrders'
import ParkingLeaveDetails from "@/components/DetailsDialogue/ParkingLeaveDetails";
  export default {
    name: "OrderDetailDialog",
      components: {ParkingLeaveDetails},
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
        tableDataArrears:[],
        tableDataPay:[],
        id:'',
        ddbh:'',
        hphm:'',
        cpys:'',
        ccmc:'',
        cwbh:'',
        ddzt:'',
        rwsj:'',
        lwsj:'',
        cjsj:'',
        ddje:'',
        ysje:'',
        zfje:'',
        qkje:'',
        ddcjlx:'',
        zkje:'',
        yjje:'',
        isParkingDetails:false,
        data:{
          rwjlid:'',
          lwjlid:'',
          xgjlid:'',
        }
      }
    },
    created(){
      if(this.msg.tcddid){
        this.getInfo(this.msg.tcddid);
        this.getCurrentOrderPayList(this.msg.id);
        this.getCurrentOrderArrearsList(this.msg.tcddid)
      }else{
        this.getInfo(this.msg.id);
        this.getCurrentOrderPayList(this.msg.id);
        this.getCurrentOrderArrearsList(this.msg.id)
      }

    },
    methods:{
      //详情
      getInfo(id) {
        fetchCurrentOrderInfo(id).then(response => {
          this.ddbh = response.result.ddbh;
          this.id = response.result.id;
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.ccmc = response.result.ccmc;
          this.cwbh = response.result.cwbh;
          this.ddzt = response.result.ddzt;
          this.rwsj = response.result.rwsj;
          this.lwsj = response.result.lwsj;
          this.cjsj = response.result.cjsj;
          this.ddje = response.result.ddje;
          this.ysje = response.result.ysje;
          this.zfje = response.result.zfje;
          this.qkje = response.result.qkje;
          this.ddcjlx = response.result.ddcjlx;
          this.zkje = response.result.zkje;
          this.yjje = response.result.yjje;
          if(this.id != null && this.rwsj != null){
            this.getParkRecordOrHistoryById(this.id, this.rwsj)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //根据订单id   获取在停车辆记录信息
      getParkRecordOrHistoryById(parkId, rwsj) {
        fetchParkRecordOrHistoryById(parkId, rwsj).then(response => {
          this.data.rwjlid = response.result.rwjlid;
          this.data.lwjlid = response.result.lwjlid;
          this.data.xgjlid = response.result.xgjlid
        }).catch((err) => {
            console.log(err)
        })
      },
      //支付记录
      getCurrentOrderPayList(id) {
        fetchCurrentOrderPayList(id).then(response => {
          this.tableDataPay = response.result
        }).catch((err) => {
          console.log(err)
        })
      },
      //费用明细
      getCurrentOrderArrearsList(id) {
        fetchCurrentOrderArrearsList(id).then(response => {
          this.tableDataArrears = response.result
        }).catch((err) => {
          console.log(err)
        })
      },

      first(){
        this.isFirstShow = true;
        this.isSecondShow = false
      },
      second(){
        this.isFirstShow = false;
        this.isSecondShow = true
      },
        parkingDetailsData(){
            return this.$store.state.parkingRecord.parkingCars.manualLeaveVisible
        },
        parkDetails(data){
          this.isParkingDetails = true;
          this.$store.dispatch('detailsDataAll/getParkingRecordInfo',data)
          this.$store.dispatch('detailsDataAll/getParkingRecordLeaveInfo',data)
          this.$store.dispatch('detailsDataAll/getParkingRecordChangeInfo',data)
        },
        cancelParkingLeaveModal(){
          this.isParkingDetails = false;
        },

      //  关闭弹框
      cancelModal() {
        this.$emit('update:visible', false)
      },
    }
  }
</script>

<style lang="less">
  .orderDetailDialog{
    .el-row{
      padding:12px 0!important;
      margin: 0 !important;
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
    .small-button{
      padding:0 !important
    }
    .el-table::-webkit-scrollbar{
      display: none;
    }
  }

</style>
