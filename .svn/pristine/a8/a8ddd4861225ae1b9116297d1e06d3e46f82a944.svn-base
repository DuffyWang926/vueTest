<template>
  <el-dialog title="字典分类" class="sm-dialog" :visible.sync="visible" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">

    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <ValidationProvider rules="required|numeric" name="识别码">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="识别码">
            <el-input
              placeholder="请输入识别码"
              v-model="listQuery.parameter.sbm"
              clearable>
            </el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="字典分类名称">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="字典分类名称">
            <el-input
              placeholder="请输入字典分类名称"
              v-model="listQuery.parameter.zdmc"
              clearable>
            </el-input>
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider rules="required" name="是否启用">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="是否启用">
            <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
            <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
          </el-form-item>
        </ValidationProvider>
        <div class="footer-btn">
          <el-button @click="cancelModal">取消</el-button>
          <el-button class="btn-second" @click="validate().then(saveData)">确定</el-button>
        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { AddSaveTypeData} from "@/api/BasisSet/DictionaryManage"
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "AddDictionaryType",
    components: {
      ValidationObserver,
      ValidationProvider
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        appendToBody:true,
        labelposition:'left',
        listQuery:{
          parameter:{
            sbm:'',
            zdmc:'',
            sfqy:'1'
          }
        }
      }
    },
    methods:{
      saveData(){
        AddSaveTypeData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.$parent.getType();//更新父组件列表
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        });
      },
      cancelModal(){
        this.$emit('update:visible', false);
      }

    }
  }
</script>

<style scoped>

</style>
