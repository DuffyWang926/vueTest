<template>
  <el-dialog class="batch-dialog" :title="title" :visible.sync="visible" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="dataForm" name="dataForm" :label-position="labelposition" slot-scope="{ validate }">
        <div style="width: 30%">
        <ValidationProvider rules="required" name="停车场名称">
          <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场名称">
            <el-select
              v-model="ccmc"
              filterable
              remote
              default-first-option
              :remote-method="remoteMethodCCMC"
              :loading="loading"
              placeholder="请输入停车场名称">
              <el-option
                v-for="item in OptionsCCMC"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </ValidationProvider>
        </div>
        <div class="dialog-right" style="width:70%; position: absolute; right:0; top:90px;">
          <el-button type="primary" @click="resetFilter" style="padding: 8px 26px">重置</el-button>
        </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="Number"
          label="序号"
          width="50"
          type="index"
          :index="indexMethod">
        </el-table-column>

        <el-table-column  label="编号">
          <template slot-scope="scope">
            <ValidationProvider rules="required|alpha_num|max:40"  name="泊位编号">
              <el-form-item slot-scope="{ errors }" :error="errors[0]">
                  <el-input v-model="add.cwbh"></el-input>
              </el-form-item>
            </ValidationProvider>
          </template>
        </el-table-column>

        <el-table-column  label="状态">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.sfqy" placeholder="请选择"  @change="updateSelect('sfqy')">
              <el-option
                v-for="item in OptionsSFQY"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column  label="尺寸">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.ccsx" placeholder="请选择"  @change="updateSelect('ccsx')">
              <el-option
                v-for="item in OptionsCCSX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="排列">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.plfs" placeholder="请选择"  @change="updateSelect('plfs')">
              <el-option
                v-for="item in OptionsPLFS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="管理模式">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.sjly" placeholder="请选择"  @change="updateSelect('sjly')">
              <el-option
                v-for="item in OptionsSJLX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="经营类型">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.jylx" placeholder="请选择"  @change="updateSelect('jylx')">
              <el-option
                v-for="item in OptionsJYLX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  label="位置类型">
          <template slot-scope="scope">
            <el-form-item>
            <el-select v-model="add.wzlx" placeholder="请选择"  @change="updateSelect('wzlx')">
              <el-option
                v-for="item in OptionsWZLX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="tableAddData" style="width: 100%;" :show-header="showheader" >
      <el-table-column width="50px">
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'" >
          <span>{{index+2}}</span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope" >
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
            <el-input v-model="adddata.cwbh[index]"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.sfqy[index]" placeholder="请选择" @change="updateSelect('sfqy')">
            <el-option
              v-for="item in OptionsSFQY"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox  v-model="adddata.sfqychecked[index]" checked @change="updateSelect('sfqy')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.ccsx[index]" placeholder="请选择"  @change="updateSelect('ccsx')">
            <el-option
              v-for="item in OptionsCCSX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox v-model="adddata.ccsxchecked[index]" checked @change="updateSelect('ccsx')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.plfs[index]" placeholder="请选择" @change="updateSelect('plfs')">
            <el-option
              v-for="item in OptionsPLFS"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox v-model="adddata.plfschecked[index]" checked @change="updateSelect('plfs')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.sjly[index]" placeholder="请选择" @change="updateSelect('sjly')">
            <el-option
              v-for="item in OptionsSJLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox v-model="adddata.sjlychecked[index]" checked @change="updateSelect('sjly')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.jylx[index]" placeholder="请选择" @change="updateSelect('jylx')">
            <el-option
              v-for="item in OptionsJYLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox v-model="adddata.jylxchecked[index]" checked @change="updateSelect('jylx')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-form-item v-for="(item,index) in addData" :key="index + 'addData'">
          <el-select v-model="adddata.wzlx[index]" placeholder="请选择" @change="updateSelect('wzlx')">
            <el-option
              v-for="item in OptionsWZLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-checkbox v-model="adddata.wzlxchecked[index]" checked @change="updateSelect('wzlx')">同上</el-checkbox>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>

      <div class="footer-btn">
        <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
        <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
      </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
