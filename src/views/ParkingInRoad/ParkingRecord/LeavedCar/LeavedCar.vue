<template>
  <div class="LeavePage">
    <div class="content-card search">
      <div>
          <el-row :gutter="15">
                <el-col :span="4">
                     <el-date-picker
                        v-model="monthVal"
                        type="month"
                        :placeholder="monthCon">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <InputSearch :content='plateCon' :list='plateData' @inputDataSend='plateDataGet' ref='plateChild'></InputSearch>
                </el-col>
                <el-col :span="4">
                    <InputSearch :content='parkingPlaceCon' :list='parkingPlaceData' @inputDataSend='parkingPlaceDataGet' ref='parkingPlaceChild'></InputSearch>
                </el-col>
                <el-col :span="4">
                    <InputSearch :content='parkingCon' :list='parkingData' @inputDataSend='parkingDataGet' ref='parkingChild'></InputSearch>
                </el-col>
                <el-col :span="4" class='rightFloat'>
                    <el-button type="primary" @click="handleFilter">查询</el-button>
                    <el-button type="primary" @click="resetFilter">重置</el-button>
                </el-col>

          </el-row>
           
        
      </div>
      
    </div>
    <div class="content-card">
      <div class="table-add-button">
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
                width="200"
                >
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="parkDetails(scope.row)">详情</el-button> 
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
    <ParkingLeaveDetails :visible="isParkingDetails" :msg='parkingDetailsData' @cancelModal='cancelParkingLeaveModal'></ParkingLeaveDetails>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
    <SeeRoadInParkingSpace v-if="RoadInParkingSpaceDetailVisible" :visible.sync="RoadInParkingSpaceDetailVisible" :msg="detailData"></SeeRoadInParkingSpace>
  </div>
</template>



<script>

import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import ParkingLeaveDetails from '@/components/DetailsDialogue/ParkingLeaveDetails';
import SeeCarInfoDialog from '@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog.vue'
import SeeRoadInParkingLot from '@/views/Resources/RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot'
import SeeRoadInParkingSpace from '@/views/Resources/RoadInParkingSpace/RoadInParkingSpaceDialog/SeeRoadInParkingSpace'

