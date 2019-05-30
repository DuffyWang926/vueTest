<template>
  <el-dialog title="员工详情" class="sm-dialog seeStaffDialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false" >
    <div style="width:52%">
      <el-row :gutter="2" >
        <el-col :span="7">员工编号：</el-col>
        <el-col :span="9">
          <span>{{glybh}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="7">账号：</el-col>
        <el-col :span="9">
          <span>{{dlmc}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="7">管理车场：</el-col>
        <el-col :span="9">
          <span>{{glcc}}个</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="7">管理泊位：</el-col>
        <el-col :span="9">
          <span>{{glcw}}个</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="24" style="font-size: 16px; color: #333; font-weight: bold ">所属运营公司：{{gsmc}}</el-col>
      </el-row>
      <el-row :gutter="2" style="padding-top:20px;">
        <el-col :span="7">性别：</el-col>
        <el-col :span="9">
          <span>{{sex|sex}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="7">年龄：</el-col>
        <el-col :span="9">
          <span>{{age}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="2" >
        <el-col :span="7">手机号：</el-col>
        <el-col :span="9">
          <span>{{sjh}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-right" style="width:48%; position: absolute; right:0; top:90px;">
      <el-row :gutter="2" >
        <el-col :span="12">所管辖停车场和泊位：</el-col>
      </el-row>
      <!--<span style="margin-left: 20px; margin-top:11px;">所管辖停车场和泊位：</span>-->
      <div class="staff-info">
        <el-tree
          :data="data"
          :props="defaultProps"
          style="padding-top: 20px;">
        </el-tree>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {fetchStaffInfo, fetchStaffCCCWTree} from '@/api/StaffManage/Staff'

  export default {
    name: "SeeStaffDialog",
    props:{
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
        appendToBody:true,
        glybh:'',
        dlmc:'',
        glcc:'',
        glcw:'',
        sex:'',
        age:'',
        sjh:'',
        gsmc:'',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    created(){
      this.getStaffInfo(this.msg.id)
      this.getStaffCCCW(this.msg.id)
    },
    methods:{
      getStaffInfo(id){
        fetchStaffInfo(id).then(response => {
          this.glybh = response.result.glybh;
          this.glcc = this.msg.glcc;
          this.dlmc = response.result.dlmc;
          this.glcw = this.msg.glcw;
          this.zsmc = response.result.zsmc;
          this.sex = response.result.sex;
          this.age = response.result.age;
          this.sjh = response.result.sjh;
          this.gsmc = response.result.gsmc
        }).catch((err) => {
          console.log(err)
        })
      },
      getStaffCCCW(id){
        fetchStaffCCCWTree(id).then(response => {
          this.data = response.result

        }).catch((err) => {
          console.log(err)
        })
      },

      //关闭弹窗
      cancelModal(){
        this.$emit('update:visible', false);
      }
    }
  }
</script>

<style lang="less">
  .seeStaffDialog{
    .el-row {
      padding: 12px 0 !important;
      margin: 0 !important;
      .el-col {
        padding-left: 0 !important;
      }
    }
    .staff-info{
      overflow-y : scroll;
      height:400px;
    }
    .staff-info::-webkit-scrollbar{
      display: none;
    }
  }

</style>
