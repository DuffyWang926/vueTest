<template>
  <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="100px">
        <div style="width:52%">
          <ValidationProvider rules="required" name="运营公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="运营公司">
              <el-select v-model="listQuery.parameter.gsid" placeholder="请选择运营公司" >
                <el-option
                  v-for="item in OptionsSSGS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>

          <ValidationProvider rules="required" name="设备种类">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备种类">
              <el-select v-model="listQuery.parameter.sbzlid" disabled placeholder="请选择设备种类">
                <el-option
                  v-for="item in OptionsSBZL"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:100%"></div>

          <ValidationProvider rules="required|alpha_num|max:32" name="S/N编码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="S/N编码">
              <el-input v-model="listQuery.parameter.sbbh" :disabled="isUpdate" placeholder="请输入设备S/N码" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required|alpha_num|max:32" name="设备编号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备编号">
              <el-input v-model="listQuery.parameter.sbbh" disabled placeholder="自动和S/N同步" clearable> </el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=sbmcRules name="设备名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备名称">
              <el-input v-model="listQuery.parameter.sbmc" placeholder="请输入设备名称" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
        </div>

        <div class="dialog-right" style="width:48%; position: absolute; right:0; top:138px;">
          <ValidationProvider rules="required" name="设备类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备类型">
              <el-select v-model="listQuery.parameter.sblxid" placeholder="请选择设备类型">
                <el-option
                  v-for="item in OptionsSBLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <ValidationProvider :rules=sbxh name="品牌型号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="品牌型号">
              <el-input v-model="listQuery.parameter.sbxh" placeholder="请输入品牌型号" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="制造商">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="制造商">
              <el-select v-model="listQuery.parameter.sbcs" placeholder="请选择制造商"  @change="handleChange">
                <el-option
                  v-for="item in OptionsZZS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
        </div>
        <div class="footer-btn">
          <el-button type="primary" @click="validate().then(saveData)">确定</el-button>

          <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>

        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
import { fetchParkingEquipmentInfo, AddSaveData, UpdateSaveData, fetchParkingEquipmentCWBH, AddSaveCWData } from "@/api/Resources/ParkingEquipment";
import { fetchSSGSList, fetchSSQYlist, fetchXZQHBHList, fetchDLlist, fetchDictlist } from '@/api/CommonSelectApi'
import  EnumberateSelect  from '@/filters/index'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: "CommonParkingEquipmentDialog",
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
  data() {
    return {
      appendToBody: true,
      labelposition:'left',
      OptionsSSGS:[],
      OptionsSBLX:[],
      OptionsSBZL:EnumberateSelect.SBZL,
      OptionsZZS:[],
      listQuery:{
        parameter:{
          gsid:'',
          sbzlid:1,
          sblxid:'',
          sbbh:'',
          sbcs:'',
          sbmc:'',
          sbxh:'',
          id : ''
        }
      },
      isUpdate: false,
      sbmcRules:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
      },
      sbxh:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z0-9_-·\u4e00-\u9fa5]+$/
      }
    }
  },
  created() {
    // 获取数据默认信息
    if(this.msg.type === 1) this.getParkingEquipmentInfo(this.msg.Data.id)
    this.handleSelectSSGS();
    this.handleSelectDict();
    this.handleSelectDictZZS();
  },
  methods: {
    getParkingEquipmentInfo(id){
      fetchParkingEquipmentInfo(id).then(response => {
        this.listQuery.parameter.gsid = response.result.gsid;
        this.listQuery.parameter.sbzlid = response.result.sbzlid;
        this.listQuery.parameter.sblxid = response.result.sblxid;
        this.listQuery.parameter.sbbh = response.result.sbbh;
        this.listQuery.parameter.sbcs = Number(response.result.sbcs);
        this.listQuery.parameter.sbmc = response.result.sbmc;
        this.listQuery.parameter.sbxh = response.result.sbxh;
      }).catch((err) => {
        console.log(err)
      })
    },

    //运营公司下拉框
    handleSelectSSGS(){
      fetchSSGSList().then(response => {
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
    handleChange(){},
    //设备类型
    handleSelectDict(){
      fetchDictlist(106).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsSBLX.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    //设备制造商
    handleSelectDictZZS(){
      fetchDictlist(107).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsZZS.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 确定按钮
    saveData() {
      this.listQuery.parameter.sbbh = this.listQuery.parameter.sbbh.trim();
      this.listQuery.parameter.sbmc = this.listQuery.parameter.sbmc.trim();
      this.listQuery.parameter.sbxh = this.listQuery.parameter.sbxh.trim();
      if(this.msg.type === 0){
        AddSaveData(this.listQuery).then(response => {
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

      }else if(this.msg.type === 1){
        this.listQuery.parameter.id = this.msg.Data.id;
        UpdateSaveData(this.listQuery).then(response => {
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
      }else{
        this.cancelModal()
      }
    },
    //修改标题
    dialogTitle() {
      let dialogTitle1 = "";
      if (this.msg.type === 0) {
        dialogTitle1 = "设备新增";
      } else if (this.msg.type === 1) {
        dialogTitle1 = "设备修改";
        this.isUpdate = true
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


</style>
