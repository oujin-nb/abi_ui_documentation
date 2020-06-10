const globalRoutes = [
    { path: '/login', component:resolve=>require(["@/views/login/login.vue"], resolve), name: 'login', meta: { title: '登录' , requiresAuth: false} },
    { path: '/', component:resolve=>require(["@/views/welcome/index.vue"], resolve), name: 'welcome' }
]
export default globalRoutes