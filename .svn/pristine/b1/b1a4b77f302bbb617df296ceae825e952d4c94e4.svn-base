<template>
  <el-dialog title="车辆认证历史" class="lg-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <div style="width:60%">
      <img :src="xsztp" width="90%" height="400px;">
      <el-row :gutter="20" style="padding-top: 50px;">
        <el-col :span="8">
          <span style="font-size: 18px; font-weight: 600;">行驶证认证结果</span>
        </el-col>
        <el-col :span="8" v-if="shzt===2">
          <span style="color:red; font-size: 16px; font-weight: 600;">{{shzt|shzt}}</span>
        </el-col>
        <el-col :span="8" v-if="shzt===1">
          <span style="color:green; font-size: 16px; font-weight: 600;">{{shzt|shzt}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:37%; position: absolute; right:0; top:90px;">
      <el-form ref="form" :label-position="labelposition" label-width="130px">

        <span style="font-size: 16px; font-weight: 600">行驶证信息</span>
        <el-form-item label="号牌号码" style="margin-top:20px;">
          <span>{{hphm}}</span>
        </el-form-item>
        <el-form-item label="号牌颜色">
          <span>{{cpys|cpys}}</span>
        </el-form-item>
        <el-form-item label="识别号码">
          <span>{{sbhm}}</span>
        </el-form-item>
        <el-form-item label="车辆类型">
          <span>{{clzl|clzl}}</span>
        </el-form-item>
        <el-form-item label="所有人">
          <span>{{yhmc}}</span>
        </el-form-item>
        <el-form-item label="住址">
          <span>{{address}}</span>
        </el-form-item>
        <el-form-item label="品牌--型号">
          <span>{{ccpp}}--{{ccxh}}</span>
        </el-form-item>
        <el-form-item label="使用性质">
          <span>{{syxz|syxz}}</span>
        </el-form-item>
         <el-form-item label="车辆识别代码">
           <span>{{clsbdh}}</span>
        </el-form-item>
         <el-form-item label="发动机代码">
           <span>{{fdjhm}}</span>
        </el-form-item>
         <el-form-item label="注册日期">
           <span>{{zcrq}}</span>
        </el-form-item>
        <el-form-item label="发证日期">
          <span>{{fzrq}}</span>
        </el-form-item>
        <el-form-item label="年检有效期">
          <span>{{njyxq}}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchAuthenticationHistoryInfo } from '@/api/CarManage/AuthenticationHistory'
  import  EnumberateSelect  from '@/filters/index'
  export default {
    name: "SeeAuthenticationHistoryDialog",
    props:{
      visible: {
        type: Boolean,
        default: false
      },
      idVal: {
        type: Number,
        default: -1
      },
    },
    data(){
      return{
        appendToBody:true,
        labelposition:"left",
        OptionsCPYS:EnumberateSelect.CPYS,
        OptionsCLZL:EnumberateSelect.CLZL,
        OptionsSYXZ:EnumberateSelect.SYXZ,
        shzt:'',
        hphm:'',
        cpys:'',
        yhmc:'',
        clzl:'',
        address:'',
        ccpp:'',
        ccxh:'',
        syxz:'',
        clsbdh:'',
        fzrq:'',
        njyxq:'',
        xszzp:'',
        fdjhm:'',
        zcrq:'',
        xsztp:'',
        sbhm:''
      }
    },
    created(){
      this.getCarAuthenticationInfo(this.idVal)
    },
    methods:{
      getCarAuthenticationInfo(id) {
        fetchAuthenticationHistoryInfo(id).then(response => {
          this.hphm = response.result.hphm;
          this.cpys = response.result.cpys;
          this.yhmc = response.result.yhmc;
          this.clzl = response.result.clzl;
          this.address = response.result.address;
          this.ccpp = response.result.ccpp;
          this.ccxh = response.result.ccxh;
          this.syxz = response.result.syxz;
          this.clsbdh = response.result.clsbdh;
          this.fzrq = response.result.fzrq;
          this.njyxq = response.result.njyxq;
          this.xszzp = response.result.xszzp;
          this.fdjhm = response.result.fdjhm;
          this.zcrq = response.result.zcrq;
          this.xsztp = response.result.xsztp;
          this.sbhm = response.result.sbhm;
          this.shzt = response.result.shzt
        }).catch((err) => {
          console.log(err)
        })
      },
      cancelModal(){
        this.$emit('update:visible', false);
      }
    }
  }
</script>

<style lang="less" >

</style>
