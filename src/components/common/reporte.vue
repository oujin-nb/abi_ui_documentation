<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="title_box row-flex-start">
          <img class="img" :src="obj.icon">
          <div class="text">{{obj.title}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="reporte_body">
      <el-row :gutter="20" v-for="(item,index_1) in obj.pd" :key="index_1" class="row-flex-start">
        <el-col :span="Math.floor(24/item.list.length)" v-for="(i,index) in item.list" :key="index">
          <li class="banner_box row-start">
            <div :title="i.label" class="title ">{{i.label}}:</div>
            <div
              :title="obj.data[index_1][i.prop]"
              :class="item.list.length===1?'info_multiline':'info'"
            >{{obj.data[index_1][i.prop]}}</div>
          </li>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "report",
  created() {
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
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

 <style lang="scss" scoped>
.title_box {
  line-height: 40px;
  background: #f7f7f7;
  padding-left: 55px;
  margin-top: 10px;
  .img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  .text {
    vertical-align: middle;
    color: #333;
    font-weight: bold;
    font-size: 14px;
  }
}
.reporte_body {
  padding-left: 55px;
  padding-right: 55px;
}
.banner_box {
  border-radius: 4px;
  line-height: 30px;
  font-size: 14px;
  height: 100%;
  flex: 1;
  -webkit-flex: 1;
  .title {
    margin-right: 15px;
    color: #a8a6a6;
    height: 100%;
  }
  .info {
    flex: 1;
    -webkit-flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info_multiline {
    flex: 1;
    -webkit-flex: 1;
    white-space: normal;
    word-wrap: break-word;
    width: 80%;
  }
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
