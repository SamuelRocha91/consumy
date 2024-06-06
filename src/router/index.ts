import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import DashBoardView from '@/views/DashBoardView.vue';
import ProfileView from '@/views/ProfileView.vue';
import StoreView from '@/views/StoreView.vue';
import StoreDetailsView from '@/views/StoreDetailsView.vue';
import CartView from '@/views/CartView.vue';
import { Auth } from '../utils/auth'; 
import NotFoundView from '@/views/NotFoundView.vue';
import PaymentView from '@/views/PaymentView.vue';

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
      meta: { requiresAuth: true },
      component: DashBoardView
    },
    {
      path: '/dashboard/profile',
      name: 'profile',
      meta: { requiresAuth: true },
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
    {
      path: '/dashboard/cart',
      component: CartView,
      name: 'cart',
    },
    {
      path: '/dashboard/payment',
      component: PaymentView,
      meta: { requiresAuth: true },
      name: 'payment',
    },
    {
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = new Auth();
    if (!auth.currentUser()) {
      next({ name: 'signIn' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
