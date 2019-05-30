<template>
  <el-dialog title="车位设备绑定" class="sm-dialog bindParkingEquipment" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="dataForm" name="dataForm" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <div style="width: 50%">
          <ValidationProvider rules="required" name="请选择车场">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="请选择车场">
            <el-select
              v-model="listQueryCWBH.parameter.ccmc"
              filterable
              remote
              default-first-option
              :remote-method="remoteMethodCCMC"
              :loading="loading"
              @change="handleCCIDChange"
              placeholder="请输入停车场名称">
              <el-option
                v-for="item in OptionsCCMC"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </ValidationProvider>
        </div>
        <div class="dialog-right" style="width:50%; position: absolute; right:0; top:90px;">
          <el-button type="primary" @click="resetFilter" style="padding: 8px 26px">重置</el-button>
        </div>
        <el-row :gutter="2">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            :titles="['待分配泊位', '已分配泊位']"
            target-order="push"
            :data="generateData()">
          </el-transfer>
        </el-row>
        <div class="footer-btn">
          <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
          <el-button type="primary" plain class="btn-second"  @click="cancelModal">取消</el-button>
        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { fetchParkingEquipmentInfo, fetchParkingEquipmentCWBH, AddSaveCWData, fetchParkingEquipmentCCCW, fetchParkingGarageIdBySbid } from "@/api/Resources/ParkingEquipment";
  import { fetchParkingGarageNamelist } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "BindCWParkingEquipmentDialog",
    components: {
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
        value: [],
        appendToBody: true,
        labelposition:'left',
        loading:false,
        listQueryCWBH:{
          parameter:{
            ccmc:''
          }
        },
        OptionsCCMC:[],
        listQueryCWBHSave:{
          parameter:{
            sbzjid:'',
            pdsgarageVo:[{
              ccid:'',
              cwbh:[]
            }]
          }
        },
        generateData:function(){}
      }
    },
    created(){
      this.handleSelectCCMC()
      this.getParkingGarageIdBySbid(this.msg.id)
    },
    methods:{
      getParkingEquipmentCWBH(sbzjid,id){
        fetchParkingEquipmentCWBH(sbzjid, id).then(response => {
          //左侧数据
          this.generateData = function(){
            const data = [];
            for (let i = 0; i < response.result.length; i++) {
              data.push({
                key: response.result[i].id,
                label: response.result[i].cwbh,
              });
            }
            return data;
          };
          //右侧数据   如果已绑定sfbd 为1 否则为null 判断如果sfbd=1右侧value值添加id
          for (let i = 0; i < response.result.length; i++){
            if(response.result[i].sfbd === 1){
              this.value.push(response.result[i].id)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //如果设备已绑定车位，页面打开默认显示数据
      getParkingGarageIdBySbid(id){
        fetchParkingGarageIdBySbid(id).then(response => {
          if(response.result !== null){
            this.listQueryCWBH.parameter.ccmc = response.result.ccid;
            this.getParkingEquipmentCWBH(this.msg.id, this.listQueryCWBH.parameter.ccmc);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //停车场名称
      handleSelectCCMC(){
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        fetchParkingGarageNamelist(sysUser.gsid, this.listQueryCWBH.parameter.ccmc).then(response => {
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
      remoteMethodCCMC(query) {
        this.listQueryCWBH.parameter.ccmc = query;
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        if (query !== '') {
          this.handleSelectCCMC(sysUser.gsid, this.listQueryCWBH.parameter.ccmc);
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
      resetFilter(){
        this.listQueryCWBH.parameter.ccmc = '';
        this.OptionsCCMC = [];
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        this.handleSelectCCMC(sysUser.gsid, this.listQueryCWBH.parameter.ccmc);
      },
      //根据车场id查询车位
      handleCCIDChange() {
        this.value=[];
        if(this.listQueryCWBH.parameter.ccmc){
          this.getParkingEquipmentCWBH(this.msg.id, this.listQueryCWBH.parameter.ccmc);
        }
      },
      saveData(){
        this.listQueryCWBHSave.parameter.sbzjid=this.msg.id;
        this.listQueryCWBHSave.parameter.pdsgarageVo[0].ccid = this.listQueryCWBH.parameter.ccmc;
        this.listQueryCWBHSave.parameter.pdsgarageVo[0].cwbh = this.value;

        AddSaveCWData(this.listQueryCWBHSave).then(response => {
          if(response.code === 0 ){
            this.$message({
              message:  response.message,
              type:'success'
            });
            this.$parent.getList();
            this.cancelModal()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //  关闭弹框
      cancelModal() {
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style lang="less">
  .bindParkingEquipment{
    .el-row{
      .el-transfer-panel{
        width:300px;
        .el-transfer-panel__filter{
          .el-transfer-panel__header{
            .el-checkbox__input{
              display:none !important
            }
          }
          .el-input__icon{
            margin-left:15px;
          }
        }
      }
    }
  }

</style>
