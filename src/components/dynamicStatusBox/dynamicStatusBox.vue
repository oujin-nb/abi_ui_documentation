
<template>
  <div class="div_component_banner" :class="{
      'border_none':list.length>0
    }">
    <div
      class="d_status_wrapper row-flex-start clear"
      @mouseenter="showAll"
      @mouseleave="backDefault"
      :class="{'d_status_wrapper_active':model==='detail'}"
    >
      <div class="d_status_banner_list">
        <div
          class="d_status_banner row-center c_hover"
          v-for="(item,index) in list"
          :key="index"
          :class="{
              'd_status_banner_active ': val && val.includes(item.prop),
              'd_status_border_radius':index===(list.length-1)&&model==='detail'
            } "
          @click="selected(item)"
          :style="{left:index*50+'px',zIndex:model==='detail'?200:0,background:val && val.includes(item.prop)?activeColor:'#ffffff'}"
        >{{item.label}}</div>
        <div
          class="d_status_banner row-center d_status_banner_more"
          :style="{left:list.length*50+'px',zIndex:model==='detail'?200:0}"
          v-if="model==='default'"
        >...</div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 动态状态菜单
 * 说明：根据动态数据生成状态数据
 * 参数：
 * 组件监听数据：val<Array>
 * ...
 * 选项渲染列表:options<Array>:
 * ...
 * }
 */
export default {
  created() {},
  props:{
    val:{},
    options:{},
    activeColor:{
      default:'#3E8EF7'
    },
  },
  
  model: {
    prop: "val",
    event: "change"
  },
  watch: {
    options: {
      handler(nV, oV) {
        this.init(nV);
        return nV;
      },
      deep: true
    },
    options: {}
  },
  methods: {
    init(list) {
      (this.model = list.length > 4 ? "default" : "detail"),
        (this.list = list.length > 4 ? list.slice(0, 4) : list);
    },
    selected(s) {
      // this.$emit("statusBoxChange", s.prop);
      let index = this.innerVal.findIndex(x => {
        return x === s.prop;
      });
      index === -1
        ? this.innerVal.push(s.prop)
        : this.innerVal.splice(index, 1);
      this.$emit("change", this.innerVal);
    },
    init(list) {
      this.model = list.length > 4 ? "default" : "detail";
      this.list = list.length > 4 ? list.slice(0, 4) : list;
    },
    showAll() {
      if (this.options.length < 4) return;
      this.list = this.options;
      this.model = "detail";
    },
    backDefault() {
      if (this.options.length < 4) return;
      this.list = [
        ...new Set([
          ...this.options.filter(x => {
            return this.val.includes(x.prop);
          }),
          ...this.options
        ])
      ].slice(0, 4);
      this.model = "default";
    }
  },
  data() {
    return {
      innerVal: [],
      model: this.options.length > 4 ? "default" : "detail",
      list: this.options.length > 4 ? this.options.slice(0, 4) : this.options
    };
  }
};
</script>

<style scoped lang="scss" >
.div_component_banner {
  height: 36px;
  // border: 1px solid #ddd;
  border-radius: 0px 4px 4px 0px;
  // border-left: none;
}
.d_status_wrapper {
  position: relative;
  width: 100%;
  // padding-left: 90px;
  // height: 36px;
  border-radius: 4px;
  //   border: 1px solid rgba(236, 236, 236, 1);
}
.d_status_wrapper_active {
  // box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
}
.d_status_banner_list {
  position: relative;
  height: 100%;
  width: 200px;
  height: 100%;
  background: #ffffff;
}
.d_status_banner_active {
  // background: #7fb9a2 !important;
  color: #ffffff !important;
}
.c_bc {
  // background: #7fb9a2 !important;
}
.d_status_banner {
  position: absolute;
  z-index: 200;
  padding: 0px 16px;
  width: 50px;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // border: 1px solid #ddd;
  border-left: none;
  color: #5a6677;
  font-size: 14px;
  background: #ffffff;
  cursor: pointer;
}
.d_status_banner_more {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>

