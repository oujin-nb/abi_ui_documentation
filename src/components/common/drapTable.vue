<template>
  <div>
    <el-table
      v-on="$listeners"
      v-bind="$attrs"
      @header-contextmenu="changeStart"
      @header-click="headerClick"
      :header-cell-class-name="headerClass"
    >
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  created() {},
  mounted() {},
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      startDrag: "",
      aIndex: "",
      bIndex: "",
      headerClass:''
    };
  },
  methods: {
    // 右键点击开启拖拽模式
    changeStart(s) {
      // 获取拖拽范围
      const dom = document.querySelectorAll(
        ".el-table__header-wrapper >.el-table__header > .has-gutter >tr>." +
          s.id
      );
      let doms = dom[0].parentNode.children;
      // 定義拖拽停靠事件

      dom[0].parentNode.addEventListener("drop", e => {
        this.exchange(e.target.innerText);
      });
      dom[0].parentNode.addEventListener("dragover", function(e) {
        e.preventDefault();
      });
      let dList = [].slice.call(doms);
      dList.forEach(s => {
        s.setAttribute("draggable", "true");
        s.setAttribute("class", s.getAttribute("class") + " " + "shaky"+" "+'del_icon');
        s.addEventListener("dragstart", e => {
          this.startDrag = e.target.innerText;
        });
      });
   
      // var addNode = document.createElement("th");
      // addNode.setAttribute("class", "add_icon");
      // dom[0].parentNode.appendChild(addNode);
      event.preventDefault();
    },
    // 左键点击关闭拖拽模式
    headerClick(s) {
      const dom = document.querySelectorAll(
        ".el-table__header-wrapper >.el-table__header > .has-gutter >tr>." +
          s.id
      );
      let doms = dom[0].parentNode.children;
      let dList = [].slice.call(doms);
      dList.forEach(s => {
        s.setAttribute("draggable", "false");
        s.setAttribute("class", s.getAttribute("class").replace("shaky"+" "+'del_icon', ""));
      });
    },
    exchange(s) {
      if (this.startDrag) {
        let aIndex = "";
        let bIndex = "";
        let list = [].slice.call(this.obj.pd);
        list.forEach((p, index) => {
          if (p.label === this.startDrag) {
            aIndex = index;
          }
          if (p.label === s) {
            bIndex = index;
          }
        });
        let tmplObj = Object.assign({}, list[aIndex]);
        list[aIndex] = Object.assign({}, list[bIndex]);
        list[bIndex] = tmplObj;
        this.opt.pd = list;
      }
    }
  },

  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return Object.assign({}, this.opt);
    }
  }
};
</script>

