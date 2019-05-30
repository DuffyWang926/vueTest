<template>
  <el-dialog title="分配停车场" class="sm-dialog dia" :visible.sync="visible" :idVal="idVal" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
    <div class="radioBox">
      <el-radio-group v-model="radioPark" @change="changePark">
        <el-radio :label='1' :disabled='isStaffPage'>全部</el-radio>
        <br/>
        <el-radio :label="0">部分</el-radio>
      </el-radio-group>
      <span class="radiotip">注：指运营公司所属的全部车场</span>
    </div>
      <div class="btn">
        <el-button :class="{btnActived: activeBtn == 1}" @click="switchBtn(1)" type='primary' :disabled='radioPark == 1'>添加停车场</el-button>
        <el-button :class="{btnActived: activeBtn == 2}" @click="switchBtn(2)" type='primary' :disabled='radioPark == 1'>添加泊位</el-button>
      </div>
      <ValidationObserver ref="observer">
        <el-form ref="dataForm" slot-scope="{ validate }" name="dataForm" label-width="120px">
          <el-row :gutter="20" v-if='radioPark == 0'>
            <el-col :span="8" >
              <el-select
                v-model="listQuery.parameter.ccmc"
                filterable
                remote
                default-first-option
                :remote-method="remoteMethodCCMC"
                :loading="loading"
                :disabled='radioPark == 1'
                @change="handleCCIDChange(false)"
                placeholder="请输入停车场名称">
                <el-option
                  v-for="item in OptionsCCMC"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row :gutter="2" class="rowTree">
            <tree-transfer
              :title="['待分配车场和泊位', '已分配车场和泊位']"
              :from_data='fromData'
              :to_data='toData'
              :defaultProps="{label:'label'}"
              :mode='mode'
              @addBtn='add'
              @removeBtn='remove'
              check-on-click-node
              height='480px'
              :filter='isSearch'
              :transferOpenNode='false'
              openAll >
            </tree-transfer>
          </el-row>
          <ValidationProvider rules="required" name="系统操作员密码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" label="系统操作员密码">
              <el-input type="password" auto-complete="new-password" v-model="password" clearable></el-input>
            </el-form-item>
          </ValidationProvider>
          <div class="footer-btn">
            <el-button type="primary" @click="validate().then(saveData())">确定</el-button>
            <el-button type="primary" plain class="btn-second" @click="cancelModal">取消</el-button>
          </div>
          <!--<el-row class="pwd">-->
              <!--<span>操作员密码：</span>-->
              <!--<el-input type="password" v-model="password"></el-input>-->
          <!--</el-row>-->
        </el-form>
      </ValidationObserver>
  </el-dialog>
</template>

