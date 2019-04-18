import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import ajax from './utils/ajax';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';
import './assets/css/cx-common.scss';
import * as ElemtUi from 'element-ui';
import i18n from './i18n';
import components from './components/common/index.js';
import './mock/index.js';

Vue.config.productionTip = false;
Vue.use((v) => {
    v.prototype.$ajax = ajax;
});

Vue.use(ElemtUi, {
    i18n: (key: any, value: any) => i18n.t(key, value),
});

Vue.use(components);




new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
