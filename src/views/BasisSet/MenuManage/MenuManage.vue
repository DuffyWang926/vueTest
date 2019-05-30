<template>
  <div class="menuManage-page">
    <div class="menuManage-page-left">
      <div class="content-card" style="padding-bottom: 20px;">
        <p style="padding-left: 10px;">菜单树状图</p>
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          ref="tree"
          @node-click="getCurrentKey()"
          :highlight-current="highlightcurrent"
          :default-expand-all="defaultexpandall"
          :expand-on-click-node="expandonclicknode">
        </el-tree>
      </div>
    </div>
    <div class="menuManage-page-right" >
      <div class="table-add-button" style="float:right">
        <el-button @click="openDialog(0)">新增一级目录</el-button>
      </div>
      <div class="content-card" style="margin-top: 5px;" v-if="this.clickid">
        <el-table
          :data="tableData"
          style="width: 100%;padding-top:15px;">
          <el-table-column
            prop="number"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="zymc"
            label="资源名称">
          </el-table-column>
          <el-table-column
            prop="zylx"
            label="资源类型">
            <template slot-scope="scope">
              <span>{{scope.row.zylx|zylx}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="zydz"
            label="资源地址">
          </el-table-column>
          <el-table-column
            prop="zytb"
            label="资源图标">
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="openDialog(1,scope.row)">新增</el-button>
              <el-button type="text" size="small" @click="openDialog(2,scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row['id'])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <CommonMenuManageDialog v-if="CommonMenuManageDialogVisible" :visible.sync="CommonMenuManageDialogVisible" :msg="msgData"></CommonMenuManageDialog>
  </div>
</template>

<script>
  import { fetchMenuManageTreeList, fetchMenuManageList, RemoveData } from '@/api/BasisSet/MenuManage'
  import CommonMenuManageDialog from "./MenuManage/CommonMenuManageDialog";
  export default {
    name: "MenuManage",
    components: {CommonMenuManageDialog},
    data(){
      return{
        CommonMenuManageDialogVisible:false,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        msgData:{
          type:0,
          Data:{}
        },
        tableData:[],
        listQuery:{parameter:{}},
        highlightcurrent:true,//是否高亮选中节点
        defaultexpandall:true,//是否默认打开节点
        expandonclicknode:false,//是否在点击节点的时候展开或者收缩节点，则只有点箭头图标的时候才会展开或者收缩节点。
        clickid:''//点击当前节点获取节点的id
      }
    },
    created(){
      this.getTreeList()
    },
    methods:{
      getTreeList(){
        fetchMenuManageTreeList(this.listQuery).then(response => {
          let treeData = response.result;
          //设置树
          let getJsonTree = function (data, parentId) {
            let itemArr = [];
            for (let i = 0; i < data.length; i++) {
              let node = data[i];
              if (String(node.fid) === parentId) {
                let newNode = {};
                newNode.id= String(node.id);
                newNode.label = node.zymc;
                if(getJsonTree(data, String(node.id)).length){
                  newNode.children = getJsonTree(data, String(node.id));
                }
                itemArr.push(newNode);
              }
            }
            return itemArr;
          };
          this.data = getJsonTree(treeData,"0")
        }).catch((err) => {
          console.log(err)
        })
      },
      getCurrentKey(){
        //获取获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
        this.clickid = this.$refs.tree.getCurrentKey()
        if(this.clickid){
          this.getMenuManageInfo(this.clickid)
        }
      },
      //获取详情（列表）
      getMenuManageInfo(id) {
        fetchMenuManageList(id).then(response => {
          this.tableData = response.result
          for (let i = 0; i<response.result.length; i++){
            this.tableData[i].number = i+1
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      openDialog(type,data){
        this.CommonMenuManageDialogVisible = true;
        this.msgData.type = type;
        this.msgData.Data = data;
      },
      handleDelete(id){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          RemoveData(id).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getMenuManageInfo(this.clickid);
              this.getTreeList();
            } else {
              this.$message.error(response.message);
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style lang="less">
  .menuManage-page{
    position: relative;
  .menuManage-page-left{position:absolute; left:0;width:20%}
  .menuManage-page-right{position:absolute;right:0;width: 79%}

  }
</style>
