<template>

    <div class="content-card page" >
        <el-row class="contentTop">
            <el-col :span="5">
                <InputSearch :content='accountCon' :list='companyCount' @inputDataSend='companyCountGet' ref='companyAccountChild'></InputSearch>
            </el-col>
            <el-col :span="5">
                <InputSearch :content='nameCon' :list='companyName' @inputDataSend='companyNameGet' ref='companyNameChild'></InputSearch>
            </el-col>
            <el-col :span="5">
                <InputSearch :content='plateCon' :list='companyPlate' @inputDataSend='companyPlateGet' ref='companyPlateChild'></InputSearch>
            </el-col>
            <el-col :span="5">
                <el-select v-model="value" :placeholder="stateCon">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class='search rightFloat' >
            <el-button type="primary" @click="handleFilter">查询</el-button>
            <el-button type="primary" @click="resetFilter">重置</el-button>
            </el-col>
        </el-row>
        <div class="content-card ">
            <el-table
              v-loading="loadingRetrieveCar"
              :data="retrieveCarData"
              style="width:100%"
              :cell-style="cellStyle"
              @cell-click="cellClick"
              > 
                <el-table-column
                  :prop="v.prop"
                  :label="v.label"
                  :width="v.width"
                  v-for='(v,i) in carList'
                  :key='i + "carLsit"'
                  >
                </el-table-column>
                <el-table-column
                  prop=""
                  label="操作"
                  width="150"
                  >
                    <template slot-scope="scope">
                        <el-button  v-if="scope.row.shztFlag" type="text" size="small" @click="deal(scope.row)">处理</el-button>
                        <el-button  v-if="!scope.row.shztFlag"  type="text" size="small" @click="check(scope.row)">查看</el-button>
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
        <DealDialogue :title="dealTitle" :visible="dealDialogueVisible" :msgFlag="dealMsgFlag" @cancelModal="canceDeallModal"> </DealDialogue>
        <DialogueCheckCar  :msg='personalMsg' @cancelModal='cancelCheckModal'  ></DialogueCheckCar>
        <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
        
    </div>
    
    
</template>

