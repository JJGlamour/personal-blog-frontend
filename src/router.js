import Vue from 'vue'
import Router from 'vue-router'
import store from './store'//引入非常有用
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/navi'//通过路由重定向来实现默认界面
    },{
      path: '/login',//进入管理员登录界面
      name: 'login',
      component: () => import('./components/global/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/layout.vue'),
      children: [
        {
          path: 'navi',
          name: 'navi',
          component: () => import('./components/Navigation.vue')
        },
        {
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          path: 'mainpage',
          name: 'mainpage',
          component: () => import(/* webpackChunkName: "about" */ './components/Mainpage.vue'),//按需加载or懒加载
        },
        {
          path: 'messageboard',
          name: 'messageboard',
          component: () => import('./components/Messageboard.vue')
        },{
          path: 'information',
          name: 'information',
          component: () => import('./components/Information.vue'),
        },{
          path: 'notfound',
          name: 'notfound',
          component: () => import('./components/global/404.vue')
        },{
          path: 'imggallery',
          name: 'imggallery',
          component: () => import('./components/Imggallery.vue')
        },{
          path: 'about',
          name: 'about',
          component: () => import('./components/About.vue')
        },{
          path: 'display1',
          name: 'display1',
          component: () => import('./components/mainpage/article/display.vue')
        },{
          path: 'display2',
          name: 'display2',
          component: ()=> import('./components/mainpage/course/display.vue')
        },{
          path: 'administrator',
          name: 'administrator',
          meta: {
            requireAuth: true,//添加该字段，表示这个路由是需要登陆的
          },
          redirect: '/home/administrator/navagation',
          component: () => import('./components/Administrator.vue'),
          children: [
            {
              path: 'navagation',
              name: 'navigation',
              component: () => import('./components/administrator/navigation.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'user',
              name: 'user',
              component: () => import('./components/administrator/user.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'delmessage',
              name: 'delmessage',
              component: () => import('./components/administrator/msg.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'course',
              name: 'course',
              component: () => import('./components/administrator/course.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'article',
              name: 'article',
              component: () => import('./components/administrator/article.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'img',
              name: 'img',
              component: () => import('./components/administrator/img.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'info',
              name: 'info',
              component: () => import('./components/administrator/info.vue'),
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
});
//利用钩子函数对路由进行判断，实现拦截中的第一道：路由拦截
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){  //判断当前路由是否需要登录权限
    const token = localStorage.getItem('token');
    //const token = store.state.b.token;
    if(token===''||token===null){
      next({path: '/login'});   //本地没有存储token，则重定向到登录界面
    }
    else{
      next()
    }
  }
  else{
    next();
  }
})
export default router