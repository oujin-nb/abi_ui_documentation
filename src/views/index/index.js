import CommonHeader from '@/components/commonHeader/commonHeader.vue';
import SideBar from '@/components/sideBar/sideBar.vue'

export default {
    name: "index",
    components: {CommonHeader, SideBar},
    created(){
        // if(localStorage.getItem("OrganizationID")!==''){
        //     localStorage.setItem("OrganizationID","hzlckqyy")
        // }
    },
    data(){
        return{
            transitionName:''
        }
    },
    watch: {//使用watch 监听$router的变化
        $route(to, from) {
          //如果to索引大于from索引,判断为前进状态,反之则为后退状态
          if(to.meta.index > from.meta.index){
            //设置动画名称
            this.transitionName = 'slide-left';
          }else{
            this.transitionName = 'slide-right';
          }
        }
    },
    computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
        }
     }
}