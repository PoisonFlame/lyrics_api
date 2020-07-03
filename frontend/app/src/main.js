import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import CarbonComponentsVue from '@carbon/vue';
Vue.use(CarbonComponentsVue);

import titleMixin from './helpers/titleMixin';
Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    window: {
      width: 0,
      height: 0
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  render: h => h(App)
}).$mount('#app');
