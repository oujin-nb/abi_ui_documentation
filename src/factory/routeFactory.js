var routeFactory = function (list){
    console.log(list)
    let routeList = []
    Array.prototype.forEach.call(list,(s)=>{
        let route = {
            path: s.url,
            component:resolve=>require(["@/views"+s.url+"/index.vue"], resolve),
            name: s.url.replace('/', ''),
            meta: s.meta
        }
        routeList.push(route)
    })
    // list.forEach((s)=>{
    //     let route = {
    //         path: s.url,
    //         component:resolve=>require(["@/views"+s.url+"/index.vue"], resolve),
    //         name: s.url.replace('/', ''),
    //         meta: s.meta
    //     }
    //     routeList.push(route)
    // })
    return routeList
}
export  {routeFactory}