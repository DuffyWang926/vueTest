<template>
  <div class="PersonalVip-page">
    <div class="content-card search">
      <el-row :gutter="15">
        <el-col :span="5">
          <InputSearch :content='nameCon' :list='nameData' @inputDataSend='inputDataNameGet' ref='countChild'></InputSearch>
        </el-col>
        <el-col :span="5">
          <InputSearch :content='accountCon' :list='accountData' @inputDataSend='inputDataCountGet' ref='nameChild'></InputSearch>
        </el-col>
        <el-col :span="5">
          <ValidationProvider rules='numeric|max:11' name="手机号码">
            <template slot-scope="{ errors }"  >
              <el-input v-model="phoneNumber" @change="phoneNumberChange" placeholder="请输入11位手机号码"></el-input>
               <span class='errorStyle'>{{ errors[0] }}  </span>
            </template>
          </ValidationProvider>
        </el-col>
        <el-col :span="4" class='rightFloat'>
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div> 
    <div class="content-card">
      <!-- <div class="table-add-button">
        <el-button @click="openDialog(0)">新增</el-button>
      </div> -->
      <el-table
        v-loading="tableDataLoading"
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
          prop="yhxm"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="sjh"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="yhlx"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
        >
        </el-table-column>
        <el-table-column
          prop="sjxh"
          label="手机型号"
        >
        </el-table-column>
         <el-table-column
          prop="dlsj"
          label="最近登录"
        >
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkDialog(2,scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openReleiveDialog(scope.row)">解绑</el-button>
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
     <DialogueCheckCar  :msg='personalMsg' :isPersonal='true' @cancelModal='cancelCheckModal'  ></DialogueCheckCar>
     <DialogueBindCar :title='bindTitle' :visible='dialogueBindVisible' @cancelModal='cancelBindModal'  @confirmModal='confirmBindModel'></DialogueBindCar>
  </div>
</template>

<script>

import DialogueBindCar from "./PersonalVipDialog/DialogueBindCar"
import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import DialogueCheckCar from '@/components/DetailsDialogue/DialogueCheckCar.vue'

export default {
  name: "PersonalVip",
  components: {DialogueBindCar, InputSearch, DialogueCheckCar,ValidationProvider, ValidationObserver,DialogueCheckCar},
  data () {
      return {
        nameCon:'请输入会员姓名',
        accountCon:'请输入会员账号',
        bindTitle:'个人会员车辆解绑',
        PersonalVipDialogVisible:false,
        showOverflowTooltip:true,
        dialogueBindVisible: false,
        phoneNumber:'', 
        personalMsg:{
          visible:false,
          title:'会员详情',
          isPersonal:true
        },
        
        
      }
  },
  created() {
    
    let yhlx = 1
    this.$store.dispatch('searchListAll/findUserMemberNameSelectList',{yhlx})
    this.$store.dispatch('searchListAll/findUserMemberAccountSelectList',{yhlx})
    this.$store.dispatch('vipMaintain/getPersonalVipData')
    
  },

  methods: {
   
    //设置查询参数
    inputDataCountGet(val){
      let dlmc=val
      this.$store.dispatch('vipMaintain/changePersonalListQuery',{dlmc})
      let hyzh = val;
      this.$store.dispatch('searchListAll/findUserMemberAccountSelectList',{hyzh})

    },
    inputDataNameGet(val){
      let yhxm =val
      this.$store.dispatch('vipMaintain/changePersonalListQuery',{yhxm})
      let hyxm = val;
      this.$store.dispatch('searchListAll/findUserMemberNameSelectList',{hyxm})
    },
    phoneNumberChange(val){
      let sjh =val
      this.$store.dispatch('vipMaintain/changePersonalListQuery',{sjh})

    },
    //查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("vipMaintain/getPersonalVipData",{current}) 
    },
    resetFilter(){
      this.$refs.countChild.resetCon();
      this.$refs.nameChild.resetCon();
      this.phoneNumber = ''
      let isClear =true
      this.$store.dispatch("vipMaintain/changePersonalListQuery",{isClear})
      let current = 1
      this.$store.dispatch("vipMaintain/getPersonalVipData",{current}) 
    },
    currentChange(val){
      let current = val
      this.$store.dispatch('vipMaintain/getPersonalVipData',{current})
    },
    /*
    * 功能：打开弹出层
    * @para: type: 类型  ；
    * */
    checkDialog (type,data) {
      
      this.personalMsg.visible =  true;
      // let id = data.id;
      let res = {
        id:data.id,
        source:'personal'

      }
      this.$store.dispatch('detailsDataAll/changeDetailId',res)
      //弹窗数据
 
    },
    cancelCheckModal(){
      this.personalMsg.visible = false;

    },
    /*
     * 功能：打开解绑弹窗
     */
    openReleiveDialog (data) {
      this.dialogueBindVisible = true;
      let id = data.id;
      this.$store.dispatch('vipMaintain/findUserMemberToUnbindPageList',{id})
      
      
    },
    cancelBindModal(){
      this.dialogueBindVisible = false;
    },
    confirmBindModel(){
      this.dialogueBindVisible = false;
    },
     

    
    
    
  }, 
  computed:{
    
    nameData(){
      let data = this.$store.state.searchListAll.searchList.nameList;
      return data;
    },
    accountData(){
      let data = this.$store.state.searchListAll.searchList.accountList;
      return data;
    },
    tableDataLoading(){
      return this.$store.state.vipMaintain.personalVip.tableDataLoading;
    },
    tableData(){

      return this.$store.state.vipMaintain.personalVip.tableData ? this.$store.state.vipMaintain.personalVip.tableData.records : null;
    },
    paginationTotal(){
      return this.$store.state.vipMaintain.personalVip.tableData.total 
    },
    pageSize(){
    return this.$store.state.vipMaintain.personalVip.listQuery.size 
    },
    currentPage(){
      return this.$store.state.vipMaintain.personalVip.listQuery.current 
    },
    
    
  },
  watch:{
    phoneNumber(data){
      let sjh = data;
      this.$store.dispatch('vipMaintain/changePersonalListQuery',{sjh})
    }
  }
  


}
</script>

<style lang="less" scoped>
  // .el-row{
  //   padding-top:60px
  // }
  .errorStyle{
    color:#f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    
  }
</style>
