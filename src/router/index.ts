import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import DashBoardView from '@/views/DashBoardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import  StoreView from '@/views/StoreView.vue'
import StoreDetailsView from '@/views/StoreDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoardView
    },
    {
      path: '/dashboard/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/dashboard/stores',
      name: 'rango',
      component: StoreView,
    },
    {
      path: '/dashboard/stores/:id',
      component: StoreDetailsView,
      name: 'StoreDetails',
    },
  ]
})

export default router
