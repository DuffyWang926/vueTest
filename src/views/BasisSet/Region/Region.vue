<template>
  <div class="region-page">
    <div class="region-page-left">
      <div class="content-card" style="padding-bottom: 20px">
        <p style="padding-left:10px;">区域树状图</p>
        <el-tree
          :data="data2"
          :props="defaultProps"
          node-key="id"
          :default-expand-all="defaultexpandall">
        </el-tree>
      </div>
    </div>
    <div class="region-page-right">
      <div class="content-card search">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="请输入区域名称"
              v-model="listQuery.parameter.qymc">
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="listQuery.parameter.qylx" placeholder="请选择区域类型">
              <el-option label="行政区域" value="1"></el-option>
              <el-option label="自定义区域" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" style="text-align: right; float:right">
            <el-button type="primary" @click="handleFilter">查询</el-button>
            <el-button type="primary" @click="resetFilter">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="content-card">
        <div class="table-add-button">
          <el-button type="primary" @click="openDialog">新增</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="#"
            width="50"
            type="index">
          </el-table-column>
          <el-table-column
            prop="qybh"
            label="区域编号">
          </el-table-column>
          <el-table-column
            prop="qymc"
            label="区域名称">
          </el-table-column>
          <el-table-column
            prop="fqymc"
            label="父级区域">
          </el-table-column>
          <el-table-column
            prop="qylx"
            label="区域类型">
            <template slot-scope="scope">
              <span>{{scope.row.qylx|qylx}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ms"
            label="区域描述">
          </el-table-column>
          <el-table-column
            prop="cjsj"
            label="添加时间"
            width="200">
            <template slot-scope="scope" v-if="scope.row.cjsj">
              <span>{{scope.row.cjsj|time}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDelete(scope.row['qybh'],scope.row['fqybh'])">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :current-page="listQuery.current"
          :page-size="listQuery.size"
          @current-change="currentChange">
        </el-pagination>
        </div>
    </div>
    <AddRegionDialog v-if="AddRegionDialogVisible" :visible.sync="AddRegionDialogVisible"></AddRegionDialog>
  </div>
</template>

<script>
    import { fetchRegionList, RemoveData, fetchRegionTreeList} from '@/api/BasisSet/Region'
    import AddRegionDialog from "./RegionDialog/AddRegionDialog";
    export default {
      name: "Region",
      components: {AddRegionDialog},
      data(){
        return{
          listQuery:{
            parameter:{
              qymc:'',
              qylx:''
            },
            current:1,
            size:10
          },
          tableData: [],
          defaultexpandall: true,
          total:0,
          data2: [],
          defaultProps: {
              children: 'children',
              label: 'label'
          },
          AddRegionDialogVisible:false
          }
      },
      created() {
          this.getList();
          this.getTreeList()
      },
      activated(){
        this.resetFilter()
      },
      methods: {
        //列表
        getList() {
          fetchRegionList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            this.total = response.result.total;
            if(response.result.records.length === 0 && response.result.current >= 2){
              this.listQuery.current = response.result.current-1;
              this.getList()
            }else if(response.result.records.length === 0 && response.result.current < 2) {
              this.listQuery.current = 1;
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        currentChange(val){
          this.listQuery.current = val;
          this.getList();
        },
        //树状图
        getTreeList() {
          fetchRegionTreeList(this.listQuery).then(response => {
            let treeData = response.result;
            //设置树
            let getJsonTree = function (data, parentId) {
              let itemArr = [];
              for (let i = 0; i < data.length; i++) {
                let node = data[i];
                if (String(node.fqybh) === parentId) {
                  let newNode = {};
                  newNode.id = String(node.qybh);
                  newNode.label = node.qymc;
                  if(getJsonTree(data, String(node.qybh)).length){
                    newNode.children = getJsonTree(data, String(node.qybh));
                  }
                  itemArr.push(newNode);
                }
              }
              return itemArr;
            };
            this.data2 = getJsonTree(treeData,"1")
          }).catch((err) => {
            console.log(err)
          })
        },
        //查询
        handleFilter() {
          this.listQuery.parameter.qymc = this.listQuery.parameter.qymc.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        //重置
        resetFilter() {
          this.listQuery.parameter.qymc = "";
          this.listQuery.parameter.qylx = "";
          this.listQuery.current = 1;
          this.getList()
        },
        //删除
        handleDelete(qybh, fqybh) {
          this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            RemoveData(qybh, fqybh).then(response => {
              if (response.code === 0) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList();
                this.getTreeList();
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
        },
        openDialog() {
          this.AddRegionDialogVisible = true;
          this.getList()
        }
      }
    }
</script>

<style lang="less">
    .region-page{
        position: relative;
        .region-page-left{position:absolute; left:0;width:20%}
        .region-page-right{position:absolute;right:0;width: 79%}

    }
</style>
