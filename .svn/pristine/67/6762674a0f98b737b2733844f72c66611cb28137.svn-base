
<template>
   <el-dialog :title="msg.title" class="lg-dialog" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" 
   :close-on-click-modal='false'
   >
     <div class="page">
        <ValidationObserver >
          <el-form slot-scope="{ validate }">
            <el-row>
              <el-radio v-model="radio" label="1">
                  全部
                </el-radio>
              <span class='note'>
                  注：指运营公司所属的全部车场
                </span>
                
            </el-row>
            <el-row>
              <el-radio v-model="radio" label="2">部分</el-radio>
              
              <!-- <div class="transfer" > 
                <div class="searchInput">
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="parkingVal"
                    :fetch-suggestions="querySearch"
                    :placeholder="parkingCon"
                    >
                    <template slot-scope="props">
                      <div class="name">{{ props.item.value }}</div>
                      <span class="addr">{{ props.item.address }}</span>
                    </template>
                  </el-autocomplete>
                </div>
                <tree-transfer :title="treeTitle" :from_data='transferData' :to_data='toData' :defaultProps="{label:'label'}"   @addBtn='add' @removeBtn='remove'
                  :mode='mode'  filter openAll>
                </tree-transfer>
                <div class="modal" v-show='modalFlag'>
                </div>
              </div> -->
              <div class="transfer" > 
                <div class="searchInput">
                  <div class="modal" v-show='modalFlag'>
                  </div>

                  <el-row > 
                    <el-col :span="6">
                      <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="companyVal"
                        :fetch-suggestions="querySearchCompany"
                        :placeholder="companyCon"
                        >
                        <template slot-scope="props">
                          <div class="name">{{ props.item.value }}</div>
                          <span class="addr">{{ props.item.address }}</span>
                        </template>
                      </el-autocomplete>
                    </el-col>
                    <el-col :span="6">
                      <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="roadVal"
                        :fetch-suggestions="querySearchRoad"
                        :placeholder="roadCon"
                        >
                        <template slot-scope="props">
                          <div class="name">{{ props.item.value }}</div>
                          <span class="addr">{{ props.item.address }}</span>
                        </template>
                      </el-autocomplete>
                    </el-col>
                    <el-col :span="6">
                      <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="parkingVal"
                        :fetch-suggestions="querySearch"
                        :placeholder="parkingCon"
                        >
                        <template slot-scope="props">
                          <div class="name">{{ props.item.value }}</div>
                          <span class="addr">{{ props.item.address }}</span>
                        </template>
                      </el-autocomplete>
                      
                    </el-col>
                    <el-col :span="6">
                      <el-button @click="handleFilter">查询</el-button>
                      <el-button @click="resetFilter">重置</el-button>
                      
                    </el-col>


                  </el-row>
                  
                  <el-row >
                    <div class="topTable">
                      <el-table
                        v-loading="tableLinkLoading"
                        :data="parkingDetailList"
                        style="width:100%"
                        >
                        <el-table-column
                            :prop="v.prop"
                            :label="v.label"
                            :width="v.width"
                            v-for='(v,i) in tableList'
                            :key='i + "parkingDetailList"'
                            >
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="操作"
                            width="250"
                            >
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="addPark(scope.row)">添加</el-button>
                                
                            </template>
                        </el-table-column>
                      </el-table>

                    </div>
                    
                  <el-pagination
                    background
                    layout="prev, pager, next" 
                    :total="paginationTotal"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change='currentChange'
                    >
                  </el-pagination>
                    
                  </el-row>
                  <div>
                    已关联停车场
                  </div>
                  
                  
                  <el-row class="footTable">
                    <el-table
                        :data="parkingDetailAddList"
                        style="width:100%"
                        >
                        <el-table-column
                            :prop="v.prop"
                            :label="v.label"
                            :width="v.width"
                            v-for='(v,i) in tableList'
                            :key='i + "parkingDetailAddList"'
                            >
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="操作"
                            width="250"
                            >
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="deletePark(scope.row)">删除</el-button>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                  </el-row>
                </div>
              </div>

                 
            </el-row>
            <div class='border'>

            </div >
              <div  class="paddingThirdInput">
                <el-row   class='singleConHeader'>
                  <el-col :span='9'>
                    <ValidationProvider rules='required' name="操作员密码">
                      <el-form-item slot-scope="{ errors }" :error="errors[0]" label="操作员密码">
                        <input v-model="passwordData"  class='inputSize' type="password" >
                      </el-form-item>
                    </ValidationProvider>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <div class='confirmCenter'>
                  
                <el-button @click="validate().then(confirmModal)" class='confirm'> 
                  确定
                </el-button>
                <el-button @click="concelBtnModal" class='cancel'> 
                  取消
                </el-button>

                </div>
                
              </el-row>
        </el-form>
      </ValidationObserver>
     
     </div>

  </el-dialog>
