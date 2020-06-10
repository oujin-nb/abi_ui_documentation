import v from '../../../static/image/v.png'
import list_side_bar from '../../../static/image/list_side_bar.svg'
export default { 
    name: "commonHeader",
    created(){
        // this.userRole = this.fcn.getUser().userName
    },
    data(){
        return{
            roleList:[
                '退出'
            ],
            userRole:'',
            img1:v,
            img2:list_side_bar
        }
    },
    methods: {
        Logout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push({path: '/login'})
        },
        showSideBar(){
            this.$store.dispatch('updateSideBarShow',!this.$store.state.sideBarShow)
        },
        roleChange(s){
            this.$router.push({path: '/login'})
        }
    }
}