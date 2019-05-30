<template>
  <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="100px">
        <div style="width:52%">
          <ValidationProvider rules="required" name="所属公司">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属公司">
              <el-select :disabled="isLook" v-model="listQuery.parameter.gsid" placeholder="请选择所属公司">
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
              <el-select :disabled="isLook" v-model="listQuery.parameter.sbzl" placeholder="请选择设备种类">
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
          <ValidationProvider rules="required|alpha_num|max:40" name="设备编号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备编号">
              <el-input :disabled="isUpdate" v-model="listQuery.parameter.pdabh" placeholder="请输入设备编号" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=sbmcRules name="设备名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备名称">
              <el-input :disabled="isLook" v-model="listQuery.parameter.pdamc" placeholder="请输入设备名称" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=sbxh name="品牌型号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="品牌型号">
              <el-input :disabled="isLook" v-model="listQuery.parameter.pdaxh" placeholder="请输入品牌型号" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:100%"></div>
          <ValidationProvider rules="required" name="是否启用">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="是否启用">
              <el-select :disabled="isLook" v-model="listQuery.parameter.sfqy" placeholder="是否启用">
                <el-option
                  v-for="item in OptionsSFQY"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div class="dialog-right" style="width:48%; position: absolute; right:0; top:138px;">
            <ValidationProvider rules="required" name="设备类型">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="设备类型">
                <el-select :disabled="isLook" v-model="listQuery.parameter.pdalx" placeholder="请选择设备种类"  @change="handleChange">
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
            <ValidationProvider rules="required|numeric|min:15|max:17" name="IMEI">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="IMEI">
                <el-input :disabled="isLook" v-model="listQuery.parameter.imei" placeholder="请输入移动设备识别码" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|max:15|numeric" name="IMSI">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="IMSI">
                <el-input :disabled="isLook" v-model="listQuery.parameter.imsi" placeholder="请输入国际移动用户识别码" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric|digits:11" name="手机卡号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="手机卡号">
                <el-input :disabled="isLook" v-model="listQuery.parameter.simcard" placeholder="请输入手机卡号" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          </div>
        </div>
        <div class="footer-btn" v-show="isSee">
          <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
          <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
        </div>

       </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
import { fetchHandheldTerminalInfo, AddSaveData, UpdateSaveData } from "@/api/Resources/HandheldTerminal";
import { fetchSSGSList, fetchDictlist } from '@/api/CommonSelectApi'
import  EnumberateSelect  from '@/filters/index'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: "CommonHandheldTerminalDailog",
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
      isLook: true,
      isSee: true,
      isUpdate: false,
      OptionsSSGS:[],
      OptionsSBZL:EnumberateSelect.SBZL,
      OptionsSBLX:[],
      OptionsSFQY:EnumberateSelect.SFQY,
      listQuery:{
        parameter:{
          pdalx:'',
          gsid:'',
          sbzl:2,
          pdabh:'',
          pdamc:'',
          pdaxh:'',
          imei:'',
          imsi:'',
          simcard:'',
          sfqy:'',
          id:''
        }
      },
      sbmcRules:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z_·\u4e00-\u9fa5]+$/
      },
      sbxh:{
        required: true,
        max: 10 ,
        regex:/^[a-zA-Z_-·\u4e00-\u9fa5]+$/
      }
    }
  },
  created() {
    // 获取数据默认信息
   if(this.msg.type !== 0){
     this.getHandheldTerminalInfo(this.msg.Data.id,this.msg.Data.gsmc)
   }
   this.handleSelectSSGS();
   this.handleSelectDict()
  },
  methods: {
    //获取详情
    getHandheldTerminalInfo(id, gsmc){
      fetchHandheldTerminalInfo(id, gsmc).then(response => {
        this.listQuery.parameter.pdalx = response.result.pdalx;
        this.listQuery.parameter.gsid = response.result.gsid;
        this.listQuery.parameter.sbzl = response.result.sbzl;
        this.listQuery.parameter.pdabh = response.result.pdabh;
        this.listQuery.parameter.pdamc = response.result.pdamc;
        this.listQuery.parameter.pdaxh = response.result.pdaxh;
        this.listQuery.parameter.imei = response.result.imei;
        this.listQuery.parameter.imsi = response.result.imsi;
        this.listQuery.parameter.simcard = response.result.simcard;
        this.listQuery.parameter.sfqy = response.result.sfqy;
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
    //设备类型
    handleSelectDict(){
      fetchDictlist(108).then(response => {
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
    handleChange(item) {
      //this.fgsid = item;
    },
    // 确定按钮
    saveData() {
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
        this.listQuery.parameter.id = this.msg.Data.id
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
        dialogTitle1 = "新增手持终端";
        this.isLook = false;
      } else if (this.msg.type === 1) {
        dialogTitle1 = "修改手持终端";
        this.isLook = false;
        this.isUpdate = true;
      } else if (this.msg.type === 2) {
        dialogTitle1 = "查看手持终端";
        this.isUpdate = true;
        this.isSee = false;
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
