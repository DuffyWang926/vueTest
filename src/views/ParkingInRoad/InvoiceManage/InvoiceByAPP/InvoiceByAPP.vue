<template>
  <div class="page">
    <div class="content-card search">
      <el-row  class='companyTop'>
        <el-col :span="5">
            <div >
                <span>
                    {{invoiceHead}}
                </span>
                <el-input v-model="headVal" class="inputSize"></el-input>
            </div>
        </el-col>
        <el-col :span="5">
            <div >
                <span>
                    {{invoiceNum}}
                </span>
                <el-input v-model="numVal" class="inputSize"></el-input>
            </div>
        </el-col>
        <el-col :span="5">
            <div >
                <span>
                    {{invoiceEmail}}
                </span>
                <ValidationProvider rules='email' name=" ">
                    <template slot-scope="{ errors }"  >
                        <el-input v-model="emailVal" class="inputSize" placeholder="请输入邮箱"></el-input>
                        <span class="errorStyle">{{ errors[0] }}  </span>
                    </template>
                </ValidationProvider>
                
            </div>
          
        </el-col>
        <el-col :span="5">
            <div >
                <span>
                    {{invoiceState}}
                </span>
                <el-select v-model="stateVal" placeholder="请选择" >
                    <el-option
                    v-for="item in stateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
            </div>
          
        </el-col>
        
        <el-col :span="4">
          <el-button @click="handleFilter">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
      
    </div>
    <!-- <div class="contentAdd">

    </div> -->
    <div class="content-card">
      
      <el-table
            v-loading="tableDataLoading"
            :data="tableData"
            style="width:100%"
            :cell-style="cellStyle"
            @cell-click="cellClick"
            >
            <el-table-column
                :prop="v.prop"
                :label="v.label"
                :width="v.width"
                v-for='(v,i) in tableList'
                :key='i + "tableList"'
                >
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="check(scope.row)">查看</el-button>
                    
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
    <checkDialogue  :visible='isCheck' :msg='checkData'></checkDialogue>
  </div>
</template>



<script>

import {ValidationProvider,ValidationObserver } from 'vee-validate';
import checkDialogue from './checkDialogue'
import enumeration from '@/enumeration/enumeration'
export default {
  name: "PersonalVip",
  components: {  ValidationProvider, ValidationObserver,checkDialogue},
  data(){

      return {
        invoiceHead:'发票抬头：',
        invoiceNum:'纳税人识别号：',
        invoiceEmail:'邮箱：',
        invoiceState:'发票状态：',
        headVal: '',
        numVal:'',
        emailVal:"",
        stateList: enumeration.invoiceState,
        stateVal:'',
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'50'
            },
            {
                prop:'fplx',
                label:'发票类型',
                width:'100'
            },
            {
                prop:'sjh',
                label:'会员账号',
                width:'150'
            },
            {
                prop:'fptt',
                label:'发票抬头',
                width:'200'
            },
            {
                prop:'fpje',
                label:'发票金额（元）',
                width:'100'
            },
            {
                prop:'czr',
                label:'开票员',
                width:'100'
            },
            {
                prop:'skr',
                label:'收款人',
                width:'100'
            },
            {
                prop:'tsfs',
                label:'推送方式',
                width:'100'
            },
            {
                prop:'yxdz',
                label:'邮箱地址',
                width:'200'
            },
            
            {
                prop:'cjsj',
                label:'申请时间',
                width:'150'
            },
            {
                prop:'fpzt',
                label:'发票状态',
                width:'100'
            }
          ],
        
       
        
      }
  },
  created() {
    this.$store.dispatch('invoiceManage/findAppInvoicePageData')
  },
  methods: {
    handleFilter(){
        this.$store.dispatch('invoiceManage/findAppInvoicePageData')

    },
    resetFilter(){

    },
    //table style
    cellStyle(row){
        // if(row.column.label == '会员账号' ){
        //     return 'color:blue;text-decoration:underline;cursor:pointer;'
        // }

    },
    //单元格点击
    cellClick(row, column, cell, event){
        if(column.label == '会员账号'){
              

        }

    },
    currentChange(val){
        let current = val
        this.$store.dispatch('invoiceManage/changeAppQuery',{current})
        this.$store.dispatch('invoiceManage/findAppInvoicePageData')

    },
    check(data){
      this.$store.dispatch('invoiceManage/getAppInvoiceData',data)  
      this.$store.dispatch('invoiceManage/getAppInvoiceInfo',data)  

    }
    

    
  }, 
  computed:{
    tableDataLoading(){
        return this.$store.state.invoiceManage.appInvoice.tableDataLoading;
    },
    
    tableData(){
        let data = this.$store.state.invoiceManage.appInvoice.tableData.records ;
        return data;
    },
    paginationTotal(){
        return this.$store.state.invoiceManage.appInvoice.tableData.total;

    },
     pageSize(){
    return this.$store.state.invoiceManage.appInvoice.listQuery.size 
    },
    currentPage(){
      return this.$store.state.invoiceManage.appInvoice.listQuery.current 
    },
    
    isCheck(){
      return this.$store.state.invoiceManage.appInvoice.isCheck;  
    },
    checkData(){
        let data = this.$store.state.invoiceManage.appInvoice.checkData

        return data;  
    }
    
    
    
  },
  watch:{
    headVal(val){
        let fptt = val;
       this.$store.dispatch('invoiceManage/changeAppQuery',{fptt})
      },
    numVal(val){
        let nsrsbh = val;
        this.$store.dispatch('invoiceManage/changeAppQuery',{nsrsbh})

    },
    emailVal(val){
        let yxdz = val;
        this.$store.dispatch('invoiceManage/changeAppQuery',{yxdz})

    },
    stateVal(val){
         let fpzt = val;
        this.$store.dispatch('invoiceManage/changeAppQuery',{fpzt})

    }

    
    
  }
  


}
</script>

<style lang="less" scoped>

  .companyTop{
    // padding-bottom:30px !important;
    .inputSize{
        width:50% !important;
        height:25px;
    }
    .errorStyle{
        display:block;
        padding-top:10px;
        color:red;
    }
  }
  .contentAdd{
      margin:0 20px !important;
      border-bottom: 2px solid #ebeef5;
      padding:0 0 20px 0;
  }
  .floatRight{
      float:right;
  }
  .el-row .el-input--suffix .el-input__inner {
      width:160px;
  }
</style>

