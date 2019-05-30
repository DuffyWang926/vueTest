<template>
  <div class="header-scoped">
    <el-dialog
      title="换肤"
      :visible.sync="dialogVisible"
      width="16%">
      <p>主题皮肤</p>
      <el-color-picker
        v-model="color"
        :predefine="predefineColors"
        @change="setThemeColor">
      </el-color-picker>
      <p>侧边栏</p>
      <el-button>白色</el-button>
      <el-button  type="info">黑色</el-button>
    </el-dialog>

    <el-header>
      <div class="menu-back">
        <span class="iconfont icon-hengxiangshouqi iconfont-size"></span>
        <ul class="header-right">
          <li class="header-right-li">
            <span class="iconfont icon-icon_notice"></span>
          </li>
          <li class="header-right-li">
            <span class="iconfont icon-pifuzhuti" @click="dialogVisible = true"></span>
          <li class="header-right-li user-login">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../../../assets/images/user-login.png">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </el-header>
  </div>

</template>

<script>
    export default {
      name: "Header",
      data() {
        return{
          dialogVisible: false,//换肤
          color: '#839cec',
          predefineColors: [
            '#ff6b6b',
            '#ffb85c',
            '#fca587',
            '#839cec',
            '#61bafe',
            '#4ad3b7',
          ]
        }
      },
      methods:{
        logOut(){
          // this.$store.dispatch('LogOut')
          this.$store.dispatch('FedLogOut')
            .then((res) => {
              localStorage.removeItem('authkey');
              localStorage.removeItem('SHID');
              localStorage.removeItem('sysUser');
              localStorage.removeItem('resources');
              localStorage.removeItem('sysDicts');
              this.$router.push({path:'/login'})
            }).catch((err) => {
            console.log(err)
          })
        },
        setThemeColor(){

        }
      }
    }
</script>

<style lang="less">
  .header-scoped{
    .el-dialog__wrapper{
      .el-dialog{
        position:absolute;
        right:0;
        margin:0 !important;
        height:100% !important;
        .el-dialog__header{
          border-bottom: 1px solid #eee;
        }
        .el-dialog__body{
          padding-top:10px;
          .el-button{
            padding: 12px 118px;
          }
          .el-button--info{
            margin-top:30px;
            margin-left:0 !important;
          }
        }
      }
    }

    .el-header{
      position: fixed;
      top: 0;
      right: 0;
      z-index: 3;
      width: calc(100% - 260px);
      padding: 0;
      background: #61bafe;
      min-height: 53px;
      margin-bottom: 20px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      .menu-back{
        color:#fff;
        line-height: 52px;
        margin-left:15px;
        .iconfont-size{font-weight: 900; font-size:24px;}
        .header-right{
          margin:0;
          list-style: none;
          float: right;
          .header-right-li{display: inline-block; padding: 0 30px; line-height: 30px;}
          .user-login{
            width:35px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
            img{border-radius: 1000px}
          }
        }
      }
    }

  }
</style>
