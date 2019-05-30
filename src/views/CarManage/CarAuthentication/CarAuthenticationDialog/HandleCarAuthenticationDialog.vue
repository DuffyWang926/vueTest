<template>
  <el-dialog title="车辆认证" class="lg-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <div style="width:60%;">
      <img :src="xsztp" width="90%" height="400px;">
    </div>
    <div class="dialog-right" style="width:37%; position: absolute; right:0; top:90px;">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <span style="font-size: 16px; font-weight: 600">行驶证信息</span>
          <el-form-item label="号牌号码" style="margin-top:20px;">
            <el-input v-model="listQuery.parameter.hphm" :disabled="true" clearable></el-input>
          </el-form-item>
          <el-form-item label="号牌颜色">
            <el-select v-model="listQuery.parameter.cpys" :disabled="true">
              <el-option
                v-for="item in OptionsCPYS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="识别号码">
            <el-input v-model="listQuery.parameter.sbhm" :disabled="true" clearable></el-input>
          </el-form-item>
          <ValidationProvider rules="required" name="车辆类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车辆类型">
              <el-select v-model="listQuery.parameter.clzl" placeholder="请选择车辆类型">
                <el-option
                  v-for="item in OptionsCLZL"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=yhxmRules name="所有人">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所有人">
              <el-input v-model="listQuery.parameter.yhmc" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=addressRules name="住址">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="住址">
              <el-input v-model="listQuery.parameter.address" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=ccppRules name="品牌">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="品牌">
              <el-input v-model="listQuery.parameter.ccpp" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=addressRules name="型号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="型号">
              <el-input v-model="listQuery.parameter.ccxh" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="使用性质">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="使用性质">
              <el-select v-model="listQuery.parameter.syxz" placeholder="请选择使用性质">
                <el-option
                  v-for="item in OptionsSYXZ"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|alpha_num|digits:17" name="车辆识别代码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车辆识别代码">
              <el-input v-model="listQuery.parameter.clsbdh" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|alpha_num|digits:7" name="发动机代码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="发动机代码">
              <el-input v-model="listQuery.parameter.fdjhm" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="注册日期">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="注册日期">
              <el-date-picker
                v-model="listQuery.parameter.zcrq"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="发证日期">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="发证日期">
              <el-date-picker
                v-model="listQuery.parameter.fzrq"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=njyxqRules name="年检有效期">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="年检有效期">
              <el-input v-model="listQuery.parameter.njyxq" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div class="footer-btn" style="text-align: left; padding-top: 0">
            <el-button @click="validate().then(saveData)" type="success">通过，认证成功</el-button>
            <el-button @click="removeData" type="danger">拒绝，认证失败</el-button>
          </div>
        </el-form>
      </ValidationObserver>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchCarAuthenticationInfo, CarauthenticationCarReply } from '@/api/CarManage/CarAuthentication'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import  EnumberateSelect  from '@/filters/index'
  export default {
    name: "HandleCarAuthenticationDialog",
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
    },
    data(){
      return{
        appendToBody:true,
        labelposition:'left',
        xsztp:'',
        OptionsSYXZ:EnumberateSelect.SYXZ,
        OptionsCPYS:EnumberateSelect.CPYS,
        OptionsCLZL:EnumberateSelect.CLZL,
        fzrq:'',
        zcrq:'',
        listQuery:{
          parameter:{
            shzt:'',
            hphm:'',
            cpys:'',
            sbhm:'',
            clzl:'',
            yhmc:'',
            address:'',
            ccpp:'',
            ccxh:'',
            syxz:'',
            clsbdh:'',
            fzrq:'',
            njyxq:'',
            fdjhm:'',
            zcrq:'',
            id:''
          }
        },
        //用户姓名
        yhxmRules:{
          required: true,
          max: 10 ,
          regex:/^[a-zA-Z_·\u4e00-\u9fa5]+$/
        },
        addressRules:{
          required: true,
          max: 20,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        ccppRules:{
          required: true,
          max: 10,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        njyxqRules:{
          required: true,
          max: 5,
          regex: /^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        }
      }
    },
    created(){
      this.getCarAuthenticationInfo(this.idVal)
    },
    methods:{
      getCarAuthenticationInfo(id) {
        fetchCarAuthenticationInfo(id).then(response => {
          this.listQuery.parameter.hphm = response.result.hphm;
          this.listQuery.parameter.cpys = response.result.cpys;
          this.listQuery.parameter.sbhm = response.result.sbhm;
          this.xsztp = response.result.xsztp;
        }).catch((err) => {
          console.log(err)
        })
      },
      saveData(){
        this.listQuery.parameter.shzt = 1;//审核成功
        this.listQuery.parameter.id = this.idVal;
        CarauthenticationCarReply(this.listQuery).then(response => {
          if(response.code === 0){
            this.$message({
              message: response.message,
              type:'success'
            });
            this.$parent.getList()
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      removeData(){
        this.listQuery.parameter.shzt = 2;//审核失败
        this.listQuery.parameter.id = this.idVal;
        CarauthenticationCarReply(this.listQuery).then(response => {
          if(response.code === 0){
            this.$message({
              message: response.message,
              type:'success'
            });
            this.$parent.getList()
            this.cancelModal()
          }
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
