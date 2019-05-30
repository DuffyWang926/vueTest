<template>
    <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
      <ValidationObserver ref="observer">
        <el-form ref="form" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required" name="所属公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属公司">
              <el-select v-model="listQuery.parameter.gsid" :disabled="isShow">
                <el-option
                  v-for="item in OptionsSSGS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|alpha_num|max:15|min:5" name="用户账号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="用户账号">
              <el-input v-model="listQuery.parameter.dlmc" :disabled="isShow" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules="dlmmRules" name="账号密码" vid="账号密码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="账号密码">
              <el-input type="password" v-model="dlmm" auto-complete="new-password" clearable placeholder="至少8位，包含字母与数字" ></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|confirmed:账号密码" name="确认密码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="确认密码" >
              <el-input type="password" v-model="dlmmdlmm" auto-complete="new-password" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="用户角色">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="用户角色">
              <el-select v-model="listQuery.parameter.jsid">
                <el-option
                  v-for="item in OptionsJSMC"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px; width:44%" ></div>
          <ValidationProvider :rules=yhxmRules name="用户姓名">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="用户姓名">
              <el-input v-model="listQuery.parameter.yhxm" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="numeric|digits:11" name="联系电话">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="联系电话">
              <el-input v-model="listQuery.parameter.sjh" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="当前状态">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="当前状态">
              <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
              <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <ValidationProvider rules="required" name="系统操作员密码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
              <el-input type="password" auto-complete="new-password" v-model="xtdlmm" clearable></el-input>
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
  import { fetchBackUserInfo, UpdateSaveData, AddSaveData } from '@/api/BasisSet/BackUser'
  import { fetchSSGSList, fetchJSMCList, checkXTPassword } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
      name: "CommonBackUserDialog",
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
      data(){
        return{
          appendToBody:true,
          isShow:true,
          msg: {},
          listQuery:{
            parameter:{
              gsid:'',
              dlmc:'',
              dlmm:'',
              jsid:'',
              yhxm:'',
              sjh:'',
              sfqy:'',
              id:''
            }
          },
          dlmm:'',
          dlmmdlmm:'',
          xtdlmm:'',
          OptionsSSGS:[],
          OptionsJSMC:[],
          dlmmRules:{//登陆密码校验
            required: true,
             min: 8 ,
             regex: /\d.*[a-zA-Z]|[a-zA-Z].*\d/
          },
          //用户姓名
          yhxmRules:{
            required: true,
            max: 10 ,
            regex:/^[a-zA-Z_·\u4e00-\u9fa5]+$/
          }
        }
      },

      mounted(){
        this.$nextTick(function () {
          if(this.dialogType === 0){
            this.listQuery.parameter.dlmc = '';
            this.listQuery.parameter.dlmm = ''
          }
        })
      },
      created() {
        if(this.dialogType === 1) this.getBackUserInfo(this.idVal);
        this.handleSelectSSGS();
        this.handleSelectJSMC()
      },
      methods: {
        getBackUserInfo(id) {
          fetchBackUserInfo(id).then(response => {
            this.listQuery.parameter.gsid = response.result.gsid;
            this.listQuery.parameter.dlmc = response.result.dlmc;
            this.dlmm = '1234qwer';
            this.dlmmdlmm = '1234qwer';
            this.listQuery.parameter.jsid = response.result.jsid;
            this.listQuery.parameter.yhxm = response.result.yhxm;
            this.listQuery.parameter.sjh = response.result.sjh;
            this.listQuery.parameter.sfqy = String(response.result.sfqy)
          }).catch((err) => {
            console.log(err)
          })
        },
        handleSelectSSGS(){
          fetchSSGSList(1).then(response => {
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
        handleSelectJSMC(){
          fetchJSMCList({}).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.OptionsJSMC.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },

        //保存
        saveData(){
          this.xtdlmm = this.xtdlmm.trim();
          //修改页面验证系统操作员密码
          checkXTPassword(this.xtdlmm).then(response => {
            if (response.code === 0) {
              this.saveAllData();
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        saveAllData() {
          this.listQuery.parameter.dlmc = this.listQuery.parameter.dlmc.trim();
          this.dlmm = this.dlmm.trim();
          this.dlmmdlmm = this.dlmmdlmm.trim();
          this.listQuery.parameter.yhxm = this.listQuery.parameter.yhxm.trim();
          this.listQuery.parameter.sjh = this.listQuery.parameter.sjh.trim();
          if(this.dialogType === 0){
            this.listQuery.parameter.dlmm = this.dlmm;
            AddSaveData(this.listQuery).then(response => {
              if(response.code === 0 ){
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.$parent.getList();
                this.cancelModal()
              }
            }).catch((err) => {
              console.log(err)
            });
          }else if(this.dialogType === 1){
            this.listQuery.parameter.id = this.idVal;
            if(this.dlmm !== '1234qwer'){
                this.listQuery.parameter.dlmm = this.dlmm;
            }
            UpdateSaveData(this.listQuery).then(response => {
              if (response.code === 0) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.$parent.getList();
                this.cancelModal()
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        },
        //修改标题
        dialogTitle() {
          let dialogTitle1 = '';
          if (this.dialogType === 0) {
            dialogTitle1 = '新增后台用户';
            this.isShow = false
          } else if (this.dialogType === 1) {
            dialogTitle1 = '修改后台用户'
          }
          return dialogTitle1;
        },

        //  关闭弹框
        cancelModal() {
          this.$emit('update:visible', false)
        }
      }

    }
</script>

<style scoped>

</style>