<script>
  import { fetchParkingGarageNamelist, checkXTPassword } from '@/api/CommonSelectApi'
  import { AddSaveCWData, fetchStaffCCCWList, fetchStaffCCCWTree } from "@/api/StaffManage/Staff";
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import treeTransfer from 'el-tree-transfer' // 引入
  export default {
    name: "AssignStaffDialog",
    components:{ treeTransfer, ValidationObserver, ValidationProvider },// 注册
    props:{
      visible: {
        type: Boolean,
        default: false
      },
      idVal: {
        type: Number,
        default: -1
      },
      isStaffPage: {
        type: Boolean,
        default: false
      }
    },

    data(){
      return{
        radioPark: this.isStaffPage ? 0 : 1,
        isSearch: false,
        appendToBody:true,
        labelposition:'left',
        loading:false,
        listQuery:{
          parameter:{
            ccmc:''
          }
        },
        listQueryCWBHSave:{
          parameter:{
            glyid:'',
            pdaUserGarageVo:[]
          }
        },
        OptionsCCMC:[],
        formDataResult:[],
        formCopy: [],
        mode: "transfer",
        fromData:[],
        toData:[],
        toDataCopy: [],
        activeBtn: this.isStaffPage ? 1 : 0,
        switchResult: {},
        password: ''
      }
    },
    created(){
      let isStaffPage = this.isStaffPage
      console.log('staff')
      console.log(isStaffPage)
      let park = this.radioPark
      if (park == 1) {
        this.handleAll()
      } else {
        this.handleSelectCCMC();
        this.getStaffCCCW(this.idVal)
      }
    },
    methods:{
      changePark(value) {
        console.log(value)
        console.log(this.radioPark)
        this.listQuery.parameter.ccmc = ''
        if (value == 1) {
          this.activeBtn = 0
          this.handleAll()
        } else {
          this.activeBtn = 1
          this.toData = []
          this.getStaffCCCW(this.idVal)
        }
      },

      //停车场名称
      handleSelectCCMC(isAll = false){
        console.log('初始化')
        console.log(this.listQuery.parameter.ccmc)
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        let ccmc
        if (this.radioPark == 1) {
          ccmc = ''
        } else {
          ccmc = this.listQuery.parameter.ccmc
        }
        fetchParkingGarageNamelist(sysUser.gsid, ccmc).then(response => {
          for (let i = 0; i < response.result.length; i++) {
            this.OptionsCCMC.push({
              label: response.result[i].label,//此处是展示内容
              value: Number(response.result[i].key) //此处是后台需要的值
            });
          }
          if (isAll) {
            this.formDataResult = [];
            console.log('all')
            let option = this.OptionsCCMC
            console.log(option)
            let lgh = option.length
            option.forEach(item => {
              this.listQuery.parameter.ccmc = item.value
              this.handleCCIDChange(true, lgh)
            })
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      remoteMethodCCMC(query) {
        // console.log('搜索')
        this.listQuery.parameter.ccmc = query;
        let sysUser = JSON.parse(localStorage.getItem("sysUser"));
        if (query !== '') {
          this.handleSelectCCMC();
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
      getParkingEquipmentCWBH(glyid, ccid, isAll, lgh){
        fetchStaffCCCWList(glyid, ccid).then(response => {
          console.log('获取车位数据')
          console.log(response)
          let _result = response.result
          let copyResult = JSON.parse(JSON.stringify(_result))
          this.switchResult = copyResult
          let acBtn = this.activeBtn
          console.log('actbn=='+acBtn)
          if (!isAll && acBtn == 1) {
            let copyArr = this.formCopy
            let lgh = copyArr.length
            if (lgh == 0) {
              this.formCopy.push(copyResult)
            } else {
              let j = 0;
              for (let i = 0; i < lgh; i++) {
                if (copyArr[i].id == copyResult.id) {
                  j = -1
                  break;
                } else {
                  j++
                }
              }
              console.log('j == ' + j)
              if (j == 0 || j == lgh) {
                this.formCopy.push(copyResult)
              }
            }
            _result.children = []
          }
          console.log('formCopy')
          console.log(this.formCopy)
          this.formDataResult.push(_result);
          if (isAll) {
            this.toDataCopy = this.formDataResult
          } else {
            this.fromData = this.formDataResult
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //根据管理员车场id查询车位
      handleCCIDChange(isAll = false, lgh = 0) {
        // console.log('选择车场')
        // console.log(this.listQuery.parameter.ccmc)
        if(this.listQuery.parameter.ccmc){
          if (this.radioPark  == 0) {
            this.formDataResult = [];
          }
          this.getParkingEquipmentCWBH(this.idVal, this.listQuery.parameter.ccmc, isAll, lgh)
        }
      },
      handleAll () {
        let isAll = true
        this.OptionsCCMC = []
        this.fromData = []
        this.toData = []
        this.handleSelectCCMC(isAll)

      },
      //穿梭框保存数据
      saveData(){
        // console.log('todata')
        // console.log('formCopy')
        // console.log(this.formCopy)
        let radioPark = this.radioPark
        let toData
        if (radioPark == 1) {
          toData = this.toDataCopy
        } else {
          let acBtn = this.activeBtn
          toData = this.toData
          if (toData.length == 0) {
            this.$message.error('请选择车场或泊位')
            return
          }
          // if (acBtn == 1) {
            let formCopy = this.formCopy
            let deepCopy = JSON.parse(JSON.stringify(formCopy))
            let lgh = deepCopy.length
            toData.forEach((item, index, arr) => {
              for(var i = 0; i < lgh; i++) {
                if (item.id == deepCopy[i].id) {
                  arr[index] = deepCopy[i]
                }
              }
            })
          // }
        }
        console.log(toData)

        this.listQueryCWBHSave.parameter.glyid=this.idVal;
        this.listQueryCWBHSave.parameter.pdaUserGarageVo = []
        for ( let i = 0; i < toData.length; i++) {
          this.listQueryCWBHSave.parameter.pdaUserGarageVo.push({
            ccid: toData[i].id,
            pdaUserSpaceVos: []
          })
          if(toData[i].children){
            for ( let k=0; k < toData[i].children.length; k++){
              this.listQueryCWBHSave.parameter.pdaUserGarageVo[i].pdaUserSpaceVos.push({
                cwid: toData[i].children[k].id
              })
            }
          }
        }
        // console.log('请求参数')
        // console.log(this.password)
        // console.log(this.listQueryCWBHSave)
        // console.log(JSON.stringify(this.listQueryCWBHSave))
        let pwd = this.password
        if (pwd == '') {
          this.$message.error('请输入操作员密码')
          return
        }
        checkXTPassword(pwd).then(res =>{
          console.log(res)
          if (res.code == 0) {
            AddSaveCWData(this.listQueryCWBHSave).then(response => {
              if(response.code === 0 ){
                this.$message({
                  message:  response.message,
                  type:'success'
                });
                this.cancelModal();
                this.$parent.getList()
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })

      },
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // console.log('穿梭')
        // console.log(fromData)
        // console.log(toData)
        // console.log(obj)
        // console.log('formCopy')
        // console.log(this.formCopy)
        let activeBtn = this.activeBtn
        let formCopy = this.formCopy
        let deepCopy = JSON.parse(JSON.stringify(formCopy))
        let lgh = deepCopy.length
        let toLgh = toData.length
        let isStop = false
        for (let i = 0; i < lgh; i++) {
          for (let j = 0; j < toLgh; j++) {
            if (deepCopy[i].id == toData[j].id) {
              if (activeBtn == 1) {
                deepCopy[i].children = []
                toData[j] = deepCopy[i]
                isStop = true
                break
              } else {
                // activeBtn == 2
                // deepCopy[i].children = []
                // toData[j] = deepCopy[i]

              }
            }
          }
          if (isStop) {
            break
          }
        }

        console.log('后todata')
        console.log(toData)
        console.log(this.formCopy)
        this.toData = toData
      },
      remove(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        this.toData = toData
      },
      //获取已绑定车场车位
      getStaffCCCW(id){
        fetchStaffCCCWTree(id).then(response => {
          console.log('获取已绑定车场车位')
          console.log(response)
          this.toData = response.result
        }).catch((err) => {
          console.log(err)
        })
      },
      //关闭弹窗
      cancelModal(){
        this.$emit('update:visible', false);
      },
      switchBtn(value) {
        console.log(value)
        console.log('切换按钮')
        let actBtn = this.activeBtn
        if (actBtn == value) {
          return
        }
        this.formCopy = []
        this.activeBtn = value
        this.fromData = []
        this.listQuery.parameter.ccmc = ''
      }
    }

  }
</script>

<style lang="less">
.dia {
    /*.pwd {*/
      /*span{*/
        /*display: inline-block;*/
      /*}*/
    /*}*/
    /*.el-dialog__header {*/
      /*padding-top: 10px;*/
    /*}*/
    .rowTree {
      height: 280px;
      .transfer {
        height: 100% !important;
      }
    }
    .el-input {
      width: auto;
    }
    /*.el-dialog__body {*/
      /*padding: 20px !important;*/
    /*}*/
    /*.el-dialog {*/
      /*width: 60%;*/
      /*height: auto;*/
    /*}*/
    .transfer-title {
      .el-checkbox__inner {
        display: none;
      }
    }
  .footer-btn {
    padding-top: 10px !important;
  }
  /*.btn, .radioBox {*/
    /*padding-left: 20px;*/
  /*}*/
  .btn {
    padding-bottom: 10px;
    .el-button {
      color: #606266;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #ccc;
      background: #fff;
    }
    .btnActived {
      color: #61bafe;
      border-bottom: 1px solid #61bafe;
    }
  }
  .el-row{
    padding:12px 0 !important;
    margin: 0 !important;
    .el-transfer-panel{
      width:300px;
    }
  }
  .el-radio {
    margin-bottom: 20px;
  }
  .radioBox {
    position: relative;
    .radiotip {
      position: absolute;
      left: 100px;
      top: -4px;
      color: #ccc;
    }
  }
}

</style>
