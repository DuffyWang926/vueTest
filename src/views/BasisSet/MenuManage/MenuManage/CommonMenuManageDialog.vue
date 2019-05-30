<template>
  <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
    <el-row :gutter="2">
      <el-col :span="5">资源名称：</el-col>
      <el-col :span="6">
        <el-input
          v-model="listQuery.parameter.zymc"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="5">资源icon：</el-col>
      <el-col :span="6">
        <el-input
          v-model="listQuery.parameter.zytb"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="5">资源url：</el-col>
      <el-col :span="6">
        <el-input
          v-model="listQuery.parameter.zydz"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="5">权限：</el-col>
      <el-col :span="6">
        <el-input
          v-model="listQuery.parameter.zyqx"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="5">排序：</el-col>
      <el-col :span="6">
        <el-input
          v-model="listQuery.parameter.zysx"
          clearable>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="5">资源类型：</el-col>
      <el-col :span="6">
        <el-radio v-model="listQuery.parameter.zylx" label="1">菜单</el-radio>
        <el-radio v-model="listQuery.parameter.zylx" label="2">按钮</el-radio>
      </el-col>
    </el-row>
    <div class="footer-btn">
      <el-button @click="cancelModal">取消</el-button>
      <el-button class="btn-second" @click="saveData">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { fetchMenuManageInfo, AddSaveData, UpdateSaveData } from "@/api/BasisSet/MenuManage"
  export default {
    name: "CommonMenuManageDialog",
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
      return{
        appendToBody:true,
        listQuery:{
          parameter:{
            zymc:'',
            zytb:'',
            zydz:'',
            zyqx:'',
            zysx:'',
            fid:'',
            id:'',
            zylx:''
          }
        }
      }
    },
    created(){
      if(this.msg.type === 2){
        this.getMenuManageInfo(this.msg.Data.id)
      }
    },
    methods:{
      getMenuManageInfo(id){
        fetchMenuManageInfo(id).then(response => {
          this.listQuery.parameter.zymc = response.result.zymc;
          this.listQuery.parameter.zytb = response.result.zytb;
          this.listQuery.parameter.zydz = response.result.zydz;
          this.listQuery.parameter.zyqx = response.result.zyqx;
          this.listQuery.parameter.zysx = response.result.zysx;
          this.listQuery.parameter.zylx = String(response.result.zylx);
        }).catch((err) => {
          console.log(err)
        })
      },

      saveData(){
        if(this.msg.type === 0){
          this.listQuery.parameter.fid = 0
          AddSaveData(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.getTreeList();
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          });
        }else if(this.msg.type === 1){
          this.listQuery.parameter.fid = this.msg.Data.id
          AddSaveData(this.listQuery).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.getTreeList();
              this.cancelModal()
            }
          }).catch((err) => {
            console.log(err)
          });
        } else if(this.msg.type === 2){
          this.listQuery.parameter.id = this.msg.Data.id
          UpdateSaveData(this.listQuery).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$parent.getTreeList();
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
          dialogTitle1 = '新增一级目录菜单'
        } else if (this.msg.type === 1) {
          dialogTitle1 = '新增当前目录子菜单'
        }  else if (this.msg.type === 2) {
          dialogTitle1 = '修改菜单'
        }
        return dialogTitle1;
      },
    }
  }
</script>

<style lang="less">

</style>
