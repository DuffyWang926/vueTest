
<template>
   <el-dialog title="车位记录详情" class="lg-dialog parkingDetails" v-if="visible" :visible.sync="visible"  :append-to-body='true' :before-close="cancelModal" >
     <el-row>
       <span class='title'>{{parkingDetailsEnterData.hphm}}</span>
       <span :style='colorBackground ' class="colorHead">{{parkingDetailsEnterData.cpys}}</span>
     </el-row>
     <el-row>
       <el-col :span='12'>
         <TitleShowList :msg='leftData'></TitleShowList>
       </el-col>
        <el-col :span='12'>
         <TitleShowList :msg='rightData'></TitleShowList>
       </el-col>
     </el-row>
     <el-row>
       <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="入位记录" name="1">
          <span slot="label" class='tabHead'>入位记录</span>
          <el-row>
            <el-col :span='8' class='minHeight'>
              <div>全景照片</div>
              <img :src="enterLeftImage" alt="全景照片" class="imgSize"> 
            </el-col>
            <el-col :span='8'>
              <div>车牌照片</div>
              <img :src="enterMidImage" alt="车牌照片" class="imgSize">
            </el-col>
            <el-col :span='8'>
              <div>照片时间轴/短视频</div>
              <img :src="enterRightImage" alt="照片时间轴/短视频" class="imgSize">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <span class='title'> 入位记录</span>
              <span >{{parkingDetailsEnterData.rwjlid}}</span>
              <TitleShowList :msg='leftFootData'></TitleShowList>
            </el-col>
            <el-col :span='12' v-if="changeFlag">
              <span class='title'> 修改记录</span>
              <span >{{parkingDetailsChangeData.xgjlid }}</span>
              <TitleShowList :msg='rightFootData'></TitleShowList>
              <el-row>
                <span>
                  PDA拍照：
                </span>
                <a href="#" @click="PdaPhotoClick" v-if="PdaPhoto" >查看图片</a>
                <!-- <img :src="PdaPhoto" alt="" v-show='isPdaPhoto'> -->
                  
              </el-row>
              
            </el-col>
            
            
          </el-row>
          
        </el-tab-pane>
        <el-tab-pane :label="tabTitle" name="2" :disabled="isShow">
        <!-- <el-tab-pane :label="tabTitle" name="2" :disabled="false"> -->
          <span slot="label" class='tabHead'>{{tabTitle}}</span>
          <el-row class='minHeight'>
            <el-col :span='8'>
              <div>全景照片</div>
              <img :src="leaveLeftImage" alt="全景照片" class="imgSize">
            </el-col>
            <el-col :span='8'>
              <div>车牌照片</div>
              <img :src="leaveMidImage" alt="车牌照片" class="imgSize">
            </el-col>
            <el-col :span='8'>
              <div>照片时间轴/短视频</div>
              <img :src="leaveRightImage" alt="照片时间轴/短视频" class="imgSize">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='12'>
              <span class='title'> 离位记录</span>
              <span >{{parkingDetailsLeaveData.lwjlid}}</span>
              <TitleShowList :msg='leaveFootData'></TitleShowList>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
     </el-row>
      <ImgCarDialog v-if="isPdaPhoto" :visible.sync="isPdaPhoto" :msg="PdaPhoto" ></ImgCarDialog>
  </el-dialog>

</template>
<script>

