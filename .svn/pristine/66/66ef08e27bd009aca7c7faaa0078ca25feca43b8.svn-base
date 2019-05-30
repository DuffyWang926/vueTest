<template>
  <div class="page">
    <div class="content-card search">
      <el-row  class='companyTop'>
        <el-col :span="5">
            <div >
                <span>
                    {{billCon}}
                </span>
                <el-input v-model="billNum" class="inputSize"></el-input>
            </div>
        </el-col>
        <el-col :span="5">
            <div >
                <span>
                    {{orderCon}}
                </span>
                <el-input v-model="orderNum" class="inputSize"></el-input>
            </div>
        </el-col>
        
        <el-col :span="4">
          <el-button @click="handleFilter">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
      
    </div>
    <!-- <div class="contentMid">

    </div> -->
    <div class="content-card">
<!--       
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
        </el-table> -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="paginationTotal"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change='currentChange'
        >
      </el-pagination> -->
    </div>
  </div>
</template>



<script>

import {ValidationProvider,ValidationObserver } from 'vee-validate';
import enumeration from '@/enumeration/enumeration'
export default {
  name: "PersonalVip",
  components: {  ValidationProvider, ValidationObserver},
  data(){

      return {
        billCon:'电子票据号：',
        orderCon:'订单编号：',
        billNum: '',
        orderNum:'',
        tableList:[
            {
                prop:'id',
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
    // this.$store.dispatch('invoiceManage/findAppInvoicePageData')
  },
  methods: {
    // handleFilter(){
    //     this.$store.dispatch('invoiceManage/findAppInvoicePageData')

    // },
    // resetFilter(){

    // },
    // //table style
    // cellStyle(row){
    //     // if(row.column.label == '会员账号' ){
    //     //     return 'color:blue;text-decoration:underline;cursor:pointer;'
    //     // }

    // },
    // //单元格点击
    // cellClick(row, column, cell, event){
    //     if(column.label == '会员账号'){
              

    //     }

    // },
    // currentChange(val){
    //     let current = val
    //     this.$store.dispatch('invoiceManage/changeAppQuery',{current})
    //     this.$store.dispatch('invoiceManage/findAppInvoicePageData')

    // },
    // check(data){
    //   this.$store.dispatch('invoiceManage/getAppInvoiceData',data)  
    //   this.$store.dispatch('invoiceManage/getAppInvoiceInfo',data)  

    // }

    
    

    
  }, 
  computed:{
    // tableDataLoading(){
    //     return this.$store.state.invoiceManage.appInvoice.tableDataLoading;
    // },
    
    // tableData(){
    //     let data = this.$store.state.invoiceManage.appInvoice.tableData.records ;
    //     return data;
    // },
    // paginationTotal(){
    //     return this.$store.state.invoiceManage.appInvoice.tableData.total;

    // },
    //  pageSize(){
    // return this.$store.state.invoiceManage.appInvoice.listQuery.size 
    // },
    // currentPage(){
    //   return this.$store.state.invoiceManage.appInvoice.listQuery.current 
    // },
    
    // isCheck(){
    //   return this.$store.state.invoiceManage.appInvoice.isCheck;  
    // },
    // checkData(){
    //     let data = this.$store.state.invoiceManage.appInvoice.checkData

    //     return data;  
    // }
    
    
    
  },
  watch:{
    // billNum(val){
    //     let fptt = val;
    //    this.$store.dispatch('invoiceManage/changeAppQuery',{fptt})
    //   },
    // orderNum(val){
    //     let nsrsbh = val;
    //     this.$store.dispatch('invoiceManage/changeAppQuery',{nsrsbh})

    // },
    // emailVal(val){
    //     let yxdz = val;
    //     this.$store.dispatch('invoiceManage/changeAppQuery',{yxdz})

    // },
    // stateVal(val){
    //      let fpzt = val;
    //     this.$store.dispatch('invoiceManage/changeAppQuery',{fpzt})

    // }

    
    
  }
  


}
</script>

<style lang="less">
//   .el-row{
//     padding-top:60px
//   }
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
  .contentMid{
      margin:0 20px !important;
      border-top: 1px solid #ddd;
    //   padding:10px 0 0 0;
  }
  .floatRight{
      float:right;
  }
  .el-row .el-input--suffix .el-input__inner {
      width:160px;
  }
</style>

