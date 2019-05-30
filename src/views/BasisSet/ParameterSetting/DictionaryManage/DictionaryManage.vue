<template>
  <div class="dictionarymanage-page">
    <div class="dictionarymanage-page-left">
      <div class="content-card">
        <!--<el-row>-->
          <!--<div class="table-add-button">-->
            <!--<el-button @click="openDialogDic">新增</el-button>-->
          <!--</div>-->
        <!--</el-row>-->
        <el-row >
          字典分类
        </el-row>
        <el-row v-for="(item,i) in this.DictType" :key="i +'DictType'">
          <el-radio v-model="radio" :label=item.id @change="selectDicTypeList(item)">{{item.zdmc}}</el-radio>
        </el-row>
      </div>
    </div>
    <div class="dictionarymanage-page-right">
      <div class="content-card">
        <div class="dic-title">
          <span>
            【{{radiotitle}}】字典
          </span>
        </div>
        <div class="table-add-button">
          <el-button v-if="this.radio === ''" type="primary" @click="openDialog(0,item)" disabled>新增</el-button>
          <el-button v-else type="primary" @click="openDialog(0,item)">新增</el-button>
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
            prop="sbm"
            label="识别码">
          </el-table-column>
          <el-table-column
            prop="zdmc"
            label="字典名"
            width="500">
          </el-table-column>
          <el-table-column
            prop="id"
            label="字典值">
          </el-table-column>
          <el-table-column
            prop="sfqy"
            label="状态">
            <template slot-scope="scope">
              <span class="tdcolor">{{scope.row.sfqy|sfqy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="openDialog(1,item, scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row['id'])">删除</el-button>
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
    <CommonDictionaryManageDialog v-if="CommonDictionaryManageDialogVisible" :visible.sync="CommonDictionaryManageDialogVisible" :msg="msgData"></CommonDictionaryManageDialog>
    <AddDictionaryType v-if="AddDictionaryTypeVisible" :visible.sync="AddDictionaryTypeVisible"></AddDictionaryType>
  </div>
</template>

<script>
  import {fetchDictionaryManageType, fetchDictionaryManageList, AddSaveTypeData, RemoveData} from "@/api/BasisSet/DictionaryManage"
  import CommonDictionaryManageDialog from "./DictionaryManageDialog/CommonDictionaryManageDialog"
  import AddDictionaryType from "./DictionaryManageDialog/AddDictionaryType";
    export default {
        name: "DictionaryManage",
      components: {AddDictionaryType, CommonDictionaryManageDialog},
      data(){
        return{
          radio:"",
          radiotitle:'',
          item:'',
          DictType:[],
          tableData:[],
          CommonDictionaryManageDialogVisible:false,
          AddDictionaryTypeVisible:false,
          msgData:{
            type:0,
            Data1:{},
            Data2:{}
          },
          listQuery:{
            current:1,
            size:10
          },
          total:0
        }
      },
      created(){
        this.getType()
      },
      methods:{
        getType() {
          fetchDictionaryManageType({}).then(response => {
            this.DictType = response.result
          }).catch((err) => {
            console.log(err)
          })
        },
        selectDicTypeList(item){
          if(item){
            this.radiotitle = item.zdmc;
            this.item = item;
            fetchDictionaryManageList(item.id).then(response => {
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
          }
        },
        currentChange(val){
          this.listQuery.current = val;
          this.selectDicTypeList();
        },
        //新增和修改弹框
        openDialog(type,data1,data2){
          this.CommonDictionaryManageDialogVisible = true;
          this.msgData.type = type;
          this.msgData.Data1 = data1;
          this.msgData.Data2 = data2;
        },

        //新增字典分类
        openDialogDic(){
          this.AddDictionaryTypeVisible = true
        },
        //删除字典
        handleDelete(id) {
          this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            RemoveData(id).then(response => {
              if (response.code === 0) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.selectDicTypeList(this.item);
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
  .dictionarymanage-page{
      position: relative;
    .dictionarymanage-page-left{
      position:absolute;
      left:0;
      width:20%;
      .el-row{
        padding:10px 20px;
      }
    }
    .dictionarymanage-page-right{
      position:absolute;right:0;width: 79%;
      .dic-title{
        padding-top:15px;
        padding-left:15px;
        font-size:16px;
        font-weight: bold;
      }
    }
  }
</style>
