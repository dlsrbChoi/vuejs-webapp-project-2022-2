import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import * as filters from '@/utils/filters';

// Vue.filter('formatDate', formatDate);
// Vue.config.productionTip = false;

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
