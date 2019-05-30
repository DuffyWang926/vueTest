<template>
    <div class="staff-page">
      <div class="content-card search">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-input
              placeholder="请输入员工编号"
              v-model="listQuery.parameter.glybh">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-select
              v-model="listQuery.parameter.zsmc"
              filterable
              remote
              default-first-option
              :remote-method="remoteMethodYGXM"
              :loading="loading"
              placeholder="请输入员工姓名">
              <el-option
                v-for="item in OptionsYGXM"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="listQuery.parameter.gsid" filterable placeholder="请选择运营公司">
              <el-option
                v-for="item in OptionsSSGS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="listQuery.parameter.yhlx" placeholder="请选择人员类别">
              <el-option
                v-for="item in OptionsYHLX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
            width="50">
          </el-table-column>
          <el-table-column
            prop="glybh"
            label="员工编号">
          </el-table-column>
          <el-table-column
            prop="zsmc"
            label="收费员姓名">
          </el-table-column>
          <el-table-column
            prop="dlmc"
            label="登录账号">
          </el-table-column>
          <el-table-column
            prop="sjh"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="gsmc"
            label="所属运营公司">
          </el-table-column>
          <el-table-column
            prop="sfqy"
            label="当前状态">
            <template slot-scope="scope">
              <span>{{scope.row.sfqy|sfqy}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="glcc"
            label="管理车场">
          </el-table-column>
          <el-table-column
            prop="glcw"
            label="管理泊位">
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作"
            width="250">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="openDetailDialog(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="openDialog(1,scope.row['id'])">修改</el-button>
              <el-button type="text" size="small" @click="openAssignDialog(scope.row['id'])">分配车场</el-button>
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
      <CommonStaffDialog v-if="CommonStaffDialogVisible" :visible.sync="CommonStaffDialogVisible" :idVal=id :dialogType=type></CommonStaffDialog>
      <SeeStaffDialog v-if="SeeStaffDialogVisible" :visible.sync="SeeStaffDialogVisible" :msg="myMsg"></SeeStaffDialog>
      <AssignStaffDialog v-if="AssignStaffDialogVisible" :visible.sync="AssignStaffDialogVisible" :idVal=id :isStaffPage='true'></AssignStaffDialog>
    </div>
</template>

<script>
    import { fetchStaffList, RemoveData } from '@/api/StaffManage/Staff'
    import CommonStaffDialog from "./StaffDialog/CommonStaffDialog";
    import SeeStaffDialog from "./StaffDialog/SeeStaffDialog";
    import AssignStaffDialog from "./StaffDialog/AssignStaffDialog";
    import { fetchSSGSList, fetchPdaUserNamelist, fetchDictlist } from '@/api/CommonSelectApi'
    import  EnumberateSelect  from '@/filters/index'

    export default {
        name: "Staff",
        components: {AssignStaffDialog, SeeStaffDialog, CommonStaffDialog },
        data() {
          return{
            tableData: [],
            CommonStaffDialogVisible:false,
            SeeStaffDialogVisible:false,
            AssignStaffDialogVisible:false,
            total: 0,
            OptionsSSGS:[],
            OptionsYGXM:[],
            loading: false,
            OptionsYHLX:[],
            listQuery:{
              parameter:{
                glybh:'',
                zsmc:'',
                gsid:'',
                yhlx:'',
                ggsj:''
              },
              current:1,
              size:10
            },
            myMsg:{},
          }
        },
        created() {
          this.getList();
          this.handleSelectSSGS();
          this.handleSelectYGXM();
          this.handleSelectDict();
        },
        activated(){
          this.reset()
        },
        methods:{
          getList() {
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            this.listQuery.parameter.ggsj = sysUser.gsid;
            fetchStaffList(this.listQuery).then(response => {
              this.tableData = response.result.records;
              for (let i = 0; i<response.result.records.length; i++){
                  this.tableData[i].number = i+1
              }
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
          //运营公司下拉框
          handleSelectSSGS(){
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            fetchSSGSList(sysUser.gsid).then(response => {
              for (let i = 0; i < response.result.length; i++) {
                this.OptionsSSGS.push({
                  label: response.result[i].label,//此处是展示内容
                  value: Number(response.result[i].key) //此处是后台需要的值
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          },
          //员工姓名下拉框
          handleSelectYGXM(){
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            fetchPdaUserNamelist(sysUser.gsid, this.listQuery.parameter.zsmc).then(response => {
              for (let i = 0; i < response.result.length; i++) {
                this.OptionsYGXM.push({
                  label: response.result[i].label,//此处是展示内容
                  value: Number(response.result[i].key) //此处是后台需要的值
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          },
          //人员类别
          handleSelectDict(){
            fetchDictlist(109).then(response => {
              for (let i = 0; i < response.result.length; i++) {
                this.OptionsYHLX.push({
                  label: response.result[i].label,//此处是展示内容
                  value: Number(response.result[i].key) //此处是后台需要的值
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          },
          handleFilter() {
            this.listQuery.parameter.glybh = this.listQuery.parameter.glybh.trim();
            this.listQuery.current = 1;
            this.getList()
          },
          reset(){
            this.listQuery.parameter.glybh = '';
            this.listQuery.parameter.zsmc = '';
            this.listQuery.parameter.gsid = '';
            this.listQuery.parameter.yhlx = '';
            this.listQuery.current = 1;
            this.getList()
          },
          resetFilter() {
            this.reset();
            this.OptionsYGXM = [];
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.zsmc);
          },
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
                  this.getList()
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
          //新增和修改弹框
          openDialog(type,idVal = -1){
            this.CommonStaffDialogVisible = true;
            this.type = type;
            this.id = Number(idVal);
          },
          openDetailDialog(row){
            this.SeeStaffDialogVisible = true;
            this.myMsg = row;
          },
          openAssignDialog(gsid){
            this.AssignStaffDialogVisible = true;
            this.id = Number(gsid)
          },
          remoteMethodYGXM(query) {
            // console.log(query)
            this.listQuery.parameter.zsmc = query;
            let sysUser = JSON.parse(localStorage.getItem("sysUser"));
            if (query !== '') {
              this.handleSelectYGXM(sysUser.gsid, this.listQuery.parameter.zsmc);
              this.OptionsYGXM = [];
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.OptionsYGXM = this.OptionsYGXM.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.OptionsYGXM = [];
            }
          },
        }
    }
</script>

<style scoped>

</style>
