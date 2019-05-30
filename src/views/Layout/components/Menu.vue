<template>
  <el-aside class="menu-page">
    <div class="menu-logo">
      <img src="./logo.png">
    </div>
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
      <!--<el-radio-button :label="false">展开</el-radio-button>-->
      <!--<el-radio-button :label="true">收起</el-radio-button>-->
    <!--</el-radio-group>-->
    <el-menu class="el-menu-vertical-demo" router
         :default-active="$route.path"
         :collapse="isCollapse"
         background-color="#38495d"
         text-color="#fff"
         active-text-color="#61bafe"
         :unique-opened="true">
      <el-menu-item index="index">
        <template slot="title">
          <span class="iconfont icon-shouye"></span>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
      <el-submenu
        v-for='(v,i) in menuList'
        :key="i"
        :index="i+2+''">
        <template slot="title">
          <span :class="v.zytb"></span>
          <span slot="title">{{v.zymc}}</span>
        </template>
        <div v-if='v.resourceVo'>
          <el-menu-item-group  v-for='(val,j) in v.resourceVo'
                  :key = 'j+"second"'>
              <el-menu-item v-if='!val.resourceVo'
                  :index="val.zydz"
                  class="secondlevel">
                  {{val.zymc}}
              </el-menu-item>
              <div v-if='val.resourceVo'>
                 <el-submenu :index="(i+2)+'-'+(j)">
                  <template v-if='val.zymc' slot="title">
                    <span slot="title">{{val.zymc}}</span>
                  </template>
                  <div v-if='val.resourceVo'>
                      <el-menu-item
                      class="threelevel"
                        v-for = "(valu,index) in val.resourceVo"
                        :key = "index + 'item'"
                      :index="valu.zydz" >
                      {{valu.zymc}}
                      </el-menu-item>
                    </div>
                </el-submenu>
              </div>
          </el-menu-item-group>
        </div>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
    export default {
      name: "Menu",
      data() {
        return {
          isCollapse:false,
          menuList:[]
        };
      },
      created(){
        this.menuList = JSON.parse(localStorage.getItem('resources'))
      }
    }
</script>

<style lang="less" >
  .menu-page{
    width: 260px !important; height: 100vh; background-color: #38495d;
    .menu-logo{padding:50px 0 15px; text-align: center; border-bottom:1px solid #435b73;}
    .el-menu{
      border-right: 0;
      .is-active{
        background-color: #485c75 !important;
      }
      .el-menu-item-group{
        .el-submenu__title{
          padding-left:70px !important;

        }
      }
      .el-menu-item{
        .iconfont{margin:0 15px 8px;}
      }
      .el-submenu{
        .iconfont{margin:0 15px 8px;}
        .secondlevel{
          padding-left: 70px !important;
        }
        .threelevel{
          padding-left: 90px !important;
        }
        .el-menu--inline{
          .el-menu-item-group {
            .el-menu-item-group__title{
              padding: 0;
            }
          }
        }
      }
    }
  }

  .menu-page::-webkit-scrollbar{
    display: none;
  }
  .el-aside::-webkit-scrollbar{
    display: none;
  }


</style>