<script>
import InputSearch from '@/components/InputSearch';
import DealDialogue from './Dialogue/DealDialogue' 
import DialogueCheckCar from '@/components/DetailsDialogue/DialogueCheckCar.vue'
import SeeCarInfoDialog from '@/views/CarManage/CarInfo/CarInfoDialog/SeeCarInfoDialog.vue'


    export default {
    name: 'RetrieveCar',
    props:[],
    components:{ InputSearch, DealDialogue  ,DialogueCheckCar ,SeeCarInfoDialog},
    data() {
      return {
          dealMsgFlag:true,
          
          dealTitle:'找回车辆',
          accountCon:"请输入会员账号",
          nameCon:"请输入会员姓名",
          plateCon:"请输入车牌号码",
          stateCon:"请选择处理状态",
          options: [{
            value: '0',
            label: '未审核'
            }, {
            value: '1',
            label: '审核通过'
            }, {
            value: '2',
            label: '审核失败'
            }],
          value: '',
          carList:[
            
            {
                prop:'webIndex',
                label:'#',
                width:'50'
            },
            {
                prop:'dlmc',
                label:'会员账号',
            },
            {
                prop:'yhxm',
                label:'姓名',
            },
            {
                prop:'hphm',
                label:'车牌号码',
            },
            {
                prop:'cpys',
                label:'车牌颜色',
            },
            {
                prop:'sqsj',
                label:'申请时间',
            },
            {
                prop:'shzt',
                label:'处理状态',
            },
            {
                prop:'shsj',
                label:'处理时间',
            }
          ],
          personalMsg:{
            visible:false,
            title:'会员详情',
            isPersonal:true
          },
          SeeCarInfoDialogVisible:false,
          msgSee:{}
          
        
      };
    },
    created(){
        let yhlx = 0;
        this.$store.dispatch("searchListAll/findUserMemberNameSelectList",{yhlx})
        this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{yhlx})
        this.$store.dispatch("searchListAll/findCarPlateSelectList")
        //找回车辆数据
        this.$store.dispatch("vipMaintain/retrieveListPost")


    },
    methods: {
        //参数设置
        companyCountGet(data){
            let dlmc = data
            this.$store.dispatch("vipMaintain/changeRetrieveQuery",{dlmc})
            let hyzh =data
            this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{hyzh})

        },
        companyNameGet(data){
            let yhxm = data
            this.$store.dispatch("vipMaintain/changeRetrieveQuery",{yhxm})
            let hyxm =data
            this.$store.dispatch("searchListAll/findUserMemberNameSelectList",{hyxm})

        },
        companyPlateGet(data){
            let hphm = data
            this.$store.dispatch("vipMaintain/changeRetrieveQuery",{hphm})
            this.$store.dispatch("searchListAll/findCarPlateSelectList",{hphm})

        },
        //查询 重置
        handleFilter(){
            let current = 1
            this.$store.dispatch("vipMaintain/retrieveListPost",{current}) 

        },
        resetFilter(){
            this.$refs.companyAccountChild.resetCon();
            this.$refs.companyNameChild.resetCon();
            this.$refs.companyPlateChild.resetCon();
            this.value = ''
            let current = 1
            this.$store.dispatch("vipMaintain/retrieveListPost",{current}) 

        },
        //查看 处理
        deal(data){
            let dealDialogueVisible = true;
            this.$store.dispatch("vipMaintain/changeRetrieveFlag",{dealDialogueVisible})
            this.dealMsgFlag = true;
            this.$store.dispatch("vipMaintain/findRetrieveCarDetailsData",data)

        },
        check(data){
            let dealDialogueVisible = true;
            this.$store.dispatch("vipMaintain/changeRetrieveFlag",{dealDialogueVisible})
            this.dealMsgFlag = false;
            this.$store.dispatch("vipMaintain/findRetrieveCarDetailsData",data)
            
        },
        //关闭modal
        canceDeallModal(){
            let dealDialogueVisible = false;
            this.$store.dispatch("vipMaintain/changeRetrieveFlag",{dealDialogueVisible})
        },
        currentChange(val){
            let current = val;
            this.$store.dispatch("vipMaintain/retrieveListPost",{current})

        },
        //table style
        cellStyle(row){
            if(row.column.label == '会员账号' || row.column.label == '车牌号码'){
                return 'color:blue;text-decoration:underline;cursor:pointer;'
            }

        },
        //单元格点击
        cellClick(row, column, cell, event){
            if(column.label == '会员账号'){
                this.personalMsg.visible =  true;
                let id = row.id;
                this.$store.dispatch('detailsDataAll/changeDetailId',{id})

            }else if(column.label == '车牌号码'){
                this.carId = row.id*1;
                this.msgSee = row
                this.SeeCarInfoDialogVisible = true;
                

            }

        },
        cancelCheckModal(){
            this.personalMsg.visible = false;
        },
        


        
      
    },
    computed:{
      companyCount(){
        return this.$store.state.searchListAll.searchList.accountList;
      },
      companyName(){
         return this.$store.state.searchListAll.searchList.nameList;
      },
      companyPlate(){
        return this.$store.state.searchListAll.searchList.plateList;
      },
      
      loadingRetrieveCar(){
          return this.$store.state.vipMaintain.retrieveCar.loadingRetrieveCar;
      },
      retrieveCarData(){
          return this.$store.state.vipMaintain.retrieveCar.retrieveData.records;
      },
      paginationTotal(){
          return this.$store.state.vipMaintain.retrieveCar.retrieveData.total;

      },
      pageSize(){
          return this.$store.state.vipMaintain.retrieveCar.retrieveQuery.size;

      },
      currentPage(){
          return this.$store.state.vipMaintain.retrieveCar.retrieveQuery.current;

      },
      dealDialogueVisible(){
          return this.$store.state.vipMaintain.retrieveCar.dealDialogueVisible;
      }

      
    },
    watch:{
        value(val){
            let shzt = val;
            this.$store.dispatch("vipMaintain/changeRetrieveQuery",{shzt})
        }
    }
    
  }
</script>

<style lang="less" scoped>
    .page{
        padding:20px;
        box-sizing: border-box;
    }
    .contentTop{
        // padding-top:60px !important;
        padding-bottom:30px !important;
    }
    


</style>
