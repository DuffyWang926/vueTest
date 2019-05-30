<template>
    <el-dialog title="停车图片" class="lg-dialog parkingDataDialog" :visible.sync="visible" :idVal="idVal" :shid="shid" :append-to-body='appendToBody' :close-on-click-modal="false" :before-close="cancelModal">
      <el-row>
        <el-col :span="6"><img :src="tpdz1" width="95%" height="300px"></el-col>
        <el-col :span="6"><img :src="tpdz2" width="95%" height="300px"></el-col>
        <el-col :span="6"><img :src="tpdz3" width="95%" height="300px"></el-col>
        <el-col :span="6"><img :src="tpdz4" width="95%" height="300px"></el-col>
      </el-row>
   </el-dialog>
</template>
<script>
  import {fetchParkingDataImgList} from '@/api/system/parkingData'
    export default {
      name: 'ParkingDataDialog',
      props:{
        visible: {
          type: Boolean,
          default: false
        },
        idVal: {
          type: '',
          default:''
        },
        shid: {
          type: '',
          default:''
        }
      },
      data(){
        return{
          appendToBody:true,
          tpdz1:'',
          tpdz2:'',
          tpdz3:'',
          tpdz4:''
        }
      },
      created() {
        this.getImgList(this.idVal, this.shid);
      },
      methods:{
        getImgList(id, shid){
          fetchParkingDataImgList(id, shid).then(response => {
            this.tpdz1 = response.result.tpdz1
            this.tpdz2 = response.result.tpdz2
            this.tpdz3 = response.result.tpdz3
            this.tpdz4 = response.result.tpdz4
          }).catch((err) => {
              console.log(err)
          })
        },
        cancelModal(){
          this.$emit('update:visible', false);
        },
      }
    }
</script>
<style lang="less">
  .parkingDataDialog{
    .el-row{
      padding:0 !important;
      margin: 0 !important;
    }
  }
</style>
