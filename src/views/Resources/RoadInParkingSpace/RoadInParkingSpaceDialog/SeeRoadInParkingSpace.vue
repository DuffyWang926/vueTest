<template>
  <el-dialog :title="title" class="sm-dialog seeRoadInParkingSpace" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
      <div  style="width:52%;padding-bottom: 30px; ">
        <el-row :gutter="12">
          <el-col :span="9">停车位编号</el-col>
          <el-col :span="12">{{cwbh}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="9">停车场名称</el-col>
          <el-col :span="12">{{ccmc}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="9">车位状态</el-col>
          <el-col :span="12">{{sfqy|sfqy}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="9">尺寸标准/排列方式</el-col>
          <el-col :span="12">{{ccsx|ccsx}} /{{plfs|plfs}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="9">经营类型</el-col>
          <el-col :span="12">{{jylx|jylx}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="9">管理模式</el-col>
          <el-col :span="12">{{sjly|sjly}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="9">位置类型</el-col>
          <el-col :span="12">{{wzlx|wzlx}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="9">收费标准</el-col>
          <el-col :span="12">
            <span v-for="item in fhsfbz">
            <p style="margin-top: 0">{{item}}</p>
          </span>
          </el-col>
        </el-row>
      </div>
    <div class="dialog-right" style="width:48%; position: absolute; right:0; top:90px; padding-right: 36px">

      <div v-show="isFirstShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" @click="first">当前图像</el-button>
          <el-button type="primary" plain @click="second">实时视频</el-button>
        </div>
      </div>

      <div v-show="isSecondShow">
        <div style="margin-bottom: 15px;">
          <el-button type="primary" plain @click="first">当前图像</el-button>
          <el-button type="primary" @click="second">实时视频</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fetchRoadInParkingSpaceInfo, fetchRoadInParkingSpaceInfoByCWBH } from "@/api/Resources/RoadInParkingSpace";

export default {
  name: "SeeRoadInParkingSpace",
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
  data() {
    return {
      firstShow: true,
      appendToBody: true,
      title: "停车位详情",
      isFirstShow:true,
      isSecondShow:false,
      cwbh: "",
      ccmc: "",
      ccsx: "",
      plfs: "",
      jylx: "",
      fhsfbz: "",
      sfqy: "",
      sjly: "",
      wzlx: "",
    };
  },
  created() {
    // this.getRoadInParkingSpaceInfo(this.msg.id, this.msg.ccmc)
    this.getRoadInParkingSpaceInfoByCWBH(this.msg.cwbh)
  },
  methods: {
    //获取详情
    // getRoadInParkingSpaceInfo(id, ccmc){
    //   fetchRoadInParkingSpaceInfo(id, ccmc).then(response => {
    //     this.cwbh = response.result.cwbh;
    //     this.ccmc = response.result.ccmc;
    //     this.ccsx = response.result.ccsx;
    //     this.plfs = response.result.plfs;
    //     this.jylx = response.result.jylx;
    //     this.sfqy = response.result.sfqy;
    //     this.sjly = response.result.sjly;
    //     this.wzlx = response.result.wzlx;
    //     this.fhsfbz = response.result.fhsfbz;
    //
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },

    getRoadInParkingSpaceInfoByCWBH(cwbh){
      fetchRoadInParkingSpaceInfoByCWBH(cwbh).then(response => {
        this.cwbh = response.result.cwbh;
        this.ccmc = response.result.ccmc;
        this.ccsx = response.result.ccsx;
        this.plfs = response.result.plfs;
        this.jylx = response.result.jylx;
        this.sfqy = response.result.sfqy;
        this.sjly = response.result.sjly;
        this.wzlx = response.result.wzlx;
        this.fhsfbz = response.result.fhsfbz;

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
    handleClick(){},
    handleChange() {
      // console.log(123);
    },
    //  关闭弹框
    cancelModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="less">
  .seeRoadInParkingSpace{
    .el-row{
      padding:12px 0!important;
      margin: 0 !important;
    }
    .bottom-line{
      border-bottom: 1px solid #dfdfdf;
      width:80%
    }
  }

</style>
