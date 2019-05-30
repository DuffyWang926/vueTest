<template>
  <el-dialog title="作废订单" class="sm-dialog order" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div style="width:65%">
      <el-row :gutter="20">
        <el-col :span="8">订单编号</el-col>
        <el-col :span="8">{{ddbh}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">车牌号码</el-col>
        <el-col :span="14">{{hphm}}
          <span class="white" v-if="this.cpys === 5">{{cpys|cpys}}</span>
          <span class="yellow" v-if="this.cpys === 2">{{cpys|cpys}}</span>
          <span class="green" v-if="this.cpys === 3">{{cpys|cpys}}</span>
          <span class="blue" v-if="this.cpys === 1">{{cpys|cpys}}</span>
          <span class="black" v-if="this.cpys === 4">{{cpys|cpys}}</span>
          <span class="other" v-if="this.cpys === 0">{{cpys|cpys}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">停车场</el-col>
        <el-col :span="8">{{ccmc}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">泊位编号</el-col>
        <el-col :span="8">{{cwbh}}</el-col>
      </el-row>
    </div>
    <div style="width:35%; position: absolute; right:0; top:90px; padding-right: 36px">
      <el-row :gutter="20">
        <el-col :span="8">订单总金额</el-col>
        <el-col :span="8">{{ysje}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">已支付金额</el-col>
        <el-col :span="8">{{zfje}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">欠费金额</el-col>
        <el-col :span="8">{{qkje}}</el-col>
      </el-row>
    </div>
    <div style="border-bottom: 1px solid #dedede; margin-bottom:15px; margin-top: 10px; width:85%"></div>
    <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <el-radio v-model="radio" label="1">作废订单</el-radio>
        <ValidationProvider rules="required" name="订单作废原因">
          <el-form-item slot-scope="{ errors }" :error="errors[0]">
            <el-input
              type="textarea"
              :rows="2"
              resize="none"
              placeholder="请输入订单作废原因"
              v-model="zfyy">
            </el-input>
          </el-form-item>
        </ValidationProvider>
         <div style="border-bottom: 1px solid #dedede; margin-bottom:15px; margin-top: 10px; width:85%"></div>
        <ValidationProvider rules="required" name="系统操作员密码">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
            <el-input type="password" auto-complete="new-password" v-model="dlmm" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <div style="text-align: center; padding:20px 0 36px;">
          <el-button type="primary" @click="validate().then(confirmHandle)" style="padding:13px 26px;">确认作废</el-button>
        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import { checkXTPassword } from '@/api/CommonSelectApi'
  import { HandleOrderDiscard } from '@/api/ParkingInRoad/TollManage/CurrentOrders'

  export default {
    name: "HandleCurrentOrdersDialog",
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
        appendToBody: true,
        radio:'1',
        zfyy:'',
        dlmm:'',
        ddbh:'',
        hphm:'',
        ccmc:'',
        cwbh:'',
        qkje:'',
        ysje:'',
        cpys:'',
        zfje:'',
      }
    },
    created(){
      console.log(this.msg.Data);
      this.ddbh = this.msg.Data.ddbh;
      this.hphm = this.msg.Data.hphm;
      this.ccmc = this.msg.Data.ccmc;
      this.cwbh = this.msg.Data.cwbh;
      this.cpys = this.msg.Data.cpys;
      this.qkje = this.msg.Data.qkje/100;
      this.ddbh = this.msg.Data.ddbh;
      this.ysje = this.msg.Data.ysje/100;
      this.zfje = this.msg.Data.zfje/100
    },
    methods:{
      confirmHandle(){
        checkXTPassword(this.dlmm).then(response => {
          if (response.code === 0) {
            HandleOrderDiscard(this.msg.Data.id,this.zfyy).then(response => {
              if(response.code === 0 ){
                this.$message({
                  message:response.message,
                  type:'success'
                });
                this.$parent.getList()
                this.cancelModal()
              }else{
                this.$message.error(response.message);
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      cancelModal(){
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less">
  .order{
    .el-row {
      padding: 12px 0 !important;
      margin: 0 !important;
      .el-col {
        padding-left: 0 !important;
      }
    }
    .white{
      padding:3px 10px 4px;
      border:1px solid #999999;
      font-size: 12px;
      color:#999999;
      border-radius: 3px;
    }
    .yellow{
      padding:3px 10px 4px;
      border:1px solid #fcbe2d;
      font-size: 12px;
      color:#fcbe2d;
      border-radius: 3px;
    }
    .green{
      padding:3px 10px 4px;
      border:1px solid #0dce8c;
      font-size: 12px;
      color:#0dce8c;
      border-radius: 3px;
    }
    .blue{
      padding:3px 10px 4px;
      border:1px solid #219cf4;
      font-size: 12px;
      color:#219cf4;
      border-radius: 3px;
    }
    .black{
      padding:3px 10px 4px;
      border:1px solid #020202;
      font-size: 12px;
      color:#020202;
      border-radius: 3px;
    }
    .other{
      padding:3px 10px 4px;
      border:1px solid #ff4141;
      font-size: 12px;
      color:#ff4141;
      border-radius: 3px;
    }
    .el-tag{
      margin-left:2px;
      height:24px;
      line-height: 22px;
    }
    .el-textarea__inner{
      width:82% !important
    }
  }

</style>