// checkData 弹窗
import TitleShowList from '@/components/TitleShowList';
import ImgCarDialog from "./ImgCarDialog";

  export default {
    name: 'parkingLeaveDetails',
    props:['visible','msg'],
    components:{ TitleShowList, ImgCarDialog },
    data() {
      return {
        tabTitle:'未离位',
        activeName:'1',
        isPdaPhoto:false,
      }
    },
    created(){
      
      

    },
    methods: {
      cancelModal(){
        this.$emit('cancelModal')
      },
       handleClick(tab, event) {
        console.log(tab, event);
        let name = tab.name;
        let current = 1;
        
      },
      PdaPhotoClick(){
        this.isPdaPhoto = !this.isPdaPhoto;

      }
      
    }, 
    computed:{
      parkingDetailsEnterData(){

        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsEnterData
      },
      colorBackground(){
        // let style = 'margin-right:20px;padding:5px;color:#fff;'
        let style = ''
        let colorRGB = this.parkingDetailsEnterData && this.parkingDetailsEnterData.colorRGB;
        if(colorRGB){
          style += `color:${colorRGB};border-color:${colorRGB};`
        }
        return style

      },
      leftData(){
        let data= [
                {
                    name:'入位情况',
                    data:this.parkingDetailsEnterData.rwqk
                },
                {
                    name:'报警信息',
                    data:this.parkingDetailsEnterData.bjxx
                },
            ]
          return data
      },
      rightData(){
        let data= [
                {
                    name:'车场编号',
                    data:this.parkingDetailsEnterData.ccbh
                },
                {
                    name:'泊位编号',
                    data:this.parkingDetailsEnterData.cwbh
                },
            ]
          return data
      },
      parkingDetailsLeaveData(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsLeaveData
      },
      parkingDetailsChangeData(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsChangeData
      },
      isShow(){
        let isShow = this.$store.state.detailsDataAll.parkingDetails.parkingDetailsLeaveData.isShow;
        if(!isShow){
          this.tabTitle = '离位记录'
        }
        return isShow;
 
      },
      enterLeftImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsEnterData.tpdz1
      },
      enterMidImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsEnterData.tpdz2
      },
      enterRightImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsEnterData.tpdz3
      },
      leftFootData(){
        let data= [
                {
                    name:'设备类型',
                    data:this.parkingDetailsEnterData.sjly
                },
                {
                    name:'设备标识',
                    data:this.parkingDetailsEnterData.sbsn
                },
                {
                    name:'识别车牌',
                    data:this.parkingDetailsEnterData.hphm
                },
                {
                    name:'车牌颜色',
                    data:this.parkingDetailsEnterData.cpys
                },
                {
                    name:'入位时间',
                    data:this.parkingDetailsEnterData.sjsj
                },
                {
                    name:'跨位泊位',
                    data:this.parkingDetailsEnterData.kwcwbh
                },
            ]
          return data
      },
      rightFootData(){
        let data= [
                {
                    name:'设备类型',
                    data:this.parkingDetailsChangeData.sjly
                },
                {
                    name:'设备标识',
                    data:this.parkingDetailsChangeData.sbsn
                },
                {
                    name:'识别车牌',
                    data:this.parkingDetailsChangeData.hphm
                },
                {
                    name:'车牌颜色',
                    data:this.parkingDetailsChangeData.cpys
                },
                {
                    name:'修改时间',
                    data:this.parkingDetailsChangeData.sjsj
                },
                
            ]
          return data
      },
      PdaPhoto(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsChangeData.tpdz1
      },
      leaveLeftImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsLeaveData.tpdz1
      },
      leaveMidImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsLeaveData.tpdz2
      },
      leaveRightImage(){
        return this.$store.state.detailsDataAll.parkingDetails.parkingDetailsLeaveData.tpdz3
      },
      leaveFootData(){
        let data= [
                {
                    name:'设备类型',
                    data:this.parkingDetailsLeaveData.sjly
                },
                {
                    name:'设备标识',
                    data:this.parkingDetailsLeaveData.sbsn
                },
                {
                    name:'离位时间',
                    data:this.parkingDetailsLeaveData.sjsj
                },
                
            ]
          return data
      },
      changeFlag(){
        return this.$store.state.detailsDataAll.parkingDetails.changeFlag
      }
      

      

      
      
    }
    
  }
</script>
<style lang='less' scoped>
  .parkingDetails{
    .title{
      padding-right: 20px;
      font-size: 20px;
      font-weight: bold;
      color:#333333
      
    }
    .colorHead{
      padding:3px 10px 4px;
      border:1px solid;
      font-size: 12px;
      border-radius: 3px;
    }
    .minHeight{
      height: 200px;
    }
    .imgSize{
      max-width: 90%;
      height:200px;
    }
    .el-row{
      .el-tabs{
          /deep/.el-tabs__nav{
            position: relative;
            left:40%;
            top:0;
            margin:auto;
              div:nth-child(2){
                  padding-left: 0px

                }
              div:nth-child(3){
                padding: 0 

              }
            }
      }
    }
    .tabHead{
      padding:12px 44px;
    }
    // .tabHead:focus{
    //   color:#fff;
    //   background:#409EFF;
    //   border:1px solid #409EFF;
    // }
    // .tabHead:active{
    //   color:#fff;
    //   background:#409EFF;
    //   border: 1px solid #409EFF;
    // }
    /deep/.el-tabs__nav-scroll{
      height:45px;
      /deep/.is-active{
        color:#fff !important;
        background:#409EFF;
        border:1px solid #409EFF;
      }
      .is-disabled{
        // color:#aaa;
        cursor:not-allowed; 
      }
    }
    /deep/.el-tabs__item{
      padding:0 !important;
      margin-top:3px ;
      color:#409EFF;
      background:#ecf5ff;
      border:1px solid #b3d8ff;
      // padding:12px 44px;
    }
    /deep/.el-tabs__active-bar{
      display: none;
    }

  }
  

</style>