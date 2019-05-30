import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style


router.beforeEach((to,from,next) => {
  NProgress.start()

  if(to.matched.some( m => m.meta.auth)){
    // 对路由进行验证
    if(localStorage.getItem('authkey')) { // 已经登陆
      next()   // 正常跳转到你设置好的页面
    }
    else{
      NProgress.done()
      next({
        path:'/login',
      })
    }
  }else{
    next()
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
