<template>
  <el-dialog title="处理会员投诉" class="sm-sm-dialog currentComplainDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <el-row :gutter="12">
      <el-col :span="4">用户账号</el-col>
      <el-col :span="16">{{hyzh}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">关联订单</el-col>
      <el-col :span="16">{{gldd}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">投诉时间</el-col>
      <el-col :span="16" v-if="this.cjsj">{{cjsj|time}}</el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="4">问题详述</el-col>
      <el-col :span="16">{{tsnr}}</el-col>
    </el-row>
    <div style=" border-bottom: 1px solid #dedede; margin-bottom:15px; width:95%"></div>

    <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider rules="required" name="处理方式">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="处理方式">
            <el-select v-model="listQuery.parameter.clfs" filterable placeholder="请选择处理方式">
              <el-option
                v-for="item in OptionsCLFS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="处理备注">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="处理备注">
            <el-input v-model="listQuery.parameter.ms" type="textarea" resize="none" clearable></el-input>
          </el-form-item>
        </ValidationProvider>

        <div class="footer-btn">
          <el-button type="primary" @click="validate().then(handle)">处理</el-button>
        </div>
      </el-form>
    </ValidationObserver>

  </el-dialog>
</template>

<script>
  import { fetchCurrentComplainInfo, HandleUserComplaint } from '@/api/ParkingInRoad/ComplainManage/CurrentComplain'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import  EnumberateSelect  from '@/filters/index'

  export default {
    name: "CurrentComplainDialog",
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
        default: function() {
          return {};
        }
      }
    },
    data(){
      return{
        appendToBody:true,
        listQuery:{
          parameter:{
            clfs:'',
            ms:'',
            id:''
          }
        },
        tsnr:'',
        gldd:'',
        cjsj:'',
        hyzh:'',
        OptionsCLFS:EnumberateSelect.CLFS,
      }
    },
    created(){
      this.getCurrentComplainInfo(this.msg.Data.id)
    },
    methods:{
      getCurrentComplainInfo(id){
        fetchCurrentComplainInfo(id).then(response => {
          this.tsnr = response.result.tsnr;
          this.gldd = response.result.gldd;
          this.cjsj = response.result.cjsj;
          this.hyzh = response.result.hyzh
        }).catch((err) => {
          console.log(err)
        })
      },

      handle(){
        this.listQuery.parameter.id = this.msg.Data.id;
        HandleUserComplaint(this.listQuery).then(response => {
          if(response.code === 0 ){
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
      },
      cancelModal(){
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less" >
  .currentComplainDialog{
    .el-textarea__inner{
      width:190px !important;
    }
    .el-row{
      padding:0
    }
  }
</style>
