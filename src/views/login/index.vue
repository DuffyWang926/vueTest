<template>
  <div class="page-login">
    <div class="page-img"></div>
    <div class="login-container">
      <span class="login-login">LOGIN</span>
      <ValidationObserver ref="observer">
        <el-form ref="loginForm" slot-scope="{ validate }" label-width="0">
          <ValidationProvider rules="required" name="商户">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" >
              <el-select v-model="shid" placeholder="请选择商户" @change="getSHID">
                <el-option
                  v-for="item in Options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="用户名">
            <el-form-item slot-scope="{ errors }" :error="errors[0]">
              <el-input type="text" v-model="loginForm.parameter.dlmc" placeholder="用户名"></el-input>
            </el-form-item>
          </ValidationProvider>
          <ValidationProvider rules="required" name="密码">
            <el-form-item slot-scope="{ errors }" :error="errors[0]" class="input-pwd">
              <el-input type="password" v-model="loginForm.parameter.dlmm" placeholder="密码" @keyup.enter.native="validate().then(handleLogin('loginForm'))"></el-input>
            </el-form-item>
          </ValidationProvider>
          <el-form-item>
            <el-button type="primary" @click="validate().then(handleLogin('loginForm')) ">登录</el-button>
          </el-form-item>

      </el-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
  import APIURL from '@/api/api'
  import request from '@/utils/request'
  import formrequest from '@/utils/formrequest'
  import downloadrequest from '@/utils/downloadrequest'
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  export default {
    name: "Login",
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data() {
      return{
        Options:[],
        shid:'',
        loginForm:{
          parameter:{
            dlmc: '',
            dlmm: '',
          },
        },
        redirect: undefined,
        rules:{
          parameter:{
            dlmc:[
              { required: true, message: '请输入用户名' },
            ],
            dlmm:[
              { required: true, message: '请输入密码' },
            ]
          }
        }
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
      this.handleSelectSH()
    },

    methods:{
      handleLogin(){
        this.loginForm.parameter.dlmc = this.loginForm.parameter.dlmc.trim();
        this.loginForm.parameter.dlmm = this.loginForm.parameter.dlmm.trim();
        this.$axios({
          method: 'post',
          url: APIURL.login,
          data: this.loginForm,
          headers: {'Content-Type': 'application/json', 'appType': 5, 'version': '1.0.01', 'tenantId':  localStorage.getItem("SHID")},
        })
          .then(res => {
            if(res.data.code === 0){
              console.log(res);
              localStorage.setItem('authkey', res.data.result.authkey);
              localStorage.setItem('resources', JSON.stringify(res.data.result.resources));
              localStorage.setItem('sysUser', JSON.stringify(res.data.result.sysUserVo));
              localStorage.setItem('sysDicts', JSON.stringify(res.data.result.sysDicts));
              request.defaults.headers.authKey = localStorage.getItem('authkey');
              formrequest.defaults.headers.authKey = localStorage.getItem('authkey');
              downloadrequest.defaults.headers.authKey = localStorage.getItem('authkey');
              this.$router.push({path:'/index'})
            }else{
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err)
          })

        // this.$store.dispatch('Login', {parameter:this.loginForm})
        // .then((res) => {
        //   this.$router.push({name : 'Index',path:'/index'})
        //     // window.location.href = "/index"
        // }).catch((err) => {
        //   console.log(err)
        // })
      },

       handleSelectSH(){
         this.$axios({
           method: 'post',
           url: APIURL.findOnetBusinessSelect,
           data: {},
           headers: {'Content-Type': 'application/json', 'appType': 5, 'version': '1.0.01'},
         })
           .then(res => {
             console.log(res)
             for(let i = 0; i < res.data.result.length; i++){
               this.Options.push({
                  label: res.data.result[i].label,//此处是展示内容
                  value: Number(res.data.result[i].key) //此处是后台需要的值
               });
             }
           })
           .catch(err => {
             console.log(err)
           })

        //  fetchOnetBusinessSelect({}).then(response => {
        //   for (let i = 0; i < response.result.length; i++) {
        //     this.Options.push({
        //       label: response.result[i].label,//此处是展示内容
        //       value: Number(response.result[i].key) //此处是后台需要的值
        //     });
        //   }
        // }).catch((err) => {
        //   console.log(err)
        // })
      },
      getSHID(){
        localStorage.setItem("SHID",this.shid)
      }
    }
  }
</script>

<style lang="less" scoped>
  .page-login{
    .page-img{
      background-image: url("../../assets/images/login.jpg");
      position: absolute;
      background-size: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .login-container{
      z-index: 2;
      text-align: center;
      position: relative;
      margin: 0 auto;
      padding-top: 200px;
      width:20%;
      .login-login{
        color: #fff;
        font-weight: 400;
        font-size: 28px;
      }
      .el-form{
        padding-top:20px;
        .el-button{
          padding:17px 177px;
        }
        .input-pwd{
          margin-bottom: 70px;
        }
      }
    }

  }


</style>
