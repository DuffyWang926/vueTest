<template>
   <el-dialog title='账户配置' class="lg-dialog account-style" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <span>运营公司名称：{{this.msg.gsmc}}</span>
    <el-tabs :tab-position="tabPosition" v-model="activeTab" @tab-click="tabClick" class="el-tabs-style" style=" margin-top:20px;">
      <el-tab-pane name="zfb">
        <span slot="label"><span class="iconfont icon-zhifubao" style="margin-right: 5px; color: #00aaee"></span>支付宝</span>
        <span style="font-weight: bold">支付宝账号参数配置</span>
        <ValidationObserver ref="observer">
          <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="140px">
            <div style="width:52%">
            <ValidationProvider rules="required|numeric" name="商户号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户号" class="el-header-style">
                <el-input v-model="zfb.parameter.shh" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|url" name="回调地址">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="回调地址">
                <el-input v-model="zfb.parameter.hddz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="App支付手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="App支付手续费率">
                <el-input v-model="zfb.parameter.appfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="二维码手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="二维码手续费率">
                <el-input v-model="zfb.parameter.ewmfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="支付公钥">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="支付公钥">
                <el-input v-model="zfb.parameter.zfgy" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="应用私钥">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="应用私钥">
                <el-input v-model="zfb.parameter.yysy" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="应用公钥">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="应用公钥">
                <el-input v-model="zfb.parameter.yygy" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            </div>
            <div class="dialog-right" style="width:48%; position: absolute; right:0; top:39px;">
            <ValidationProvider rules="required|max:32" name="密码盐值">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="密码盐值"  >
                <el-input v-model="zfb.parameter.mmyz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <el-form-item label="是否启用">
              <el-radio v-model="zfb.parameter.sfqy" @change="isZFBChange" label="1">启用</el-radio>
              <el-radio v-model="zfb.parameter.sfqy" @change="isZFBChange" label="0">禁用</el-radio>
            </el-form-item>
            <el-form-item label="是否删除" >
              <el-radio v-model="zfb.parameter.sfsc" label="0">是</el-radio>
              <el-radio v-model="zfb.parameter.sfsc" label="1">否</el-radio>
            </el-form-item>
              <ValidationProvider :rules=msRules name="描述">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="描述">
                  <el-input v-model="zfb.parameter.ms" clearable></el-input>
                </el-form-item>
              </ValidationProvider>
              <el-form-item label="二维码" >
                <img :src=zfbEWM width="150px">
              </el-form-item>
            </div>
            <div class="footer-btn" style="margin-left:-60px;">
              <el-button type="primary" @click="validate().then(saveZFBAccount())">确定</el-button>
              <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
            </div>
            <div style="text-align: right" v-show="isZFB">
              <el-button @click="parameterZFBTest()">测试下单</el-button>
              <el-button @click="seeZFBTestResult">查看下单结果</el-button>
            </div>
            <div style="text-align: right; margin-top: 20px;" v-show="isZFB">
              <el-button @click="parameterZFBRefund">测试退款</el-button>
              <el-button @click="seeZFBRefundResult">查看退款结果</el-button>
            </div>

          </el-form>
        </ValidationObserver>
      </el-tab-pane>
      <el-tab-pane name="wx">
        <span slot="label"><span class="iconfont icon-weixin" style="margin-right: 5px; color: #02c903"></span>微信</span>
        <span style="font-weight: bold">微信账号参数配置</span>
        <ValidationObserver ref="observer">
          <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="140px">
            <div style="width:52%">
            <ValidationProvider rules="required|numeric" name="商户号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户号" class="el-header-style">
                <el-input v-model="wx.parameter.shh" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|url" name="回调地址">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="回调地址">
                <el-input v-model="wx.parameter.hddz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="App支付手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="App支付手续费率">
                <el-input v-model="wx.parameter.appfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="二维码手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="二维码手续费率">
                <el-input v-model="wx.parameter.ewmfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|alpha_num" name="AppId">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="AppId">
                <el-input v-model="wx.parameter.appid" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|alpha_num" name="商户密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户密码">
                <el-input v-model="wx.parameter.shmm" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <el-form-item label="上传用户证书">
              <el-upload
                class="upload-demo"
                ref="wxyhzs"
                action="/"
                :before-upload="beforeUploadWX"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
            </div>
            <div class="dialog-right" style="width:48%; position: absolute; right:0; top:39px;">
            <ValidationProvider rules="required|max:32" name="密码盐值">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="密码盐值"  >
                <el-input v-model="wx.parameter.mmyz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <el-form-item label="是否启用" >
              <el-radio v-model="wx.parameter.sfqy" label="1" @change="isWXChange">启用</el-radio>
              <el-radio v-model="wx.parameter.sfqy" label="0" @change="isWXChange">禁用</el-radio>
            </el-form-item>
            <el-form-item label="是否删除" >
              <el-radio v-model="wx.parameter.sfsc" label="0">是</el-radio>
              <el-radio v-model="wx.parameter.sfsc" label="1">否</el-radio>
            </el-form-item>
              <ValidationProvider :rules=msRules name="描述">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="描述">
                  <el-input v-model="wx.parameter.ms" clearable></el-input>
                </el-form-item>
              </ValidationProvider>
              <el-form-item label="二维码" >
                <img :src=wxEWM width="150px">
              </el-form-item>
            </div>
            <div class="footer-btn" style="margin-left:-60px;">
              <el-button type="primary" @click="validate().then(saveWXAccount())">确定</el-button>
              <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
            </div>
            <div style="text-align: right" v-show="isWX">
              <el-button @click="parameterWXTest">测试下单</el-button>
              <el-button @click="seeWXTestResult">查看下单结果</el-button>
            </div>
            <div style="text-align: right; margin-top: 20px;" v-show="isWX">
              <el-button @click="parameterWXRefund">测试退款</el-button>
              <el-button @click="seeWXRefundResult">查看退款结果</el-button>
            </div>
          </el-form>
        </ValidationObserver>
      </el-tab-pane>
      <el-tab-pane name="yzf">
        <span slot="label"><img src="./yzf_logo.png" width="15px" style="margin-right: 5px">翼支付</span>
        <span style="font-weight: bold">翼支付账号参数配置</span>
        <ValidationObserver ref="observer">
          <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="140px">
            <div style="width:52%">
            <ValidationProvider rules="required|numeric" name="商户号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户号" class="el-header-style">
                <el-input v-model="yzf.parameter.shh" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|url" name="回调地址">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="回调地址">
                <el-input v-model="yzf.parameter.hddz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="App支付手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="App支付手续费率">
                <el-input v-model="yzf.parameter.appfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=fl name="二维码手续费率">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="二维码手续费率">
                <el-input v-model="yzf.parameter.ewmfl" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|alpha" name="证书用户名">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="证书用户名">
                <el-input v-model="yzf.parameter.zsyhm" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric" name="证书密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户密码">
                <el-input v-model="yzf.parameter.zsmm" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
              <el-form-item label="上传用户证书">
                <el-upload
                  class="upload-demo"
                  ref="yhzs"
                  :action="doUpload"
                  :before-upload="beforeUploadYZFYHZS"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="上传服务证书">
                <el-upload
                  class="upload-demo"
                  ref="fwzs"
                  :action="doUpload"
                  :before-upload="beforeUploadYZFFWZS"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
              </el-form-item>
            </div>
            <div class="dialog-right" style="width:48%; position: absolute; right:0; top:39px;">
            <ValidationProvider rules="required|max:32" name="密码盐值">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="密码盐值"  >
                <el-input v-model="yzf.parameter.mmyz" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <el-form-item label="是否启用" >
              <el-radio v-model="yzf.parameter.sfqy" label="1" @change="isYZFChange">启用</el-radio>
              <el-radio v-model="yzf.parameter.sfqy" label="0" @change="isYZFChange">禁用</el-radio>
            </el-form-item>
            <el-form-item label="是否删除" >
              <el-radio v-model="yzf.parameter.sfsc" label="0">是</el-radio>
              <el-radio v-model="yzf.parameter.sfsc" label="1">否</el-radio>
            </el-form-item>
              <ValidationProvider :rules=msRules name="描述">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="描述">
                  <el-input v-model="yzf.parameter.ms" clearable></el-input>
                </el-form-item>
              </ValidationProvider>
              <el-form-item label="二维码" >
                <img :src=yzfEWM width="150px">
              </el-form-item>
            </div>
            <div class="footer-btn" style="margin-left:-60px;">
              <el-button type="primary" @click="validate().then(saveYZFAccount())">确定</el-button>
              <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
            </div>
            <div style="text-align: right" v-show="isYZF">
              <el-button @click="parameterYZFTest">测试下单</el-button>
              <el-button @click="seeYZFTestResult">查看下单结果</el-button>
            </div>
            <div style="text-align: right; margin-top: 20px;" v-show="isYZF">
              <el-button @click="parameterYZFRefund">测试退款</el-button>
              <el-button @click="seeYZFRefundResult">查看退款结果</el-button>
            </div>
          </el-form>
        </ValidationObserver>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>

