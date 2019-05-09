import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'//引入vuetify
import 'vuetify/dist/vuetify.css'//引入vuetify的样式文件
import 'vuetify/dist/vuetify.js'//引入vuetify，目前貌似并没有用？
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from './http'
import mavonEditor from 'mavon-editor'
import 'mavon-Editor/dist/css/index.css'
Vue.prototype.$axios = axios//注册全局

Vue.use(Vuetify,{
  //iconfont: 'mdi',//注释掉以后就可以正常看见图标？??
  icons: {
    'product': 'mdi-dropbox',
    'support': 'mdi-lifebuoy',
    'steam': 'mdi-steam-box',
    'pc': 'mdi-desktop-classic',
    'xbox': 'mdi-xbox',
    'playstation': 'mdi-playstation',
    'switch': 'mdi-nintendo-switch'
  }
});
Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false
new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
