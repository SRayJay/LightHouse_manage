import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    name:'Home',
    path:'/',
    component:()=>import('../views/Home.vue'),
    redirect: '/welcome',
    children:[
      {
        name:'Welcome',
        path:'/welcome',
        component:()=>import('../views/Welcome.vue')
      },
      {
        name: 'UserControl',
        path: '/usercontrol',
        component:() => import('../views/UserControl.vue')
      },{
        name: 'BookControl',
        path: '/bookcontrol',
        component: () => import('../views/BookControl.vue')
      }
    
    
    ]
  },
  {
    name:'Login',
    path:'/login',
    component:()=>import('../views/Login.vue'),
    
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
