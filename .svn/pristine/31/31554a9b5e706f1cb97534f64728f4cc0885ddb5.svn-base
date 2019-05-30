<template>
    <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="100px">
          <div style="width:52%; height: 340px">
            <ValidationProvider :rules="dlmcRules" name="员工编号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="员工编号">
                <el-input v-model="listQuery.parameter.glybh" :disabled=isUpdate clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="人员类别">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="人员类别">
                <el-select v-model="listQuery.parameter.yhlx">
                  <el-option
                    v-for="item in OptionsYHLX"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules="dlmcRules" name="PDA账号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="PDA账号">
                <el-input v-model="listQuery.parameter.dlmc" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules="dlmmRules" name="账号密码" vid="账号密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="账号密码" >
                <el-input type="password" v-model="dlmm" auto-complete="new-password" placeholder="至少8位，包含字母与数字" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|confirmed:账号密码" name="密码确认">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="密码确认">
                <el-input type="password" v-model="dlmmdlmm" auto-complete="new-password" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
          </div>
          <div class="dialog-right" style="width:48%; position: absolute; right:0; top:84px;">
            <ValidationProvider rules="required" name="所属公司">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属公司">
                <el-select v-model="listQuery.parameter.gsid">
                  <el-option
                    v-for="item in Options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=zsmcRules name="姓名">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="姓名">
                <el-input v-model="listQuery.parameter.zsmc" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="性别">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="性别">
                <el-radio v-model="listQuery.parameter.sex" label="1">男</el-radio>
                <el-radio v-model="listQuery.parameter.sex" label="2">女</el-radio>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric|max:3|between:1,127" name="年龄">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="年龄">
                <el-input v-model="listQuery.parameter.age" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric|digits:11" name="手机号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="手机号">
                <el-input v-model="listQuery.parameter.sjh" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required" name="状态">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="状态">
                <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
                <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
              </el-form-item>
            </ValidationProvider>
          </div>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData)">确定</el-button>
            <el-button class="btn-second" @click="cancelModal" type="primary" plain>取消</el-button>
          </div>
        </el-form>
      </ValidationObserver>
    </el-dialog>
</template>
<script>
    import { fetchStaffInfo, AddSaveData, UpdateSaveData } from "@/api/StaffManage/Staff";
    import { fetchSSGSList, fetchDictlist } from '@/api/CommonSelectApi'
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
        name: 'commonStaffDialog',
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
            OptionsYHLX:[],
            Options:[],
            imageUrl: '',
            dlmm:'',
            dlmmdlmm:'',
            listQuery:{
              parameter:{
                glybh:'',
                yhlx:'',
                dlmc:'',
                gsid:'',
                zsmc:'',
                sex:'1',
                age:'',
                sfqy:'1',
                dlmm:'',
                id:''
              }
            },
            isUpdate:false,
            dlmmRules:{//登陆密码校验
              required: true,
              min: 8 ,
              regex: /\d.*[a-zA-Z]|[a-zA-Z].*\d/
            },
            dlmcRules:{
              required: true,
                max: 20,
                regex: /^[a-zA-Z0-9_]+$/
            },
            zsmcRules:{
              required: true,
              max: 10,
              regex: /^[a-zA-Z_·\u4e00-\u9fa5]+$/
            }
          }
        },

        created(){
          if(this.dialogType === 1) this.getStaffInfo(this.idVal);
          this.handleSelectSSGS();
          this.handleSelectDict()
        },
        methods: {
          getStaffInfo(id){
            fetchStaffInfo(id).then(response => {
              this.listQuery.parameter.glybh = response.result.glybh;
              this.listQuery.parameter.yhlx = response.result.yhlx;
              this.listQuery.parameter.dlmc = response.result.dlmc;
              this.listQuery.parameter.gsid = Number(response.result.gsid);
              this.listQuery.parameter.zsmc = response.result.zsmc;
              this.listQuery.parameter.sex = String(response.result.sex);
              this.listQuery.parameter.age = response.result.age;
              this.listQuery.parameter.sfqy = String(response.result.sfqy);
              this.listQuery.parameter.sjh = response.result.sjh;
              this.dlmm = '1234qwer';
              this.dlmmdlmm = '1234qwer'
            }).catch((err) => {
                console.log(err)
            })
          },
          //运营公司下拉框
          handleSelectSSGS(){
            fetchSSGSList().then(response => {
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
          //人员类别
          handleSelectDict(){
            fetchDictlist(109).then(response => {
              for (let i = 0; i < response.result.length; i++) {
                this.OptionsYHLX.push({
                  label: response.result[i].label,//此处是展示内容
                  value: Number(response.result[i].key) //此处是后台需要的值
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          },

          //修改标题
          dialogTitle () {
            let dialogTitle1 = "";
            if (this.dialogType === 0) {
              dialogTitle1 = "员工新增";
            } else if (this.dialogType === 1) {
              dialogTitle1 = "员工修改";
              this.isUpdate = true
            }
            return dialogTitle1;
          },
          //  添加保存
          saveData(){
            this.listQuery.parameter.glybh = this.listQuery.parameter.glybh.trim();
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
              this.listQuery.parameter.id = this.idVal
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
          //关闭弹窗
          cancelModal(){
            this.$emit('update:visible', false);
          }
        }
    }
</script>
<style lang="less">

</style>
