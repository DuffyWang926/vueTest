
<template>
   <el-dialog title="开票详情" class="lg-dialog" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" >
     <div class="page">
        <el-row class="head">
            <span>
                状态：
            </span>
            <span>
                {{checkDetails.fpzt}}

            </span>
            <span class="note" v-if='checkDetails.isFpzt'>
                <span>失败原因：</span>
                <span>{{checkDetails.fpsbyy}}</span>
            </span>

        </el-row>
        <el-row>
            <div class="head">
                发票信息
            </div>
            <el-row>
                <el-col :span='12'>
                    <TitleShowList :msg='showLeftData'></TitleShowList>
                </el-col>
                <el-col :span='12'>
                    <TitleShowList :msg='showRightData'></TitleShowList>
                </el-col>

            </el-row>
        </el-row>
        <el-row>
            <div class="head">
                开票内容
            </div>
            <el-table
            :data="tableData"
            style="width:100%"
           
            >
                <el-table-column
                    :prop="v.prop"
                    :label="v.label"
                    :width="v.width"
                    v-for='(v,i) in tableList'
                    :key='i + "tableList"'
                    >
                </el-table-column>
                
            </el-table>

        </el-row>
        <el-row>
            <div class="head">
                用户信息
            </div>
            <el-row>
                <TitleShowList :msg='footData'></TitleShowList>
                

            </el-row>
        </el-row>
     </div>

  </el-dialog>
</template>
<script>
// link car 弹窗
import { ValidationObserver, ValidationProvider } from 'vee-validate';   
import TitleShowList from '@/components/TitleShowList'
  export default {
    name: 'LinkParkPlace',
    props:{
        visible:{

        },
        msg:{

        },
        

    },
    components:{  ValidationObserver, ValidationProvider,TitleShowList },
    
    data() {
        
      return {
        tableList:[
            {
                prop:'id',
                label:'#',
                width:'50'
            },
            {
                prop:'ddbh',
                label:'订单编号',
                width:'200'
            },
            {
                prop:'ddje',
                label:'订单金额（元）',
                width:'150'
            },
            {
                prop:'ddlx',
                label:'订单类型',
                width:'200'
            },
            {
                prop:'jysj',
                label:'交易时间',
                width:'200'
            },
            
          ],
        
      };
    },
    methods: {
      cancelModal(){

        let isCheck = false
        this.$store.dispatch('invoiceManage/changeCheckDialogue',{isCheck})
      },
      
      
      
      

    },
    computed:{
        checkDetails(){
            return this.msg.checkDetails
        },
        showLeftData(){
            let data =[
                {
                    name:'发票抬头',
                    data:this.checkDetails.fptt
                },
                {
                    name:'纳税人识别号',
                    data:this.checkDetails.nsrsbh
                },
                {
                    name:'发票内容',
                    data:this.checkDetails.fpnr
                },
                {
                    name:'开票金额（元）',
                    data:this.checkDetails.fpje
                },
                {
                    name:'地址',
                    data:this.checkDetails.lxdz
                },
                {
                    name:'开户行',
                    data:this.checkDetails.khh
                },
                {
                    name:'银行账号',
                    data:this.checkDetails.yhzh
                },
                {
                    name:'备注',
                    data:this.checkDetails.bz
                }
            ]
            return data;
        },
        showRightData(){
            let data =[
                {
                    name:'姓名',
                    data:this.checkDetails.czr
                },
                {
                    name:'手机号',
                    data:this.checkDetails.sjh
                },
                {
                    name:'邮箱',
                    data:this.checkDetails.yxdz
                },
                {
                    name:'申请时间',
                    data:this.checkDetails.cjsj
                },
                {
                    name:'开票时间',
                    data:this.checkDetails.fpsj
                },
                
            ]
            return data;
        },
        tableData:{
            get(){
                return this.msg.checkTable

            },
            set(){
                return this.msg.checkTable

            }
            
        },
        footData(){
            let data =[
                {
                    name:'用户名',
                    data:this.checkDetails.czr
                },
                {
                    name:'手机号',
                    data:this.checkDetails.sjh
                },
                
            ]
            return data;
        }
        
      
      
      
    },
   
    watch:{
      
    }
    
  }
</script>
<style lang='less'>
  .page{
    .head{
        font-size: 22px;
        font-weight: bold;
        .note{
            font-size: 18px;
            font-weight: normal;
            padding-left:20px;
        }
    }
    
  }
</style>