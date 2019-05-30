<template>
  <div class="lawbreakingCar">
    <div class="content-card search">
      <div>
          <el-row :gutter="15">
                <el-col :span="4">
                    <InputSearch :content='plateCon' :list='plateData' @inputDataSend='plateDataGet' ref='plateChild'></InputSearch>
                </el-col>
                <el-col :span="4">
                    <InputSearch :content='parkingCon' :list='parkingData' @inputDataSend='parkingDataGet' ref='parkingChild'></InputSearch>
                </el-col>
                <el-col :span="4">
                     <el-date-picker
                        v-model="monthVal"
                        type="month"
                        :placeholder="monthCon">
                    </el-date-picker>
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
            <el-button type="primary"  @click="exportTable">导出</el-button>
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
                    <el-button  type="text" size="small" @click="checkDetails(scope.row)">查看</el-button>
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
    <ParkingLeaveDetails :visible="isParkingDetails"  @cancelModal='cancelParkingLeaveModal'></ParkingLeaveDetails>
  </div>
</template>



<script>

import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import ParkingLeaveDetails from '@/components/DetailsDialogue/ParkingLeaveDetails';

export default {
  name: "LeaveCar",
  components: { InputSearch, ValidationProvider, ValidationObserver,  ParkingLeaveDetails },
  data () {
      return {
        
        plateCon:'请输入车牌号码',
        parkingCon:'请选择停车场',
        monthCon:'请选择入场月份',
        monthVal:'',
        
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'50'
            },
            {
                prop:'hphm',
                label:'车牌号',
            },
            {
                prop:'cpysString',
                label:'车辆颜色',
            },
            {
                prop:'ccmc',
                label:'停车场名称',
            },
            {
                prop:'ccdz',
                label:'详细地址',
            },
            {
                prop:'gsmc',
                label:'运营公司',
            },
            {
                prop:'rwsj',
                label:'入场时间',
            },
            

          ],
        isParkingDetails:false
        
       
        
      }
  },
  created() {
   
     //搜索框列表
    this.$store.dispatch("searchListAll/findCarPlateSelectList")
    let val = JSON.parse(localStorage.getItem('sysUser'))
    let gsid = val.gsid;
    this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid})
    
    //  table 
    this.$store.dispatch("conditionMonitoring/findParkingIllegalByPageData")
  },

  methods: {
    
    // //设置查询参数
    plateDataGet(data){
        let hphm = data
        this.$store.dispatch("conditionMonitoring/changeLawbreakingParkingQuery",{hphm})
        this.$store.dispatch("searchListAll/findCarPlateSelectList",{hphm})

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
          this.$store.dispatch("conditionMonitoring/changeLawbreakingParkingQuery",{ccbh})
        }
    },
   
   
    // 查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("conditionMonitoring/findParkingIllegalByPageData",{current})
    },
    resetFilter(){
      this.$refs.plateChild.resetCon();
      this.$refs.parkingChild.resetCon();
      this.monthVal=''
      let isClear=true
      this.$store.dispatch("conditionMonitoring/changeLawbreakingParkingQuery",{isClear})
      let current = 1
      this.$store.dispatch("conditionMonitoring/findParkingIllegalByPageData",{current})
    },
    //table style
    cellStyle(row){
        // if(row.column.label == '泊位编号' || row.column.label == '车牌号码'){
        //     return 'color:blue;text-decoration:underline;cursor:pointer;'
        // }

    },
    //单元格点击
    cellClick(row, column, cell, event){
        // if(column.label == '车牌号码'){
        //   this.SeeCarInfoDialogVisible = true;
        //   this.carId = row.id*1;
        // }

    },
    // check
    checkDetails(data){
      this.isParkingDetails = true;

      this.$store.dispatch('detailsDataAll/getParkingRecordInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordLeaveInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordChangeInfo',data)

    },
    //分页
    currentChange(val){
      let current = val
      this.$store.dispatch("conditionMonitoring/changeLawbreakingParkingQuery",{current})
      this.$store.dispatch("conditionMonitoring/findParkingIllegalByPageData")
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
      console.log(this.$store.state)
      return this.$store.state.searchListAll.searchList.plateList;
    },
    parkingData(){
        return this.$store.state.searchListAll.searchList.parkingList;
    },
    
    tableDataLoading(){
      return this.$store.state.conditionMonitoring.lawbreakingPark.tableDataLoading;
    },
    tableData(){
      let data = this.$store.state.conditionMonitoring.lawbreakingPark.tableData ? this.$store.state.conditionMonitoring.lawbreakingPark.tableData.records : null;
      return data;
    },
    paginationTotal(){
      return this.$store.state.conditionMonitoring.lawbreakingPark.tableData.total 
    },
    pageSize(){
    return this.$store.state.conditionMonitoring.lawbreakingPark.listQuery.size 
    },
    currentPage(){
      return this.$store.state.conditionMonitoring.lawbreakingPark.listQuery.current 
    },
    

    
    
  },
  watch:{
      monthVal(data){
          let yearMonth = data
          this.$store.dispatch("conditionMonitoring/changeLawbreakingParkingQuery",{yearMonth})
      }
   
    
  }
 


}
</script>

<style lang="less" scoped>
  .lawbreakingCar{
      
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

