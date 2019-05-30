<template>
  <div class="businessparameter-page">
    <div class="businessparameter-page-left">
      <div class="content-card">
        <el-row v-for="(item,i) in this.BusParameter" :key="i +'BusParameter'">
          <el-radio v-model="radio" :label=String(item.sbm)>{{item.cslb}}</el-radio>
        </el-row>

      </div>
    </div>
    <div class="businessparameter-page-right">
      <div class="content-card">
        <div v-if="this.radio === '100'">
          <el-row >
            月结帐日
          </el-row>
          <el-row>
            <el-radio v-model="yue.parameter.csnr1" label="1" @change="selectChange">自然月末</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="yue.parameter.csnr1" label="2" @change="selectChange">自定义
              <el-select v-model="zdy.csnr2" :disabled="isYueShow" class="select-style">
              <el-option
                v-for="item in OptionZDY"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
              <el-select v-model="time" disabled class="select-style">
                <el-option
                  v-for="item in Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-radio>
          </el-row>
        </div>

        <div v-if="this.radio === '101'">
          <el-row >
            可退费时限
          </el-row>
          <el-row>
            <el-radio v-model="tuifei.parameter.csnr1" label="1" @change="selectChange">
              设置时期
              <el-select v-model="set.csnr2" :disabled="isSetShow" class="select-style">
                <el-option
                  v-for="item in OptionSET"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="tuifei.parameter.csnr1" label="2" @change="selectChange">
              设置时长
              <el-select v-model="day.csnr2" :disabled="isDayShow" class="select-style">
                <el-option
                  v-for="item in OptionRQ"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              天
            </el-radio>
          </el-row>
        </div>

        <div v-if="this.radio === '102'">
          <el-row >
            入离位策略
          </el-row>
          <el-row>
            <el-radio v-model="ruliwei.parameter.csnr1" label="1">泊位设置优先</el-radio >
          </el-row>
          <el-row>
            <el-radio v-model="ruliwei.parameter.csnr1" label="2">强制主机模式</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="ruliwei.parameter.csnr1" label="3">强制PDA模式</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="ruliwei.parameter.csnr1" label="4">强制混合模式</el-radio>
          </el-row>
        </div>
        <div class="bottom-line"></div>
        <ValidationObserver ref="observer">
          <el-form ref="form" slot-scope="{ validate }" label-width="120px">
            <ValidationProvider rules="required" name="系统操作员密码">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
                <el-input type="password" auto-complete="new-password" v-model="xtdlmm" clearable></el-input>
              </el-form-item>
            </ValidationProvider>
            <div class="footer-btn">
              <el-button type="primary" @click="validate().then(saveData)">确定</el-button>
            </div>
          </el-form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchBusinessParameterList, saveData } from '@/api/BasisSet/BusinessParameter'
  import  EnumberateSelect  from '@/filters/index'
  import { checkXTPassword } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
    export default {
      name: "BusinessParameter",
      components: {
        ValidationObserver,
        ValidationProvider
      },
      data(){
        return{
          BusParameter:[],
          sbm:'',
          radio:'',
          time:'00:00:00',
          xtdlmm:'',
          OptionRQ:EnumberateSelect.OptionRQ,
          OptionZDY:EnumberateSelect.OptionZDY,
          Options:[],
          OptionSET:[
            {label: '次日', value:'1'},
            {label: '隔日', value:'2'}
          ],
          isYueShow:false,
          isSetShow:false,
          isDayShow:false,
          yue:{
            parameter:{
              id:'',
              csnr1: '',
              csnr2: 26,
              sbm: 0,
            }
          },
          tuifei:{
            parameter:{
              id:'',
              csnr1: '',
              csnr2: '',
              sbm: 0,
            }
          },
          ruliwei:{
            parameter:{
              id:'',
              csnr1: '',
              csnr2: "",
              sbm: 0,
            }
          },
          zdy:{
            csnr2: "26",
          },
          set:{
            csnr2: "1",
          },
          day:{
            csnr2: "7",
          }
        }
      },
      created(){
        this.getBusinessParameterList()
      },

      methods:{
        //获取所有参数
        getBusinessParameterList() {
          fetchBusinessParameterList().then(response => {
            this.BusParameter = response.result;
            this.radio = String(response.result[0].sbm);
            for(let i=0; i<response.result.length; i++){
              if(response.result[i].sbm === 100){
                this.yue.parameter.csnr1 = String(response.result[i].csnr1);
                this.yue.parameter.id = response.result[i].id;
                this.yue.parameter.sbm = response.result[i].sbm;
                if(this.yue.parameter.csnr1 === '1'){
                  this.isYueShow = true
                }else if(this.yue.parameter.csnr1 === '2'){
                  this.isYueShow = false;
                  this.zdy.csnr2 = response.result[i].csnr2

                }
              }else if(response.result[i].sbm === 101){
                this.tuifei.parameter.id = response.result[i].id;
                this.tuifei.parameter.csnr1 = String(response.result[i].csnr1);

                this.tuifei.parameter.sbm = response.result[i].sbm;
                if(this.tuifei.parameter.csnr1 === '1'){
                  this.isSetShow = false;
                  this.isDayShow = true;
                  this.set.csnr2 = response.result[i].csnr2;
                }else if(this.tuifei.parameter.csnr1 === '2'){
                  this.isSetShow = true;
                  this.isDayShow = false;
                  this.day.csnr2 = response.result[i].csnr2;
                }
              }else if(response.result[i].sbm === 102){
                this.ruliwei.parameter.id = response.result[i].id;
                this.ruliwei.parameter.csnr1 = String(response.result[i].csnr1);
                this.ruliwei.parameter.csnr2 = response.result[i].csnr2;
                this.ruliwei.parameter.sbm = response.result[i].sbm;
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        },

        //点击切换单选按钮
        selectChange(){
          if(this.yue.parameter.csnr1 === '1'){
            this.isYueShow = true
          }else if(this.yue.parameter.csnr1 === '2'){
            this.isYueShow = false
          }
          if(this.tuifei.parameter.csnr1 === '1'){
            this.isSetShow = false;
            this.isDayShow = true
          }else if(this.tuifei.parameter.csnr1 === '2'){
            this.isSetShow = true;
            this.isDayShow = false
          }
        },

        //保存
        saveData(){
          this.xtdlmm = this.xtdlmm.trim();
          //修改页面验证系统操作员密码
          checkXTPassword(this.xtdlmm).then(response => {
            if (response.code === 0) {
              this.saveAllData()
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        saveAllData(){
          if(this.radio === '100'){
            if(this.yue.parameter.csnr1 === '1'){
              this.yue.parameter.csnr2 = ''
            }else{
              this.yue.parameter.csnr2 = this.zdy.csnr2
            }
            this.listQuery = this.yue
          }else if(this.radio === '101'){
            if( this.tuifei.parameter.csnr1 === '1'){
              this.tuifei.parameter.csnr2 = this.set.csnr2
            }else{
              this.tuifei.parameter.csnr2 = this.day.csnr2
            }
            this.listQuery = this.tuifei
          }else if(this.radio === '102'){
            this.listQuery = this.ruliwei
          }
          saveData(this.listQuery).then(response => {
            if(response.code === 0){
              this.$message({
                message: response.message,
                type:'success'
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
</script>

<style lang="less">
  .businessparameter-page{
    position: relative;
    .businessparameter-page-left{
      position:absolute;
      left:0;
      width:20%;
      .el-row{
        padding:10px 20px;
      }
    }
    .el-input{
      width:230px;
    }
    .businessparameter-page-right{
      position:absolute;right:0;width: 79%;
      .select-style{
        padding-left: 15px;
        .el-input{
          width:120px;
          .el-input__inner{
            width:120px;
          }
        }
      }
      .el-form-item{
        padding-left:20px;
        padding-top: 50px;
      }
      .footer-btn{
        text-align: center;
        padding-bottom: 50px;
      }
      .bottom-line{
        padding-top:30px;
        margin-left: 20px;
        border-bottom: 1px solid #dfdfdf;
        width:80%
      }
    }
  }
</style>
