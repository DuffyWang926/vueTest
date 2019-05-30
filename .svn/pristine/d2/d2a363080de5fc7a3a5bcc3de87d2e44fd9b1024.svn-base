<template>
    <el-dialog :title="dialogTitle()" class="lg-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <div style="width:55%;">
            <ValidationProvider rules="required" name="商户编号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户编号">
                <el-input v-model="listQuery.parameter.shbh" :disabled="true" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=shmcRules name="商户名称">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户名称">
                <el-input v-model="listQuery.parameter.shmc" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=shmcRules name="业务系统名称">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="业务系统名称">
                <el-input v-model="listQuery.parameter.shyymc" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
            <span class="detail-header"> 运营公司信息</span>
            <ValidationProvider :rules=gsmcRules name="公司名称">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="公司名称" style="margin-top:20px;">
                <el-input v-model="listQuery.parameter.gsmc" :disabled="isUpdate" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=shmcRules name="联系人姓名">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系人姓名">
                <el-input v-model="listQuery.parameter.lxr" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric|digits:11" name="联系电话">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系电话">
                <el-input v-model="listQuery.parameter.sjh" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|email" name="联系邮箱">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系邮箱">
                <el-input v-model="listQuery.parameter.yxdz" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="公司注册地址">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="公司注册地址" >
                <el-select v-model="xzqhbh1" @change="selectXZQHBH1" :disabled="isSee" placeholder="省">
                  <el-option
                    v-for="item in OptionsXZQHBH1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </ValidationProvider>
            <el-form-item >
            <el-select  v-model="xzqhbh2" @change="selectXZQHBH2" :disabled="isXzqhbh" placeholder="市">
              <el-option
                v-for="item in OptionsXZQHBH2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item >
            <el-select v-model="xzqhbh3" placeholder="县" :disabled="isXzqhbh" >
              <el-option
                v-for="item in OptionsXZQHBH"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <ValidationProvider :rules=gsdzRules name="详细地址">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="详细地址">
                <el-input v-model="listQuery.parameter.gsdz" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <div v-show="isXTdlmm">
              <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
              <ValidationProvider rules="required" name="系统操作员密码">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
                  <el-input type="password" v-model="xtdlmm" auto-complete="new-password" clearable></el-input>
                </el-form-item>
              </ValidationProvider>
            </div>
          </div>
          <div class="dialog-right" style="width:45%; position: absolute; right:0; top:90px;">
            <span class="detail-header"> 上传商户logo</span>
            <el-upload
              v-show="isXTdlmm"
              class="avatar-uploader"
              action="/"
              ref="shtp"
              :before-upload="beforeAvatarUpload"
              list-type="picture-card"
              :limit="imgLimit"
              :auto-upload="false"
              :on-exceed="handleExceed"
              accept="image/png,image/gif,image/jpg,image/jpeg">
              <img v-if="shtpdz" width="100%" :src="shtpdz" alt="">
              <i v-else class="el-icon-plus" v-show="isXTdlmm"></i>
            </el-upload>
            <div style="width: 150px;height: 120px; margin-top: 10px;" v-show="isSee">
                <img v-if="shtpdz" width="100%" :src="shtpdz" alt="" >
            </div>
            <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:90%"></div>
            <span class="detail-header" >管理员账号信息</span>
            <ValidationProvider :rules="dlmcRules" name="商户管理员账号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="商户管理员账号" style="margin-top:20px;">
                <el-input v-model="listQuery.parameter.dlmc" :disabled="isUpdate" placeholder="至少6位，字母数字下划线" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules="dlmmRules" name="管理员账号密码" vid="管理员账号密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="管理员账号密码">
                <el-input type="password" v-model="dlmm" auto-complete="new-password" placeholder="至少8位，必须含字母与数字" :disabled="isSee" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|confirmed:管理员账号密码" name="确认账号密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="确认账号密码">
                <el-input type="password" v-model="dlmmdlmm" auto-complete="new-password" clearable :disabled="isSee"></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="账号当前状态">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="账号当前状态">
                <el-radio v-model="listQuery.parameter.sfqy" :disabled="isSee" label="1">启用</el-radio>
                <el-radio v-model="listQuery.parameter.sfqy" :disabled="isSee" label="0">禁用</el-radio>
              </el-form-item>
            </ValidationProvider>
            <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:90%"></div>
          </div>
          <div class="footer-btn" v-show="isXTdlmm">
            <el-button type="primary" @click="validate().then(saveData)" >确定</el-button>
            <el-button type="primary" plain class="btn-second" @click="cancelModal" >取消</el-button>
          </div>
        </el-form>
      </ValidationObserver>
    </el-dialog>
