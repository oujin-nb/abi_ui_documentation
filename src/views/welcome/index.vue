
<template>
  <div class="content column-start-center">
      <img class="icon" src='../../../static/image/v.png'>
      <div class="title">abs_element_ui</div>
      <div class="text">这是一款基于vue.js与element-ui的组件库,该组件库对element-ui中的组件基于业务考虑进行了再次封装</div>
      <div class="button_ground row-space-between">
          <div class="button row-center" @click="herf_to_git">github</div>
          <div class="button_1 row-center"  @click="herf_to_index">start
              <div :class="herf?'but1_fly':'but1_img'"></div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    created() {
    },
    data() {
        return {
            herf:false
        }
    },
    methods:{
        herf_to_index(){
            this.herf =true
            setTimeout(()=>{
                this.$router.push({ path: '/index' })
            },1000)
        },
        herf_to_git(){
            window.location.href='https://github.com/oujin-nb/abs_element_ui'
        }
    }

}

</script>
<style lang="less" scoped>
@keyframes move {
		from {
			top: 0vh;
		}

		to {
			top: 30vh;
		}
	}
	@keyframes rotate {
        from {
             left: 50vw;
             transform:rotate(0deg);
		}

		to {
			 left: 70vw;
             transform:rotate(1080deg);
		}
    }
    @keyframes go {
        from {
            left: 0vh;
		}

		to {
		   left:38vw;
		}
    }
     @keyframes fly {
        from {
             right: 10px;
             bottom: 0px;
		}

		to {
           right: -500px;
           bottom: 600px;
		}
    }
    
.icon{
    animation-name: move;
	animation-duration:2s;
	animation-delay:0s;
    animation-iteration-count:1;
    height: 75px;
    width: 75px;
    position: absolute;
    top: 30vh
}
.title{
    // animation-name: rotate;
	// animation-duration:1s;
	// animation-delay:0s;
    // animation-iteration-count:2;
    // animation-direction:alternate;
    top: 42vh;
    position: absolute;
    font-size: 40px;
    font-weight: bold;
    color: rgba(33, 35, 39, 0.904)
}
.text{
    animation-name: go;
	animation-duration:2s;
	animation-delay:0s;
    animation-iteration-count:1;
    animation-direction:alternate;
    top: 50vh;
    position: absolute;
    font-size: 15px;
    color: rgba(105, 112, 122, 0.788)
}
.button_ground{
    top: 60vh;
    position: absolute;
    width: 300px;
    .button{
        margin-right: 20px;
        height: 40px;
        width: 120px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: #dadddf;
        color: white;
        cursor: pointer;
    }
    .button::before{
        content: "";
        height: 30px;
        width: 30px;
        margin-right:10px ;
        background: url('../../../static/image/github.png') no-repeat;
        background-size: 100%;
    }
    .button_1{
        margin-right: 20px;
        height: 40px;
        width: 120px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: #dadddf;
        color: white;
        cursor: pointer;
        position: relative;
    }
    .but1_img{
        height: 30px;
        width: 30px;
        position: absolute;
        right: 10px;
        background: url('../../../static/image/fj.png') no-repeat;
        background-size: 100%;
    }
    .but1_fly{
        animation-name: fly;
	    animation-duration:1s;
	    animation-delay:0s;
        animation-iteration-count:1;
        animation-timing-function: ease-in-out;
        height: 30px;
        width: 30px;
        position: absolute;
        right: 10px;
        background: url('../../../static/image/fj.png') no-repeat;
        background-size: 100%;
    }
  
}

</style>