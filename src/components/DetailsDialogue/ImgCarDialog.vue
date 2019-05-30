<template>
  <el-dialog title="查看图片" class="sm-dialog photoDialogue" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div style="text-align: center" class="photo">
      <img :src=imgsrc >
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ImgCarDialog",
    props:{
      visible: {
        
        default: false
      },
      msg: {
        
      }
    },
    data(){
      return{
        appendToBody:true,
        imgsrc:''
      }
    },
    created(){
      this.getImgUrl()
    },
    methods:{
      getImgUrl(){
        this.imgsrc = this.msg
      },
      //  关闭弹框
      cancelModal() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="less" scoped>
.photoDialogue{
  .photo{
    height:300px;
  }
  img{
    height:300px;
  }

}

</style>
