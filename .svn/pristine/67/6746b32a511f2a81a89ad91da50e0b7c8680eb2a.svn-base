<template>
  <div class="paymentrecord-page">
    <div class="content-card search">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="listQuery.parameter.tenantid" @change="handleSHIDSelect" filterable placeholder="请输入商户名称">
            <el-option
              v-for="item in Options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" style="padding-top: 10px">
          <span v-show="isShouqiShow" class="iconfont icon-zhankai" style="color:#777; font-size: 18px;" @click="iconShouqi"></span>
          <span v-show="isZhankaiShow" class="iconfont icon-shouqi" style="color:#777; font-size: 18px;" @click="iconZhankai"></span>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="sj"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-col>
        <el-col :span="4" style="text-align: right; float:right">
          <el-button type="primary" @click="handleFilter">查询</el-button>
          <el-button type="primary" @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
      <div v-show="isZhankaiShow">
        <el-row>
          <el-col :span="5">
            <el-select v-model="listQuery.parameter.ztlx" placeholder="请选择支付主体类型">
              <el-option
                v-for="item in OptionsZTLX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
          <el-input
            placeholder="请输入主体识别码"
            v-model="listQuery.parameter.ztsbm"
            clearable>
          </el-input>
          </el-col>
          <el-col :span="5">
          <el-select v-model="listQuery.parameter.zflx" placeholder="请选择支付类型">
            <el-option
              v-for="item in OptionsZFLX"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="listQuery.parameter.zffs" placeholder="请选择支付方式">
              <el-option
                v-for="item in OptionsZFFS"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="listQuery.parameter.zfqd" placeholder="请选择支付渠道">
              <el-option
                v-for="item in OptionsZFQD"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content-card">
      <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
            prop="number"
            label="#"
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            prop="ztlx"
            width="80"
            label="主体类型">
          <template slot-scope="scope">
            <span>{{scope.row.ztlx|ztlx}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="jlid"
            label="主体标识码"
            width="200">
        </el-table-column>
        <el-table-column
            prop="zflx"
            width="80"
            label="支付类型">
          <template slot-scope="scope">
            <span>{{scope.row.zflx|zflx}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zffs"
            label="支付方式">
          <template slot-scope="scope">
            <span>{{scope.row.zffs|zffs}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zfqd"
            label="支付渠道">
          <template slot-scope="scope">
            <span>{{scope.row.zfqd|zfqd}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zfddbh"
            label="关联方标识1"
            width="200">
        </el-table-column>
        <el-table-column
            prop="shddbh"
            label="关联方标识2"
            width="200">
        </el-table-column>
        <el-table-column
            prop="cjsj"
            width="170"
            label="申请时间">
          <template slot-scope="scope" v-if="scope.row.cjsj">
            <span>{{scope.row.cjsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zfsj"
            width="170"
            label="完成时间">
          <template slot-scope="scope" v-if="scope.row.zfsj">
            <span>{{scope.row.zfsj|time}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="zfje"
            label="支付金额">
          <template slot-scope="scope">
            <span>{{scope.row.zfje/100}}</span>
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
  </div>
</template>

<script>
    import { fetchPaymentRecordList } from '@/api/system/paymentRecord'
    import { fetchSHIDlist } from '@/api/CommonSelectApi'
    import  EnumberateSelect  from '@/filters/index'
  export default {
    name: "PaymentRecord",
    data () {
      return {
        listQuery:{
          parameter:{
            tenantid:'',
            ztlx: '',
            ztsbm: '',
            zflx: '',
            zffs: '',
            zfqd: '',
            kssj: '',
            jssj: ''
          },
          current:1,
          size:10
        },
        sj:'',
        tableData: [],
        Options: [],
        total: 0,
        isZhankaiShow:false,
        isShouqiShow:true,
        OptionsZTLX:EnumberateSelect.ZTLX,
        OptionsZFLX:EnumberateSelect.ZFLX,
        OptionsZFFS:EnumberateSelect.ZFFS,
        OptionsZFQD:EnumberateSelect.ZFQD,
      }
    },
    created(){
      this.getList();
      this.handleSelect()
    },
    methods:{
      getList(){
        fetchPaymentRecordList(this.listQuery).then(response => {
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
      iconShouqi(){
        this.isZhankaiShow = true;
        this.isShouqiShow = false
      },
      iconZhankai(){
        this.isZhankaiShow = false;
        this.isShouqiShow = true
      },
      //商户下拉框
      handleSelect(){
        fetchSHIDlist().then(response => {
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
      handleSHIDSelect(){
        this.tenantid = this.listQuery.parameter.tenantid;
      },
      handleFilter(){
        this.listQuery.parameter.kssj = this.sj[0]/1000;
        this.listQuery.parameter.jssj = this.sj[1]/1000;
        this.listQuery.current = 1;
        this.getList()
      },
      resetFilter(){
        this.listQuery.parameter.ztlx = '';
        this.listQuery.parameter.ztsbm = '';
        this.listQuery.parameter.zflx = '';
        this.listQuery.parameter.zffs = '';
        this.listQuery.parameter.zfqd = '';
        this.listQuery.parameter.kssj = '';
        this.listQuery.parameter.jssj = '';
        this.listQuery.parameter.sj = '';
        this.listQuery.current = 1;
        this.getList()
      }
    }
  }
</script>

<style lang="less">

</style>