</template>
<script>
  import {fetchShopInfo, fetchShopShbh, UpdateSaveData, AddSaveData} from "@/api/system/shop";
  import { fetchXZQHBHList, checkXTPassword } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: 'commonShopDialog',
    components: {
      ValidationObserver,
      ValidationProvider
    },
    props:{
      visible: {
        type: Boolean,
        default: false
      },
      idVal: {
        type: Number,
        default: -1
      },
      dialogType: {
        type: Number,
        default:1
      }
    },
    data () {
      return {
        appendToBody:true,
        labelposition:'left',
        isUpdate:false,
        isSee:false,
        isXzqhbh:false,
        isSeeSure:true,
        imageUrl: '',
        OptionsXZQHBH1:[],
        OptionsXZQHBH2:[],
        OptionsXZQHBH:[],
        xzqhbh1:'',
        xzqhbh2:'',
        xzqhbh3:'',
        dlmm:'',
        xtdlmm:'',
        dlmmdlmm:'',
        isXTdlmm:true,
        imgLimit:1,
        dialogVisible:false,
        listQuery:{
          parameter:{
            shid:'',
            shbh:'',
            shmc:'',
            shyymc:'',
            lxr:'',
            sjh:'',
            yxdz:'',
            gsdz:'',
            sfqy:'1',
            dlmm:'',
            xzqhbh:'',
            yhid:'',
            gsid:''
          }
        },
        shtpdz:'',
        dlmmRules:{//登陆密码校验
          required: true,
          min: 8 ,
          regex: /\d.*[a-zA-Z]|[a-zA-Z].*\d/
        },
        dlmcRules:{
          required: true,
          min: 6,
          regex: /^[a-zA-Z0-9_]+$/
        },
        shmcRules:{
          required: true,
          max: 10,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        gsmcRules:{
          required: true,
          max: 20,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        gsdzRules:{
          required: true,
          max: 60,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        listQueryUp:{}
      }
    },
    created(){
      if(this.dialogType === 0) this.getShopShbh();
      if(this.dialogType === 1) this.getShopInfo(this.idVal);
      if(this.dialogType === 2) this.getShopInfo(this.idVal);
      this.getXZQHBHList()
    },
    methods: {
      //获取列表默认数据
      getShopInfo(shid){
        fetchShopInfo(shid).then(response => {
          this.listQuery.parameter.shbh = response.result.shbh;
          this.listQuery.parameter.shmc = response.result.shmc;
          this.listQuery.parameter.shyymc = response.result.shyymc;
          this.listQuery.parameter.gsmc = response.result.gsmc;
          this.listQuery.parameter.lxr = response.result.lxr;
          this.listQuery.parameter.sjh = response.result.sjh;
          this.listQuery.parameter.yxdz = response.result.yxdz;
          this.listQuery.parameter.gsdz = response.result.gsdz;
          this.listQuery.parameter.dlmc = response.result.dlmc;
          this.listQuery.parameter.yhid = response.result.yhid;
          this.listQuery.parameter.gsid = response.result.gsid;
          this.shtpdz = response.result.shtpdz;
          this.dlmm = '1234qwer';
          this.dlmmdlmm = '1234qwer';
          this.listQuery.parameter.sfqy = String(response.result.sfqy);
          if(response.result.xzqhList.length === 1){
            this.xzqhbh1 = response.result.xzqhList[0].label;
            this.xzqhbh11 = response.result.xzqhList[0].key;
          }
          if(response.result.xzqhList.length === 2){
            this.xzqhbh1 = response.result.xzqhList[0].label;
            this.xzqhbh2 = response.result.xzqhList[1].label;
            this.xzqhbh11 = response.result.xzqhList[0].key;
            this.xzqhbh12 = response.result.xzqhList[1].key;
          }
          if(response.result.xzqhList.length === 3){
            this.xzqhbh1 = response.result.xzqhList[0].label;
            this.xzqhbh2 = response.result.xzqhList[1].label;
            this.xzqhbh3 = response.result.xzqhList[2].label;
            this.xzqhbh11 = response.result.xzqhList[0].key;
            this.xzqhbh12 = response.result.xzqhList[1].key;
            this.xzqhbh13 = response.result.xzqhList[2].key;
          }
        }).catch((err) => {
            console.log(err)
        })
      },
      getShopShbh(){
        fetchShopShbh().then(response => {
          this.listQuery.parameter.shbh = response.result;
        }).catch((err) => {
          console.log(err)
        })
      },

      //省
      getXZQHBHList(){
        fetchXZQHBHList().then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH1.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 市
      selectXZQHBH1(){
        this.xzqhbh2 = '';
        this.xzqhbh3 = '';
        this.isXzqhbh = false;
        this.OptionsXZQHBH2 = []
        fetchXZQHBHList(this.xzqhbh1).then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH2.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //县
      selectXZQHBH2(){
        this.OptionsXZQHBH = []
        fetchXZQHBHList(this.xzqhbh2).then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      beforeAvatarUpload(file) {
        this.listQueryUp.append('shtp',file);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleExceed(files, fileList) {//图片上传超过数量限制
        this.$message.error('上传图片不能超过1张!');
      },
      saveData(){
        //去除输入框的空格
        this.listQuery.parameter.shbh = this.listQuery.parameter.shbh.trim();
        this.listQuery.parameter.yxdz = this.listQuery.parameter.yxdz.trim();

        if(this.dialogType === 0){
          if(this.xzqhbh3 !== ''){
            this.listQuery.parameter.xzqhbh = this.xzqhbh3
          }
          if(this.xzqhbh3 === '' && this.xzqhbh2 !== ''){
            this.listQuery.parameter.xzqhbh = this.xzqhbh2
          }
          if(this.xzqhbh3 === '' && this.xzqhbh2 === '' ){
            this.listQuery.parameter.xzqhbh = this.xzqhbh1
          }
          this.listQuery.parameter.shtp = this.shtp;
          this.listQuery.parameter.dlmm = this.dlmm
        }else if(this.dialogType === 2){
          //如果更改
          if(this.xzqhbh3 !== ''){
            this.listQuery.parameter.xzqhbh = this.xzqhbh3
          }
          if(this.xzqhbh3 === '' && this.xzqhbh2 !== ''){
            this.listQuery.parameter.xzqhbh = this.xzqhbh2
          }
          if(this.xzqhbh3 === '' && this.xzqhbh2 === '' ){
            this.listQuery.parameter.xzqhbh = this.xzqhbh1
          }
          //如果不更改
          if(isNaN(this.xzqhbh3) === true){
            this.listQuery.parameter.xzqhbh = this.xzqhbh13
          }
          if(this.xzqhbh3 === '' && isNaN(this.xzqhbh2) === true){
            this.listQuery.parameter.xzqhbh = this.xzqhbh12
          }
          if(this.xzqhbh3 === '' && this.xzqhbh2 === '' && isNaN(this.xzqhbh1) === true){
            this.listQuery.parameter.xzqhbh = this.xzqhbh11
          }
          this.listQuery.parameter.shid = this.idVal;
          this.listQuery.parameter.shtp = this.shtp;
          if(this.dlmm !== '1234qwer'){
            this.listQuery.parameter.dlmm = this.dlmm;
          }
        }

        this.listQueryUp = new FormData(); //创建form对象
        this.listQueryUp.append('body', new Blob([JSON.stringify(this.listQuery)], {type: "application/json"}));

        //验证系统操作员密码
          checkXTPassword(this.xtdlmm).then(response => {
            if (response.code === 0) {
              this.saveAllData();
            }
          }).catch((err) => {
            console.log(err)
          })
        this.$refs.shtp.submit();
      },
      //保存
      saveAllData(){
        if(this.dialogType === 0){
          AddSaveData(this.listQueryUp).then(response => {
            if(response.code === 0){
              this.$message({
                message: response.message,
                type:'success'
              });
              this.$parent.getList();
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          })
        }else if(this.dialogType === 2){
          UpdateSaveData(this.listQueryUp).then(response => {
            if(response.code === 0 ){
              this.$message({
                message:response.message,
                type:'success'
              });
              this.$parent.getList();
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          })
        }else{
          this.cancelModal()
        }
      },

      //修改标题
      dialogTitle () {
        let dialogTitle1 = '';
        if(this.dialogType === 0){
          dialogTitle1 = '增加商户'
        }else if(this.dialogType === 1){
          dialogTitle1 = '查看商户';
          this.isUpdate = true;
          this.isSee = true;
          this.isXzqhbh = true;
          this.isXTdlmm = false
        }else{
          dialogTitle1 = '修改商户';
          this.isUpdate = true;
          this.isXzqhbh = true
        }
        return dialogTitle1;
      },
      //关闭弹窗
      cancelModal(){
        this.$emit('update:visible', false);
      },

    }
}
</script>
<style lang="less">

.dialog-right{
  .avatar-uploader{
    text-align: center;
    margin: 27px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    font-weight: bold;
    color: #61bafe;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
}
</style>
