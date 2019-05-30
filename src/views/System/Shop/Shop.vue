<template>
  <div class="shop-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
              placeholder="请输入商户账号"
              v-model="listQuery.parameter.shzh"
              clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
              placeholder="请输入商户名称"
              v-model="listQuery.parameter.shmc"
              clearable>
          </el-input>
        </el-col>
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <div class="table-add-button">
        <el-button type="primary" @click="openDialog(0)">新增</el-button>
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
          prop="shbh"
          label="商户编码">
        </el-table-column>
        <el-table-column
          prop="shmc"
          label="商户名称">
        </el-table-column>
        <el-table-column
          prop="shzh"
          label="商户账号">
        </el-table-column>
        <el-table-column
          prop="lxr"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="sjh"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(1,scope.row['shid'])">查看</el-button>
            <el-button type="text" size="small" @click="openDialog(2,scope.row['shid'])">修改</el-button>
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
   <CommonShopDialog v-if="CommonShopDialogVisible" :visible.sync="CommonShopDialogVisible" :idVal=id :dialogType=type></CommonShopDialog>
  </div>
</template>

<script>
import { fetchShopList } from '@/api/system/shop'
import CommonShopDialog from "./ShopDialog/CommonShopDialog";
export default {
  name: "Shop",
  components: {CommonShopDialog},
  data () {
      return {
        listQuery:{
          parameter:{
            shzh:'',
            shmc: '',
          },
          current:1,
          size:10
        },
        total: 0,
        CommonShopDialogVisible:false,
        showOverflowTooltip:true,
        tableData: [],
      }
  },
  created() {
    this.getList()
  },
  activated(){
    this.resetFilter()
  },
  methods: {
    getList(){
      fetchShopList(this.listQuery).then(response => {
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
    handleFilter(){
      this.listQuery.parameter.shzh = this.listQuery.parameter.shzh.trim();
      this.listQuery.parameter.shmc = this.listQuery.parameter.shmc.trim();
      this.listQuery.current = 1;
      this.getList()
    },
    resetFilter(){
      this.listQuery.parameter.shmc = '';
      this.listQuery.parameter.shzh = '';
      this.listQuery.current = 1;
      this.getList()
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    openDialog (type,idVal) {
      this.CommonShopDialogVisible = true;
      this.type = type;
      this.id = Number(idVal);
    },
  },


}
</script>

<style lang="less">

</style>
