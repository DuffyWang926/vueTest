<template>
    <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
      <ValidationObserver ref="observer">
        <el-form ref="form" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="" name="上级公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="上级公司">
              <el-select v-model="listQuery.parameter.fgsid" disabled>
                <el-option
                  v-for="item in Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules="gsmcRules" name="公司名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="公司名称">
              <el-input v-model="listQuery.parameter.gsmc" :disabled="isUpdate" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules="lxrRules" name="联系人名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系人名称">
              <el-input v-model="listQuery.parameter.lxr" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|numeric|digits:11" name="联系电话">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系电话">
              <el-input v-model="listQuery.parameter.sjh" clearable></el-input>
            </el-form-item>
          </ValidationProvider>

          <ValidationProvider rules="required|email" name="联系邮箱">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系邮箱">
              <el-input v-model="listQuery.parameter.yxdz" clearable></el-input>
            </el-form-item>
          </ValidationProvider>

          <ValidationProvider rules="required" name="公司注册地址">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="公司注册地址" >
              <el-select v-model="xzqhbh1"  placeholder="省" @change="selectXZQHBH1">
                <el-option
                  v-for="item in OptionsXZQHBH1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider>
            <el-form-item slot-scope="{ errors }" :error="errors[0]" >
              <el-select v-model="xzqhbh2"  placeholder="市" @change="selectXZQHBH2" :disabled="isUpdate">
                <el-option
                  v-for="item in OptionsXZQHBH2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider>
            <el-form-item slot-scope="{ errors }" :error="errors[0]" >
              <el-select v-model="xzqhbh3" placeholder="县" :disabled="isUpdate">
                <el-option
                  v-for="item in OptionsXZQHBH"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=gsdzRules name="详细地址">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="详细地址">
              <el-input v-model="listQuery.parameter.gsdz" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
            <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
          </div>

        </el-form>
      </ValidationObserver>
  </el-dialog>

</template>

<script>
import { UpdateSaveData, AddSaveData,fetchOperateInfo } from "@/api/BasisSet/Operate";
import { fetchSSGSList, fetchXZQHBHList } from '@/api/CommonSelectApi'
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: "CommonOperateDialog",
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
  data() {
    return {
      appendToBody: true,
      isUpdate:false,
      OptionsXZQHBH1: [],
      OptionsXZQHBH2: [],
      OptionsXZQHBH: [],
      Options: [],
      xzqhbh1:'',
      xzqhbh2:'',
      xzqhbh3:'',
      listQuery: {
        parameter: {
          fgsid: "",
          gsmc: "",
          lxr: "",
          sjh: "",
          yxdz: "",
          gsdz: "",
          xzqhbh: "",
          id:""
        }
      },
      email:'',
      password:'',
      gsmcRules:{
        required: true,
        max: 20 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      },
      lxrRules:{
        required: true,
        max: 5 ,
        regex:/^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
      },
      gsdzRules:{
        required: true,
        max: 60 ,
        regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
      }
    };
  },
  created() {
    // 获取数据默认信息
      if(this.dialogType === 1) this.getOperateInfo(this.idVal);

      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      if(this.dialogType === 0){
        this.listQuery.parameter.fgsid = sysUser.gsid
      }
      this.getXZQHBHList();
      this.handleSelect()
  },
  methods: {
    //获取列表默认数据
    getOperateInfo(id){
      fetchOperateInfo(id).then(response => {
        this.listQuery.parameter.fgsid = response.result.fgsid;
        this.listQuery.parameter.gsmc = response.result.gsmc;
        this.listQuery.parameter.lxr = response.result.lxr;
        this.listQuery.parameter.sjh = response.result.sjh;
        this.listQuery.parameter.yxdz = response.result.yxdz;
        this.listQuery.parameter.gsdz = response.result.gsdz;
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
    //上级公司
    handleSelect(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      fetchSSGSList(sysUser.gsid).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.Options.push({
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
            value: Number(response.result[i].key)
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
      this.isUpdate = false;
      this.OptionsXZQHBH2 = []
      fetchXZQHBHList(this.xzqhbh1).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsXZQHBH2.push({
            label: response.result[i].label,
            value: Number(response.result[i].key)
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
            value: Number(response.result[i].key)
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 确定按钮
    saveData() {
      this.listQuery.parameter.gsmc = this.listQuery.parameter.gsmc.trim();
      this.listQuery.parameter.lxr = this.listQuery.parameter.lxr.trim();
      this.listQuery.parameter.sjh = this.listQuery.parameter.sjh.trim();
      this.listQuery.parameter.yxdz = this.listQuery.parameter.yxdz.trim();
      this.listQuery.parameter.gsdz = this.listQuery.parameter.gsdz.trim();

      if (this.dialogType === 0) {//添加按钮确定
        if(this.xzqhbh3 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh3
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh2
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 === '' ){
          this.listQuery.parameter.xzqhbh = this.xzqhbh1
        }
        AddSaveData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message:response.message,
              type:'success'
            });
            this.$parent.getList();
            this.cancelModal()
          }else{
            this.$message.error(response.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      } else if (this.dialogType === 1) {
        this.listQuery.parameter.id = this.idVal;
        //如果更改公司注册地址
        if(this.xzqhbh3 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh3
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 !== ''){
          this.listQuery.parameter.xzqhbh = this.xzqhbh2
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 === '' ){
          this.listQuery.parameter.xzqhbh = this.xzqhbh1
        }
        //如果不更改公司注册地址
        if(isNaN(this.xzqhbh3) === true){
          this.listQuery.parameter.xzqhbh = this.xzqhbh13
        }
        if(this.xzqhbh3 === '' && isNaN(this.xzqhbh2) === true){
          this.listQuery.parameter.xzqhbh = this.xzqhbh12
        }
        if(this.xzqhbh3 === '' && this.xzqhbh2 === '' && isNaN(this.xzqhbh1) === true){
          this.listQuery.parameter.xzqhbh = this.xzqhbh11
        }
        UpdateSaveData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message:response.message,
              type:'success'
            });
            this.$parent.getList();
            this.cancelModal()
          }else{
            this.$message.error(response.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
      //修改标题
      dialogTitle () {
        let dialogTitle1 = '';
        if(this.dialogType === 0){
            dialogTitle1 = '新增运营公司'
        }else if(this.dialogType === 1){
            dialogTitle1 = '修改运营公司';
            this.isUpdate = true
        }
        return dialogTitle1;
      },
    //  关闭弹框
    cancelModal() {
      this.$emit("update:visible", false);
    }
  },
}

</script>

<style lang="less">

</style>
