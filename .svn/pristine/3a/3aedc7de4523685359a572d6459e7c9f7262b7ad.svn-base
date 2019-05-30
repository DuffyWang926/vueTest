<template>
  <div class="PersonalVip-page">
    <div class="content-card search">
      <el-row :gutter="15"  >
        <el-col :span="5">
          <InputSearch :content='accountCon' :list='inputDataCompany' @inputDataSend='inputDataCompanyGet' ref='companyChild'></InputSearch>
        </el-col>
        
        <el-col :span="5">
              <InputSearch :content='nameCon' :list='inputDataPerson'  @inputDataSend='inputDataPersonGet' ref='personChild'></InputSearch>
        </el-col>
        <el-col :span="5" class='rightFloat'>
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
        
      </el-row>
      
     
    </div> 
    <div class="content-card ">
      <div class="table-add-button">
            <el-button type="primary" @click="addCount">添加</el-button>
            <el-button type="primary" @click="exportTable">导出</el-button> 
            
        </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="webIndex"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="dlmc"
          label="会员账号"
          >
        </el-table-column>
        <el-table-column
          prop="gsmc"
          label="会员名称"
          >
        </el-table-column>
        <el-table-column
          prop="lxr"
          label="联系人姓名"
          >
        </el-table-column>
        <el-table-column
          prop="sjh"
          label="联系人电话">
        </el-table-column>
        <el-table-column
          prop="jzfs"
          label="结账方式">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结账时间">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="操作"
          
          >
          <template slot-scope="scope">
            <!-- <el-button v-if='scope.row.isShow' type="text" size="small" @click="openDialog(2,scope.row)">查看</el-button> -->
            <el-button type="text" size="small" @click="openDialog(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openDialogAmend(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="openReleiveDialog(scope.row)">解绑车辆</el-button>
            <el-button type="text" size="small" @click="openReleiveDialogDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="paginationTotal"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change='currentChange'
        >
      </el-pagination>
    </div>
    <SingleDialogueInput :msg='addData' :visible='addDataVisible' @cancelModal='cancelAddModal'  @confirmModal='confirmAddModel'></SingleDialogueInput>
    <SingleDialogueInput :msg='changeData' :visible='changeDataVisible' @cancelModal='cancelChangeModal'  @confirmModal='confirmChangeModel'></SingleDialogueInput>
    <DialogueBindCar :msg='bindData' :visible='dialogueBindVisible' @cancelModal='cancelBindModal'  @confirmModal='confirmBindModel'></DialogueBindCar>
    <DialogueCheckCar :msg="companyMsg" @cancelModal='cancelCheckModal'  ></DialogueCheckCar>

  </div> 
</template>

<script>
import { fetchCompanyVipList } from '@/api/Vipmaintain/CompanyVip.js' //个人会员的api js 
import InputSearch from '@/components/InputSearch';
import SingleDialogueInput from '@/components/SingleDialogueInput'
import DialogueBindCar from './Dialogue/DialogueBindCar'
import DialogueCheckCar from '@/components/DetailsDialogue/DialogueCheckCar.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'; 

