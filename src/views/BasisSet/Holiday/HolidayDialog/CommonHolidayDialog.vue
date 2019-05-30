<template>
  <el-dialog :title="dialogTitle()" class="sm-sm-dialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider :rules=jqmcRules name="节假日名称">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="节假日名称">
            <el-input v-model="listQuery.parameter.jqmc" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="节假日开始时间">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="节假日开始时间">
            <el-date-picker
              v-model="kssj"
              type="date"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="节假日结束时间">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="节假日结束时间">
            <el-date-picker
              v-model="jssj"
              type="date"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="调休上班日期1">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="调休上班日期1">
            <el-date-picker
              v-model="txrq1"
              type="date"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="" name="调休上班日期2">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="调休上班日期2">
            <el-date-picker
              v-model="txrq2"
              type="date"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="当前状态">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="当前状态">
            <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
            <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
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
import {fetchHolidayInfo, AddSaveData, UpdateSaveData} from "@/api/BasisSet/Holiday";
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: "CommonHolidayDialog",
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
      kssj:'',
      jssj:'',
      txrq1:'',
      txrq2:'',
      listQuery:{
        parameter:{
          jqmc:'',
          kssj:'',
          jssj:'',
          txrq1:'',
          txrq2:'',
          sfqy:'1',
          id:''
        }
      },
      jqmcRules:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
      }
    }
  },
  created() {
    // 获取数据默认信息
    if(this.dialogType === 1) this.getHolidayInfo(this.idVal);
  },
  methods: {
    changeTime(){
      console.log(this.listQuery.parameter)
    },

    //获取详情回显
    getHolidayInfo(id) {
      fetchHolidayInfo(id).then(response => {
        this.listQuery.parameter.jqmc = response.result.jqmc;
        this.kssj = response.result.kssj * 1000;
        this.jssj = response.result.jssj * 1000;
        this.txrq1 = response.result.txrq1 * 1000;
        this.txrq2 = response.result.txrq2 * 1000;
        this.listQuery.parameter.sfqy = String(response.result.sfqy)
      }).catch((err) => {
        console.log(err)
      })
    },

    // 确定按钮
    saveData() {
      this.txrq2 = "";
      if( String(this.txrq2)/1000 != null ){this.txrq2 = String(this.txrq2)/1000}
      this.listQuery.parameter.jqmc = this.listQuery.parameter.jqmc.trim();
      this.listQuery.parameter.kssj = String(this.kssj)/1000;
      this.listQuery.parameter.jssj = String(this.jssj)/1000;
      this.listQuery.parameter.txrq1 = String(this.txrq1)/1000;
      // this.listQuery.parameter.txrq2 = String(this.listQuery.parameter.txrq2)/1000;

      if( this.kssj > this.jssj){
        this.$message.error('结束时间应该在开始时间之后');
        this.kssj = '';
        this.jssj = '';
        this.txrq1 = '';
        this.txrq2 = ''
      }else{
        if(this.dialogType === 0){
          AddSaveData(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.getList();
              this.cancelModal()
            }else {
              if (String(this.kssj) != null) {this.kssj = String(this.kssj) * 1000}
              if (String(this.jssj) != null) {this.jssj = String(this.jssj) * 1000}
              if (String(this.txrq1) != null) {this.txrq1 = String(this.txrq1) * 1000}
              if (String(this.txrq2) != null) {this.txrq2 = String(this.txrq2) * 1000}
            }
          }).catch((err) => {
            console.log(err)
          });
        }else if(this.dialogType === 1){
          this.listQuery.parameter.id = this.idVal;
          UpdateSaveData(this.listQuery).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.getList();
              this.cancelModal()
            }else{
              if (String(this.kssj) != null) {this.kssj = String(this.kssj) * 1000}
              if (String(this.jssj) != null) {this.jssj = String(this.jssj) * 1000}
              if (String(this.txrq1) != null) {this.txrq1 = String(this.txrq1) * 1000}
              if (String(this.txrq2) != null) {this.txrq2 = String(this.txrq2) * 1000}
            }
          }).catch((err) => {
            console.log(err)
          });
        }
      }
    },
    //修改标题
    dialogTitle() {
      let dialogTitle1 = "";
      if (this.dialogType === 0) {
        dialogTitle1 = "添加节假日";
      } else if (this.dialogType === 1) {
        dialogTitle1 = "修改节假日";
      }
      return dialogTitle1;
    },
    //  关闭弹框
    cancelModal() {
      this.$emit('update:visible', false)
    }
  }
};
</script>

<style lang="less" scoped>
  .el-date-editor{padding-left: 0; margin-left: 0}
</style>
