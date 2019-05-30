<template>
    <el-dialog title="新增道路" class="sm-sm-dialog" :visible.sync="visible" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
      <ValidationObserver ref="observer">
        <el-form ref="form" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required|alpha_num|max:20" name="道路编号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="道路编号">
              <el-input v-model="listQuery.parameter.dlbh" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=dlmcRules name="道路名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="道路名称">
              <el-input v-model="listQuery.parameter.dlmc" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="所属区域">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="所属区域">
              <el-select v-model="listQuery.parameter.ywqybh">
                <el-option
                  v-for="item in Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
  import {AddSaveData} from "../../../../api/BasisSet/RoadManage";
  import {fetchSSQYlist} from "@/api/CommonSelectApi"
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "AddRoadManageDialog",
    components: {
      ValidationObserver,
      ValidationProvider
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
        listQuery:{
          parameter:{
            dlbh:'',
            dlmc:'',
            ywqybh:''
          }
        },
        Options:[],
        appendToBody:true,
        dlmcRules:{
          required: true,
          max: 20 ,
          regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
        }
      }
    },
    created(){
      this.handleSelect()
    },
    methods:{
      //所属区域下拉框
      handleSelect(){
        fetchSSQYlist().then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.Options.push({
              label: response.result[i].label,//此处是展示内容
              value: Number(response.result[i].key) //此处是后台需要的值
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //新增保存
      saveData(){
        this.listQuery.parameter.dlbh = this.listQuery.parameter.dlbh.trim();
        this.listQuery.parameter.dlmc = this.listQuery.parameter.dlmc.trim();
        AddSaveData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.$parent.getList();
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        });
      },
      cancelModal(){
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style scoped>

</style>