</template>

<script>
  import { SaveCompanyAccount, TestOrderAccount, SeeResultAccount, getOrgPayInfo, getOrgPayInfoForGSID, TestOrderRefund } from "@/api/BasisSet/Operate";
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import  EnumberateSelect  from '@/filters/index'
export default {
  name: "AccountOperateDialog",
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
      tabPosition: "left",
      labelposition:"left",
      appendToBody: true,
      OptionsZFLX:EnumberateSelect.ZFLX,
      fl:{
        required:true,
        regex:/^[0-9.%]+$/
      },
    doUpload:'',
    activeTab: 'zfb',
      isZFB: true,
      isWX: true,
      isYZF: true,
      zfqd:'',
      zfb: {
        parameter:{
          id:'',
          gsid:'',
          shh:'',
          hddz:'',
          appfl:'',
          ewmfl:'',
          zfgy:'',
          yysy:'',
          yygy:'',
          mmyz:'',
          ms:'',
          sfqy:'0',
          sfsc:'1',
          zfqd:2
        }
      },
      zfbId:'',
      zfbEWM:'',
      zfbTestResultId:'',
      zfbRefundResultId:'',
      wx: {
        parameter:{
          id:'',
          gsid:'',
          shh:'',
          hddz:'',
          appfl:'',
          ewmfl:'',
          appid:'',
          shmm:'',
          mmyz:'',
          ms:'',
          sfqy:'0',
          sfsc:'1',
          zfqd:1,
        },
        yhzs:'',
      },
      wxId:'',
      wxEWM:'',
      wxTestResultId:'',
      wxRefundResultId:'',
      yzf:{
        parameter:{
          id:'',
          gsid:'',
          sfqy:'0',
          sfsc:'1',
          zfqd:4,
          shh:'',
          zsyhm:'',
          zsmm:'',
          hddz:'',
          appfl:'',
          ewmfl:'',
          mmyz:'',
          ms:'',
        },
        yhzs:'',
        fwzs:'',
      },
      yzfId:'',
      yzfEWM:'',
      yzfTestResultId:'',
      yzfRefundResultId:'',
      fileList: [],
      formData:{},
      formDataWX:{},
      msRules:{
        max: 100 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      }
    }
  },
  created() {
    // console.log(this.msg)
    //默认回显数据
    if(this.activeTab === 'zfb'){
      this.zfqd = 2;
      this.getInfo()
    }else if(activeTab === 'wx'){
      this.zfqd = 1;
      this.getInfo()
    }else{
      this.zfqd = 4;
      this.getInfo()
    }
  },
  methods: {
    //切换tab标签（切换回显数据）
    tabClick(tab){
      if(tab.name === 'wx'){
        this.zfqd = 1;
        this.getInfo()
      }else if(tab.name === 'zfb'){
        this.zfqd = 2;
        this.getInfo()
      }else{
        this.zfqd = 4;
        this.getInfo()
      }
    },
    //获取详情(公司id ,zfqd)
    getInfo(){
      getOrgPayInfo(this.msg.id, this.zfqd).then(response => {
        if(response.result !== null){
          if(Number(this.zfqd) === 1){
            //微信参数回显
            this.wx.parameter.shh = response.result.shh;
            this.wx.parameter.hddz = response.result.hddz;
            this.wx.parameter.appfl = response.result.appfl;
            this.wx.parameter.ewmfl = response.result.ewmfl;
            this.wx.parameter.appid = response.result.appid;
            this.wx.parameter.shmm = response.result.shmm;
            this.wx.parameter.zflx = Number(response.result.zflx);
            this.wx.parameter.mmyz = response.result.mmyz;
            this.wx.parameter.sfqy = String(response.result.sfqy);
            this.wx.parameter.sfsc = String(response.result.sfsc);
            this.wx.parameter.ms = response.result.ms;
            this.wx.parameter.id = response.result.id;
          }else if(Number(this.zfqd) === 2){
            //支付宝参数回显
            this.zfb.parameter.shh = response.result.shh;
            this.zfb.parameter.hddz = response.result.hddz;
            this.zfb.parameter.appfl = response.result.appfl;
            this.zfb.parameter.ewmfl = response.result.ewmfl;
            this.zfb.parameter.zfgy = response.result.zfgy;
            this.zfb.parameter.yysy = response.result.yysy;
            this.zfb.parameter.yygy = response.result.yygy;
            this.zfb.parameter.zfqd = Number(response.result.zfqd);
            this.zfb.parameter.mmyz = response.result.mmyz;
            this.zfb.parameter.sfqy = String(response.result.sfqy);
            this.zfb.parameter.sfsc = String(response.result.sfsc);
            this.zfb.parameter.ms = response.result.ms;
            this.zfb.parameter.id = response.result.id;
          }else if(Number(this.zfqd) === 4){
            //翼支付参数回显
            this.yzf.parameter.shh = response.result.shh;
            this.yzf.parameter.hddz = response.result.hddz;
            this.yzf.parameter.appfl = response.result.appfl;
            this.yzf.parameter.ewmfl = response.result.ewmfl;
            this.yzf.parameter.zsyhm = response.result.zsyhm;
            this.yzf.parameter.zsmm = response.result.zsmm;
            this.yzf.parameter.zflx = Number(response.result.zflx);
            this.yzf.parameter.mmyz = response.result.mmyz;
            this.yzf.parameter.sfqy = String(response.result.sfqy);
            this.yzf.parameter.sfsc = String(response.result.sfsc);
            this.yzf.parameter.ms = response.result.ms;
            this.yzf.parameter.id = response.result.id;
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    //支付宝保存按钮
    saveZFBAccount(){
      this.zfb.parameter.shh = this.zfb.parameter.shh.trim();
      this.zfb.parameter.hddz = this.zfb.parameter.hddz.trim();
      this.zfb.parameter.zfgy = this.zfb.parameter.zfgy.trim();
      this.zfb.parameter.yysy = this.zfb.parameter.yysy.trim();
      this.zfb.parameter.yygy = this.zfb.parameter.yygy.trim();
      this.zfb.parameter.mmyz = this.zfb.parameter.mmyz.trim();

      this.zfb.parameter.gsid = this.msg.id;
      let formData = new FormData(); //创建form对象
      formData.append('body', new Blob([JSON.stringify(this.zfb)], {type: "application/json"}));
      SaveCompanyAccount(formData).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: '保存成功，请测试下单',
            type: 'success'
          });
          this.zfbId = response.result
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //切换为启用按钮不显示测试下单等按钮
    isZFBChange(){
      if(this.zfb.parameter.sfqy === '1'){
        this.isZFB = false
      }else{
        this.isZFB = true
      }
    },
    isWXChange(){
      if (this.wx.parameter.sfqy === '1') {
        this.isWX = false
      }else{
        this.isWX = true
      }
    },
    isYZFChange(){
      if (this.yzf.parameter.sfqy === '1') {
        this.isYZF = false
      }else{
        this.isYZF = true
      }
    },
    //微信文件上传（用户证书）
    beforeUploadWX(file){
      this.formDataWX.append('yhzs',file);
    },
    //微信from表单数据保存
    saveWXAccount(){
      this.wx.parameter.shh = this.wx.parameter.shh.trim();
      this.wx.parameter.hddz = this.wx.parameter.hddz.trim();
      this.wx.parameter.appid = this.wx.parameter.appid.trim();
      this.wx.parameter.shmm = this.wx.parameter.shmm.trim();
      this.wx.parameter.mmyz = this.wx.parameter.mmyz.trim();
      this.wx.parameter.gsid = this.msg.id;
      this.formDataWX = new FormData(); //创建form对象
      this.formDataWX.append('body', new Blob([JSON.stringify(this.wx)], {type: "application/json"}));

      SaveCompanyAccount(this.formDataWX).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: '保存成功，请测试下单',
            type: 'success'
          });
          this.wxId = response.result
        }
      }).catch((err) => {
        console.log(err)
      })
      this.$refs.wxyhzs.submit();
    },
    // 翼支付文件上传（用户证书）
    beforeUploadYZFYHZS(file){
      this.formData.append('yhzs',file);
    },
    //翼支付文件上传（服务证书）
    beforeUploadYZFFWZS(file){
      this.formData.append('fwzs',file);
    },
    //翼支付from表单数据保存
    saveYZFAccount(){
      this.yzf.parameter.shh = this.yzf.parameter.shh.trim();
      this.yzf.parameter.zsyhm = this.yzf.parameter.zsyhm.trim();
      this.yzf.parameter.zsmm = this.yzf.parameter.zsmm.trim();
      this.yzf.parameter.hddz = this.yzf.parameter.hddz.trim();
      this.yzf.parameter.mmyz = this.yzf.parameter.mmyz.trim();
      this.yzf.parameter.gsid = this.msg.id;
      this.formData = new FormData(); //创建form对象
      this.formData.append('body', new Blob([JSON.stringify(this.yzf)], {type: "application/json"}));

      SaveCompanyAccount(this.formData).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: '保存成功，请测试下单',
            type: 'success'
          });
          this.yzfId = response.result
        }
      }).catch((err) => {
        console.log(err)
      })

      this.$refs.yhzs.submit();
      this.$refs.fwzs.submit();
    },
    //支付宝测试下单
    parameterZFBTest(){
      TestOrderAccount(this.msg.id, 2).then(response => {
        this.zfbEWM = "data:image/png;base64," + response.result.pay_result;
        this.zfbTestResultId = response.result.payment_record_id
      }).catch((err) => {
        console.log(err)
      })
    },
    //支付宝查看下单结果
    seeZFBTestResult(){
      SeeResultAccount(this.zfbTestResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //支付宝测试退款
    parameterZFBRefund(){
      TestOrderRefund(this.zfbTestResultId, 2).then(response => {
        this.zfbRefundResultId = response.result.payment_record_id
      })
    },
   //支付宝查看退款结果
    seeZFBRefundResult(){
      SeeResultAccount(this.zfbRefundResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //微信测试下单
    parameterWXTest(){
      TestOrderAccount(this.msg.id, 1).then(response => {
        this.wxEWM = "data:image/png;base64," + response.result.pay_result;
        this.wxTestResultId = response.result.payment_record_id
      }).catch((err) => {
        console.log(err)
      })
    },
    //微信查看下单结果
    seeWXTestResult(){
      SeeResultAccount(this.wxTestResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //微信测试退款
    parameterWXRefund(){
      TestOrderRefund(this.wxTestResultId, 1).then(response => {
        this.wxRefundResultId = response.result.payment_record_id
      })
    },
    //微信查看退款结果
    seeWXRefundResult(){
      SeeResultAccount(this.wxRefundResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //翼支付测试下单
    parameterYZFTest(){
      TestOrderAccount(this.msg.id, 4).then(response => {
        this.yzfEWM = "data:image/png;base64," + response.result.pay_result;
        this.yzfTestResultId = response.result.payment_record_id
      }).catch((err) => {
        console.log(err)
      })
    },
    //翼支付查看结果
    seeYZFTestResult(){
      SeeResultAccount(this.yzfTestResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //翼支付测试退款
    parameterYZFRefund(){
      TestOrderRefund(this.yzfTestResultId, 4).then(response => {
        this.yzfRefundResultId = response.result.payment_record_id
      })
    },
    //翼支付查看退款结果
    seeYZFRefundResult(){
      SeeResultAccount(this.yzfRefundResultId).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    cancelModal() {
      this.$emit("update:visible", false);
    },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
    }
  }
};
</script>

<style lang="less">
  .account-style{
    .el-header-style {
      margin-top: 20px;
    }
    .el-tabs__header {
      border: 1px solid #e4e7ed;
      .el-tabs__item {
        padding: 0 60px;
      }
      .el-tabs__item.is-active {
        background-color: #dedede;
      }
    }
    .el-tabs__content {
      padding-left: 30px;
    }
    .footer-btn {
      padding: 30px 0;
    }
  }

</style>
