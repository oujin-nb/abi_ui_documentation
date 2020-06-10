// import引入页面或组件时 路径 /XX/XX/XX.vue 要有vue后缀 如果文件夹下并不是只有一个vue文件时就会报错（默认import引入了文件下的同名js文件）
// meta.requiresAuth 页面是否需要授权验证
import Vue from 'vue'
import Router from 'vue-router'
import globalRoutes from './modules/globalRoutes'
import {routeFactory} from '../factory/routeFactory'
import axios from 'axios'
import utils from '../common/utils/index'
// import pageConfig from '../../static/json/routeConfig.json'
import pageConfig from '@/config/pageConfig'
console.log(pageConfig)
Vue.use(Router)
// axios.get('../static/json/routeConfig.json').then((s)=>{
//     utils.setStorage('routeList',s.data.list)
//     let list  = routeFactory(s.data.list)
//     vueRouter.addRoutes(
//         [{
//             path: '/index',
//             name: 'index',
//             component: resolve=>require(["@/views/index/index.vue"], resolve),
//             children:list,
//             redirect:'/mainPage'
//         }]
//     )
// })
const vueRouter = new Router({
    mode: 'hash',
    routes: [...globalRoutes]
})
let list  = getRouteList(pageConfig)
utils.setStorage('routeList',pageConfig)
vueRouter.addRoutes(
    [{
        path: '/index',
        name: 'index',
        component: resolve=>require(["@/views/index/index.vue"], resolve),
        children:list,
        redirect:'/mainPage'
    }]
)
vueRouter.beforeEach((to, from, next) => {
    next();
})
// 根据配置生成route对象集合
function getRouteList(routes) {
    let res = []
    let hander = function (list) {
        list.forEach((s) => {
            let pagePath = s.mobile ? "@/mobileViews" : "@/views"
            if (s.children) {
                hander(s.children)
            }
            if (s.url) {
                // console.log(pagePath + s.url + "/index.vue")
                let route = {
                    path: s.url,
                    component: resolve => require(["@/views" + s.url + "/index.vue"], resolve),
                    name: s.url.replace('/', ''),
                    meta: s.meta
                }
                if (s.mobile){
                    route.component = resolve => require(["@/mobileViews" + s.url + "/index.vue"], resolve)
                }
                res.push(route)
            }
        })
    }
    hander(routes)
    console.log(res)
    return res
}
export default vueRouter;
