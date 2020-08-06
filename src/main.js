import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import GLOBAL from './assets/javascript/global'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAxios,axios);
Vue.use(GLOBAL);
//Vue.use(ElementUI);

//提示开关
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
