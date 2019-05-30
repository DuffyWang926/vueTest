<template>
  <el-container class="all-page">
    <Menu></Menu>
    <!--<MenuBar></MenuBar>-->
    <el-container>
      <Header></Header>
      <section class="content home"></section>
      <el-main>
        <Breadcrumbs></Breadcrumbs>
          <!-- <keep-alive> -->
            <router-view></router-view>
          <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import '../../assets/css/iconfont/iconfont.css'

  import Breadcrumbs from './components/Breadcrumbs'
  import Header from './components/Header'
  import Menu from './components/Menu'

  export default {
    name: "Layout",
    components: { Breadcrumbs, Menu, Header},

    data(){
      return{
        color:'',
      }
    },
    created(){

    },
    methods:{

    }
  }
</script>

<style lang="less">
  .all-page::-webkit-scrollbar{
    display: none;
  }
  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 260px !important;
    overflow: auto;
    margin: 0;
  }
  section.content:before {
    content: '';
    position: absolute;
    top: 54px;
    width: calc(100% - 260px);
    height: 110px;
    background-color: #61bafe;
  }
  .el-main{
    padding-top: 0 !important;
  }
</style>
