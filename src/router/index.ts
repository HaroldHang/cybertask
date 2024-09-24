import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TaskView from '@/views/TaskView.vue'
import DashboardView from '@/views/DashboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },*/
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TaskView,
      meta : {
        requiredAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta : {
        requiredAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next)=> {
  
  const loggedUser = sessionStorage.getItem('token');
  const isLogged = (loggedUser && loggedUser != '') ? true : false
  const require = to.matched.some(record => record.meta.requiredAuth)
  if (require && !isLogged) {
    next('/login')
  } else if(to.name == 'login' && isLogged) {
    next('/dashboard')
  } else next()
})
export default router
