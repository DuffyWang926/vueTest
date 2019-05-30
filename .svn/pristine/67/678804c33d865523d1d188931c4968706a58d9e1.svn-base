<template>
  <div class="PersonalVip-page">
    <div class="content-card search">
      <el-row :gutter="15" >
        <el-col :span="4">
          <InputSearch :content='plateCon' :list='plateData' @inputDataSend='plateDataGet' ref='plateChild'></InputSearch>
        </el-col>
        <el-col :span="5">
             <el-select v-model="colorValue" :placeholder="colorCon">
                    <el-option
                    v-for="item in colorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-select v-model="blackListValue" :placeholder="blackListCon">
                    <el-option
                    v-for="item in blackList"
                    :key="item.value + 'blackList'"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
            </el-select>
          
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8">
            <div class="block">
                <el-date-picker
                v-model="timeValue"
                type="datetimerange"
                :default-time="['00:00:00', '23:59:59']"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </el-col>
        
        <el-col :span="4" class='rightFloat'>
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
          
      </el-row>
      
    </div>
    <div class="content-card">
      <div class="table-add-button">
            <el-button type="primary" @click="addCount">添加</el-button>
            <el-button type="primary" @click="exportTable">导出</el-button>
            
        </div>
      
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
                width="250"
                >
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="change(scope.row)">修改</el-button>
                    <el-button  type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
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
    <AddWhiteList :msg="addData"  :visible="addDialogueVisible" @cancelModal='cancelAddModal' @confirmModal='confirmAddModal'> </AddWhiteList>
    <AddWhiteList :msg="changeData"  :visible="changeDialogueVisible" @cancelModal='cancelChangeModal' @confirmModal='confirmChangeModal'> </AddWhiteList>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
  </div>
</template>



<script>

import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import AddWhiteList from '@/components/SingleDialogueInput/addWhiteList'
import SeeCarInfoDialog from '@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog.vue'
import enumeration from '@/enumeration/enumeration'



export default {
  name: "PersonalVip",
  components: { InputSearch, ValidationProvider, ValidationObserver, AddWhiteList,SeeCarInfoDialog},
  data () {
      return {
        plateCon:'请输入车牌号码',
        colorCon:'请选择车牌颜色',
        blackListCon:'请选择黑名单分类',
        colorValue: '',
        blackListValue:'',
        timeValue:"",
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'100'
            },
            {
                prop:'hphm',
                label:'车牌号码',
            },
            {
                prop:'cpysString',
                label:'车牌颜色',
            },
            {
                prop:'mdfx',
                label:'黑名单分类',
            },
            {
                prop:'sjh',
                label:'绑定会员手机号',
            },
            
            {
                prop:'cjsj',
                label:'添加时间',
            },
            
          ],
          linkData:{
            title:"关联车场和泊位",
            visible:false
          },
          SeeCarInfoDialogVisible:false,
          carId:0
        
        
       
        
      }
  },
  created() {
    this.$store.dispatch("searchListAll/findCarPlateSelectList")
    this.$store.dispatch("specialCars/findBlackListCarPageData")
    this.$store.dispatch("searchListAll/findDictSelectList",'103') //字典详情

  },

  methods: {
    
    //设置查询参数
    plateDataGet(data){
        let hphm = data
        this.$store.dispatch("specialCars/changeBackListQuery",{hphm})
        this.$store.dispatch("searchListAll/findCarPlateSelectList",{hphm})

    },
   
    //查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("specialCars/findBlackListCarPageData",{current})
    },
    resetFilter(){
      this.$refs.plateChild.resetCon();
      this.colorValue= '',
      this.blackListValue='',
      this.timeValue=[]
      let isClear =true
      this.$store.dispatch("specialCars/changeBackListQuery",{isClear})
      let current = 1
      this.$store.dispatch("specialCars/findBlackListCarPageData",{current})

    },
    //table style
    cellStyle(row){
        if(row.column.label == '会员账号' || row.column.label == '车牌号码'){
            return 'color:blue;text-decoration:underline;cursor:pointer;'
        }

    },
    //单元格点击
    cellClick(row, column, cell, event){
        if(column.label == '车牌号码'){
          this.SeeCarInfoDialogVisible = true;
          this.msgSee = row;
        }

    },
    //修改
    change(data){
      this.$store.dispatch("specialCars/initBlackChangeData",data)
      let changeDialogueVisible = true
      this.$store.dispatch("specialCars/changeBlackDialogue",{changeDialogueVisible})

    },
    
    //删除
    deleteData(data){
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("specialCars/removeBlackListCarData",data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      

    },
    currentChange(val){
      let current = val
      this.$store.dispatch("specialCars/findBlackListCarPageData",{current})
    },
    //添加
    addCount(){
      let addDialogueVisible = true
      this.$store.dispatch("specialCars/changeBlackDialogue",{addDialogueVisible})

    },
    //导出
    exportTable(){
      this.$store.dispatch("specialCars/postExportBlackListCar")
    },
    cancelAddModal(){
      let addDialogueVisible = false
      this.$store.dispatch("specialCars/changeBlackDialogue",{addDialogueVisible})
    },
    confirmAddModal(){
      this.$store.dispatch("specialCars/postSaveBlackListCar")
    },
    cancelChangeModal(){
      let changeDialogueVisible = false
      this.$store.dispatch("specialCars/changeBlackDialogue",{changeDialogueVisible})
    },
    confirmChangeModal(){
      this.$store.dispatch("specialCars/postUpdateBlackListCar")
    },
        

    
  }, 
  computed:{
    
    plateData(){
      return this.$store.state.searchListAll.searchList.plateList;
    },
    colorList(){
        return enumeration.colorList;
    },
    blackList(){
        return this.$store.state.searchListAll.searchList.blackListTypeList;
    },
    tableDataLoading(){
      return this.$store.state.specialCars.blackList.tableDataLoading;
    },
    tableData(){
      return this.$store.state.specialCars.blackList.tableData ? this.$store.state.specialCars.blackList.tableData.records : null;
    },
    //分页器
    paginationTotal(){
      return this.$store.state.specialCars.blackList.tableData.total 
    },
    pageSize(){
    return this.$store.state.specialCars.blackList.listQuery.size 
    },
    currentPage(){
      return this.$store.state.specialCars.blackList.listQuery.current 
    },
    addData(){
      return this.$store.state.specialCars.blackList.addData
    },
    addDialogueVisible(){
      return this.$store.state.specialCars.blackList.addDialogueVisible
    },
    changeData(){
      return this.$store.state.specialCars.blackList.changeData
    },
    changeDialogueVisible(){
      return this.$store.state.specialCars.blackList.changeDialogueVisible
    },
    
    
  },
  watch:{
    colorValue(val){
        let cpys = val;
        this.$store.dispatch("specialCars/changeBackListQuery",{cpys})

    },
    blackListValue(val){
        let mdfx = val;
        this.$store.dispatch("specialCars/changeBackListQuery",{mdfx})

    },
    timeValue(val){
        let data = Array.isArray(val) ? {
                kssj:val[0],
                jssj:val[1]

            } : null

        this.$store.dispatch("specialCars/changeBackListQuery",data)

    }
    
  }
  


}
</script>

<style lang="less" scoped>
  // .el-row{
  //   padding-top:60px
  // }
  .companyTop{
    padding-bottom:30px !important;
  }
  .contentAdd{
      margin:0 20px !important;
      border-bottom: 2px solid #ebeef5;
      padding:0 0 20px 0;
  }
  .floatRight{
      float:right;
  }
</style>

