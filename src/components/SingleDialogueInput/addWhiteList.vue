
<template>
   <el-dialog :title="msg.title" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" class='addWhiteList'
      :close-on-click-modal='false'
   >
     <!-- inputList -->
     <ValidationObserver ref="observer">
      <el-form ref="form" slot-scope="{ validate }" label-width="120px" >
        <div v-if="msg.inputData" class="paddingLeft">
          <el-row  v-for=" (v,i) in msg.inputData" :key='i' class='singleConHeader'>
            <el-col :span='18'>
              <ValidationProvider :rules='v.type' :name="v.name">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" :label="v.name">
                  <div class='inputStyle'>
                      <input v-model="v.data" :inputData ='v' @change='changeFunc(v, i)'  class='inputSize' type="text" :disabled='v.disabled'>
                    <div>
                      <span v-show='inputDataFlag' class='errorStyle'>{{inputDataName}}</span>
                    </div>

                  </div>
                  
                </el-form-item>
              </ValidationProvider>
            </el-col>
          </el-row>
        </div>

        <!-- selectList -->
        <div v-if='msg.selectData'>
          <el-row v-for='(v, i) in msg.selectData' :key="i+'selectList2'" >
            <el-col :span='18'>
              <el-col :span='6' class='textRightCenter'>
                <span>{{v.title}}</span>
              </el-col>
              <el-col :span='8' class='selectSize' >
                <el-select v-model="v.value" :placeholder="v.options[0].label"  @change='selectListChange' >
                  <el-option
                    v-for="item in v.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
        </div>
        <!-- inputData2 -->
        <div v-if="msg.inputData2" class="paddingSecondInput">
          <el-row  v-for=" (v,i) in msg.inputData2" :key='i' class='singleConHeader'>
            <el-col :span='18'>
              <ValidationProvider :rules='v.type' :name="v.name">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" :label="v.name">
                  <input v-model="v.data" @change='inputChange' class='inputSize' type="text" :disabled='v.disabled'>
                  <span v-if='v.unit'>{{v.unit}}</span>
                </el-form-item>
              </ValidationProvider>
            </el-col>
          </el-row>
        </div>
        <!-- selectList -->
        <div v-if='msg.selectData2'>
          <el-row v-for='(v, i) in msg.selectData2' :key="i+'selectList2'" >
            <el-col :span='18'>
              <el-col :span='6' class='textRightCenter'>
                <span>{{v.title}}</span>
              </el-col>
              <el-col :span='8' class='selectSize' >
                <el-select v-model="v.value" :placeholder="v.options[0].label"  @change='selectListChange' >
                  <el-option
                    v-for="item in v.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-col>
          </el-row>
        </div>
        <div class='border'>

        </div>
        <!-- inputData3 -->
        <div v-if="msg.inputData3" class="paddingThirdInput">
          <el-row  v-for=" (v,i) in msg.inputData3" :key='i' class='singleConHeader'>
            <el-col :span='18'>
              <ValidationProvider :rules='v.type' :name="v.name">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" :label="v.name">
                  <input v-model="v.data" @change='inputChange' class='inputSize' type="password" :disabled='v.disabled'>
                </el-form-item>
              </ValidationProvider>
            </el-col>
          </el-row>
        </div>


        <el-row>
          <el-button @click="validate().then(confirmModal)" class='confirmCenter'>
            确定
          </el-button>
        </el-row>
      </el-form>
    </ValidationObserver>

  </el-dialog>
</template>
<script>
// 单列弹窗，变量如下 具体使用见白名单的添加弹窗

import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: 'addWhiteList',
    components:{ValidationProvider, ValidationObserver },
    props:['msg','visible'],
    data() {
      return {
        inputDataFlag:false,
        inputDataName:'请输入车牌号码',
        commitFlag:false
      };
    },
    updated: function () {
      console.log(this)
      this.commitFlag = false;
      
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
          if(v.disabled == true){
            this.commitFlag = true;
          }
        })
        
        if(this.commitFlag){
          this.$emit('confirmModal',false)
          
        }else{
          this.$message.error(this.inputDataName)
        }

      },
      inputChange(data){
//         let val = data.target._value;

//         let plateReg = /^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$/g; 
// data.target._value='aaaa'
//         console.log(this._props.msg.inputData);
      },
      //监听inputList循环数据
      changeFunc(item, index) {
          const arrs = this.msg && this.msg.inputData;
        
        if (arrs) {
            if(item.name == "车牌号码：" && item.data){
              let plateReg = /^([\u4E00-\u9FA5A-Z0-9]){5,8}$/g;
              if(!plateReg.test(item.data)){
                this.inputDataName = "请输入正确的" + item.name.slice(0,-1)
                this.inputDataFlag =true;
                this.commitFlag =false;
              }else{
                this.inputDataFlag =false;
                this.commitFlag =true;
                
              }
              
            }else{
              this.inputDataFlag =false;
              this.inputDataName = "请输入正确的" + item.name.slice(0,-1)
            }
        }
        console.log(item)
      },
      

      checkBoxChange(){
        console.log(this._props.msg.checkData);

      },
      selectListChange(){

        console.log(this._props.msg.selectList2);

      }
    },
    watch:{

    }
  }
</script>
<style lang='less' scoped>
  .addWhiteList{
    .paddingLeft{
      padding-left: 40px;
      .singleConHeader{
        padding:0;
        height: 50px;
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
        

        .inputSize{
          width:50%;
          height:30px;
        }
      }
    }

    .textRightCenter{
      text-align: right;
      padding-right: 12px;
      line-height: 40px;

    }
    
    .el-radio{
      padding:0 0 10px;
    }
    .textRight{
      text-align: right;
      padding-right: 20px;
    }
    .textRightRadio{
      text-align: right;
      padding-right: 20px;
      line-height: 60px;

      .selectSize{
        width:150px;
        padding:0;
        display: block;
        margin-right: 40px;
      }
    }

    .paddingSecondInput{
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
    
    .el-row .el-input--suffix .el-input__inner{
      /*width:130px !important;*/
    }
    .confirmCenter{
      display: block;
      font-size: 20px;
      width:100px;
      margin:30px auto;

    }
    .border{
      border-top: 1px solid #aaa;
      width:50%;
      margin:20px 0 0 20px;


    }

  }
  


</style>
