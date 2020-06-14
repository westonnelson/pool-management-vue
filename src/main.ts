import Vue from 'vue';
import VueUi from '@vue/ui';
import VueI18n from 'vue-i18n';
import infiniteScroll from 'vue-infinite-scroll';
import { upperFirst, camelCase } from 'lodash';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import {
  formatBalance,
  formatCurrency,
  formatPercentage,
  shorten
} from '@/helpers/utils';
import mixins from '@/mixins';
import messages from '@/helpers/messages.json';
import numberFormats from '@/helpers/number.json';
import '@/style.scss';

Vue.use(VueUi);
Vue.use(VueI18n);
Vue.use(infiniteScroll);
const i18n = new VueI18n({ locale: 'en', messages, numberFormats });

const requireComponent = require.context('@/components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('currency', value => formatCurrency(value));
Vue.filter('percentage', value => formatPercentage(value, 2));
Vue.filter('balance', value => formatBalance(value, 18, 6));
Vue.filter('shorten', value => shorten(value));

Vue.mixin(mixins);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');