<template>
  <el-dialog :title="dialogTitle()" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <ValidationObserver ref="observer">
      <el-form ref="form" :label-position="labelposition" slot-scope="{ validate }" label-width="120px">
        <div style="width:52%">
          <ValidationProvider :rules=cwbhRules name="停车位编号">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车位编号">
              <el-input v-model="listQuery.parameter.cwbh" clearable :disabled="isCWBHShow"></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="停车场名称">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="停车场名称">
              <el-select
                v-model="ccmc"
                filterable
                remote
                reserve-keyword
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
          <div style="border-bottom: 1px solid #dfdfdf; margin-bottom:15px;width:100%"></div>
          <ValidationProvider rules="required" name="尺寸标准">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="尺寸标准">
              <el-select v-model="listQuery.parameter.ccsx" placeholder="请选择">
                <el-option
                  v-for="item in OptionsCCSX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="排列方式">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="排列方式">
              <el-select v-model="listQuery.parameter.plfs" placeholder="请选择">
                <el-option
                  v-for="item in OptionsPLFS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>

          <ValidationProvider rules="required" name="经营类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="经营类型">
              <el-select v-model="listQuery.parameter.jylx">
                <el-option
                  v-for="item in OptionsJYLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:100%"></div>
          <ValidationProvider rules="" name="收费标准">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="收费标准">
              <el-select
                v-model="sfbz"
                multiple
                placeholder="请选择收费标准">
                <el-option
                  v-for="item in OptionsSFBZ"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
        </div>
        <div class="dialog-right" style="width:48%; position: absolute; right:0; top:138px;">
          <ValidationProvider rules="required" name="启用状态">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="启用状态">
              <el-radio v-model="listQuery.parameter.sfqy" label="1">启用</el-radio>
              <el-radio v-model="listQuery.parameter.sfqy" label="0">禁用</el-radio>
            </el-form-item>
          </ValidationProvider>
          <div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>
          <ValidationProvider rules="required" name="管理模式">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="管理模式">
              <el-select v-model="listQuery.parameter.sjly" placeholder="请选择">
                <el-option
                  v-for="item in OptionsSJLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="位置类型">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="位置类型">
              <el-select v-model="listQuery.parameter.wzlx" placeholder="请选择">
                <el-option
                  v-for="item in OptionsWZLX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <!--<div style="border-bottom: 1px solid #dedede; margin-bottom:15px;width:80%"></div>-->
        </div>
        <div class="footer-btn">
          <el-button type="primary" @click="validate().then(saveData)">确定</el-button>
          <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
        </div>
      </el-form>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { fetchRoadInParkingSpaceInfo, AddSaveData, UpdateSaveData } from "@/api/Resources/RoadInParkingSpace";
  import { fetchParkingGarageNamelist, fetchSFZZlist } from '@/api/CommonSelectApi'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import  EnumberateSelect  from '@/filters/index'

  export default {
    name: "CommonRoadInParkingSpaceDialog",
    components: {
      ValidationObserver,
      ValidationProvider
    },
    props:{
      visible: {
        type: Boolean,
        default: false
      },
      msg: {
        type: Object,
        default:function(){
          return {};
        }
      }
    },
    data() {
      return {
        appendToBody: true,
        labelposition:'left',
        loading:false,
        OptionsCCMC:[],
        OptionsPLFS:EnumberateSelect.PLFS,
        OptionsCCSX:EnumberateSelect.CCSX,
        OptionsJYLX:EnumberateSelect.JYLX,
        OptionsWZLX:EnumberateSelect.WZLX,
        OptionsSJLX:EnumberateSelect.SJLX,
        OptionsSFBZ:[],
        sfbz:[],
        isCWBHShow:false,
        cwbhRules: {
          required:true,
          regex:/^[a-zA-Z0-9_-——·]+$/,
          max:40
        },
        ccmc:'',
        listQuery:{
          parameter:{
            cwbh:'',
            ccmc:'',
            ccsx:'',
            plfs:'',
            jylx:'',
            sfbz:[],
            sfqy:'1',
            sjly:'',
            wzlx:'',
            id:'',
            yygsid:''
          }
        }
      }
    },
    created() {
      // 获取数据默认信息
      if(this.msg.type === 1) this.getRoadInParkingSpaceInfo(this.msg.Data.id, this.msg.Data.ccmc);
      this.handleSelectCCMC();
      this.handleSelectSFBZ()
    },
    methods: {
      //获取详情
      getRoadInParkingSpaceInfo(id, ccmc){
        fetchRoadInParkingSpaceInfo(id, ccmc).then(response => {
          this.listQuery.parameter.cwbh = response.result.cwbh;
          this.listQuery.parameter.ccsx = response.result.ccsx;
          this.listQuery.parameter.plfs = response.result.plfs;
          this.listQuery.parameter.jylx = response.result.jylx;
          this.listQuery.parameter.sfqy = String(response.result.sfqy);
          this.listQuery.parameter.sjly = response.result.sjly;
          this.listQuery.parameter.wzlx = response.result.wzlx;
          this.ccmc = response.result.ccmc;
          if(response.result.sfbz != null){
            this.sfbz = response.result.sfbz;
          }
        }).catch((err) => {
          console.log(err)
        })
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
      //收费标准
      handleSelectSFBZ(){
        fetchSFZZlist().then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsSFBZ.push({
              label: response.result[i].djmc,//此处是展示内容
              value: Number(response.result[i].id) //此处是后台需要的值
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleChange(){
      },
      // 确定按钮
      saveData() {
        this.listQuery.parameter.cwbh = this.listQuery.parameter.cwbh.trim();
        this.listQuery.parameter.sfbz = this.sfbz;
        this.listQuery.parameter.ccmc = this.ccmc;
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        this.listQuery.parameter.yygsid = sysUser.gsid;
        //如果停车场手动输入汉字前端校验
         if(this.msg.type === 0){
           AddSaveData(this.listQuery).then(response => {
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
         }else if(this.msg.type === 1){
           this.listQuery.parameter.ccmc = this.ccmc;
           this.listQuery.parameter.id = this.msg.Data.id;
           this.listQuery.parameter.sfbz = this.sfbz;
           UpdateSaveData(this.listQuery).then(response => {
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
         }else{
           this.cancelModal()
         }
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
      //修改标题
      dialogTitle() {
        let dialogTitle1 = "";
        if (this.msg.type === 0) {
          dialogTitle1 = "停车位新增";
        } else if (this.msg.type === 1) {
          dialogTitle1 = "停车位修改";
          this.isCWBHShow = true
        }
        return dialogTitle1;
      },
      //  关闭弹框
      cancelModal() {
        this.$emit("update:visible", false);
      }
    }
  };
</script>

<style lang="less">

</style>
