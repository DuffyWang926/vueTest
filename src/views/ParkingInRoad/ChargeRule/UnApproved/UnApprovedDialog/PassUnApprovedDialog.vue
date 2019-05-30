<template>
  <el-dialog title="收费规则审核" class="sm-sm-dialog el-row-style" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
      <el-row :gutter="12">
        <el-col :span="4">规则名称</el-col>
        <el-col :span="6">{{djmc}}</el-col>
      </el-row>
    <el-row :gutter="12">
      <el-col :span="4">规则类型</el-col>
      <el-col :span="6">{{sflx|sflx}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">日期类型</el-col>
      <el-col :span="6">{{gzrlx|gzrlx}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">创建者</el-col>
      <el-col :span="6">{{cjyhmc}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">创建时间</el-col>
      <el-col :span="6" v-if="this.cjsj">{{cjsj|time}}</el-col>
    </el-row>
    <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:60%"></div>

    <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider rules="required" name="系统操作员密码">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
            <el-input v-model="xtdlmm" type="password" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <div class="footer-btn">
          <el-button type="primary" @click="validate().then(passApprove)">通过</el-button>
        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { fetchApprovedInfo, passApproved } from '@/api/ParkingInRoad/ChargeRule/Approved'
  import { checkXTPassword } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
        name: "PassUnApprovedDialog",
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
      data(){
        return{
          appendToBody:true,
          sflx:'',
          gzrlx:'',
          djmc:'',
          cjsj:'',
          xtdlmm:'',
          cjyhmc:'',
          shzt:0
        }
      },
      created(){
        this.getInfo(this.msg.Data.id)
      },
      methods:{
        getInfo(id){
          fetchApprovedInfo(id).then(response => {
            this.sflx = response.result.sflx;
            this.djmc = response.result.djmc;
            this.gzrlx = response.result.gzrlx;
            this.cjsj = response.result.cjsj;
            this.cjyhmc = response.result.cjyhmc
          }).catch((err) => {
            console.log(err)
          })
        },
        //校验系统密码
        passApprove(){
          checkXTPassword(this.xtdlmm).then(response => {
            if (response.code === 0) {
              this.passApproveData()
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        passApproveData(){
          passApproved(this.msg.Data.id,this.shzt = 1).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
            }
            this.cancelModal()
          }).catch((err) => {
            console.log(err)
          })
        },
        cancelModal() {
          this.$emit("update:visible", false);
        },
      }
    }
</script>

<style lang="less">
  .el-row-style{
    .el-row{
      padding:0
    }
  }
</style>
