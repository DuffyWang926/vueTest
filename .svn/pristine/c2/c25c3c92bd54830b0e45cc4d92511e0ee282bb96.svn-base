
<template>
   <el-dialog :title="msg.title" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" class="sm-dialog"
            :close-on-click-modal='false'
   >
     <!-- inputList -->
     <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px">
        <el-row v-if="msg.inputData" class='singleHeader'>
          <el-row  v-for=" (v,i) in msg.inputData" :key='i' class='singleConHeader'>
            <el-col :span='18'>
              <ValidationProvider :rules='v.type' :name="v.name">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" :label="v.name">
                  <!-- <el-input v-model="v.data" @change='inputChange' class='inputSize' type="text"></el-input>  不能输入中文 勿删-->
                  <!-- <input v-model="v.data" @change='inputChange' class='inputSize' type="text" :disabled='v.disabled'> -->
                  <div class='inputStyle'>
                      <input v-model="v.data" :inputData ='v' @change='changeFunc(v, i)'  class='inputSize' type="text" :disabled='v.disabled'>
                    <div>
                      <span v-show='v.inputDataFlag' class='errorStyle'>{{v.inputDataName}}</span>
                    </div>

                  </div>
                </el-form-item>
              </ValidationProvider>
            </el-col>
          </el-row>
        </el-row>

        <!-- radioGroup -->
          <el-row v-if='msg.checkData' >
            <el-col :span='4' class='textRightRadio' >
              <span>{{msg.checkData.title}}</span>
            </el-col>
            <el-col :span='18' class='textRightRadio'>
              <el-col :span='24' v-for="(v,i) in msg.checkData.data" :key="i+'checkData'">
                <div>
                    <el-col :span='3'>
                      <el-radio v-model="msg.checkData.radio" :label="i+1" @change='checkBoxChange'>{{v.name}} </el-radio>
                    </el-col>
                    <!-- selectGroup -->
                    <el-col :span='20' v-if='v.selectData' class='marginTop'>
                      <el-col :span='5' class='textRightCenter'>
                        <span>{{msg.selectData.title}}</span>
                      </el-col>
                      <el-col :span='4' v-for='(val,i) in msg.selectData.data' :key='i+"selectData"'  class='selectSize' >
                        <el-select v-model="val.value" :placeholder="val.options[0].label"  @change='checkBoxChange' >
                          <el-option
                            v-for="item in val.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span='4' class='selectSize' >
                        <el-time-picker
                          v-model="msg.selectData.timeData"
                          :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                          }"
                          :placeholder="msg.selectData.timeDataCon">
                        </el-time-picker>
                      </el-col>

                    </el-col>
                </div>
              </el-col>
            </el-col>
          </el-row>
        <!-- selectList2 -->
        <el-row v-if='msg.selectList2' class='radioGroup'>
          <div v-for='(v, i) in msg.selectList2.listData' :key="i+'selectList2'" >
            <el-col :span='23'>
              <el-col :span='4' class='textRightCenter'>
                <span>{{v.title}}</span>
              </el-col>
              <el-col :span='8' class='selectSize' >
                <el-select v-model="v.value" :placeholder="v.data.options[0].label"  @change='selectListChange' >
                  <el-option
                    v-for="item in v.data.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>

            </el-col>
          </div>
        </el-row>
        <!-- inputData2 -->
        <el-row v-if="msg.inputData2">
          <el-row  v-for=" (v,i) in msg.inputData2" :key='i' class='singleConHeader'>
            <el-col :span='18'>
              <ValidationProvider :rules='v.type' :name="v.name">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" :label="v.name">
                  <input v-model="v.data" @change='inputChange' class='inputSize' type="text" :disabled='v.disabled'>
                </el-form-item>
              </ValidationProvider>
            </el-col>
          </el-row>
        </el-row>

        <el-row>
          <el-button @click="validate().then(confirmModal)" class='confirmCenter'>
            确定
          </el-button>
        </el-row>
      </el-form>
    </ValidationObserver>
      <div :style='msg.message.style' class='msgStyle' v-if='msg.message' v-html='msg.message.msg'>
      </div>






  </el-dialog>
</template>
<script>
// 单列弹窗，变量如下 具体使用见单位会员的添加弹窗
// <SingleDialogueInput :msg='addData' :visible='addDataVisible' @cancelModal='cancelAddModal'  @confirmModal='confirmAddModel'></SingleDialogueInput>
//  addData:{  //添加弹窗
//         title:'新增单位会员',
//         inputData:[
//           {
//             name:'会员账号',
//             type:'',
//             data:'',
//             disabled:true
//           },
//         ],
//         checkData:{
//           title:'结账方式',
//           radio:1,
//           data:[{
//             name:'普通'
//           },
//               ]
//             },
//         selectData:{
//               title:'结账时间',
//               data:[
//                 {
//                   options: [{
//                       value: '最后一天',
//                       label: '最后一天'
//                     },
//                     ]
//                 },
//               },
//        selectData2:{
//               title:'结账时间',
//               data:[
//                 {
//                   options: [{
//                       value: '最后一天',
//                       label: '最后一天'
//                     },
//                     ]
//                 },
//               },
//        inputData2:[
//           {
//             name:'会员账号',
//             data:'',
//             disabled:true
//           },
//         ],

