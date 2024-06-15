import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../components/HomeView.vue';
import DockerProxy from '../components/DockerProxy.vue';
import DonateView from '../components/DonateView.vue';
import DocView from '../components/DocView.vue';

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        { path: '/index', component: DockerProxy },
        { path: '/donate', component: DonateView },
        { path: '/doc', component: DocView }
      ]
    }
   
  ]
});
