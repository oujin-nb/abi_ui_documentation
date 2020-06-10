<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='scss'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
/*滚动条整体部分,必须要设置*/
::-webkit-scrollbar {
  // background-color: #999999;
  width: 9px;
  height: 9px;
  cursor: pointer !important;
}
/*滚动条的轨道*/
::-webkit-scrollbar-track {
  background-color: lighten(#999999, 35%);
  border-radius: 10px;
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  cursor: pointer;
  border-style: dashed;
  background-color: lighten(#999999, 25%);
  border-color: transparent;
  border-width: 1px;
  background-clip: padding-box;
}
.el-card__header {
  background: #f8f8f8;
  color: #182632;
}
.el-card__body {
  pre {
    code {
      background: #f8f8f8 !important;
      color: #2973b7 !important;
    }
  }
}
</style>