<style   rel="stylesheet/css"  >
.add_icon {
  width: 200px;
  right: 200px;
  border: 1px dashed #9d9d9d;
}
.del_icon::before{
  content: '';
  position: absolute;
  right: 20px;
  height: 15px;
  width: 15px;
  background: url('../../../static/image/del.png') no-repeat;
  background-size: 100%;
}
/* .add_icon:before{
  content:'';
  display: block;
  width: 30px;
  height: 30px;
  background: url('../../../static/image/logo.svg') no-repeat;
  background-size: 100%;
} */
.shaky {
  box-shadow: 0px 5px 20px 10px #717171;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  -webkit-animation-name: shaky-slow;
  -ms-animation-name: shaky-slow;
  animation-name: shaky-slow;
  -webkit-animation-duration: 4s;
  -ms-animation-duration: 4s;
  animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-delay: 0s;
  -ms-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-play-state: running;
  -ms-animation-play-state: running;
  animation-play-state: running;
}
@-webkit-keyframes shaky-slow {
  0% {
    -webkit-transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    -webkit-transform: translate(-1px, 1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translate(1.3px, 0px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translate(1.4px, 1.4px) rotate(-2deg);
  }
  8% {
    -webkit-transform: translate(-1.3px, -1px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translate(1.4px, 0px) rotate(-2deg);
  }
  12% {
    -webkit-transform: translate(-1.3px, -1px) rotate(-2deg);
  }
  14% {
    -webkit-transform: translate(1.5px, 1.3px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translate(1.5px, -1.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translate(1.3px, -1.3px) rotate(-2deg);
  }
  20% {
    -webkit-transform: translate(1px, 1px) rotate(-0.5deg);
  }
  22% {
    -webkit-transform: translate(1.3px, 1.5px) rotate(-2deg);
  }
  24% {
    -webkit-transform: translate(-1.4px, -1px) rotate(2deg);
  }
  26% {
    -webkit-transform: translate(1.3px, -1.3px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translate(1.6px, -1.6px) rotate(-2deg);
  }
  30% {
    -webkit-transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
  }
  32% {
    -webkit-transform: translate(-1px, 0px) rotate(2deg);
  }
  34% {
    -webkit-transform: translate(1.3px, 1.3px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translate(1.3px, 1.6px) rotate(1.5deg);
  }
  38% {
    -webkit-transform: translate(1.3px, -1.6px) rotate(1.5deg);
  }
  40% {
    -webkit-transform: translate(-1.4px, -1px) rotate(-0.5deg);
  }
  42% {
    -webkit-transform: translate(-1.4px, 1.3px) rotate(-0.5deg);
  }
  44% {
    -webkit-transform: translate(-1.6px, 1.4px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translate(-2.1px, -1.3px) rotate(-0.5deg);
  }
  48% {
    -webkit-transform: translate(1px, 1.6px) rotate(1.5deg);
  }
  50% {
    -webkit-transform: translate(1.6px, 1.6px) rotate(1.5deg);
  }
  52% {
    -webkit-transform: translate(-1.4px, 1.6px) rotate(0.5deg);
  }
  54% {
    -webkit-transform: translate(1.6px, -1px) rotate(-2deg);
  }
  56% {
    -webkit-transform: translate(1.3px, -1.6px) rotate(-2deg);
  }
  58% {
    -webkit-transform: translate(-1.3px, -1.6px) rotate(0.5deg);
  }
  60% {
    -webkit-transform: translate(1.3px, 1.6px) rotate(-0.5deg);
  }
  62% {
    -webkit-transform: translate(0px, 0px) rotate(-1.5deg);
  }
  64% {
    -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  66% {
    -webkit-transform: translate(1.6px, -1.6px) rotate(0.5deg);
  }
  68% {
    -webkit-transform: translate(0px, -1.6px) rotate(-2deg);
  }
  70% {
    -webkit-transform: translate(-1.6px, 1px) rotate(1.5deg);
  }
  72% {
    -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg);
  }
  74% {
    -webkit-transform: translate(1.3px, -1.6px) rotate(-0.5deg);
  }
  76% {
    -webkit-transform: translate(1.4px, 1px) rotate(-0.5deg);
  }
  78% {
    -webkit-transform: translate(-1px, 1.4px) rotate(2deg);
  }
  80% {
    -webkit-transform: translate(1.4px, 1.6px) rotate(2deg);
  }
  82% {
    -webkit-transform: translate(-1.6px, -1.6px) rotate(-0.5deg);
  }
  84% {
    -webkit-transform: translate(-1.4px, 1.4px) rotate(-2deg);
  }
  86% {
    -webkit-transform: translate(1px, 1.4px) rotate(-2deg);
  }
  88% {
    -webkit-transform: translate(-1.4px, 1.4px) rotate(-1.5deg);
  }
  90% {
    -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  92% {
    -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg);
  }
  94% {
    -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  96% {
    -webkit-transform: translate(-1.4px, 1.3px) rotate(-2deg);
  }
  98% {
    -webkit-transform: translate(1.3px, 1px) rotate(-0.5deg);
  }
}
@keyframes shaky-slow {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    transform: translate(-1px, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(1.3px, 0px) rotate(-0.5deg);
  }
  6% {
    transform: translate(1.4px, 1.4px) rotate(-2deg);
  }
  8% {
    transform: translate(-1.3px, -1px) rotate(-1.5deg);
  }
  10% {
    transform: translate(1.4px, 0px) rotate(-2deg);
  }
  12% {
    transform: translate(-1.3px, -1px) rotate(-2deg);
  }
  14% {
    transform: translate(1.5px, 1.3px) rotate(1.5deg);
  }
  16% {
    transform: translate(1.5px, -1.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(1.3px, -1.3px) rotate(-2deg);
  }
  20% {
    transform: translate(1px, 1px) rotate(-0.5deg);
  }
  22% {
    transform: translate(1.3px, 1.5px) rotate(-2deg);
  }
  24% {
    transform: translate(-1.4px, -1px) rotate(2deg);
  }
  26% {
    transform: translate(1.3px, -1.3px) rotate(0.5deg);
  }
  28% {
    transform: translate(1.6px, -1.6px) rotate(-1.5deg);
  }
  30% {
    transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
  }
  32% {
    transform: translate(-1px, 0px) rotate(2deg);
  }
  34% {
    transform: translate(1.3px, 1.3px) rotate(-0.5deg);
  }
  36% {
    transform: translate(1.3px, 1.6px) rotate(1.5deg);
  }
  38% {
    transform: translate(1.3px, -1.6px) rotate(1.5deg);
  }
  40% {
    transform: translate(-1.4px, -1px) rotate(-0.5deg);
  }
  42% {
    transform: translate(-1.4px, 1.3px) rotate(-0.5deg);
  }
  44% {
    transform: translate(-1.6px, 1.4px) rotate(0.5deg);
  }
  46% {
    transform: translate(-2.1px, -1.3px) rotate(-0.5deg);
  }
  48% {
    transform: translate(1px, 1.6px) rotate(1.5deg);
  }
  50% {
    transform: translate(1.6px, 1.6px) rotate(1.5deg);
  }
  52% {
    transform: translate(-1.4px, 1.6px) rotate(0.5deg);
  }
  54% {
    transform: translate(1.6px, -1px) rotate(-2deg);
  }
  56% {
    transform: translate(1.3px, -1.6px) rotate(-2deg);
  }
  58% {
    transform: translate(-1.3px, -1.6px) rotate(0.5deg);
  }
  60% {
    transform: translate(1.3px, 1.6px) rotate(-0.5deg);
  }
  62% {
    transform: translate(0px, 0px) rotate(-1.5deg);
  }
  64% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  66% {
    transform: translate(1.6px, -1.6px) rotate(0.5deg);
  }
  68% {
    transform: translate(0px, -1.6px) rotate(-2deg);
  }
  70% {
    transform: translate(-1.6px, 1px) rotate(1.5deg);
  }
  72% {
    transform: translate(-1.6px, 1.6px) rotate(2deg);
  }
  74% {
    transform: translate(1.3px, -1.6px) rotate(-0.5deg);
  }
  76% {
    transform: translate(1.4px, 1px) rotate(-0.5deg);
  }
  78% {
    transform: translate(-1px, 1.4px) rotate(2deg);
  }
  80% {
    transform: translate(1.4px, 1.6px) rotate(2deg);
  }
  82% {
    transform: translate(-1.6px, -1.6px) rotate(-0.5deg);
  }
  84% {
    transform: translate(-1.4px, 1.4px) rotate(-2deg);
  }
  86% {
    transform: translate(1px, 1.4px) rotate(-2deg);
  }
  88% {
    transform: translate(-1.4px, 1.4px) rotate(-1.5deg);
  }
  90% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  92% {
    transform: translate(-1.4px, 1.6px) rotate(2deg);
  }
  94% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  96% {
    transform: translate(-1.4px, 1.3px) rotate(-2deg);
  }
  98% {
    transform: translate(1.3px, 1px) rotate(-0.5deg);
  }
}
</style>

 
