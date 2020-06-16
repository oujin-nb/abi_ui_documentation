// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'element-ui/lib/theme-chalk/index.css'
import './common/utils/iconConfig'
import '../static/scss/index.scss'
// import '../static/element-ui-theme/index.js'
// import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import ElementUI from 'element-ui'
import store from './vuex'
import components from './plugins/components.js'
import element from './plugins/elementComponent.js'
// import http from './api/index.js'
import utils from './common/utils/index'
import fcnTemplate from '../src/factory/fcnTemplate'
// import absElementUi from 'abs_element_ui'
// import VueHighlightJS from 'vue-highlightjs'
// Tell Vue.js to use vue-highlightjs
// Vue.use(VueHighlightJS)
Vue.use(components)
Vue.use(element)
// Vue.use(absElementUi)
// Vue.use(ElementUI, {size: 'small'})
// Vue.use(VueAxios, axios)
Vue.prototype.$bus = new Vue()
// Vue.prototype.http = http
Vue.prototype.fcn= utils//工具类
Vue.prototype.tep=new fcnTemplate()//事件模板类
// Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    data: {
        bus: new Vue()
    }
})
