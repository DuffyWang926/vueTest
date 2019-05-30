
<template>
   <el-dialog :title="title" class="lg-dialog" v-if="visible" :visible.sync="visible" :append-to-body='true' :before-close="cancelModal" >
     
      <div class="content-card">
        <el-col :span='24'>
          <el-table
            v-loading="loading"
            :data="bindData.records"
            style="width: 100%">
            
            <el-table-column
              v-for="(v,i) in bindList"
              :key="i"
              :prop="v.prop"
              :label="v.label"
              :width="v.width">
            </el-table-column>
            
            <el-table-column
              prop=""
              label="操作"
              >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="unbindAccount(scope.row)">解绑</el-button>
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
        </el-col>
        <!-- <el-col :span='6'>
          <div class="tip">
            {{msgTxt}}
 
          </div>
        </el-col> -->
        
      </div>
      
  </el-dialog>
</template>
<script>
// bind car 弹窗

  export default {
    name: 'DialogueBindCar',
    props:['title','visible'],
    components:{  },
    data() {
      return {
        bindDataVisible:false,
        bindList:[
          {
            prop:'webIndex',
            label:'#',
            width:'200',
          },
          {
            prop:'hphm',
            label:'车牌号码',
            width:'200'
          },
          {
            prop:'cpys',
            label:'车牌颜色',
            width:'200'
          },
          {
            prop:'wwcdd',
            label:'未完成订单',
            width:'200'
          },
          {
            prop:'qfje',
            label:'未支付金额',
            width:'200'
          }
        ],
        msgTxt:""
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
        let current = val
        this.$store.dispatch('vipMaintain/findUserMemberToUnbindPageList',{current})
      },

      // click of bind 
      bindClick(){
        this.bindDataVisible = true;
      },
      // bind form dialogue
      cancelBindModal(){
        this.bindDataVisible = false;

      },
      confirmBindModal(){
        this.bindDataVisible = false;
        this.$store.dispatch('vipMaintain/postBindCar')

      },
      //unbind Post
      unbindAccount(data){
        this.$store.dispatch('vipMaintain/unbindUserMemberCarPost',data)

      }

    },
    computed:{
      bindData(){
        
        return this.$store.state.vipMaintain.personalVip.bindData
      },
      listTotal(){
        return this.$store.state.vipMaintain.personalVip.bindData.total 
      },
      pageSize(){
        return this.$store.state.vipMaintain.personalVip.bindListQuery.size 
      },
      currentPage(){
        return this.$store.state.vipMaintain.personalVip.bindListQuery.current 
      },
      loading(){
        return this.$store.state.vipMaintain.personalVip.bindDataLoading;
      },
      

    }
    
  }
</script>
<style lang='less'>
  .floatRight{
    float:right;
    margin-left:20px;
  }
  .tip{
    background: yellow;
    padding:20px;
    font-size: 16px;
    width:150px;
    margin: 20px 0 0 0;
    
  }

</style>