import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: 'SingleDialogueInput',
    components:{ValidationProvider, ValidationObserver },
    props:['msg','visible'],
    data() {
      return {
        inputDataFlag:false,
        inputDataName:'请输入车牌号码',
        commitFlag:false
      };
    },
    
    methods: {
      cancelModal(){
        this.$emit('cancelModal',false)

        this.msg && this.msg.inputData && this.msg.inputData.map((v,i) =>{
          if(v.inputDataFlag){
            this.msg.inputData[i].inputDataFlag = false;
          }
        })
        this.inputDataFlag = false;
      },
      confirmModal(){
        
        this.msg && this.msg.inputData && this.msg.inputData.map((v,i) =>{
          let name = v.name.slice(0,4);
          if(name == "车牌号码" && v.disabled == true){
            this.commitFlag = true;
          }else if(name == "会员账号" && v.disabled == true){
            this.commitFlag = true;
          }
        })
        if(this.commitFlag){
          this.$emit('confirmModal',false)
        }else{
          this.$message.error(this.inputDataName)
        }

      },
       //监听inputList循环数据
      changeFunc(item, index) {
          const arrs = this.msg && this.msg.inputData;
        
        if (arrs) {
            let name = item.name.slice(0,4);
            if( name == "车牌号码" && item.data){
              let plateReg = /^([\u4E00-\u9FA5A-Z0-9]){5,8}$/g;
              if(!plateReg.test(item.data)){
                this.inputDataName = "请输入正确的" + item.name
                this.inputDataFlag =true;
                if(this.msg.inputData){
                  this.msg.inputData[index].inputDataName = "请输入正确的" + item.name
                  this.msg.inputData[index].inputDataFlag =true;
                  let tempData = this.msg.inputData[index];
                  this.msg.inputData.splice(index,1,tempData)

                }
                // item.inputData.inputDataName = "请输入正确的" + item.name.slice(0,-1)
                // item.inputDataFlag =true;
                this.commitFlag =false;


              }else{
                this.inputDataFlag =false;
                this.commitFlag =true;
                if(this.msg.inputData){
                  this.msg.inputData[index].inputDataFlag =false;
                   let tempData = this.msg.inputData[index];
                  this.msg.inputData.splice(index,1,tempData)

                }
                
              }
              
            }else{
              this.inputDataFlag =false;
              this.inputDataName = "请输入正确的" + item.name
              this.commitFlag =true;
              if(this.msg.inputData){
                  this.msg.inputData[index].inputDataName = "请输入正确的" + item.name
                  this.msg.inputData[index].inputDataFlag =false;
                   let tempData = this.msg.inputData[index];
                  this.msg.inputData.splice(index,1,tempData)

                }
            }
            // this.$nextTick( () =>{
              
            // })
        }
        console.log(item)
      },
      inputChange(){
        console.log(this._props.msg.inputData);
      },
      checkBoxChange(){
        console.log(this._props.msg.checkData);

      },
      selectListChange(){

        console.log(this._props.msg.selectList2);

      }
    },
    updated: function () {
      console.log(this)
      
      this.commitFlag = false;
      
       
      
    },
    watch:{

    }
  }
</script>
<style lang='less' scoped>
  .singleHeader{
    padding-bottom: 0 !important;
    margin-bottom:0 !important;
  }
  .singleConHeader{
    padding:0 0 10px;
    .inputStyle{
          position:relative;
          .errorStyle{
            color:#f56c6c;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            left: 0;

          }

        }
  }
  .el-radio{
    padding:0 0 10px;
  }
  .radioGroup{
    
    margin-top:-10px;
    .textRightCenter{
      text-align: left;
      padding-right: 20px;
      // line-height: 40px;

    }
  }
  .textRight{
    text-align: right;
    padding-right: 20px;
  }
  .textRightRadio{
    text-align: right;
    padding-right: 20px;
    line-height: 60px;
  }
  .textRightCenter{
    padding-right: 20px;
    // line-height: 40px;

  }
  .selectSize{
    width:100px;
    padding:0;
    display: block;
    margin-right: 40px;
  }
  /deep/.el-row .el-input--suffix .el-input__inner{
    width:130px !important;
  }
  .confirmCenter{
    display: block;
    font-size: 20px;
    width:100px;
    margin:30px auto;

  }
  .inputSize{
    width:50%;
    height:30px;
  }
  .msgStyle{
    position:absolute;
    padding:30px 10px;

  }



</style>
