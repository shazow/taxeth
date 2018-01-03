import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      props: (route) => {
        if (Array.isArray(route.query.a)) return {initAddresses: route.query.a};
        if (!route.query.a) return;
        return {initAddresses: [route.query.a]};
      },
    },
  ],
});
