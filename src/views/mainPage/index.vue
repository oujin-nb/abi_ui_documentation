
<template>
  <div>
    <!-- <el-card class="box-card" style="margin-bottom:50px">
      <div slot="header" class="clearfix">
        <span>使用方法</span>
      </div>
      <el-steps :active="3"   style="height: 300px;">
        <el-step title="步骤 1" description="npm i abs_element_ui"></el-step>
        <el-step title="步骤 2" description="import absElementUi from 'abs_element_ui"></el-step>
        <el-step title="步骤 3" description="Vue.use(absElementUi)"></el-step>
      </el-steps>
    </el-card> -->

    <el-card class="box-card" style="margin-bottom:50px">
      <div slot="header" class="clearfix">
        <span></span>
      </div>
      <div class="candle_box" id='candleBox'></div>
    </el-card>


    <!-- <el-card class="box-card" style='margin-bottom:50px'>
      <div slot="header" class="clearfix">
        <span>说明</span>
      </div>
      <span class="expland_text">
        <span style="color:#3E8EF7">abi_element_ui</span> 是基于 Vue2.0,对Element UI中的组件基于业务进行二次封装,所有的组件构建完全由数据驱动生成，
        组件内的所有方法将分发到页面组件统一处理,以达到最大化数据驱动为目的，极大的减少开发前端页面开发和维护成本,同时由于是基于element-ui开发,所有element组件的原生方法都将得到支持
      </span>
    </el-card>
    <el-card class="box-card" style='margin-bottom:50px'>
      <div slot="header" class="clearfix">
        <span>注意</span>
      </div>
      <span class="expland_text" style="color:red">
        本项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill 
      </span>
    </el-card> -->
  </div>
</template>
<script>
// 引入 ECharts 主模块

export default {
  created() {},
  data() {
    return {};
  },
 
  getChartData(){

  },
};
</script>
<style lang="less" scoped>
.expland_text {
  font-size: 14px;
  color: #182632;
  line-height: 30px;
}
.candle_box{
  width: 100%;
  height: 300px;
}
</style>