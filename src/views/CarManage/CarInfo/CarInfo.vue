<template>
  <div class="carinfo-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.rzzt" placeholder="请选择车辆认证状态">
            <el-option
              v-for="item in OptionsRZZT"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.cpys" placeholder="请选择车牌颜色">
            <el-option
              v-for="item in OptionsCPYS"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="listQuery.parameter.hphm"
            filterable
            remote
            default-first-option
            :remote-method="remoteMethod"
            :loading="loading"
            placeholder="请输入车牌号码">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-card">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="number"
          label="#"
          width="50"
          type="index">
        </el-table-column>
        <el-table-column
          prop="hphm"
          label="车牌号码">
        </el-table-column>
        <el-table-column
          prop="cpys"
          label="车牌颜色">
          <template slot-scope="scope">
            <span>{{scope.row.cpys|cpys}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="clzl"
          label="车辆类型">
          <template slot-scope="scope">
            <span>{{scope.row.clzl|clzl}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dlmc"
          label="绑定会员账号">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openHYDialog(scope.row)">{{scope.row['dlmc']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="rzzt"
          label="认证状态">
          <template slot-scope="scope">
            <span>{{scope.row.rzzt|rzzt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cjsj"
          label="添加时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDialog(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page="listQuery.current"
        :page-size="listQuery.size"
        @current-change="currentChange">
      </el-pagination>
    </div>
    <SeeCarInfoDialog v-if="SeeCarInfoDialogVisible" :visible.sync="SeeCarInfoDialogVisible" :msg="msgSee"></SeeCarInfoDialog>
    <DialogueCheckCar :msg='personalMsg' :isPersonal='true' @cancelModal='cancelCheckModal'></DialogueCheckCar>
  </div>
</template>

<script>
    import { fetchCarInfoList } from '@/api/CarManage/CarInfo'
    import SeeCarInfoDialog from "./CarInfoDialog/SeeCarInfoDialog";
    import  EnumberateSelect  from '@/filters/index'
    import { fetchHPHMlist } from '@/api/CommonSelectApi'
    import DialogueCheckCar from "../../../components/DetailsDialogue/DialogueCheckCar";

    export default {
      name: "CarInfo",
      components: {DialogueCheckCar, SeeCarInfoDialog},
      data(){
        return{
          listQuery:{
            parameter:{
              rzzt:'',
              cpys:'',
              hphm:''
            },
            current:1,
            size:10
          },
          tableData:[],
          total:0,
          SeeCarInfoDialogVisible:false,
          DialogueCheckCarVisible:false,
          OptionsRZZT:EnumberateSelect.RZZT,
          OptionsCPYS:EnumberateSelect.CPYS,
          Options:[],
          loading: false,
          personalMsg:{
            visible:false,
            title:'会员详情',
            isPersonal:true
          }
        }
      },
      created(){
        this.getList();
        this.handleSelect()
      },
      activated(){
        this.reset()
      },
      methods:{
        getList() {
          fetchCarInfoList(this.listQuery).then(response => {
            this.tableData = response.result.records;
            this.total = response.result.total;
            if(response.result.records.length === 0 && response.result.current >= 2){
              this.listQuery.current = response.result.current-1;
              this.getList()
            }else if(response.result.records.length === 0 && response.result.current < 2) {
              this.listQuery.current = 1;
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        currentChange(val){
          this.listQuery.current = val;
          this.getList();
        },
        //号牌号码下拉框
        handleSelect(){
          fetchHPHMlist(this.listQuery.parameter.hphm).then(response => {
            for (let i = 0; i < response.result.length; i++) {
              this.Options.push({
                label: response.result[i].label,//此处是展示内容
                value: Number(response.result[i].key) //此处是后台需要的值
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        handleFilter(){
          this.listQuery.current = 1;
          this.getList()
        },
        reset(){
          this.listQuery.parameter.rzzt = '';
          this.listQuery.parameter.cpys = '';
          this.listQuery.parameter.hphm = '';
          this.listQuery.current = 1;
          this.getList();
        },
        resetFilter(){
          this.reset();
          this.Options = [];
          this.handleSelect(this.listQuery.parameter.hphm);
        },
        openHYDialog (data) {
          this.personalMsg.visible =  true;
          let id = data.yhid;
          this.$store.dispatch('detailsDataAll/changeDetailId',{id})
          //弹窗数据
        },
        cancelCheckModal(){
          this.personalMsg.visible = false;
        },
        openDialog(row){
          this.SeeCarInfoDialogVisible = true;
          this.msgSee = row;
        },
        //号牌号码模糊查询
        remoteMethod(query) {
          this.listQuery.parameter.hphm = query;
          if (query !== '') {
            this.handleSelect(this.listQuery.parameter.hphm);
            this.Options = [];
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.Options = this.Options.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.Options = [];
          }
        }

      }
    }
</script>

<style scoped>

</style>