import { AddBatchSaveData } from "@/api/Resources/RoadInParkingSpace";
import { fetchParkingGarageNamelist } from '@/api/CommonSelectApi'
import  EnumberateSelect  from '@/filters/index'
import $ from 'jquery'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: "BatchAddRoadInParkingSpaceDialog",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      appendToBody: true,
      showheader:false,
      labelposition:"left",
      title: "批量新增泊位",
      tableData: [{}],
      addData:[{},{},{},{},{},{},{},{},{}],
      tableAddData:[{}],
      ccmc:'',
      add:{
        // ccmc:'',
        cwbh:'',
        sfqy:'',
        ccsx:'',
        plfs:'',
        sjly:'',
        jylx:'',
        wzlx:'',
      },
      adddata:{
        // ccmc:'',
        cwbh:[],
        sfqy:[],
        ccsx:[],
        plfs:[],
        sjly:[],
        jylx:[],
        wzlx:[],
        cwbhchecked:[],
        sfqychecked:[],
        ccsxchecked:[],
        plfschecked:[],
        sjlychecked:[],
        jylxchecked:[],
        wzlxchecked:[],
      },
      addForSaveData:{},
      listQuery:{
        parameter:{
          yygsid:'',
          ccmc:'',
         parkingSpaces:[]
        }
      },
      loading:false,
      OptionsCCMC:[],
      OptionsPLFS:EnumberateSelect.PLFS,
      OptionsCCSX:EnumberateSelect.CCSX,
      OptionsJYLX:EnumberateSelect.JYLX,
      OptionsWZLX:EnumberateSelect.WZLX,
      OptionsSJLX:EnumberateSelect.SJLX,
      OptionsSFQY:EnumberateSelect.SFQY,
    }
  },
  created() {
    this.handleSelectCCMC();
  },
  methods: {
    updateSelect(type) {
      // 更新全部的 select
        // 如果 type 是 状态
      // console.log('updateSelect:' + type)
      let checkedKey = type + 'checked';
      let firstKey = type;
      let adddataKey = type;
      for ( let i = 0, l=this.addData.length; i<l; i++){
        // console.log(i + '/')
        if (0 == i) {
          // console.log(this.adddata[checkedKey][i])
          // 循环的第一行（第2行）
          if(this.adddata[checkedKey][i]){
            this.adddata[adddataKey][i] = this.add[firstKey]
          }
          // console.log(this.adddata[adddataKey][i])
          continue
        }
        // 循环的第二行开始，到最后
        if(this.adddata[checkedKey][i]){
          this.adddata[adddataKey][i] = this.adddata[adddataKey][i-1]
        }
        // console.log(this.adddata[adddataKey][i])
      }
      let adddata = this.adddata;
      this.adddata = null;
      this.adddata = adddata
    },

    //批量添加结果序列化
    saveSpaceTime(){
      this.serializeObject($("[name='dataForm']").serializeArray());
    },
    serializeObject(map){
      for(let i = 0; i<this.addData.length;i++){
        this.addForSaveData = {
          // ccmc:'',
          cwbh:'',
          sfqy:'',
          ccsx:'',
          plfs:'',
          sjly:'',
          jylx:'',
          wzlx:''
        }
        // this.addForSaveData.ccmc = this.ccmc;
        this.addForSaveData.cwbh = this.adddata.cwbh[i];
        this.addForSaveData.sfqy = this.adddata.sfqy[i];
        this.addForSaveData.ccsx = this.adddata.ccsx[i];
        this.addForSaveData.plfs = this.adddata.plfs[i];
        this.addForSaveData.sjly = this.adddata.sjly[i];
        this.addForSaveData.jylx = this.adddata.jylx[i];
        this.addForSaveData.wzlx = this.adddata.wzlx[i];

        this.listQuery.parameter.parkingSpaces.push(this.addForSaveData)
        if(this.addForSaveData.cwbh === undefined){
          //从数组中删除元素
          Array.prototype.indexOf = function(val) {
            for (let i = 0; i < this.length; i++) {
              if (this[i] == val) return i;
            }
            return -1;
          };
          Array.prototype.remove = function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };
          this.listQuery.parameter.parkingSpaces.remove(this.addForSaveData)
        }
      }
    },
    indexMethod(index) {
      return index +1
    },

    //停车场名称
    handleSelectCCMC(){
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      fetchParkingGarageNamelist(sysUser.gsid, this.ccmc).then(response => {
        for (let i = 0; i < response.result.length; i++) {
          this.OptionsCCMC.push({
            label: response.result[i].label,//此处是展示内容
            value: Number(response.result[i].key) //此处是后台需要的值
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 确定按钮
    saveData() {
      this.listQuery.parameter.parkingSpaces = [];
      this.saveSpaceTime();
      this.add.cwbh = this.add.cwbh.trim();
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.listQuery.parameter.yygsid = sysUser.gsid;
      this.listQuery.parameter.ccmc = this.ccmc;

      // this.add.ccmc = this.ccmc;
      this.listQuery.parameter.parkingSpaces.push(this.add);
      // console.log(this.listQuery.parameter.parkingSpaces);
      let cwbhRules = this.add.cwbh;
      for(let i =0; i<this.listQuery.parameter.parkingSpaces.length; i++){
        // console.log(this.listQuery.parameter.parkingSpaces[i].cwbh);
        //如果车位编号不等与空并且不符合正则
        if(this.listQuery.parameter.parkingSpaces[i].cwbh !== '' && (/^[a-zA-Z0-9_-——·]+$/.test(this.listQuery.parameter.parkingSpaces[i].cwbh)) === false){
          cwbhRules = this.listQuery.parameter.parkingSpaces[i].cwbh
        }
      }
      // console.log(cwbhRules)
      if(/^[a-zA-Z0-9_-——·]+$/.test(cwbhRules) === true){
        this.saveDataData(this.listQuery)
      }else{
        this.$message.error('车位编号填写格式错误');
      }
    },
    saveDataData(listQuery){
      AddBatchSaveData(listQuery).then(response => {
        if(response.code === 0 ){
          this.$message({
            message: response.message,
            type:'success'
          });
          this.$parent.getList();
          this.cancelModal()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    resetFilter(){
      this.ccmc = '';
      this.OptionsCCMC = [];
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      this.handleSelectCCMC(sysUser.gsid, this.ccmc);
    },

    //  关闭弹框
    cancelModal() {
      this.$emit("update:visible", false);
    },
    remoteMethodCCMC(query) {
      this.ccmc = query;
      let sysUser = JSON.parse(localStorage.getItem("sysUser"));
      if (query !== '') {
        this.handleSelectCCMC(sysUser.gsid, this.ccmc);
        this.OptionsCCMC = [];
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.OptionsCCMC = this.OptionsCCMC.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.OptionsCCMC = [];
      }
    },
  }
};
</script>

<style lang="less" >
  .batch-dialog{
    .el-dialog{
      margin-top: 3vh !important;
      width:96% !important;
      height: 780px;
      .el-form-item__content .el-input__inner{
        height:30px;
        line-height: 30px;
      }
      .el-dialog__header{
        margin-left:10px;
        margin-right:20px;
        border-bottom:1px solid #61bafe ;
        padding:20px 0 10px ;
        .el-dialog__close{
          font-size:24px;
          font-weight: bold;
        }
        .el-dialog__title{
          background-color: #61bafe;
          color: #fff;
          padding:10px 16px;
        }
      }
      .el-dialog__body{
        padding-top:30px;
        .el-table td, .el-table th.is-leaf{
          border-bottom: none;
        }
        .el-table{
          &::before{height:0}
          .cell{
            padding-right: 0;
            .el-form-item{
              margin-bottom:0
            }
            .el-select{
              width:64%;
              .el-input{
                width:100%;
              }
            }
            .el-input{
              width:73%;
            }
          }
        }
      }
      .el-form-item__label{
        line-height: 30px;
      }
      .el-form-item__content{
        line-height: 30px;
        .el-input__inner{
          height:30px;
          line-height: 30px;
        }
        .el-checkbox__label{
         padding-left: 0;
        }
      }
      .el-input__icon{
        line-height: 30px;
      }
      .footer-btn{
        text-align: center;
        padding-top:30px;
        .el-button{
          padding:12px 30px;
        }
        .btn-second{margin-left:30px;}
      }
    }
  }
</style>