export default {
  name: "LeaveCar",
  components: { InputSearch, ValidationProvider, ValidationObserver,  ParkingLeaveDetails,  SeeCarInfoDialog, SeeRoadInParkingLot, SeeRoadInParkingSpace },
  data () {
      return {
        
        monthCon:'请选择入场月份',
        plateCon:'请输入车牌号码',
        parkingCon:'请选择停车场',
        parkingPlaceCon:'请选择停车位编号',
        
        monthVal:'',
        
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'50'
            },
            {
                prop:'qymc',
                label:'所属区域',
                width:'150'
            },
            {
                prop:'gsmc',
                label:'所属公司',
                width:'150'
            },
            {
                prop:'ccmc',
                label:'停车场',
                width:'200'
            },
            {
                prop:'cwbh',
                label:'泊位编号',
                width:'150'
            },
            {
                prop:'hphm',
                label:'车牌号码',
                width:'150'
            },
            {
                prop:'cpysString',
                label:'车牌颜色',
                width:'100'
            },
            {
                prop:'rwsj',
                label:'入位时间',
                width:'200'
            },
            {
                prop:'lwsj',
                label:'离位时间',
                width:'200'
            },
            {
                prop:'parkingTime',
                label:'停车时长',
                width:'200'
            },
            

          ],
        isParkingDetails:false,
        SeeCarInfoDialogVisible:false,
        msgSee:{},
        SeeRoadInParkingLotVisible:false,
        myMsg:{},
        RoadInParkingSpaceDetailVisible:false,
        detailData:{}
        
       
        
      }
  },
  created() {
   
     //搜索框列表
    this.$store.dispatch("searchListAll/findCarPlateSelectList")
    let val = JSON.parse(localStorage.getItem('sysUser'))
    let gsid = val.gsid
    // val.id;
    this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid})
    this.$store.dispatch("searchListAll/findParkingSpaceBhSelectList",{gsid})
     //table
    this.$store.dispatch("parkingRecord/findLeaveParkingPageData")
  },

  methods: {
    
    // //设置查询参数
    plateDataGet(data){
        let hphm = data
        this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{hphm})
        this.$store.dispatch("searchListAll/findCarPlateSelectList",{hphm})

    },
    parkingPlaceDataGet(data){
        let res 
        this.parkingPlaceData.map((v,i) =>{
            if(v.value == data){
                res = v.key
                
            }
        })
        let cwbh = res
        this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{cwbh})
    },
    parkingDataGet(data){
        
        let res 
        this.parkingData.map((v,i) =>{
            if(v.value == data){
                res = v.key
                
            }
        })
        let ccbh = res

        if(ccbh){
          this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{ccbh})
        }
    },
   
   
    //查询 重置
    handleFilter(){
      let current = 1;
      this.$store.dispatch("parkingRecord/findLeaveParkingPageData",{current})
    },
    resetFilter(){
        
      this.$refs.plateChild.resetCon();
      this.$refs.parkingPlaceChild.resetCon();
      this.$refs.parkingChild.resetCon();
      this.monthVal=''
      let isClear=true
      this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{isClear})
      this.handleFilter()

    },
    //table style
    cellStyle(row){
        if(row.column.label == '泊位编号' || row.column.label == '车牌号码' || row.column.label == '停车场'){
            return 'color:blue;text-decoration:underline;cursor:pointer;'
        }

    },
    //单元格点击
    cellClick(row, column, cell, event){
        if(column.label == '车牌号码'){
          this.SeeCarInfoDialogVisible = true;
          this.msgSee = row;
        }else if(column.label == '停车场'){
          this.SeeRoadInParkingLotVisible = true;
          this.myMsg = row;
        }else if(column.label == '泊位编号'){
          this.RoadInParkingSpaceDetailVisible = true;
          this.detailData = row;
        }
 

    },
    // // 详情
    parkDetails(data){
      this.isParkingDetails = true;
      this.$store.dispatch('detailsDataAll/getParkingRecordInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordLeaveInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordChangeInfo',data)

    },
    //分页
    currentChange(val){
      let current = val
      this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{current})
      this.$store.dispatch("parkingRecord/findLeaveParkingPageData")
    },
    //导出
    exportTable(){

    },
    //详情
    cancelParkingLeaveModal(){
      this.isParkingDetails = false;
    }
    
    
    

    
  }, 
  computed:{
    //搜索框list
    plateData(){
      return this.$store.state.searchListAll.searchList.plateList;
    },
    parkingPlaceData(){
        return this.$store.state.searchListAll.searchList.parkingPlaceList;
    },
    parkingData(){
        return this.$store.state.searchListAll.searchList.parkingList;
    },
    
    tableDataLoading(){
      return this.$store.state.parkingRecord.leaveParking.tableDataLoading;
    },
    tableData(){
      return this.$store.state.parkingRecord.leaveParking.tableData ? this.$store.state.parkingRecord.leaveParking.tableData.records : null;
    },
    paginationTotal(){
      return this.$store.state.parkingRecord.leaveParking.tableData.total 
    },
    pageSize(){
    return this.$store.state.parkingRecord.leaveParking.listQuery.size 
    },
    currentPage(){
      return this.$store.state.parkingRecord.leaveParking.listQuery.current 
    },
    parkingDetailsData(){
      return this.$store.state.parkingRecord.leaveParking.manualLeaveVisible
    }

    
    
  },
  watch:{
      monthVal(data){
          let yearMonth = data
          this.$store.dispatch("parkingRecord/changeLeaveParkingQuery",{yearMonth})
      }
   
    
  }
 


}
</script>

<style lang="less" scoped>
  .LeavePage{
    
      .inputSize{
          width:90%;
      }
      .errorStyle{
            display:block;
            padding-top:10px;
            color:red;
        }
    .contentAdd{
        margin:0 20px !important;
        border-bottom: 2px solid #ebeef5;
        padding:0 0 20px 0;
        .floatRight{
          float:right;
      }
    }
    

  }
</style>