export default {
  name: "CompanyVip",
  components: { InputSearch, SingleDialogueInput, DialogueBindCar, ValidationObserver, ValidationProvider, DialogueCheckCar},
  data () {
      return {
        accountCon:'请输入会员名称',
        nameCon:'请输入联系人姓名',
        changeDataVisible:false,   //change弹窗开关
        dialogueBindVisible:false,  //bind弹窗开关
        companyMsg:{
          title:'会员详情',
          isPersonal:false,
          visible:false
        }
      }
      
  },
  created() {
    this.$store.dispatch('vipMaintain/getVipData')
    let yhlx = 2
    this.$store.dispatch('searchListAll/findUserMemberNameSelectList',{yhlx})
  },
  methods: {
    //查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("vipMaintain/getVipData",{current})
    },
    resetFilter(){
      this.$refs.companyChild.resetCon();
      this.$refs.personChild.resetCon();
      
      let current = 1
      this.$store.dispatch("vipMaintain/getVipData",{current})
      
    },
    //设置查询参数
    inputDataCompanyGet(val){
      let gsmc=val
      this.$store.dispatch('vipMaintain/changeListQuery',{gsmc})
      
    },
    inputDataPersonGet(val){
      let lxr =val
      this.$store.dispatch('vipMaintain/changeListQuery',{lxr})
    },
    //添加 
    addCount(){
      let addDataVisible = true
      this.$store.dispatch('vipMaintain/changeDialogueFlag',{addDataVisible})

    },
    cancelAddModal(val){
      let addDataVisible = false
      this.$store.dispatch('vipMaintain/changeDialogueFlag',{addDataVisible})

    },
    confirmAddModel(val){
      
      this.$store.dispatch('vipMaintain/addCompanyData',val)
      let addDataVisible = false;
      this.$store.dispatch('vipMaintain/changeDialogueFlag',{addDataVisible})


    },
    // 导出
    exportTable(){
      this.$store.dispatch('vipMaintain/pustExportUserMemberCompany')
    },
    //查看 
    openDialog(data){
      this.companyMsg.visible = true;
      let id = data.id;
      this.$store.dispatch('detailsDataAll/changeDetailId',{id})

      //弹窗接口
      // this.$store.dispatch('detailsDataAll/checkCompanyData',{id})
      // this.$store.dispatch('detailsDataAll/findUserMemberCarPageData',{id})
      // this.$store.dispatch('detailsDataAll/findUserMemberRechargePageData',{id})  //充值记录数据
      // this.$store.dispatch('detailsDataAll/findUserMemberBuyPageData',{id})  //buy记录数据
      // this.$store.dispatch('detailsDataAll/findUserMemberUnbindPageData',{id}) //buy记录数据
      // // this.$store.dispatch('detailsDataAll/findUserMemberChangePageData')  //change记录数据 
      // this.$store.dispatch('detailsDataAll/getUserMemberCompanyData',{id})

      

    },
    cancelCheckModal(){
      this.companyMsg.visible = false;
    },
    
    //修改
    openDialogAmend(data){
      this.$store.dispatch('vipMaintain/getUserMemberInfoData',data) 
      this.changeDataVisible = true;
    },
    cancelChangeModal(val){
      this.changeDataVisible = val

    },
    confirmChangeModel(val){
      this.changeDataVisible = false;
      console.log(this.$store)
      this.$store.dispatch('vipMaintain/changeCompanyDataCommit')

    },
    //解绑
    openReleiveDialog(data){
      this.$store.dispatch('vipMaintain/bindCompanyData',data)
      this.dialogueBindVisible = true;

    },
    cancelBindModal(){
      this.dialogueBindVisible = false;
    },
    confirmBindModel(){
      this.dialogueBindVisible = false;
    },
    // 删除
    openReleiveDialogDelete(data){
      
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('vipMaintain/deleteCompanyData',data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    currentChange(val){
      this.$store.dispatch('vipMaintain/getVipData',val)
    }
  },
  computed:{
    inputDataCompany(){
      // return this.$store.state.searchListAll.searchList.nameList;

    },
    inputDataPerson(){
      

    },
    tableData(){
      return this.$store.state.vipMaintain.companyVip.tableData.records || null
    },
    addData(){
      return this.$store.state.vipMaintain.companyVip.addData || null
    },
    changeData(){
      return this.$store.state.vipMaintain.companyVip.changeData || null
    },
    bindData(){
      return this.$store.state.vipMaintain.companyVip.bindData || { data:{ records:null }}
    },
    checkData(){
      let data = this.$store.state.vipMaintain.companyVip.checkData
      return data;
    },
    loading(){
      return this.$store.state.vipMaintain.companyVip.tableDataLoading
    },
    paginationTotal(){
      return this.$store.state.vipMaintain.companyVip.tableData.total 
    },
    pageSize(){
      return this.$store.state.vipMaintain.companyVip.tableData.size || 10
    },
    currentPage(){
      return this.$store.state.vipMaintain.companyVip.tableData.current || 10
    },
    addDataVisible(){
      let data =this.$store.state.vipMaintain.companyVip.addDataVisible
      return data
    }

  },
  watch:{
   
  }
  
}
</script>

<style lang="less" scoped>
  
  .contentAdd{
      margin:0 20px !important;
      border-bottom: 2px solid #ebeef5;
      padding:0 0 20px 0;
  }
  .floatRight{
      float:right;
  }
  
 

  
</style>
