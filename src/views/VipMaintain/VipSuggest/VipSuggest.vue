<template>

    <div class="content-card page" >
        <el-row >
            <el-col :span="5">
                <InputSearch :content='accountCon' :list='companyCount' @inputDataSend='companyCountGet' ref='companyAccountChild'></InputSearch>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <el-date-picker
                    v-model="valueTime"
                    :default-time="['00:00:00', '23:59:59']"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                
            </el-col>
            
            <el-col :span="4" class='search rightFloat'>
            <el-button type="primary" @click="handleFilter">查询</el-button>
            <el-button type="primary" @click="resetFilter">重置</el-button>
            </el-col>
        </el-row>
        <div class="content-card ">
            <el-table
              v-loading="loadingSuggest"
              :data="vipSuggestData"
              style="width:100%"
              :cell-style="cellStyle"
              @cell-click="cellClick"
              >
                <el-table-column
                  :prop="v.prop"
                  :label="v.label"
                  :width="v.width"
                  v-for='(v,i) in carList'
                  :key='i + "carLsit"'
                  >
                </el-table-column>
                
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="paginationTotal"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change='currentChange'
                >
            </el-pagination>

        </div>
        <DialogueCheckCar  :msg='personalMsg' @cancelModal='cancelCheckModal'  ></DialogueCheckCar>
    </div>
    
    
</template>

<script>
import InputSearch from '@/components/InputSearch';
import DialogueCheckCar from '@/components/DetailsDialogue/DialogueCheckCar.vue'


    export default {
    name: 'vipSuggest',
    props:[],
    components:{ InputSearch, DialogueCheckCar   },
    data() {
      return {
          valueTime:[],
          accountCon:"请输入会员账号",
          carList:[
            
            {
                prop:'webIndex',
                label:'#',
                width:'150'
            },
            {
                prop:'hyzh',
                label:'会员账号',
                width:'300'
            },
            {
                prop:'cjsj',
                label:'提交时间',
                width:'300'
            },
            {
                prop:'fknr',
                label:'问题描述',
                width:'450'
            },
            
          ],
          personalMsg:{
            visible:false,
            title:'会员详情',
            isPersonal:true
          },
        
      };
    },
    created(){
        let yhlx = 0;
        this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{yhlx})
        //找回车辆数据
        this.$store.dispatch("vipMaintain/findmemberFeedbackPageData")
    },
    methods: {
        //参数设置
        companyCountGet(data){
            let dlmc = data
            this.$store.dispatch("vipMaintain/changeSuggestQuery",{dlmc})
            let hyzh =data
            this.$store.dispatch("searchListAll/findUserMemberAccountSelectList",{hyzh})

        },
        //查询 重置
        handleFilter(){
            let current = 1
            this.$store.dispatch("vipMaintain/findmemberFeedbackPageData",{current}) 

        },
        resetFilter(){
            this.$refs.companyAccountChild.resetCon();
            this.valueTime = ''
            let isClear = true;
            this.$store.dispatch("vipMaintain/changeSuggestQuery",{isClear})
            let current = 1
            this.$store.dispatch("vipMaintain/findmemberFeedbackPageData",{current})

        },
        
        //关闭modal
        canceDeallModal(){
            
        },
        currentChange(val){
            let current = val;
            this.$store.dispatch("vipMaintain/findmemberFeedbackPageData",{current})

        },
        //table style
        cellStyle(row){
            if(row.column.label == '会员账号' ){
                return 'color:blue;text-decoration:underline;cursor:pointer;'
            }

        },
        //单元格点击
        cellClick(row, column, cell, event){
            if(column.label == '会员账号'){
                 this.personalMsg.visible =  true;
                let id = row.id;
                this.$store.dispatch('detailsDataAll/changeDetailId',{id})

            }

        },
         cancelCheckModal(){
            this.personalMsg.visible = false;
        },


        
      
    },
    computed:{
      companyCount(){
        return this.$store.state.searchListAll.searchList.accountList;
      },
      loadingSuggest(){
          return this.$store.state.vipMaintain.vipSuggest.loadingSuggest;
      },
      vipSuggestData(){
          return this.$store.state.vipMaintain.vipSuggest.suggestData.records;
      },
      paginationTotal(){
          return this.$store.state.vipMaintain.vipSuggest.suggestData.total;
      },
      pageSize(){
          return this.$store.state.vipMaintain.vipSuggest.suggestQuery.size;
      },
      currentPage(){
          return this.$store.state.vipMaintain.vipSuggest.suggestQuery.current;
      }

      
    },
    watch:{
        valueTime(val){
            let data = Array.isArray(val) ? {
                kssj:val[0],
                jssj:val[1]

            } : null

            this.$store.dispatch("vipMaintain/changeSuggestQuery",data)

        }
    }
    
  }
</script>

<style lang="less" scoped>
    .page{
        padding:20px;
        box-sizing: border-box;
    }
    .contentTop{
        // padding-top:60px !important; 
        // padding-bottom:30px !important;
    }
</style>
