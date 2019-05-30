
<template>
   <el-dialog title="后台强制离场" class="sm-dialog" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" >
       <div class='manualLeave'>
           <el-row>
                <el-col :span='12'>
                    <TitleShowList :msg='showLeftData'></TitleShowList>
                </el-col>
                <el-col :span='12' v-if='msg.isPersonal'>
                    <TitleShowList :msg='showRightData'></TitleShowList>
                </el-col>

            </el-row>
            <el-row class="contentMiddle">
                <el-col :span='12'>
                    <TitleShowList :msg='midLeftData' class="listMargin"></TitleShowList>
                    <el-row class="record">
                        <span>入场记录:</span>
                        <a @click="checkClick" class="link">查看</a>
                    </el-row>
                </el-col>
                <el-col :span='12'>
                    <el-row>
                        <el-radio v-model="radio" label="1">生成订单</el-radio>
                        <div>
                            <span>离场时间：</span>
                            <el-date-picker
                            v-model="timeValue"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>

                        </div>
                        

                    </el-row>
                    <el-row>
                        <el-radio v-model="radio" label="2">不生成订单</el-radio>
                    </el-row>
                    <el-row>
                        <span class="spanLeft">
                            后台离场原因：
                        </span>
                        <div class="floatLeft">
                            <div>
                                <el-select v-model="reasonVal" placeholder="请选择">
                                    <el-option
                                    v-for="item in leaveReasonData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div>
                                 <textarea v-model="textareaVal" id="" cols="30" rows="10" v-show="isTextarea">
                                </textarea>

                            </div>
                            
                            
                           

                        </div>
                        

                    </el-row>
                    
                </el-col>
            </el-row>
            <el-row>
                <span>操作员密码</span>
                <el-input v-model='passwordVal' type='password' class="inputSize"></el-input>
                
            </el-row>
            <el-row>
                <el-button class="btnCenter" @click="confirmManual">确认离场</el-button>
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
          radio:'2',
          timeValue:'',
          passwordVal:'',
          reasonVal: '',
          isTextarea:false,
          textareaVal:''

        
        
      };
    },
    methods: {
      cancelModal(){
          this.$emit('cancelModal')
       
      },
      checkClick(){
          this.$emit('checkClick',true)
      },
      confirmManual(){
          let createOrder = true;
          if(this.radio == '2'){
              createOrder = false;
              this.timeValue = null;
          }
          let reason = '';
          if(this.isTextarea){
              reason = this.textareaVal
          }else{
             if(this.reasonVal) {
                 reason =  this.leaveReasonData[+this.reasonVal].label
             }
          }
          let data = {
              createOrder:createOrder,
              id:this.msg.id,
              reason:reason,
              leaveTime:this.timeValue,
              password:this.passwordVal
          }

          this.$emit('confirmModal',data)
          this.passwordVal= '';
          this.timeValue = '';
          this.reasonVal = '';


      }
      
      
      
      

    },
    computed:{
        showLeftData(){
            let data =[
                {
                    name:'车牌号',
                    data:this.msg.hphm
                },
                {
                    name:'车牌颜色',
                    data:this.msg.cpysString
                },
                {
                    name:'停车场',
                    data:this.msg.ccmc
                },
                {
                    name:'泊位号',
                    data:this.msg.cwbh
                },
                
            ]
            return data;
        },
        showRightData(){
            let data =[
                {
                    name:'车主姓名',
                    data:this.msg.yhxm
                },
                {
                    name:'车主ID',
                    data:this.msg.yhid
                },
                {
                    name:'车主电话',
                    data:this.msg.sjh
                },
                
                
            ]
            return data;
        },
        midLeftData(){
            let data =[
                {
                    name:'入场时间',
                    data:this.msg.rwsj
                },
                {
                    name:'停车时长',
                    data:this.msg.parkingTime
                },
                {
                    name:'入场设备',
                    data:this.msg.deviceName
                },
                
            ]
            return data;
        },
        leaveReasonData(){
            let data = this.$store.state.parkingRecord.parkingCars.leaveReasonData;
            return data;
        }
      
    },
    watch:{
       reasonVal(data){
           if(data == -1){
               this.isTextarea = true;
           }else{
               this.isTextarea = false;
           }
       } 
    }
   
   
    
  }
</script>
<style lang='less' >
.manualLeave{
    .contentMiddle{
        border-top:1px solid #aaa;
        border-bottom:1px solid #aaa;
        .listMargin{
            margin-bottom: 0 !important;
        }
        .record{
            padding-top:0;
            .link{
                text-decoration: underline;
                color:blue;
            }
        }
        .floatLeft{
            float:left;

        }
        .spanLeft{
            float:left;
            line-height: 40px;
        }
        
        
    }
    .inputSize{
            width:20%;
        }
    .btnCenter{
        margin:auto;
        display: block;
    }
    

}
  
</style>