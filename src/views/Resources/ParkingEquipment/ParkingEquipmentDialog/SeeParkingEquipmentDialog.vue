<template>
  <el-dialog title="设备详情" class="sm-dialog parkingEquipmentDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div  style="width:52%; height:550px">
      <el-row :gutter="12">
        <el-col :span="8">运营公司</el-col>
        <el-col :span="12">{{yygs}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">设备种类</el-col>
        <el-col :span="12">{{sbzlid|sbzl}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">设备类型</el-col>
        <el-col :span="12">{{sblxid}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">S/N编码</el-col>
        <el-col :span="12">{{sbsn}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">设备编号</el-col>
        <el-col :span="12">{{sbbh}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">设备名称</el-col>
        <el-col :span="12">{{sbmc}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">品牌型号</el-col>
        <el-col :span="12">{{sbxh}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">制造商</el-col>
        <el-col :span="12">{{sbcs}}</el-col>
      </el-row>
      <div class="bottom-line"></div>
      <el-row :gutter="12">
        <el-col :span="8">状态</el-col>
        <el-col :span="12">{{sfqy|sfqy}}</el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:40%; position: absolute; right:0; top:90px; padding-right: 36px;">
      <el-row :gutter="12">
        <el-col :span="8">所属停车场</el-col>
        <span style="float:right; font-size: 16px; color:#333333">{{ccmc}}</span>
      </el-row>
      <el-row :gutter="12">
        <el-col>管辖泊位</el-col>
        <el-col><div style=" border-bottom: 1px solid #dfdfdf;width:100%; padding-top: 12px"></div></el-col>

        <el-col :span="24" v-if="this.parkingSpaces">
          <p class="cwbh-p" v-for="(items, index) in this.parkingSpaces" :key="index">
            <span class="cwbh-style">{{items.cwbh}}</span>
          </p>
        </el-col>
        <el-col :span="12" v-else>
          <p>暂无数据</p>
        </el-col>
      </el-row>
      </div>
  </el-dialog>
</template>

<script>
  import { fetchParkingEquipmentInfo, fetchParkingEquipmentCWBH, fetchParkingEquipmentCCCWInfo } from "@/api/Resources/ParkingEquipment";
  import getEnumberate from '@/utils/getDictsEnumberate'
  export default {
    name: "SeeParkingEquipmentDialog",
    props: {
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
        appendToBody: true,
        sbzlid:'',
        sblxid:'',
        sbsn:'',
        sbbh:'',
        sbmc:'',
        sbxh:'',
        sbcs:'',
        sfqy:'',
        ccmcs:'',
        bwbh:'',
        yygs:'',
        ccmc:'',
        parkingSpaces:[]
      }
    },
    created(){
      this.getParkingEquipmentInfo(this.msg.id);
      this.getParkingEquipmentCCCWInfo(this.msg.id)
    },
    methods:{
      getParkingEquipmentInfo(id){
        fetchParkingEquipmentInfo(id).then(response => {
          this.sbzlid = response.result.sbzlid;
          this.sblxid = getEnumberate(response.result.sblxid);
          this.sbsn = response.result.sbsn;
          this.yygs = response.result.yygs;
          this.sbbh = response.result.sbbh;
          this.sbmc = response.result.sbmc;
          this.sbxh = response.result.sbxh;
          this.sbcs = getEnumberate(Number(response.result.sbcs));
          this.sfqy = response.result.sfqy;
        }).catch((err) => {
          console.log(err)
        })
      },
      getParkingEquipmentCCCWInfo(id){
        fetchParkingEquipmentCCCWInfo(id).then(response => {
          this.ccmc = response.result.ccmc;
          this.parkingSpaces = response.result.parkingSpaces
        }).catch((err) => {
          console.log(err)
        })
      },
      //  关闭弹框
      cancelModal() {
        this.$emit("update:visible", false);
      },
    }

  }
</script>

<style lang="less">
  .parkingEquipmentDialog{
    .el-row{
      padding:12px 0!important;
      margin: 0 !important;
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
      width:80%
    }
  }

</style>
