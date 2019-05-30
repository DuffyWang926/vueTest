
<template>
   <el-dialog :title="title" class="lg-dialog" v-if="visible" :visible.sync="visible" :append-to-body='true' :before-close="cancelModal" >
      <div class="content-card">
        <el-row>
            <el-col :span='12' class='leftPage'>
                <div class='title'>
                    会员信息
                </div>
                <div class='conLeft'>
                    <div class='leftConTop'>
                        <TitleShowList :msg='titleShowList'>
                        </TitleShowList>
                        <div class="colorStyle">
                            {{this.colorOld}}

                        </div>

                    </div>
                    
                    <div >
                        <img :src="oldImg" class="leftImg">

                    </div>

                </div>
                <div class="conFoot" v-if="msgFlag">
                    <button class="btnStyle" @click="allowClick">通过，成功找回</button>
                </div>
            </el-col>
            <el-col :span='12' class="rightPage">
                <div class='title'>
                    要找回车辆信息
                </div>
                <div class='conRight'>
                    <div class='leftConTop'>
                        <TitleShowList :msg='titleShowListRight'>
                        </TitleShowList>
                        <div class="colorRightStyle">
                            {{this.newColor}}

                        </div>

                    </div>
                    
                    <div >
                        <img :src="oldImg" class="rightImg">

                    </div>
                    <div v-if="msgFlag" class="text">
                        
                        <span >无法找回原因：</span>
                        <textarea v-model='textCon' cols="30" rows="6"></textarea>

                    </div>

                </div>
                <div class="conFoot" v-if="msgFlag">
                    <button class="btnStyle" @click="rejectClick">拒绝，找回失败</button>
                </div>
            </el-col>
        </el-row>
        <el-row v-if="!msgFlag">
            <div class='msgAllow' v-if="msgShowFlag">
                车辆已经成功找回！
            </div>
            <div class='msgReject' v-if="!msgShowFlag">
                <span class='msgRejectTop'>
                    车辆没能成功找回！
                </span>
                
                <span v-if='rejectData'>
                    原因：
                </span>
                <span>
                    {{rejectData}}
                </span>
                
            </div>

        </el-row>
        
        
      </div>
  </el-dialog>
</template>
<script>
// bind car 弹窗
import TitleShowList from '@/components/TitleShowList';


  export default {
    name: 'DealDialogue',
    props:['title','visible','msgFlag'],
    components:{TitleShowList },
    data() {
      return {
          textCon:'照片模糊，无法证明车主身份!'

      }
        
    },
    methods: {
        cancelModal(){
            this.$emit('cancelModal')
        },
        allowClick(){
            let shzt = 1
            this.$store.dispatch('vipMaintain/postRetrieveCarReplyData',{shzt})
        },
        rejectClick(){
            let res = {
                ms:this.textCon,
                shzt:2,
            }
            this.$store.dispatch('vipMaintain/postRetrieveCarReplyData',res)
        }
      

    },
    computed:{
        titleShowList(){
            let data =[
                {
                    name:"会员ID",
                    data:this.$store.state.vipMaintain.retrieveCar.retrieveDealData.dlmc
                },
                {
                    name:"会员姓名",
                    data:this.$store.state.vipMaintain.retrieveCar.retrieveDealData.yhxm
                },
                {
                    name:"会员电话",
                    data:this.$store.state.vipMaintain.retrieveCar.retrieveDealData.sjh
                },
                {
                    name:"已绑定车辆",
                    data:this.$store.state.vipMaintain.retrieveCar.oldData.hphm
                },
                
            ]
            return data;
        },
        colorOld(){
            return this.$store.state.vipMaintain.retrieveCar.oldData.cpys;
        },
        oldImg(){
            return this.$store.state.vipMaintain.retrieveCar.retrieveDealData.sfztp;
        },
        titleShowListRight(){
            let data =[
                {
                    name:"车牌号码",
                    data:this.$store.state.vipMaintain.retrieveCar.retrieveDealData.hphm
                },
                {
                    name:"已绑定会员",
                    data:this.$store.state.vipMaintain.retrieveCar.retrieveDealData.ybdhy
                },
                
            ]
            return data;
        },
        newColor(){
            let cpys = this.$store.state.vipMaintain.retrieveCar.retrieveDealData.cpys;
            if(cpys === 0){
                cpys= "白色";
            }
            if(cpys === 1){
                cpys= "黄色";
            }
            if(cpys === 2){
                cpys= "蓝色";
            }
            if(cpys === 3){
                cpys= "黑色";
            }
            if(cpys === 4){
                cpys= "其他";
            }
            if(cpys === 5){
                cpys= "绿色";
            }
            return cpys;
        },
        rejectData(){
             return this.$store.state.vipMaintain.retrieveCar.retrieveDealData.ms;
        },
        msgShowFlag(){
            return this.$store.state.vipMaintain.retrieveCar.retrieveDealData.msgFlag;
        }
        
      

    }
    
  }
</script>
<style lang='less'>
  .title{
      font-size: 24px;
      font-weight: bold;
  }
  .leftPage{
      
      .conLeft{
            border-right: 1px solid #aaa;
            min-height:600px;
                .leftConTop{
                    position: relative;

                }
                .colorStyle{
                    position:absolute;
                    bottom:5px;
                    left:200px;

                }
                .leftImg{
                    display: block;
                    width: 450px;
                    min-height: 450px;
                }
               

                
        }
        .conFoot{
            .btnStyle{
                background: green;
                border-radius: 5px;
                font-size: 22px;
                width:250px;
                height:50px;
                display: block;
                margin:auto;
                
            }
        }


  }
  
  .rightPage{
      padding-left:20px;
      .conRight{
          min-height:600px;
            .leftConTop{
                position: relative;
                min-height: 117px
            }
            .colorRightStyle{
                position:absolute;
                top:7px;
                left:200px;

            }
            .rightImg{
                    display: block;
                    width: 450px;
                    min-height: 350px;
            }
            .text{
                padding-top: 20px;
                span{
                    vertical-align:top;

                }
            }

        }
        .conFoot{
            .btnStyle{
                background: red;
                border-radius: 5px;
                font-size: 22px;
                width:250px;
                height:50px;
                display: block;
                margin:auto;
                
            }
        }
  }
  .msgAllow{
      color:green;
      font-size: 22px;
      padding-left:20px;
  }
  .msgReject{
      font-size: 22px;
      padding-left:20px;
      .msgRejectTop{
        color:red;
      }
  }
  
  

</style>