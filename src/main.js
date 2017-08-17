// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'material-design-icons/iconfont/material-icons.css'
import VueLocalStorage from 'vue-ls';
import VueTimeago from 'vue-timeago'



Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLocalStorage, {
  namespace: 'vuejs__'
});
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'zh-CN',
  locales: {
    // you will need json-loader in webpack 1
    'zh-CN': require('vue-timeago/locales/zh-CN.json')
  }
})
Vue.config.productionTip = false
Vue.prototype.dateUrl = "http://localhost/TP5/public/index.php/index/"; //定义请求服务器的目录

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
