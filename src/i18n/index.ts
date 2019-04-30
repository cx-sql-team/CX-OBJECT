import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en'; // 引入element语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);


const i18n =  new VueI18n({
  locale: localStorage.lang || 'en',
  messages: {
      cn: Object.assign(require('./zh'), zhLocale), // 将项目中的语言包与Element的语言包进行合并
      en: Object.assign(require('./en'), enLocale),
  },
});

export default i18n;
