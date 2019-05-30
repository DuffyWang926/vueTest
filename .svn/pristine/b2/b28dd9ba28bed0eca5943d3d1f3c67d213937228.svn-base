
<template>
   <el-dialog :title="msg.title" class="lg-dialog dialogHeight" v-if="msg.visible" :visible.sync="msg.visible"  :append-to-body='true' :before-close="cancelModal" >
     <el-row>
       <el-col :span='8'>
         <!-- leftHead   -->
        <el-row class="leftHead"> 
          <el-col :span='8' class="leftTitle">
            <span v-if="!msg.isPersonal">
              公司会员
            </span>
            <div class="leftName" v-if="msg.isPersonal">
              {{checkData.personalInfo && checkData.personalInfo.yhxm}}
            </div>
            <div class="leftName" v-if="msg.isPersonal">
              <span class="leftAge">
                {{checkData.personalInfo && checkData.personalInfo.age}}
              </span>
              <span>
                {{checkData.personalInfo && checkData.personalInfo.sex}}
              </span>
              
            </div>
               
          </el-col>
          <el-col :span='8'>
            <el-row>
              <el-button class="btnBackground"> {{checkData.debtData.qkje }}</el-button> 
            </el-row>
            <el-row>
              <span class="debtSize">  欠费</span>
            </el-row>
          </el-col>
          <el-col :span='8'> 
             <el-row>
              <el-button class="btnBackground"> {{checkData.debtData.qkbs }}</el-button> 
            </el-row>
            <el-row>
              <span class="debtSize"> 欠费订单数</span>
            </el-row>
          </el-col>
        </el-row>
        <!-- leftCon -->
        <el-row class="leftCon"> 
          <TitleShowList :msg='showList' class="conTop"></TitleShowList>
          <el-row class="conTop"> 
            <div>
              <el-col :span='8' class='leftCenter' >
                钱包余额总计
              </el-col>
              <el-col :span='16'>
                <el-button class="btnBackground btnPadding">{{checkData.walletData.zje }}</el-button> 
              </el-col>
            </div>
            <div>
              <el-col :span='12' class="topPadding">
                <span class="rightPadding">充值金额</span>
                <span>{{checkData.walletData.czje}}</span>
              </el-col>
              <el-col :span='6' class="topPadding"> 
                <span>已开票</span>
                <span>{{checkData.walletData.ykpje}}</span>
              </el-col>
              <el-col :span='6' class="topPadding"> 
                <span>未开票</span>
                <span>{{checkData.walletData.wkpje}}</span>
              </el-col>
            </div>
            <div>
              <el-col :span='12' class="topPadding">
                <span class="rightPadding">赠送金额</span>
                <span>{{checkData.walletData.zsje}}</span>
              </el-col>
            </div>
            
          </el-row>
          <div class="footPadding">
            <div >
              当前绑定车辆
            </div>
            <el-table
              v-loading="loadingCar"
              :data="detailCarData.records"
              style="width:100%"
              > 
              <el-table-column
                prop="hphm"
                label="车牌号码"
                width="100"
                >
              </el-table-column>
              <el-table-column
                prop="cpys"
                label="车牌颜色"
                width="100"
                >
                <template slot-scope="scope">
                  <span >{{scope.row.cpys| cpys}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="cjsj"
                label="绑定日期"
                width="120"
                >
                
              </el-table-column>
                
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="nowCarTotal"
              :page-size="nowCarpageSize"
              :current-page="nowCarcurrentPage"
              @current-change='nowCarcurrentChange'
              >
            </el-pagination>
          </div>
        </el-row>
      <el-row>

        </el-row>
      </el-col>
      <el-col :span='16'>
        <template >
          <el-tabs v-model="activeName" @tab-click="handleClick" class='tab'>
            <el-tab-pane label="充值记录" name="1">
                <el-table
                v-loading="loadingRecharge"
                :data="rechargeData"
                style="width:100%"
                
                >
                  <el-table-column
                    prop="czlx"
                    label="充值类型"
                    >
                    <template slot-scope="scope">
                      <span >{{scope.row.czlx}}</span>

                      <!-- <span >{{scope.row.czlx| czlxTrans}}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="czje"
                    label="充值金额"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="czsj"
                    label="充值时间"
                    >
                    <template slot-scope="scope">
                      <span >{{scope.row.czsj| time}}</span>
                    </template>
                  </el-table-column>
                 
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="rechargeTotal"
                :page-size='rechargePageSize'
                :current-page="rechargeCurrentPage"
                @current-change='rechargeCurrentChange'
                >
              </el-pagination>
              
            </el-tab-pane>
            <el-tab-pane label="购买记录" name="2">
              <el-table
                v-loading="buyLoading"
                :data="buyData"
                style="width:100%"
                >
                <el-table-column
                  :prop="v.prop"
                  :label="v.label"
                  :width="v.width"
                  v-for='(v,i) in buyList'
                  :key='i + "buyList"'
                  
                  >
                </el-table-column>
                 
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="buyTotal"
                :page-size="buyPageSize"
                :current-page="buyCurrentPage"
                @current-change='buyCurrentChange'
                >
              </el-pagination>

            </el-tab-pane>
            <el-tab-pane label="车辆解绑记录" name="3">
              <el-table
                v-loading="bindRecordLoading"
                :data="bindRecordData"
                style="width:100%"
                >
                <el-table-column
                  :prop="v.prop"
                  :label="v.label"
                  :width="v.width"
                  v-for='(v,i) in bindRecordList'
                  :key='i + "bindRecordList"'
                  
                  >
                </el-table-column>
                 
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="bindRecordTotal"
                :page-size="bindRecordPageSize"
                :current-page="bindRecordCurrentPage"
                @current-change='bindRecordCurrentChange'
                >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane v-if='msg.isPersonal' label="信息变更记录" name="4">
              <el-table
                v-loading="changeRecordLoading"
                :data="changeRecordData"
                style="width:100%"
                :cell-style="cellStyle"
                @cell-click="cellClick"
                >
                <el-table-column
                  prop="xxlx"
                  label="信息类型"
                >
                </el-table-column>
                <el-table-column
                  prop="bgq"
                  label="变更前"
                  width="150"
                >
                <template scope="scope" >
                  <div :style='tableImg'>
                    <img  :src='scope.row.imgBefore' class="cellImg">
                    {{scope.row.bgq}}

                  </div>
                    

                  </template>

                </el-table-column>
                <el-table-column
                  prop="bgh"
                  label="变更后"
                  width="150"
                >
                <template scope="scope" >
            
                    <img  :src='scope.row.imgAfter' class="cellImg">
                    {{scope.row.bgh}}

                </template>
                </el-table-column>
                <el-table-column
                  prop="bgsj"
                  label="变更时间"
                >
                </el-table-column>
                <!-- <el-table-column
                  :prop="v.prop"
                  :label="v.label"
                  :width="v.width"
                  v-for='(v,i) in changeRecordList'
                  :key='i + "changeRecordList"'
                  
                  >
                  
                  
                  

                </el-table-column> -->
                 
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="changeRecordTotal"
                :page-size="changeRecordPageSize"
                :current-page="changeRecordCurrentPage"
                @current-change='changeRecordCurrentChange'
                >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-col>

     </el-row>
     
      

      
  </el-dialog>
</template>
<script>
// checkData 弹窗
import TitleShowList from '@/components/TitleShowList';

  export default {
    name: 'DialogueCheckCar',
    props:['title','visible','isPersonal','msg'],
    components:{ TitleShowList   },
    data() {
      return {
        carList:[
          {
            prop:'hphm',
            label:'车牌号码',
            width:'100'
          },
          {
            prop:'cpys',
            label:'车牌颜色',
            width:'150'
          },
          {
            prop:'cjsj',
            label:'绑定日期',
            width:'90'
          }
        ],
        activeName:'1',
        buyList:[
          {
            prop:'splx',
            label:'商品类型',
            width:'150',
          },
          {
            prop:'spmc',
            label:'商品名称',
            width:'150'
          },
          {
            prop:'ddbh',
            label:'订单号',
            width:'150'
          },
          {
            prop:'zfje',
            label:'支付金额',
            width:'150'
          },
          {
            prop:'zfsj',
            label:'支付时间',
            width:'150'
          },
          
        ],
        bindRecordList:[
          {
            prop:'hphm',
            label:'车牌号码',
          },
          {
            prop:'bdrq',
            label:'绑定日期',
          },
          {
            prop:'jbrq',
            label:'解绑日期',
          },
          {
            prop:'jllx',
            label:'绑定状态',
          },
          
          
        ],
        changeRecordList:[
          {
            prop:'xxlx',
            label:'信息类型',
            width:'150',
          },
          {
            prop:'bgq',
            label:'变更前',
          },
          {
            prop:'bgh',
            label:'变更后',
          },
          {
            prop:'bgsj',
            label:'变更时间',
          },
          
        ],
        imgFlag:false,
        imgMsg:{},
        tableImg:''
      }
    },
    created(){
      

    },
    methods: {
      cancelModal(){
        this.activeName='1';
        this.$emit('cancelModal')
      },
      nowCarcurrentChange(val){
        let current = val;
        this.$store.dispatch('detailsDataAll/findUserMemberCarPageData',{current})

      },
       handleClick(tab, event) {
        console.log(tab, event);
        let name = tab.name;
        let current = 1;
        if(name == 1){
          this.$store.dispatch('detailsDataAll/findUserMemberRechargePageData',{current})

        }else if(name == 2){
          this.$store.dispatch('detailsDataAll/findUserMemberBuyPageData',{current})
        }else if(name == 3){
          this.$store.dispatch('detailsDataAll/findUserMemberUnbindPageData',{current})
        }else if(name == 4){
          this.$store.dispatch('detailsDataAll/findUserMemberChangePageData',{current})

        }
      },
      rechargeCurrentChange(val){
        let current = val;
        this.$store.dispatch('detailsDataAll/findUserMemberRechargePageData',{current})

      },
      buyCurrentChange(val){
        let current = val;
        this.$store.dispatch('detailsDataAll/findUserMemberBuyPageData',{current})

      },
      bindRecordCurrentChange(val){
        let current = val;
        this.$store.dispatch('detailsDataAll/findUserMemberUnbindPageData',{current})

      },
      changeRecordCurrentChange(val){
        let current = val;
        this.$store.dispatch('detailsDataAll/findUserMemberChangePageData',{current})

      },
      //table style
      cellStyle(data){
          if(data.row.xxlx == '头像' ){
            // if(row.column.label == '信息类型' || row.column.label == '变更前' || row.column.label == '变更后' || row.column.label == '变更时间'){
            //     return 'color:blue;text-decoration:underline;cursor:pointer;'
            // }
              this.imgFlag = 'color:red;max-height:50px;overflow:hidden;'
                // return 'color:blue;max-height:50px;overflow:hidden;'

          }

      },
      //单元格点击
      cellClick(row, column, cell, event){
         
  

      },
    },
    computed:{
      detailCarData(){
        let data = this.$store.state.detailsDataAll.detailsData.detailCarData
        return data;
      },
      loadingCar(){
        return this.$store.state.detailsDataAll.detailsData.loadingCar
      },
      nowCarTotal(){
        return this.$store.state.detailsDataAll.detailsData.detailCarData.total;
      },
      nowCarpageSize(){
        return this.$store.state.detailsDataAll.detailsData.checkDataCarQuery.size;
      },
      nowCarcurrentPage(){
        return this.$store.state.detailsDataAll.detailsData.checkDataCarQuery.current;
      },
      //recharge Data
      rechargeData(){
        let data = this.$store.state.detailsDataAll.detailsData.rechargeData ? this.$store.state.detailsDataAll.detailsData.rechargeData.records : null;
        
        return data;
      },
      loadingRecharge(){
        return this.$store.state.detailsDataAll.detailsData.loadingRecharge;
      },
      rechargeTotal(){
        return this.$store.state.detailsDataAll.detailsData.rechargeData.total;
      },
      rechargePageSize(){
        let data = this.$store.state.detailsDataAll.detailsData.rechargeQuery.size
        return data;
      },
      rechargeCurrentPage(){
        return this.$store.state.detailsDataAll.detailsData.rechargeQuery.current;
      },
      //buy Data
      buyLoading(){
        return this.$store.state.detailsDataAll.detailsData.buyLoading;
      },
      buyData(){
        let data = this.$store.state.detailsDataAll.detailsData.buyData ? this.$store.state.detailsDataAll.detailsData.buyData.records : null;
        return data;
      },
      buyTotal(){
        return this.$store.state.detailsDataAll.detailsData.buyData.total;
      },
      buyPageSize(){
        return this.$store.state.detailsDataAll.detailsData.buyQuery.size;
      },
      buyCurrentPage(){
        
        return this.$store.state.detailsDataAll.detailsData.buyQuery.current;
      },
      //bindRecord Data
      bindRecordLoading(){
        return this.$store.state.detailsDataAll.detailsData.bindRecordLoading;
      },
      bindRecordData(){
        let data = this.$store.state.detailsDataAll.detailsData.bindRecordData ? this.$store.state.detailsDataAll.detailsData.bindRecordData.records : null;
        return data;
      },
      bindRecordTotal(){
        return this.$store.state.detailsDataAll.detailsData.bindRecordData.total;
      },
      bindRecordPageSize(){
        return this.$store.state.detailsDataAll.detailsData.bindRecordQuery.size;
      },
      bindRecordCurrentPage(){
        return this.$store.state.detailsDataAll.detailsData.bindRecordQuery.current;
      },
        //changeRecord Data
      changeRecordLoading(){
        return this.$store.state.detailsDataAll.detailsData.changeRecordLoading;
      },
      changeRecordData(){
        let data = this.$store.state.detailsDataAll.detailsData.changeRecordData ? this.$store.state.detailsDataAll.detailsData.changeRecordData.records : null;
        // let dataImg = data && data.map((v,i) =>{
        //   v.imgBefore = require(v.imgBefore);
        //   return v
        // })
        
        return data;
      },
      changeRecordTotal(){
        return this.$store.state.detailsDataAll.detailsData.changeRecordData.total;
      },
      changeRecordPageSize(){
        return this.$store.state.detailsDataAll.detailsData.changeRecordQuery.size;
      },
      changeRecordCurrentPage(){
        return this.$store.state.detailsDataAll.detailsData.changeRecordQuery.current;
      },
      //初始数据
      checkData(){
        let data = this.$store.state.detailsDataAll.detailsData.checkData
        return data
      },
      companyInfo(){
        return this.$store.state.detailsDataAll.detailsData.companyInfo
      },
      showList(){ 
        let data = []
        if(this.isPersonal){
          if(this.checkData.personalInfo){
            let bankNumber = this.checkData.personalInfo.yhkh || '无'
            data=[
              {
                name:'登陆账号',
                data:this.checkData.personalInfo.dlmc
              },
              {
                name:'手  机  号',
                data:this.checkData.personalInfo.sjh
              },
              {
                name:'银联支付',
                data:"---"
              },
              {
                name:'银行卡号',
                data:bankNumber
              },
              {
                name:'户主姓名',
                data:this.checkData.personalInfo.yhxm
              },
            ]

          }
          

        }else{
          if(this.companyInfo){
            let companyAccount = this.companyInfo.sjh || '无'
            data=[
              {
                name:'会员账号',
                data:companyAccount
              },
              {
                name:'联系人姓名',
                data:this.companyInfo.lxr
              },
              {
                name:'联系人手机',
                data:this.companyInfo.sjh
              },
              {
                name:'结付方式',
                data:this.companyInfo.payMethod
              },
            ]

          }
          
        }

        return data;
        
      }

      
      
    }
    
  }
</script>
<style lang='less' scoped>
  .dialogHeight{
    /deep/.btnBackground{
          background: #ef5aa1;
          font-weight: bold;
          box-shadow: 5px 5px 5px #aaa;
          min-width: 70px;
        }
    .btnPadding{
      margin-left:10px;
    }
    .leftHead{
      min-height:100px;
      margin-bottom:0px !important;
      .leftTitle{
        font-size: 24px;
        line-height: 50px;
        .leftName{
          padding-left:10px;
          width:100px;
          word-break: break-all;
          text-align: center;
          .leftAge{
            padding-right: 5px;
          }
        }
      }
      
      .debtSize{
          display: block;
          text-align: center;
      }
    }
    .leftCon{

      .conTop{
        padding-bottom: 10px;
        border-bottom: 1px solid #aaa;
      }
      .footPadding{
        box-sizing: border-box;
        padding-left: 20px;
      }
      .leftCenter{
        line-height: 40px;
      }
      .topPadding{
        padding-top: 20px;
        .rightPadding{
          padding-right:50px;
        }
      }
      
    }
    .tab{
      padding-left:10px;
      font-size:24px;
      .el-tabs__item{
        font-size:24px;
      }
    }
    /deep/.cell{max-height: 200px !important;overflow: hidden !important;} 
    /deep/.cellImg{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%; 
    }

  }
  

</style>