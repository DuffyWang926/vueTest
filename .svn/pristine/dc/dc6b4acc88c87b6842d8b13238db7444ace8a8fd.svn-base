<template>
  <el-dialog :title="dialogTitle()" class="lg-dialog common-add-approved" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <!--基础信息-->
    <div v-show="isHidden">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required" name="规则类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="规则类型">
              <el-radio v-model="listQuery.parameter.sflx" label="3">按时段</el-radio>
              <el-radio v-model="listQuery.parameter.sflx" label="1">按次</el-radio>
              <el-radio v-model="listQuery.parameter.sflx" label="2">按天</el-radio>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=djmc name="规则名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="规则名称">
              <el-input v-model="listQuery.parameter.djmc" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="日期类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="日期类型" >
              <el-select v-model="listQuery.parameter.gzrlx">
                <el-option
                  v-for="item in OptionsRQLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="车辆类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="车辆类型" >
              <el-select v-model="listQuery.parameter.clzl">
                <el-option
                  v-for="item in OptionsCLZL"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=msRules name="描述信息">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="描述信息" >
              <el-input
                type="textarea"
                width="230px"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="listQuery.parameter.ms">
              </el-input>
            </el-form-item>
          </ValidationProvider>
          <span>残疾车</span>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px; margin-top: 10px; width:80%"></div>
            <el-row>
              <el-col :span="2">
                <el-radio v-model="cjczl" label="4" @change="radioSelectCJC"><p>免费</p></el-radio>
              </el-col>
              <el-col :span="8">
                <el-radio v-model="cjczl" label="5" @change="radioSelectCJC">
                  <div v-show="isShowRules">
                    <ValidationProvider :rules=fl name="折扣">
                      <el-form-item slot-scope="{ errors }" :error="errors[0]" label="折扣" class="radio-form">
                        <el-input v-model="cjczkl" clearable></el-input>%
                      </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider rules="required|numeric" name="免停时长">
                      <el-form-item slot-scope="{ errors }" :error="errors[0]" label="免停时长" class="radio-form">
                        <el-input v-model="cjcmfsc" clearable></el-input>分钟
                      </el-form-item>
                    </ValidationProvider>
                  </div>
                  <div v-show="!isShowRules">
                    <el-form-item label="折扣" class="radio-form">
                      <el-input v-model="cjczkl" clearable></el-input>%
                    </el-form-item>
                    <el-form-item label="免停时长" class="radio-form">
                      <el-input v-model="cjcmfsc" clearable></el-input>分钟
                    </el-form-item>
                  </div>
                </el-radio>
              </el-col>
            </el-row>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveOneData)" v-if="isHiddenRules">下一步</el-button>
            <el-button type="primary" @click="saveOneData" v-if="!isHiddenRules">下一步</el-button>
            <el-button class="btn-second" @click="cancelModal" type="primary" plain>取消</el-button>

          </div>
        </el-form>
      </ValidationObserver>
    </div>
    <!--下一步  按天收费规则-->
    <div v-show="isDayShow">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required|numeric" name="免费时长">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="免费时长">
              <el-input v-model="day.mfsc" clearable></el-input>（分钟）
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=fl name="最高价格">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="最高价格">
              <el-input v-model="day.zgjg" clearable></el-input>（元）
            </el-form-item>
          </ValidationProvider>

          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData)" v-if="isSaveAdd">确定</el-button>
            <el-button type="primary" @click="validate().then(updateData)" v-if="!isSaveAdd">确定</el-button>
            <el-button class="btn-second" @click="backStep" type="primary">上一步</el-button>

          </div>
        </el-form>
      </ValidationObserver>
    </div>

    <!--下一步  按次收费规则-->
    <div v-show="isOnceShow">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required|numeric" name="免费时长">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="免费时长">
              <el-input v-model="once.mfsc" clearable></el-input>（分钟）
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=fl name="价格">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="价格">
              <el-input v-model="once.zgjg" clearable></el-input>（元/次）
            </el-form-item>
          </ValidationProvider>

          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData)" v-if="isSaveAdd">确定</el-button>
            <el-button type="primary" @click="validate().then(updateData)" v-if="!isSaveAdd">确定</el-button>
            <el-button class="btn-second" @click="backStep" type="primary" plain>上一步</el-button>
          </div>
        </el-form>
      </ValidationObserver>
    </div>

    <!--下一步  按时段收费规则-->
    <div v-show="isTimeShow">
      <ValidationObserver ref="observer">
        <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
          <ValidationProvider rules="required|numeric" name="免费时长">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="免费时长">
              <el-input v-model="time.mfsc" clearable></el-input>（分钟）
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider :rules=fl name="最高价格">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="最高价格">
              <el-input v-model="time.zgjg" clearable></el-input>（元）
            </el-form-item>
          </ValidationProvider>
          <div class="content-card">
            <div class="table-add-button">
              <el-button type="primary" @click="validate().then(saveOpenData)">新增</el-button>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="sfsd"
                align="center"
                label="收费时段">
              </el-table-column>
              <el-table-column
                prop="mfsc"
                align="center"
                label="免费时长">
              </el-table-column>
              <el-table-column
                prop="zgjg"
                align="center"
                label="最高价格">
                <template slot-scope="scope">
                  <span>{{scope.row.zgjg/100}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="jfjt"
                align="center"
                label="计费阶梯">
                <template slot-scope="scope" style="text-align: center">
                  <div v-html="scope.row.jfjt"></div>
                </template>
              </el-table-column>
              <el-table-column
                prop="handle"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="openDialog(1,scope.row['sfbzsdid'])">修改</el-button>
                  <el-button type="text" size="small" @click="handleDelete(scope.row['sfbzsdid'])">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData)" v-if="isSaveAdd">确定</el-button>
            <el-button type="primary" @click="validate().then(updateData)" v-if="!isSaveAdd">确定</el-button>
            <el-button class="btn-second"  @click="backStep" type="primary" plain>上一步</el-button>

          </div>
        </el-form>
      </ValidationObserver>
    </div>

    <AddCommonAddApprovedDialog v-if="AddCommonAddApprovedDialogVisible" :visible.sync="AddCommonAddApprovedDialogVisible" :msg="msgAddData" @ee="getTimeList"></AddCommonAddApprovedDialog>
  </el-dialog>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import AddCommonAddApprovedDialog from "./AddCommonAddApprovedDialog";
  import { SaveApproved, fetchApprovedTimeList, fetchApprovedInfo, removeApprovedTime, updateApproved } from '@/api/ParkingInRoad/ChargeRule/Approved'
  import  EnumberateSelect  from '@/filters/index'
  export default {
    name: "CommonAddApprovedDialog",
    components: {
      AddCommonAddApprovedDialog,
      ValidationObserver,
      ValidationProvider
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      msg: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data(){
      return{
        appendToBody: true,
        labelposition:'left',
        tableData:[],
        isDayShow:false,
        isOnceShow:false,
        isTimeShow:false,
        isSaveAdd:true,
        isHidden:true,
        isShowRules:true,
        isHiddenRules:true,
        OptionsRQLX:EnumberateSelect.GZRLX,
        OptionsCLZL:EnumberateSelect.CLZL,
        cjczl:'5',
        cjczkl:'',
        cjcmfsc:'',
        sfbzid:'',
        zgje:'',
        listQuery:{
          parameter:{
            sflx:'1',
            djmc:'',
            gzrlx:'',
            clzl:'',
            ms:'',
            cjczkl:'',
            cjcmfsc:'',
          }
        },
        day:{
          mfsc:'',
          zgjg:''
        },
        once:{
          mfsc:'',
          zgjg:''
        },
        time:{
          mfsc:'',
          zgjg:''
        },
        msgAddData:{
          type:0,
          Data:{}
        },
        saveshiduan:{},
        AddCommonAddApprovedDialogVisible:false,
        djmc:{
          required: true,
          max: 10 ,
          regex:/^[a-zA-Z0-9_·\u4e00-\u9fa5]+$/
        },
        msRules:{
          max: 100 ,
          regex:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
        },
        fl:{
          required:true,
          regex:/^[0-9.]+$/
        },
      }
    },
    created(){
      if(this.msg.type === 1){
        this.getInfo(this.msg.Data);
        this.getTimeList()
      }
    },
    methods:{
      //收费阶梯列表
      getTimeList(){
        if(this.sfbzsdid){
          fetchApprovedTimeList(this.sfbzsdid).then(response => {
            this.tableData = response.result;
          }).catch((err) => {
            console.log(err)
          })
        }else{
          fetchApprovedTimeList(this.msg.Data).then(response => {
            this.tableData = response.result;
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      //收费 详情
      getInfo(id){
        fetchApprovedInfo(id).then(response => {
          this.listQuery.parameter.sflx = String(response.result.sflx);
          this.listQuery.parameter.djmc = response.result.djmc;
          this.listQuery.parameter.gzrlx = response.result.gzrlx;
          this.listQuery.parameter.clzl = response.result.clzl;
          this.listQuery.parameter.ms = response.result.ms;
          if(response.result.cjczkl === 0 && response.result.cjcmfsc === 0){
            this.cjczl = '4';
            this.isShowRules = false;
            this.isHiddenRules = false
          }else{
            this.cjczl = '5';
            this.cjczkl = response.result.cjczkl;
            this.cjcmfsc = response.result.cjcmfsc;
          }
          if(response.result.sflx === 3 ){
            this.time.mfsc = response.result.mfsc;
            this.time.zgjg = response.result.zgjg/100
          }
          if(response.result.sflx === 1 ){
            this.once.mfsc = response.result.mfsc;
            this.once.zgjg = response.result.zgjg/100
          }
          if(response.result.sflx === 2 ){
            this.day.mfsc = response.result.mfsc;
            this.day.zgjg = response.result.zgjg/100
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      radioSelectCJC(){
        if(this.cjczl === '4'){
          this.isShowRules = false;
          this.isHiddenRules = false
        }else if(this.cjczl === '5'){
          this.isShowRules = true;
          this.isHiddenRules = true
        }
      },
      saveOneData(){
        if(this.listQuery.parameter.sflx ==='1'){
          this.isOnceShow = true;
          this.isHidden = false
        }
        if(this.listQuery.parameter.sflx ==='2'){
          this.isDayShow = true;
          this.isHidden = false
        }
        if(this.listQuery.parameter.sflx ==='3'){
          this.isTimeShow = true;
          this.isHidden = false
        }
      },
      backStep(){
        if(this.listQuery.parameter.sflx ==='1'){
          this.isOnceShow = false;
          this.isHidden = true
        }
        if(this.listQuery.parameter.sflx ==='2'){
          this.isDayShow = false;
          this.isHidden = true
        }
        if(this.listQuery.parameter.sflx ==='3'){
          this.isTimeShow = false;
          this.isHidden = true
        }
      },
      //按时段添加，新增按钮 获取当前收费规则记录id
      saveOpenData(){
        if(this.cjczl == '4'){
          this.listQuery.parameter.cjczkl = 0;
          this.listQuery.parameter.cjcmfsc = 0
        }else {
          this.listQuery.parameter.cjczkl = this.cjczkl;
          this.listQuery.parameter.cjcmfsc = this.cjcmfsc
        }
        this.listQuery.parameter.cpys = 1 ;
        this.listQuery.parameter.fzsj = 0;
        //按时段
        if(this.listQuery.parameter.sflx === '3'){
          this.listQuery.parameter.mfsc = this.time.mfsc;
          this.listQuery.parameter.zgjg = this.time.zgjg * 100
        }

      if(this.msg.type === 0){
        if(this.sfbzsdid){
          this.openDialog(0, this.sfbzsdid)
        }else{
          SaveApproved(this.listQuery).then(response => {
            this.saveshiduan = this.listQuery;
            if(response.code === 0){
              this.sfbzsdid = response.result.id;
              this.openDialog(0, this.sfbzsdid)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      } else if(this.msg.type === 1){
        this.sfbzid = this.msg.Data;
        this.openDialog(0, this.sfbzid)
      }

      },
      saveData(){
        if(this.cjczl == '4'){
          this.listQuery.parameter.cjczkl = 0;
          this.listQuery.parameter.cjcmfsc = 0
        }else {
          this.listQuery.parameter.cjczkl = this.cjczkl;
          this.listQuery.parameter.cjcmfsc = this.cjcmfsc
        }
        this.listQuery.parameter.cpys = 2;
        this.listQuery.parameter.fzsj = 0;

        //按次
        if(this.listQuery.parameter.sflx === '1'){
          this.listQuery.parameter.mfsc = this.once.mfsc;
          this.listQuery.parameter.zgjg = this.once.zgjg * 100
        }
        //按天
        if(this.listQuery.parameter.sflx === '2'){
          this.listQuery.parameter.mfsc = this.day.mfsc;
          this.listQuery.parameter.zgjg = this.day.zgjg * 100
        }
        //按时段
        if(this.listQuery.parameter.sflx === '3'){
          this.listQuery.parameter.mfsc = this.time.mfsc;
          this.listQuery.parameter.zgjg = this.time.zgjg * 100
        }

        if(this.listQuery === this.saveshiduan){//新增时段，如果已经点击了新增保存了数据，点击保存就不执行
          this.cancelModal();
        }else{
          SaveApproved(this.listQuery).then(response => {
            if(response.code === 0 ){
              this.$message({
                message: response.message,
                type:'success'
              });
              this.cancelModal();
              this.$parent.getList();
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },

      //修改收费保存
      updateData(){
        if(this.cjczl === '4'){
          this.listQuery.parameter.cjczkl = 0;
          this.listQuery.parameter.cjcmfsc = 0;
        }else {
          this.isShowRules = true;
          this.isHiddenRules = true;
          this.listQuery.parameter.cjczkl = this.cjczkl;
          this.listQuery.parameter.cjcmfsc = this.cjcmfsc
        }
        this.listQuery.parameter.cpys = 2;
        this.listQuery.parameter.fzsj = 0;

        //按次
        if(this.listQuery.parameter.sflx === '1'){
          this.listQuery.parameter.mfsc = this.once.mfsc;
          this.listQuery.parameter.zgjg = this.once.zgjg * 100
        }
        //按天
        if(this.listQuery.parameter.sflx === '2'){
          this.listQuery.parameter.mfsc = this.day.mfsc;
          this.listQuery.parameter.zgjg = this.day.zgjg * 100
        }
        //按时段
        if(this.listQuery.parameter.sflx === '3'){
          this.listQuery.parameter.mfsc = this.time.mfsc;
          this.listQuery.parameter.zgjg = this.time.zgjg * 100
        }
        this.listQuery.parameter.id = this.msg.Data;
        updateApproved(this.listQuery).then(response => {
          if (response.code === 0) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.cancelModal();
            this.$parent.getList();
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //删除收费时段
      handleDelete(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeApprovedTime(id).then(response => {
            if (response.code === 0) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getTimeList()
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      openDialog (type,data) {
        this.AddCommonAddApprovedDialogVisible = true;
        this.msgAddData.type = type;
        this.msgAddData.Data = data;
      },
      //修改标题
      dialogTitle() {
        let dialogTitle1 = "";
        if (this.msg.type === 0) {
          dialogTitle1 = "新增收费规则";
        } else if (this.msg.type === 1) {
          dialogTitle1 = "修改收费规则";
          this.isSaveAdd = false
        }
        return dialogTitle1;
      },
      cancelModal(){
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less">
  .common-add-approved{
    .el-textarea{width:230px}
  }

</style>
