import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import './assets/styles/main.scss'
import store from './store';
import '@mdi/font/css/materialdesignicons.css'

store.commit("initLoginState");

Vue.config.productionTip = false


new Vue({
  vuetify,router,store,
  render: h => h(App)
}).$mount('#app')
