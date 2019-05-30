
<template>
   <el-dialog :title="msg.title" class="lg-dialog" v-if="visible" :visible.sync="visible" :msg="msg" :append-to-body='true' :before-close="cancelModal" >
     <el-row>
       <!-- <el-button @click='bindClick' class='floatRight'>
         批量绑定
       </el-button> -->
       <el-button @click='bindCarClick' class='floatRight'>
         绑定
       </el-button>
     </el-row>
      <div class="content-card">
        <el-table
          v-loading="loading"
          :data="msg.data.records"
          style="width: 100%">
          
          <el-table-column
            prop="webIndex"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="hphm"
            label="车牌号码"
            >
          </el-table-column>
          <el-table-column
            prop="cpys"
            label="车辆颜色"
            >
          </el-table-column>
          <el-table-column
            prop="clzl"
            label="车辆类型"
            >
          </el-table-column>
          <el-table-column
            prop="yhxm"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="sjh"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="wwcdd"
            label="未完成订单">
          </el-table-column>
          <el-table-column
            prop="qfje"
            label="欠费金额">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="bindClick(scope.row)">解绑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="listTotal"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change='currentChange'
          
          >
        </el-pagination>
      </div>
    <SingleDialogueInput :msg='bindFormData' :visible='bindDataVisible' @cancelModal='cancelBindModal'  @confirmModal='confirmBindModal'></SingleDialogueInput>
      

      
  </el-dialog>
</template>
<script>
// bind car 弹窗
import SingleDialogueInput from '@/components/SingleDialogueInput'
 
  export default {
    name: 'DialogueBindCar',
    props:['msg','visible'],
    components:{SingleDialogueInput    },
    data() {
      return {
        bindDataVisible:false
      };
    },
    methods: {
      cancelModal(){
        this.$emit('cancelModal',false)
      },
      confirmModal(){
        this.$emit('confirmModal',false)
        
      },
      //分页器
      currentChange(val){
        this.$store.dispatch('vipMaintain/setBindQuery',{ current:val})
        this.$store.dispatch('vipMaintain/bindCompanyData')
      }, 
      

      // click of bind 
      bindCarClick(){
        this.bindDataVisible = true;
      },
      bindClick(data){
        this.$store.dispatch('vipMaintain/unbindUserMemberCarCompany',data)
      },
      // bind form dialogue
      cancelBindModal(){
        this.bindDataVisible = false;

      },
      confirmBindModal(){
        this.bindDataVisible = false;
        this.$store.dispatch('vipMaintain/postBindCar')

      }

    },
    computed:{
      listTotal(){
        return this.$store.state.vipMaintain.companyVip.bindData.data.total 
      },
      pageSize(){
        return this.$store.state.vipMaintain.companyVip.bindData.data.size || 10
      },
      currentPage(){
        return this.$store.state.vipMaintain.companyVip.bindData.data.current || 1
      },
      bindFormData(){
        return this.$store.state.vipMaintain.companyVip.bindFormData || null
      },
      loading(){
        let loading = this.$store.state.vipMaintain.companyVip.bindDataLoading;
        return loading
      },
    }
    
  }
</script>
<style lang='less'>
  .floatRight{
    float:right;
    margin-left:20px;
  }

</style>