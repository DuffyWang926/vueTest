<template>
  <el-dialog title="查看行驶证图片" class="sm-dialog" :visible.sync="visible" :msg="msg" :append-to-body='appendToBody' :before-close="cancelModal" :close-on-click-modal="false">
    <div style="text-align: center">
      <img :src=imgsrc >
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ImgCarDialog",
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
        imgsrc:''
      }
    },
    created(){
      this.getImgUrl()
    },
    methods:{
      getImgUrl(){
        this.imgsrc = this.msg.Data
      },
      //  关闭弹框
      cancelModal() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style scoped>

</style>
