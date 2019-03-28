import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as Element from 'element-ui';
import './assets/css/common.css';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './assets/js/ajax';

Vue.config.productionTip = false;
Vue.use(Element);
(window as any).ajax = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
