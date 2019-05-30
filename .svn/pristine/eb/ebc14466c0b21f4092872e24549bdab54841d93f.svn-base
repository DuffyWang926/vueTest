<template>
   <el-dialog title="角色权限配置" class="sm-dialog rolemanageDialog" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
     <div>
       <el-row style="height:420px; overflow-x: hidden; overflow-y: scroll;">
        <el-tree
          ref="tree"
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          check-on-click-node
          :check-strictly="true"
          :expand-on-click-node="false"
          :default-checked-keys="checkedIdArr"
          :default-expanded-keys="expandArr"
          :props="defaultProps">
        </el-tree>
       </el-row>
       <div style="border-bottom: 1px solid #dedede; margin-top:30px; margin-bottom:15px;width:60%"></div>
       <ValidationObserver ref="observer">
         <el-form ref="form" slot-scope="{ validate }" label-width="120px">
           <ValidationProvider rules="required" name="系统操作员密码">
             <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
               <el-input type="password" v-model="dlmm" auto-complete="new-password" clearable></el-input>
             </el-form-item>
           </ValidationProvider>
           <div class="footer-btn">
             <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
             <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
           </div>
         </el-form>
       </ValidationObserver>
     </div>
  </el-dialog>
</template>

<script>
    import { fetchRoleManageInfo, RoleSaveData } from '@/api/BasisSet/RoleManage'
    import { checkXTPassword } from '@/api/CommonSelectApi'
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
      name: "CommonRoleManageDialog",
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
          appendToBody:true,
          checkedIdArr: [],
          expandArr: [],
          data2: [],
          toData: [],
          dlmm: '',
          true:true,
          defaultProps: {
              children: 'children',
              label: 'label'
          }
        }
      },
      created() { this.getRoleManageInfo(this.idVal) },
      methods: {
        getRoleManageInfo(id){
          fetchRoleManageInfo(id).then(response => {
            let treeData = response.result
            // console.log('dataTree',treeData);
            //设置树
            let getJsonTree = function (data, parentId) {
              let itemArr = [];
              for (let i = 0; i < data.length; i++) {
                let node = data[i];
                if (node.pId === parentId) {
                  let newNode = {};
                  newNode.id = node.id;
                  newNode.label = node.name;
                  if(getJsonTree(data, node.id).length){
                      newNode.children = getJsonTree(data, node.id);
                  }
                  itemArr.push(newNode);
                }
              }
              return itemArr;
            };
            // console.log('树结构',getJsonTree(treeData,"0"));
            //设置选中展开 checkedIdArr expandArr
            for(let i =0;i<treeData.length;i++){
              if(treeData[i].checked){
                this.checkedIdArr.push(treeData[i].id);
              }
              if(treeData[i].open){
                this.expandArr.push(treeData[i].id);
              }
            }
            this.data2 = getJsonTree(treeData,"0");
            // console.log('Treedata',treeData);
          }).catch((err) => {
            console.log(err)
          })
        },
        checkedIds(){
          for(let i=0;i<this.$refs.tree.getCheckedNodes().length;i++){
            this.toData.push(Number(this.$refs.tree.getCheckedNodes()[i].id));
          }
          RoleSaveData(this.idVal,this.toData).then(response => {
            if(response.code === 0 ){
              this.$message({
                message:response.message,
                type:'success'
              });
              this.cancelModal()
            }else{
              this.$message.error(response.message);
            }
          }).catch((err) => {
            console.log(err)
          })
        },

        //验证系统登陆密码
        saveData(){
          this.dlmm = this.dlmm.trim();
          checkXTPassword(this.dlmm).then(response => {
            if (response.code === 0) {
              this.saveAllData();
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //保存数据
        saveAllData(){
          this.checkedIds()
        },
        cancelModal(){
          this.$emit('update:visible', false);
        },
      }
    }
</script>

<style lang="less">
  .rolemanageDialog{
    .el-row::-webkit-scrollbar{
      display: none;
    }
    .el-tree-node__label{
      position: relative;
    }
    .el-tree-node__label:before{
      content:'';
      width:20px;
      height: 20px;
      display: block;
      position:absolute;
      top:0;
      left:-24px;
      z-index:999;
    }
    .el-checkbox__inner{
      top:0;
    }
  }

</style>
