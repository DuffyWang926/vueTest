<template>
  <div class="PersonalVip-page">
    <div class="content-card search">
      <div  >
          <el-row :gutter="15">
                <el-col :span="5">
                    <InputSearch :content='parkingCon' :list='parkingData' @inputDataSend='parkingDataGet' ref='parkingChild'></InputSearch>

                </el-col>
                <el-col :span="5">
                    <InputSearch :content='companyCon' :list='companyData' @inputDataSend='companyDataGet' ref='companyChild'></InputSearch>
                </el-col>
                <el-col :span="5">
                    <InputSearch :content='regionCon' :list='regionData' @inputDataSend='regionDataGet' ref='regionChild'></InputSearch>

                </el-col>
                <el-col :span="5">
                    <ValidationProvider rules='numeric' name=" ">
                        <template slot-scope="{ errors }"  >
                            <el-input :placeholder="overtimeCon" v-model='overtimeVal' class='inputSize'></el-input>
                            <span class="errorStyle">{{ errors[0] }}  </span>
                        </template>
                    </ValidationProvider>
                    
                </el-col>
                <el-col :span="4" class='rightFloat'>
                    <el-button type="primary" @click="handleFilter">查询</el-button>
                    <el-button type="primary" @click="resetFilter">重置</el-button> 
                </el-col>

          </el-row>
           
        
      </div>
     
    </div>
    <div class="content-card ">
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
                    <el-button  type="text" size="small" @click="manualLeave(scope.row)">人工离场</el-button>
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
    <manualLeave :msg="manualLeaveData"  :visible="manualLeaveVisible" @cancelModal='cancelManualLeaveModal'  @confirmModal='confirmManualLeaveModal'
    @checkClick='checkDetails'
    > </manualLeave>
    <ParkingLeaveDetails :visible="isParkingDetails" @cancelModal='cancelParkingLeaveModal'></ParkingLeaveDetails>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
    <SeeRoadInParkingLot v-if="SeeRoadInParkingLotVisible" :visible.sync="SeeRoadInParkingLotVisible" :msg="myMsg"></SeeRoadInParkingLot>
    <SeeRoadInParkingSpace v-if="RoadInParkingSpaceDetailVisible" :visible.sync="RoadInParkingSpaceDetailVisible" :msg="detailData"></SeeRoadInParkingSpace>
  </div>
</template>



<script>

import InputSearch from '@/components/InputSearch';
import {ValidationProvider,ValidationObserver } from 'vee-validate';
import manualLeave from '../ParkingCar/manualLeave.vue'
import ParkingLeaveDetails from '@/components/DetailsDialogue/ParkingLeaveDetails';
import SeeCarInfoDialog from '@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog.vue'
import SeeRoadInParkingLot from '@/views/Resources/RoadInParkingLot/RoadInParkingLotDialog/SeeRoadInParkingLot'
import SeeRoadInParkingSpace from '@/views/Resources/RoadInParkingSpace/RoadInParkingSpaceDialog/SeeRoadInParkingSpace'