</template>
<script>
// link car 弹窗
import treeTransfer from 'el-tree-transfer';
import { ValidationObserver, ValidationProvider } from 'vee-validate';   
import InputSearch from '@/components/InputSearch'; 


  export default {
    name: 'LinkParkPlace',
    props:['msg','visible','transferData'],
    components:{ treeTransfer, ValidationObserver, ValidationProvider, InputSearch },
    data() {
      return {
        parkingCon:'请选择停车场',
        radio:'1',
        mode: "transfer", // transfer addressList
        toData:[],
        treeTitle:['所有停车场','关联停车位'], 
        passwordData:'',
        modalFlag:true,
        parkingVal: '',
        //加table
        companyCon:'请选择运营公司',
        roadCon:"请选择所属道路",
        plateCon:"请选择停车场",
        companyData2:[{
          key:'1',
          label:"1223"
        }],
        companyVal:'',
        roadVal:'',
        tableList:[
            {
                prop:'webIndex',
                label:'#',
                width:'100'
            },
            {
                prop:'ccbh',
                label:'停车场编号',
            },
            {
                prop:'ccmc',
                label:'停车场名称',
            },
            {
                prop:'yygs',
                label:'所属运营公司',
            },
            {
                prop:'xnqymc',
                label:'所属区域', 
            },
            {
                prop:'dlmc',
                label:'所属道路',
            },
          
            
          ],
        cardTableList:[]
        
      };
    },
    created(){
      this.$store.dispatch("searchListAll/findSysOrgSelectList") //公司列表
      this.$store.dispatch("searchListAll/findParkingRoadSelectList") //道路列表
      let val = JSON.parse(localStorage.getItem('sysUser'))
      let gsid = val.gsid;
      this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid}) //停车场列表
      // this.$store.dispatch("specialCars/getParkingGarageData") //列表数据 

    },
    methods: {
      cancelModal(){
        
        this.resetFilter()
        this.$emit('cancelModal')
        this.radio = "1"
      },
      concelBtnModal(){
        this.cancelModal()
      },
      confirmModal(){
        
        this.resetFilter()
        let res ={
          passwordData:this.passwordData,
          // toData:this.toData,
          radio:this.radio,
          cardData:{
            area:this.cardTableList,
            areaType:this.radio
          }
        }
         
        this.$emit('confirmModal',res)
        this.passwordData = ''
        this.radio = "1"
      },
      //查询
      handleFilter(){
        this.$store.dispatch("specialCars/findParkingGarageData")

      },
      resetFilter(){
         this.parkingVal= ''
          this.companyVal=''
          this.roadVal=''
      
          let isClear =true
          this.$store.dispatch("specialCars/changeParkingGarageQuery",{isClear})
          this.$store.dispatch("specialCars/findParkingGarageData")
      
      },
      
      
     
      
      // // 监听穿梭框组件添加
      // add(fromData,toData,obj){
       
      //   this.toData = toData;
      // },
      // // 监听穿梭框组件移除
      // remove(fromData,toData,obj){
        
      //   this.toData = toData;
      // },
      querySearch(queryString, cb) {
        var restaurants = this.parkingData;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //公司
      querySearchCompany(queryString, cb) {
        var restaurants = this.companyData;
        var results = queryString ? restaurants.filter(this.createFilterCompany(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterCompany(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      //道路
      querySearchRoad(queryString, cb) {
        var restaurants = this.roadData;
        var results = queryString ? restaurants.filter(this.createFilterRoad(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterRoad(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      addPark(data){
        
        this.$store.dispatch("specialCars/addParkingGarageData",data)

      },
      deletePark(data){

        this.$store.dispatch("specialCars/deleteParkingGarageData",data)
      },
      currentChange(val){
        let current = val
        this.$store.dispatch("specialCars/findParkingGarageData",{current})
      },

    }, 
    computed:{
      linkData(){
       
      },
      parkingData(){
       
          let data = this.$store.state.specialCars.whiteList.parkingList;
          return data;
       
      },
      companyData(){
        let data = this.$store.state.searchListAll.searchList.companyList;
       
        return data
      },
      roadData(){
        return this.$store.state.searchListAll.searchList.roadList;
      },
      tableLinkLoading(){
        let data = this.$store.state.specialCars.whiteList.tableLinkLoading;
          return data;

      },
      parkingDetailList(){
        return this.$store.state.specialCars.whiteList.parkingDetailList ? this.$store.state.specialCars.whiteList.parkingDetailList.records : null;
         
      },
      paginationTotal(){
        return this.$store.state.specialCars.whiteList.parkingDetailList.total 
      },
      pageSize(){
        return this.$store.state.specialCars.whiteList.parkingGarageQuery.size 
      },
      currentPage(){
        return this.$store.state.specialCars.whiteList.listQuery.current 
      },
      parkingDetailAddList(){
          let data = this.$store.state.specialCars.whiteList.parkingDetailAddList;
          this.cardTableList = [...data];
          return data;
      },
      

      
    },
    watch:{
      radio(val){
        if(val == 1){
          this.modalFlag = true;
        }else if(val == 2){
          this.modalFlag = false;
        }
        
        
      },
      toData(val){
      },
      parkingVal( val) {
        
        let res 
        this.parkingData.map((v,i) =>{
            if(v.value == val){
                res = v.key
            }
        })
        let parkId = res
        let ccmc = val
        ccmc && this.$store.dispatch("specialCars/getParkingGarageNameSelectList",{ccmc})
        parkId && this.$store.dispatch("specialCars/changeParkingGarageQuery",{parkId})
        ccmc && this.$store.dispatch("specialCars/changeParkingGarageQuery",{ccmc})
      },
      companyVal(val){
        let res 
        let companyName
        this.companyData.map((v,i) =>{
            if(v.value == val){
                res = v.key
                companyName = val
            }
        })
        let gsid = res
        let companyListId = res
        if(gsid){
          companyListId && this.$store.dispatch("specialCars/changeParkingGarageQuery",{companyListId})
          this.$store.dispatch("searchListAll/findParkingGarageNameSelectList",{gsid})
          // this.$store.dispatch("searchListAll/findParkingSpaceBhSelectList",{gsid})
        }

      },
      roadVal(val){
         let res 
        this.roadData.map((v,i) =>{
            if(v.value == val){
                res = v.key
            }
        })
        let roadId = res
        
        let dlmc = val
        this.$store.dispatch("searchListAll/findParkingRoadSelectList",{dlmc})
        this.$store.dispatch("specialCars/changeParkingGarageQuery",{roadId})

      }
      

    },
    
    
  }
</script>
<style lang='less' scoped>
  
  .page{
    .note{
      padding-left:60px; 
    }
    
    .border{
      border-top: 1px solid #aaa;
      width:50%;
      margin:20px 0 0 20px;
    }
    .searchInput{
      padding:20px 0;
    }
    .transfer{
      position: relative;
      .modal{
        opacity: 0.3;
        position:absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background: #fff;
        z-index:999;
      }
      /deep/.topTable{
        margin-bottom: 20px;
        height: 200px;
      }
      .footTable{
        height: 150px;
        overflow: auto;
      }

    }
    .paddingThirdInput{
      padding:20px 0 0 40px;
      .singleConHeader{
        padding:0;
        height: 50px;

        .inputSize{
          width:50%;
          height:30px;
        }
      }

    }
    
    .confirmCenter{
      
      margin:0 auto;
      overflow: hidden;
      width:300px;
      .cancel{
        display: block;
        font-size: 20px;
        width:100px;
        float:left;
        

      }

      .confirm{
        display: block;
        font-size: 20px;
        width:100px;
        float:left;

      }

    }
    
  }
</style>