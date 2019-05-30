<template>
  <el-dialog :title="dialogTitle()" class="sm-sm-dialog dictionarymanage-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider :rules=zdmcRules name="字典名称">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="字典名称">
            <el-input
              placeholder="请输入字典名称"
              v-model="listQuery.parameter.zdmc"
              clearable>
            </el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="状态">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="状态">
            <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
            <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
          </el-form-item>
        </ValidationProvider>
        <div class="footer-btn">
          <el-button @click="validate().then(saveData)" type="primary">确定</el-button>
          <el-button @click="cancelModal" class="btn-second" type="primary" plain>取消</el-button>
        </div>
      </el-form>
    </ValidationObserver>

  </el-dialog>
</template>

<script>
  import { AddSaveData, UpdateSaveData, fetchDictionaryManageInfo } from "@/api/BasisSet/DictionaryManage"
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "CommonDictionaryManageDialog",
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
        type: Object,
        default:function(){
          return {};
        }
      }
    },
    data(){
      return{
        appendToBody:true,
        labelposition:'left',
        listQuery:{
          parameter:{
            zdmc: '',
            sfqy:'1',
            id:'',
            sbm:'',
            fid:''
          }
        },
        zdmcRules:{
          required: true,
          regex:/^[a-zA-Z0-9-，。！？\u4e00-\u9fa5]+$/
        }
      }
    },
    created(){
      if(this.msg.type === 1) this.getDictionaryManageInfo(this.msg.Data2.id);
      if(this.msg.type === 0){
        this.listQuery.parameter.fid = this.msg.Data1.id;
        this.listQuery.parameter.sbm = this.msg.Data1.sbm;
      }
    },
    methods:{
      getDictionaryManageInfo(id) {
        this.listQuery.parameter.id = id;
        fetchDictionaryManageInfo(id).then(response => {
          this.listQuery.parameter.zdmc = response.result.zdmc;
          this.listQuery.parameter.sfqy = String(response.result.sfqy)
        }).catch((err) => {
          console.log(err)
        })
      },

      saveData(){
        if(this.msg.type === 0){
          AddSaveData(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.selectDicTypeList(this.msg.Data1);//更新父组件列表
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          });
        }else if(this.msg.type === 1){
          UpdateSaveData(this.listQuery).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.selectDicTypeList(this.msg.Data1);//更新父组件列表
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          });
        }
      },
      cancelModal(){
        this.$emit('update:visible', false);
      },

      //修改标题
      dialogTitle() {
        let dialogTitle1 = '';
        if (this.msg.type === 0) {
          dialogTitle1 = '新增字典'
        } else if (this.msg.type === 1) {
          dialogTitle1 = '修改字典'
        }
        return dialogTitle1;
      },
    }
  }
</script>

<style lang="less">
  .dictionarymanage-dialog{
    .el-tabs__item{font-size:16px;line-height: 0}
    .el-tab-pane{
      .el-row{padding-left:0}
    }
  }
</style>