export default {
  name: "LonglyCar",
  components: { InputSearch, ValidationProvider, ValidationObserver, manualLeave, ParkingLeaveDetails, SeeCarInfoDialog, SeeRoadInParkingLot, SeeRoadInParkingSpace },
  data () {
      return {
        
        regionCon:'请选择所属区域',
        companyCon:'请选择运营公司',
        parkingCon:'请选择停车场',
        overtimeCon:'请输入超时天数',
        overtimeVal:'',
        owedNum:'',
        timeValue:"",
        oweList:[
            {
            value: '0',
            label: '没有欠费'
            }, 
            {
            value: '1',
            label: '正在欠费'
            }, 
            
            ],
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'100'
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
                width:'150'
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
                prop:'parkingTime',
                label:'已停时长',
                width:'200'
            },
            {
                prop:'deviceName',
                label:'入位设备',
                width:'150'
            },

          ],
        isParkingDetails:false,
        manualLeaveDataTemp:{},
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
    this.$store.dispatch("searchListAll/findSsqySelectList")
    this.$store.dispatch("searchListAll/findSysOrgSelectList")
    let val = JSON.parse(localStorage.getItem('sysUser'))
    let gsid = val.gsid;
    this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid})
    
     //table
    this.$store.dispatch("parkingRecord/findLongTimePageData")
  },

  methods: {
    
    //设置查询参数

    regionDataGet(data){
        let res 
        this.regionData.map((v,i) =>{
            if(v.value == data){
                res = v.key
            }
        })
        let qybh = res
        if(qybh){
        this.$store.dispatch("parkingRecord/changeLongParkingQuery",{qybh})

        }

    },
    companyDataGet(data){
        let res 
        this.companyData.map((v,i) =>{
            if(v.value == data){
                res = v.key
            }
        })
        let gsid = res
        if(gsid){
          
          this.$store.dispatch("parkingRecord/changeLongParkingQuery",{gsid})
          this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid})
        }

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
          this.$store.dispatch("parkingRecord/changeLongParkingQuery",{ccbh})
        }
    },
   
   
    //查询 重置
    handleFilter(){
      let current = 1
      this.$store.dispatch("parkingRecord/findLongTimePageData",{current})
    },
    resetFilter(){
      this.$refs.regionChild.resetCon();
      this.$refs.companyChild.resetCon();
      this.$refs.parkingChild.resetCon();
      this.overtimeVal=''
      let isClear=true
      this.$store.dispatch("parkingRecord/changeLongParkingQuery",{isClear})
      this.handleFilter();
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
    // 详情
    parkDetails(data){
      this.isParkingDetails = true;
      this.$store.dispatch('detailsDataAll/getParkingRecordInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordLeaveInfo',data)
      this.$store.dispatch('detailsDataAll/getParkingRecordChangeInfo',data)

    },
    //人工离场
    manualLeave(data){
      this.manualLeaveDataTemp = data;
      let manualLeaveVisible = true;
      this.$store.dispatch("parkingRecord/changeParkingCarsDialogue",{manualLeaveVisible})
      this.$store.dispatch("parkingRecord/getUserMemberInfoParkData",data)
    },
    currentChange(val){
      let current = val
      this.$store.dispatch("parkingRecord/changeLongParkingQuery",{current})
      this.$store.dispatch("parkingRecord/findLongTimePageData")
    },
    //导出
    exportTable(){

    },
    confirmManualLeaveModal(data){
      data.pageNum='LonglyCar'
      this.$store.dispatch("parkingRecord/postManualLeaveParking",data)

    },
    cancelManualLeaveModal(){
      let manualLeaveVisible = false;
      this.$store.dispatch("parkingRecord/changeParkingCarsDialogue",{manualLeaveVisible})
      
    },
    cancelParkingLeaveModal(){
      this.isParkingDetails = false;
    },
    checkDetails(){
      let data = this.manualLeaveDataTemp;
      this.parkDetails(data)
    }
    
    
    

    
  }, 
  computed:{
    //搜索框list
    
    regionData(){
        return this.$store.state.searchListAll.searchList.regionList;
    },
    companyData(){
        return this.$store.state.searchListAll.searchList.companyList;
    },
    parkingData(){
        return this.$store.state.searchListAll.searchList.parkingList;
    },
    
    tableDataLoading(){
      return this.$store.state.parkingRecord.longParking.tableDataLoading;
    },
    tableData(){
      return this.$store.state.parkingRecord.longParking.tableData ? this.$store.state.parkingRecord.longParking.tableData.records : null;
    },
    paginationTotal(){
      return this.$store.state.parkingRecord.longParking.tableData.total 
    },
    pageSize(){
    return this.$store.state.parkingRecord.longParking.listQuery.size 
    },
    currentPage(){
      return this.$store.state.parkingRecord.longParking.listQuery.current 
    },
    manualLeaveData(){
      return this.$store.state.parkingRecord.parkingCars.manualLeaveData
    },
    manualLeaveVisible(){
      return this.$store.state.parkingRecord.parkingCars.manualLeaveVisible
    },
    

    
    
  },
  watch:{
      overtimeVal(data){
          let dayNum = data
          this.$store.dispatch("parkingRecord/changeLongParkingQuery",{dayNum})
          if(data > 1000){
          this.$message.error('输入长度不得超过4位')
          this.overtimeVal = this.overtimeVal.slice(0,3)

          }
      }
   
    
  }
 


}
</script>

<style lang="less" scoped>
  .PersonalVip-page{
      
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
      }
      .floatRight{
          float:right;
      }

  }
</style>

