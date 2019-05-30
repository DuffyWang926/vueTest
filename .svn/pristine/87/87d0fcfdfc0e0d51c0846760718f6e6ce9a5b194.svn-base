<template>
  <el-dialog :title="dialogTitle()" class="lg-dialog add-approved" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider :rules=sjRules name="开始时间">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="开始时间" style="padding-bottom: 18px">
            <el-input v-model="listQuery.parameter.tcsjdks" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider :rules=sjRules name="结束时间">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="结束时间" style="padding-bottom: 18px">
            <el-input v-model="listQuery.parameter.tcsjdjs" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required|numeric" name="免费时长">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="免费时长" style="padding-bottom: 18px">
            <el-input v-model="listQuery.parameter.mfsc" clearable></el-input>（分钟）
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider :rules=fl name="最高价格">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="最高价格" style="padding-bottom: 18px">
            <el-input v-model="zgjg" clearable></el-input>（元）
          </el-form-item>
        </ValidationProvider>

    <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:99%"></div>
    <el-form ref="dataForm" name="dataForm" style="width:100%">
    <el-table
      :data="tableData"
      class="add-approved-table"
      style="width: 100%">
      <el-table-column  prop="tcjtsjdks" label="阶梯开始时间（分钟）">
        <template slot-scope="scope">
          <el-form-item>
            <el-input v-model="scope.row.tcjtsjdks" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="tcjtsjdjs" label="阶梯结束时间（分钟）">
        <template slot-scope="scope">
          <el-form-item>
            <el-input v-model="scope.row.tcjtsjdjs" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="dwsc" label="单位时长（分钟）">
        <template slot-scope="scope">
          <el-form-item>
            <el-input v-model="scope.row.dwsc" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="dwjg" label="单位价格（元）">
        <template slot-scope="scope">
          <el-form-item>
            <el-input v-model="scope.row.dwjg" clearable></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="handle"
        label="删除"
        width="50">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="removeApproved(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="text-align: center">
      <el-button class="lg-button" @click="addApproved">新增</el-button>
    </el-row>
    </el-form>
    <div class="footer-btn">
      <el-button type="primary" @click="validate().then(saveDataTime)">确定</el-button>
    </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import { SaveApprovedTime, fetchApprovedUpdateInfo, updateApprovedTime } from '@/api/ParkingInRoad/ChargeRule/Approved'

  export default {
    name: "AddCommonAddApprovedDialog",
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
        labelposition:'left',
        tableData:[],
        zgjg:'',
        listQuery:{
          parameter:{
            sfbzid:'',
            id:'',
            tcsjdks:'',
            tcsjdjs:'',
            mfsc:'',
            zgjg:'',
            info:[]
          }
        },
        fl:{
          required:true,
          regex:/^[0-9.]+$/
        },
        sjRules:{
          required:true,
          regex:/^[0-9-:]+$/
        }
      }
    },
    created(){
      if(this.msg.type === 1){
        this.getInfo(this.msg.Data)
      }
      console.log(this.msg.Data)
    },
    methods:{
      removeApproved(index){
        this.tableData.splice(index, 1)
      },
      addApproved(){
        let newValue = {
          tcjtsjdks: '',
          tcjtsjdjs: '',
          dwsc: '',
          dwjg: '',
        };
        this.tableData.push(newValue);
      },
      saveDataTime(){
        this.listQuery.parameter.zgjg = this.zgjg * 100;
        if(this.msg.type === 0){
          for( let i = 0; i < this.tableData.length; i++ ){
            this.tableData[i].dwjg = this.tableData[i].dwjg * 100
          }
          this.listQuery.parameter.info = this.tableData;
          this.listQuery.parameter.sfbzid = this.msg.Data;
          SaveApprovedTime(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message: response.message,
                type:'success'
              });
              this.cancelModal();
              // this.$emit('getTimeList');
              this.$emit('ee')
            }
          }).catch((err) => {
            console.log(err)
          })
        }else if(this.msg.type === 1){
          this.listQuery.parameter.info = this.tableData;
          this.listQuery.parameter.id = this.msg.Data;
          updateApprovedTime(this.listQuery).then(response => {
            if(response.code ===0 ){
              this.$message({
                message: response.message,
                type:'success'
              });
              this.cancelModal();
              // this.$emit('getTimeList');
              this.$emit('ee')
            }
          })
        }
      },

      getInfo(id){
        fetchApprovedUpdateInfo(id).then(response => {
          this.listQuery.parameter.tcsjdks = response.result.tcsjdks;
          this.listQuery.parameter.tcsjdjs = response.result.tcsjdjs;
          this.listQuery.parameter.mfsc = response.result.mfsc;
          this.zgjg = response.result.zgjg/100;
          this.tableData = response.result.info;
          for( let i = 0; i < this.tableData.length; i++ ){
            this.tableData[i].dwjg = this.tableData[i].dwjg / 100
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      //修改标题
      dialogTitle() {
        let dialogTitle1 = "";
        if (this.msg.type === 0) {
          dialogTitle1 = "新增收费时段";
        } else if (this.msg.type === 1) {
          dialogTitle1 = "修改收费时段";
        }
        return dialogTitle1;
      },
      cancelModal(){
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less">
  .add-approved{
    .el-dialog__body {
      .el-table {
        &::before {
          height: 0
        }
      }
      .el-table td, .el-table th.is-leaf {
        border-bottom: none;
      }
      .add-approved-table{
        .el-form-item{
          .el-input{
            width: 220px;
          }
        }
      }
      .lg-button{
        margin-top:10px;
        padding:12px 450px;
      }
      .el-form-item{
        margin-bottom: 0 !important;
      }
    }

  }

</style>
