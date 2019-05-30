<template>
  <el-dialog title="添加角色" class="sm-sm-dialog roleDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider :rules=jsmcRules name="角色名称">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="角色名称">
            <el-input v-model="listQuery.parameter.jsmc" clearable></el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider :rules=msRules name="角色描述">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="角色描述">
            <el-input
              type="textarea"
              :rows="2"
              resize="none"
              v-model="listQuery.parameter.jsms"
              placeholder="请输入内容">
            </el-input>
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
  import { AddSaveData } from '@/api/BasisSet/RoleManage'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
      name: "addRoleManageDialog",
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
      data() {
        return {
          appendToBody:true,
          listQuery:{
            parameter:{
              jsmc:'',
              ms:''
            }
          },
          msRules:{
            required: true,
            max: 50 ,
            regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
          },
          jsmcRules:{
            max: 10 ,
            regex:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
          },
        }
      },
      methods: {
        //保存
        saveData(){
          this.listQuery.parameter.jsmc = this.listQuery.parameter.jsmc.trim();
          this.listQuery.parameter.jsms = this.listQuery.parameter.jsms.trim();
          AddSaveData(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message:'保存成功',
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
          this.$emit('update:visible', false);
        }
      }
    }
</script>

<style lang="less">
  .roleDialog{
    .el-textarea__inner{
      width:190px !important;
    }
  }
</style>
