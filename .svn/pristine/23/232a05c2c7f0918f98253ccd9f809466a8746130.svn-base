<template>
  <div class="PersonalVip-page">
    <div class="content-card search">
      <el-row  :gutter="15">
        <el-col :span="5">
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
        
        <el-col :span="8">
            <div class="block">
                <el-date-picker
                v-model="timeValue"
                :default-time="['00:00:00', '23:59:59']"
                type="datetimerange"
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
                    <el-button  type="text" size="small" @click="linkParkPlace(scope.row)">关联泊位</el-button>
                    <el-button  type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="10"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change='currentChange'
        >
      </el-pagination>
    </div>
    <AddWhiteList :msg="addData"  :visible="addDialogueVisible" @cancelModal='cancelAddModal' @confirmModal='confirmAddModal'> </AddWhiteList>
    <AddWhiteList :msg="changeData"  :visible="changeDialogueVisible" @cancelModal='cancelChangeModal' @confirmModal='confirmChangeModal'> </AddWhiteList>
    <LinkParkPlace :msg="linkData"  :transferData='transferData' :visible="linkDialogueVisible" @cancelModal='cancelLinkModal' @confirmModal='confirmLinkModal'></LinkParkPlace>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
  </div>
</template>



<script>

import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import AddWhiteList from '@/components/SingleDialogueInput/addWhiteList'
import SeeCarInfoDialog from '@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog.vue'
import LinkParkPlace from '../WhiteListCars/Dialogue/LinkParkPlace'
import enumeration from '@/enumeration/enumeration'


export default {
  name: "PersonalVip",
  components: { InputSearch, ValidationProvider, ValidationObserver, AddWhiteList, LinkParkPlace,SeeCarInfoDialog},
  data () {
      return {
        plateCon:'请输入车牌号码',
        colorCon:'请选择车牌颜色',
        colorValue: '',
        timeValue:[],
        disabledListValue:'',
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
                prop:'sjh',
                label:'绑定会员手机号',
            },
            
            {
                prop:'cjsj',
                label:'添加时间',
            },
            {
                prop:'gltcc',
                label:'关联停车场',
            }
          ],
          linkData:{
            title:"关联车场和泊位",
            visible:false
          },
          SeeCarInfoDialogVisible:false,
          msgSee:{}
        
        
       
        
      }
  },
  created() {
    this.$store.dispatch("searchListAll/findCarPlateSelectList")
    this.$store.dispatch("specialCars/findDisabledCarPageData")

  },

  methods: {
    
    //设置查询参数
    plateDataGet(data){
        let hphm = data
        this.$store.dispatch("specialCars/changeDisabledListQuery",{hphm})
        this.$store.dispatch("searchListAll/findCarPlateSelectList",{hphm})

    },
   
    //查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("specialCars/findDisabledCarPageData",{current})
    },
    resetFilter(){
      this.$refs.plateChild.resetCon();
      this.colorValue= '',
      this.timeValue=[]

      let current = 1
      this.$store.dispatch("specialCars/findDisabledCarPageData",{current})

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
      this.$store.dispatch("specialCars/initDisabledChangeData",data)
      let changeDialogueVisible = true
      this.$store.dispatch("specialCars/changeDisabledDialogue",{changeDialogueVisible})

    },
    //关联泊位
    linkParkPlace(data){
      data.linkNum = 'DisabledCars'
      this.$store.dispatch("specialCars/getParkingGarageNameSelectList",data)
      this.$store.dispatch("specialCars/getWhiteListCarSpaceList",data)  //获得已关联停车场
    },
    //删除
    deleteData(data){
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("specialCars/removeDisabledCarData",data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      

    },
    currentChange(val){
      let current = val
      this.$store.dispatch("specialCars/findDisabledCarPageData",{current})
    },
    //添加
    addCount(){
      let addDialogueVisible = true
      this.$store.dispatch("specialCars/changeDisabledDialogue",{addDialogueVisible})

    },
    //导出
    exportTable(){
      this.$store.dispatch("specialCars/postExportDisabledCar")

    },
    cancelAddModal(){
      let addDialogueVisible = false
      this.$store.dispatch("specialCars/changeDisabledDialogue",{addDialogueVisible})
    },
    confirmAddModal(){
      this.$store.dispatch("specialCars/postSaveDisabledCar")
    },
    cancelChangeModal(){
      let changeDialogueVisible = false
      this.$store.dispatch("specialCars/changeDisabledDialogue",{changeDialogueVisible})
    },
    confirmChangeModal(){
      this.$store.dispatch("specialCars/postUpdateDisabledCar")
    },
    cancelLinkModal(){
      let linkDialogueVisible = false;
      this.$store.dispatch("specialCars/changeAddDialogue",{linkDialogueVisible})
    },
    confirmLinkModal(data){
        this.$store.dispatch("specialCars/postUpdateWhiteListCarSpace",data)
        
    }

    
  }, 
  computed:{
    
    plateData(){
      return this.$store.state.searchListAll.searchList.plateList;
    },
    colorList(){
        return enumeration.colorList;
    },
    
    tableDataLoading(){
      return this.$store.state.specialCars.disabledList.tableDataLoading;
    },
    tableData(){
      return this.$store.state.specialCars.disabledList.tableData ? this.$store.state.specialCars.disabledList.tableData.records : null;
    },
    paginationTotal(){
      return this.$store.state.specialCars.disabledList.tableData.total 
    },
    pageSize(){
    return this.$store.state.specialCars.disabledList.listQuery.size 
    },
    currentPage(){
      return this.$store.state.specialCars.disabledList.listQuery.current 
    },
    addData(){
      return this.$store.state.specialCars.disabledList.addData
    },
    addDialogueVisible(){
      return this.$store.state.specialCars.disabledList.addDialogueVisible
    },
    changeData(){
      return this.$store.state.specialCars.disabledList.changeData
    },
    changeDialogueVisible(){
      return this.$store.state.specialCars.disabledList.changeDialogueVisible
    },
    linkDialogueVisible(){
      return this.$store.state.specialCars.whiteList.linkDialogueVisible
    },
    transferData(){
        let data = this.$store.state.specialCars.whiteList.linkData ;
      return data;
    }
    
  },
  watch:{
    colorValue(val){
        let cpys = val;
        this.$store.dispatch("specialCars/changeDisabledListQuery",{cpys})

    },
    whiteListValue(val){
        let mdfx = val;
        this.$store.dispatch("specialCars/changeDisabledListQuery",{mdfx})

    },
    timeValue(val){
        let data = Array.isArray(val) ? {
                kssj:val[0],
                jssj:val[1]

            } : null

        this.$store.dispatch("specialCars/changeDisabledListQuery",data)

    }
    
  }
  


}
</script>

<style lang="less" scoped>
//   .el-row{
//     padding-top:60px
//   }
  
  .contentAdd{
      margin:0 20px !important;
      border-bottom: 2px solid #ebeef5;
      padding:0 0 20px 0;
  }
  .floatRight{
      float:right;
  }
</style>

