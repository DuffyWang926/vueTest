<template>
  <div class="user-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
              placeholder="请输入用户姓名"
              v-model="listQuery.parameter.yhxm">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input
              placeholder="请输入用户账号"
              v-model="listQuery.parameter.dlmc">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.gsid" filterable  placeholder="请选择所属公司">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
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
          prop="yhxm"
          label="用户姓名">
        </el-table-column>
        <el-table-column
          prop="dlmc"
          label="用户账号">
        </el-table-column>
        <el-table-column
          prop="jsmc"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="gsmc"
          label="所属公司">
        </el-table-column>
        <el-table-column
          prop="sfqy"
          label="状态">
          <template slot-scope="scope">
            <span >{{scope.row.sfqy|sfqy}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(1,scope.row['id'])">修改</el-button>
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
    <CommonBackUserDialog v-if="CommonBackUserDialogVisible" :visible.sync="CommonBackUserDialogVisible" :idVal=id :dialogType=type></CommonBackUserDialog>
  </div>
</template>

<script>
    import { fetchBackUserList } from '@/api/BasisSet/BackUser'
    import { fetchSSGSList } from '@/api/CommonSelectApi'
    import CommonBackUserDialog from "./BackUserDialog/CommonBackUserDialog";

    export default {
      name: "BackUser",
      components: {CommonBackUserDialog},
      data() {
        return{
          tableData: [],
          Options: [],
          CommonBackUserDialogVisible:false,
          total: 0,
          listQuery:{
            parameter:{
              yhxm:'',
              dlmc:'',
              gsid:''
            },
            current:1,
            size:10
          }
        }
      },
      created() {
        this.getList();
        this.handleSelect()
      },
      activated(){
        this.resetFilter()
      },
      methods:{
        getList() {
          fetchBackUserList(this.listQuery).then(response => {
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
        //查询
        handleFilter() {
          this.listQuery.parameter.yhxm = this.listQuery.parameter.yhxm.trim();
          this.listQuery.parameter.dlmc = this.listQuery.parameter.dlmc.trim();
          this.listQuery.current = 1;
          this.getList()
        },
        // 重置
        resetFilter() {
          this.listQuery.parameter.yhxm = '';
          this.listQuery.parameter.dlmc = '';
          this.listQuery.parameter.gsid = '';
          this.listQuery.current = 1;
          this.getList()
        },
        handleSelect(){
          let sysUser = JSON.parse(localStorage.getItem("sysUser"))
          fetchSSGSList(sysUser.gsid).then(response => {
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
        //新增和修改弹框
        openDialog(type,idVal){
          this.CommonBackUserDialogVisible = true;
          this.type = type;
          this.id = Number(idVal);
        }
      }
    }
</script>

<style scoped>

</style>
