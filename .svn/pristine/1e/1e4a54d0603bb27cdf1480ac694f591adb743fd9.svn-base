<template>
  <el-dialog :title="dialogTitle()" class="lg-dialog roadInparkingDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" :rules="cctpRules" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <div style="width:52%">
          <ValidationProvider rules="required|alpha_num|max:20" name="停车场编号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场编号">
              <el-input v-model="listQuery.parameter.ccbh" :disabled="isCCBH" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="停车场类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场类型">
              <el-select v-model="listQuery.parameter.cclx" disabled >
                <el-option
                  v-for="item in OptionsCCLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="运营公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="运营公司">
              <el-select v-model="listQuery.parameter.yygsid" placeholder="请选择运营公司" >
                <el-option
                  v-for="item in OptionsSSGS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="所属区域">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属区域">
              <el-select v-model="listQuery.parameter.xnqybh" @change="handleSelectDL" placeholder="请选择所属区域">
                <el-option
                  v-for="item in OptionsSSQY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:100%"></div>
          <ValidationProvider rules="required" name="部署区域">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="部署区域">
              <el-select v-model="xzqhbh1" @change="selectXZQHBH1" placeholder="省">
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
            <el-select v-model="xzqhbh2" @change="selectXZQHBH2" placeholder="市" :disabled="isXzqhbh">
              <el-option
                v-for="item in OptionsXZQHBH2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="xzqhbh3" placeholder="县" :disabled="isXzqhbh">
              <el-option
                v-for="item in OptionsXZQHBH"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <ValidationProvider :rules=ccdzRules name="详细地址">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="详细地址">
              <el-input v-model="listQuery.parameter.ccdz" placeholder="请输入详细地址" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <ValidationProvider rules="required" name="服务范围">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="服务范围">
              <el-select v-model="listQuery.parameter.fufw" placeholder="请选择">
                <el-option
                  v-for="item in OptionsDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="区域类别">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="区域类别">
              <el-select v-model="listQuery.parameter.cclb" placeholder="请选择">
                <el-option
                  v-for="item in OptionsCCLB"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="是否启用">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="是否启用">
              <el-select v-model="listQuery.parameter.sfqy" placeholder="请选择">
                <el-option
                  v-for="item in OptionsSFQY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>

          <ValidationProvider rules="required|numeric|max:11" name="车位数量">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设置停车位数量">
              <el-input v-model="listQuery.parameter.cwsl" placeholder="请输入停车位数量" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=fl name="预付金额">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="预付金额">
              <el-input v-model="yfje" clearable></el-input>元
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="收费标准">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="收费标准">
              <el-select
                v-model="sfbz"
                multiple
                placeholder="请选择收费标准">
                <el-option
                  v-for="item in OptionsSFBZ"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
        </div>
        <div class="dialog-right" style="width:48%; position: absolute; right:0; top:91px;">
          <ValidationProvider :rules=ccdzRules name="停车场名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场名称">
              <el-input v-model="listQuery.parameter.ccmc" placeholder="请输入停车场名称" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=ccjcRules name="停车场简称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场简称">
              <el-input v-model="listQuery.parameter.ccjc" placeholder="停车场简称" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="入账公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="入账公司">
              <el-select v-model="listQuery.parameter.rzgsid" placeholder="请选择入账公司">
                <el-option
                  v-for="item in OptionsRZGS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="所属道路">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属道路">
              <el-select v-model="dlmc" :disabled="isUpdate" placeholder="请选择所属道路">
                <el-option
                  v-for="item in OptionsDL"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <ValidationProvider rules="required|between:73, 135|max:20" name="经度(x)">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="经度(x)">
              <el-input v-model="listQuery.parameter.cczbjd" placeholder="请输入经度" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|between:4, 53|max:20" name="纬度(y)">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="纬度(y)">
              <el-input v-model="listQuery.parameter.cczbwd" placeholder="请输入纬度" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <el-form-item label="停车场图片" prop="cctp">
            <el-upload
              class="avatar-uploader"
              action="/"
              ref="cctp"
              :before-upload="beforeAvatarUpload"
              list-type="picture-card"
              :limit="imgLimit"
              :auto-upload="false"
              :on-exceed="handleExceed"
              accept="image/png,image/gif,image/jpg,image/jpeg">
              <img v-if="cctp" width="100%" :src="cctp" alt="">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <ValidationProvider :rules=msRules name="备注信息">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="备注信息">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="listQuery.parameter.ms">
              </el-input>
            </el-form-item>
          </ValidationProvider>
        </div>
        <div style="text-align:center;margin-top: -15px">
          <el-button type="primary" @click="validate().then(saveData)">确定</el-button>
          <el-button type="primary" plain @click="cancelModal" style="margin-left: 30px">取消</el-button>
        </div>
      </el-form>
    </ValidationObserver>

  </el-dialog>
