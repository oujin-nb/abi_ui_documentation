export default {
    name: "sideBar",
    created(){
        let list = this.fcn.getStorage('routeList')
    
        this.menuList = this.creatMenu(list)
    },
    data() {
        return {
            isCollapse: false,
            collapseTransition: false,
            menuList: []
        }
    },
    methods: {
        showSideBar() {
            this.isCollapse = !this.isCollapse
        },
        createdBarList(list){

        },
        barHref(s) {
            this.$router.push({ path: s });
            
          },
          creatMenu(list) {
            var menuList = [];
            list.forEach(s => {
              let menu = {
                title: s.meta.title,
                icon: s.url.replace("/", ""),
                index: s.url.replace("/", ""),
                route: s.url,
                list:
                  s.children && s.children.length > 0
                    ? this.creatMenu(s.children)
                    : undefined
              };
              menuList.push(menu);
            });
            return menuList;
          },
        menuChange(index) {
        }
    },
    computed: {
        onRoutes() {
            this.$store.dispatch('updateCurrentRoute', this.$route.meta.title)
            return this.$route.path;
        }
    }
}