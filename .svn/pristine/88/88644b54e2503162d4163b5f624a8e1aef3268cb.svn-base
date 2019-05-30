<template>
    <el-dialog title="新增区域" class="sm-sm-dialog regionDialog" :visible.sync="visible" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
      <ValidationObserver ref="observer">
        <el-form ref="form" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required" name="区域类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="区域类型">
              <el-radio v-model="radio" label="1" @change="handleShow">行政区域</el-radio>
              <el-radio v-model="radio" label="2" @change="handleShow">自定义区域</el-radio>
            </el-form-item>
          </ValidationProvider>
        </el-form>
      </ValidationObserver>
          <div v-show="isShow">
      <ValidationObserver ref="observer">
        <el-form ref="form" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required" name="选择行政区">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="选择行政区">
              <el-select v-model="qybh1" placeholder="省" @change="selectXZQHBH1">
                <el-option
                  v-for="item in OptionsXZQHBH1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="" name="">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="">
              <el-select v-model="qybh2" placeholder="市" @change="selectXZQHBH2">
                <el-option
                  v-for="item in OptionsXZQHBH2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="" name="">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="">
              <el-select v-model="qybh3" placeholder="县" >
                <el-option
                  v-for="item in OptionsXZQHBH"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveDataXZQY())">确定</el-button>
            <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
          </div>

        </el-form>
      </ValidationObserver>
          </div>
          <div v-show="!isShow">
            <ValidationObserver ref="observer">
              <el-form ref="form" slot-scope="{ validate }" label-width="120px">
            <ValidationProvider rules="required" name="父级区域">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="父级区域">
                <el-select v-model="fjqybh" placeholder="请输入区域类型">
                  <el-option
                    v-for="item in OptionsFJQY"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=qymcRules name="区域名称">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="区域名称">
                <el-input
                  placeholder="请输入区域名称"
                  v-model="listQuery.parameter.qymc"
                  clearable>
                </el-input>
              </el-form-item>
            </ValidationProvider>
            <ValidationProvider :rules=msRules name="区域描述">
              <el-form-item slot-scope="{ errors }" :error="errors[0]" label="区域描述">
                <el-input
                  type="textarea"
                  :rows="2"
                  resize="none"
                  placeholder="请输入内容"
                  v-model="listQuery.parameter.ms">
                </el-input>
              </el-form-item>
            </ValidationProvider>
            <div class="footer-btn">
              <el-button type="primary" @click="validate().then(saveDataZDY())">确定</el-button>
              <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
            </div>
              </el-form>
            </ValidationObserver>
          </div>
    </el-dialog>

</template>

<script>
  import { AddSaveData } from "@/api/BasisSet/Region";
  import { fetchXZQHBHList, fetchFJQYList } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "AddRegionDialog",
    components: {
      ValidationObserver,
      ValidationProvider
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
        appendToBody:true,
        qybh1:'',
        qybh2:'',
        qybh3:'',
        fjqybh:'',
        OptionsXZQHBH1:[],
        OptionsXZQHBH2:[],
        OptionsXZQHBH:[],
        OptionsFJQY:[],
        listQuery:{
          parameter:{
            qylx: '',
            qybh: '',
            qymc: '',
            ms: '',
          }
        },
        radio:'1',
        isShow :true,
        msRules:{
          required: true,
          max: 100 ,
          regex:/^[a-zA-Z0-9_-——·\u4e00-\u9fa5]+$/
        },
        qymcRules:{
          required: true,
          max: 10 ,
          regex:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
        }
      }
    },
    created(){
      this.getXZQHBHList();
      this.selectFJQYList()
    },
    methods:{
      //省
      getXZQHBHList(){
        fetchXZQHBHList().then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH1.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 市
      selectXZQHBH1(){
        this.qybh2 = "";
        this.qybh3 = "";
        this.OptionsXZQHBH2=[]
        fetchXZQHBHList(this.qybh1).then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH2.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //县
      selectXZQHBH2(){
        this.OptionsXZQHBH=[]
        fetchXZQHBHList(this.qybh2).then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsXZQHBH.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      //筛选父级区域
      selectFJQYList(){
        fetchFJQYList().then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsFJQY.push({
              label: response.result[i].label,
              value: response.result[i].key
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleShow(){
        if(this.radio==='1'){
          this.isShow = true
        }else if(this.radio==='2'){
          this.isShow = false
        }
      },
      saveDataXZQY(){
        this.listQuery.parameter.qylx = 1;
        if(this.qybh3 !== ''){
          this.listQuery.parameter.qybh = this.qybh3
        }
        if(this.qybh3 === '' && this.qybh2 !== ''){
          this.listQuery.parameter.qybh = this.qybh2
        }
        if(this.qybh3 === '' && this.qybh2 === '' ){
          this.listQuery.parameter.qybh = this.qybh1
        }
        AddSaveData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.$parent.getList();
            this.$parent.getTreeList();
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        });
      },
      saveDataZDY(){
        this.listQuery.parameter.qymc = this.listQuery.parameter.qymc.trim();
        this.listQuery.parameter.ms = this.listQuery.parameter.ms.trim();
        this.listQuery.parameter.qylx = 2;
        this.listQuery.parameter.qybh = this.fjqybh;
        AddSaveData(this.listQuery).then(response => {
          if(response.code === 0 ){
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.$parent.getList();
            this.$parent.getTreeList();
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        });
      },
      cancelModal(){
        this.$emit('update:visible', false);
      }
    }
    }
</script>

<style lang="less">
  .regionDialog{
    .el-textarea__inner{
      width:190px !important;
    }
  }
</style>