</template>

<script>
import { fetchRoadInParkingInfo, AddSaveData, UpdateSaveData } from "@/api/Resources/RoadInParkingLot";
import { fetchParkingSSGSList, fetchParkingRZGSList, fetchSSQYlist, fetchXZQHBHList, fetchDLlist, fetchSFZZlist, fetchDictlist } from '@/api/CommonSelectApi'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import  EnumberateSelect  from '@/filters/index'
export default {
  name: "CommonRoadInParkingLotDialog",
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
  data() {
    return {
      appendToBody: true,
      labelposition:'left',
      isUpdate:true,
      isXzqhbh:false,
      isCCBH:false,
      textarea:'',
      OptionsSSGS:[],
      OptionsSSQY:[],
      OptionsDL:[],
      OptionsXZQHBH1:[],
      OptionsXZQHBH2:[],
      OptionsXZQHBH:[],
      OptionsCCLB:EnumberateSelect.CCLB,
      OptionsCCLX:EnumberateSelect.CCLX,
      OptionsSFQY:EnumberateSelect.SFQY,
      OptionsSFBZ: [],
      OptionsDict: [],
      OptionsRZGS: [],
      xzqhbh1:'',
      xzqhbh2:'',
      xzqhbh3:'',
      dlmc:'',
      yfje:'',
      cctp:'',
      cctpdz:'',
      sfbz:[],
      imgLimit:1,
      listQuery:{
        parameter:{
          cclx:1,
          ccbh:'',
          yygsid:'',
          xzqhbh:'',
          xnqybh:'',
          ccdz:'',
          fufw:'',
          cclb:'',
          cwsl:'',
          yfje:'',
          sfbz:[],
          ccmc:'',
          ccjc:'',
          rzgsid:'',
          dlid:'',
          cczbjd:'',
          cczbwd:'',
          ms:'',
          id:''
        }
      },
      listQueryUp:{},
      cctpRules: { // 表单验证
        cctp: [
          { required: true, message: '请上传图片' }
        ],
      },
      ccdzRules:{
        required: true,
        max: 25 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      },
      ccjcRules:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      },
      fl:{
        required:true,
        regex:/^[0-9.%]+$/
      },
      msRules:{
        max: 100 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      }
    };
  },
  created() {
    // 获取数据默认信息
    if(this.msg.type === 1) this.getRoadInParkingInfo(this.msg.Data.id, this.msg.Data.yygs)
    this.handleSelectSSGS();
    this.handleSelectRZGS();
    this.handleSelectSSQY();
    this.handleSelectSFBZ();
    this.handleSelectDict();
    this.getXZQHBHList()
  },
  methods: {
    //获取详情
    getRoadInParkingInfo(id, yygs){
      fetchRoadInParkingInfo(id, yygs).then(response => {
        this.listQuery.parameter.cclx = response.result.cclx;
        this.listQuery.parameter.ccbh = response.result.ccbh;
        this.listQuery.parameter.yygsid = response.result.yygsid;
        this.listQuery.parameter.xnqybh = response.result.xnqybh;
        this.listQuery.parameter.ccdz = response.result.ccdz;
        this.listQuery.parameter.fufw = response.result.fufw;
        this.listQuery.parameter.cclb = response.result.cclb;
        this.listQuery.parameter.cwsl = response.result.cwsl;
        this.yfje = response.result.yfje/100;
        this.listQuery.parameter.ccmc = response.result.ccmc;
        this.listQuery.parameter.ccjc = response.result.ccjc;
        this.listQuery.parameter.rzgsid = response.result.rzgsid;
        this.listQuery.parameter.cczbjd = response.result.cczbjd;
        this.listQuery.parameter.cczbwd = response.result.cczbwd;
        this.cctp = response.result.cctp;
        this.listQuery.parameter.sfqy = response.result.sfqy;
        this.listQuery.parameter.ms = response.result.ms;
        this.sfbz = response.result.sfbz;
        this.dlmc = response.result.dlmc;
        this.dlid = response.result.dlid;

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

    //运营公司下拉框
    handleSelectSSGS(){
      fetchParkingSSGSList().then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsSSGS.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    //入账公司下拉框
    handleSelectRZGS(){
      fetchParkingRZGSList().then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsRZGS.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    //根据运营公司选择道路
    handleSelectDL(){
      this.isUpdate = false;
      this.dlmc = '';
      fetchDLlist(this.listQuery.parameter.xnqybh).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsDL.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //所属区域
    handleSelectSSQY(){
      fetchSSQYlist().then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsSSQY.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
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
    //收费标准
    handleSelectSFBZ(){
      fetchSFZZlist().then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsSFBZ.push({
            label: response.result[i].djmc,//此处是展示内容
            value: Number(response.result[i].id) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //服务范围
    handleSelectDict(){
      fetchDictlist(105).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsDict.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    beforeAvatarUpload(file) {
      this.listQueryUp.append('cctp',file);
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleExceed(files, fileList) {//图片上传超过数量限制
      this.$message.error('上传图片不能超过1张!');
    },

    // 确定按钮
    saveData() {
      this.listQuery.parameter.ccbh = this.listQuery.parameter.ccbh.trim();
      if(this.msg.type === 0){
        if(this.xzqhbh3 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh3
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh2
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 === '' ){
          this.listQuery.parameter.xzqhbh = this.xzqhbh1
        }
        this.listQuery.parameter.cclx = 1;
        this.listQuery.parameter.dlid = this.dlmc;
        this.listQuery.parameter.sfbz = this.sfbz;
        this.listQuery.parameter.yfje = this.yfje * 100;

        this.listQueryUp = new FormData(); //创建form对象
        this.listQueryUp.append('body', new Blob([JSON.stringify(this.listQuery)], {type: "application/json"}));
        AddSaveData(this.listQueryUp).then(response => {
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
      }else if(this.msg.type === 1){
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
        if(isNaN(this.dlmc) === true){
          this.listQuery.parameter.dlid = this.dlid
        }else{
          this.listQuery.parameter.dlid = this.dlmc;
        }
        this.listQuery.parameter.id = this.msg.Data.id;
        this.listQuery.parameter.sfbz = this.sfbz;
        this.listQuery.parameter.yfje = this.yfje * 100;

        this.listQueryUp = new FormData(); //创建form对象
        this.listQueryUp.append('body', new Blob([JSON.stringify(this.listQuery)], {type: "application/json"}));
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
      // this.cctpRules.cctp = [{ required: true, message: '请上传图片' }]
      // console.log(this.$refs.cctp)
      this.$refs.cctp.submit();
    },
    //修改标题
    dialogTitle() {
      let dialogTitle1 = "";
      if (this.msg.type === 0) {
        dialogTitle1 = "停车场新增";
      } else if (this.msg.type === 1) {
        dialogTitle1 = "停车场修改";
        this.isXzqhbh = true;
        this.isCCBH = true;
      }
      return dialogTitle1;
    },
    //  关闭弹框
    cancelModal() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="less">
  .roadInparkingDialog{
    .el-textarea{width:230px}
  }
</style>
