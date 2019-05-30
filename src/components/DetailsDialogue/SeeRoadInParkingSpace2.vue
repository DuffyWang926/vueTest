<template>
  <el-dialog :title="title" class="lg-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
      <div  style="width:52%">
        <el-row :gutter="12">
          <el-col :span="6">停车位编号</el-col>
          <el-col :span="12">{{cwbh}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">停车场名称</el-col>
          <el-col :span="12">{{ccmc}}</el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="6">车位状态</el-col>
          <el-col :span="12">{{sfqy|sfqy}}</el-col>
        </el-row>
        <div class="bottom-line"></div>
        <el-row :gutter="12">
          <el-col :span="9">尺寸标准/排列方式</el-col>
          <el-col :span="12">{{ccsx|ccsx}} {{plfs|plfs}}</el-col>
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
          <el-col :span="12">{{sfbz}}</el-col>
        </el-row>
      </div>
    <div class="dialog-right" style="width:48%; position: absolute; right:0; top:70px;">
        <!-- <img :src="cctp" width="90%"> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="当前图片" name="first">
            </el-tab-pane>
          <el-tab-pane label="实时视频" name="second">
            </el-tab-pane>
          
        </el-tabs>
    </div>
    <div class="footer-btn">
      <el-button class="btn-second" @click="cancelModal">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchRoadInParkingSpaceInfo } from "@/api/Resources/RoadInParkingSpace";
import { getParkingGarageCcbh } from '@/api/DetailsDataAll/parkingDetails'

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
      cwbh: "",
      ccmc: "",
      ccsx: "",
      plfs: "",
      jylx: "",
      sfbz: "",
      sfqy: "",
      sjly: "",
      wzlx: "",
      activeName:''
    };
  },
  created() {
    let ccbh = this.msg.ccbh || '-1'
    this.getRoadInParkingInfo(ccbh)
  },
  methods: {
    //获取详情
     getRoadInParkingInfo(ccbh){
        getParkingGarageCcbh(ccbh).then(response => {
      let id =  response.result.id 
      let ccmc = response.result.ccmc 
        if(id && ccmc){
          this.getRoadInParkingSpaceInfo(id,ccmc) 
        }  
        }).catch((err) => {
          // console.log(err)
        })
      },
    //获取详情
    getRoadInParkingSpaceInfo(id, ccmc){
      fetchRoadInParkingSpaceInfo(id, ccmc).then(response => {
        console.log(response)
        this.cwbh = response.result.cwbh;
        this.ccmc = response.result.ccmc;
        this.ccsx = response.result.ccsx;
        this.plfs = response.result.plfs;
        this.jylx = response.result.jylx;
        this.sfbz = response.result.sfbz.join('');
        this.sfqy = response.result.sfqy;
        this.sjly = response.result.sjly;
        this.wzlx = response.result.wzlx;
      }).catch((err) => {
        // console.log(err)
      })
    },



    handleChange() {
      console.log(123);
    },
    //  关闭弹框
    cancelModal() {
      this.$emit("update:visible", false);
    },
    //tab 切换
    handleClick(){

    }
  }
};
</script>

<style lang="less">
  .bottom-line{
    border-bottom: 1px solid #dedede;
    margin-bottom:15px;
    width:70%
  }

</style>
