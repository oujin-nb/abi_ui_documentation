
<template>
  <div>
    <div
      class="tree_option_banner nowrap"
      @click.stop="optionClick(item)"
      :style="{paddingLeft:(item._level*10+20)+'px'}"
      @mousedown="proventBlur"
    >
      <div
        class="expand_icon_wrapper c_c"
        v-if="item.children"
        :style="{left:(item._level*5+5)+'px'}"
      >
        <i
          class="el-icon-arrow-down tree_expand_icon c_c"
          :style="{transform:item.expand?'rotate('+0+'deg)':'rotate('+270+'deg)'}"
        ></i>
      </div>
      {{item.label}}
    </div>
    <!--展开后 -->
    <template v-if="item.expand&&item.children">
      <template v-for="(it,i) in item.children">
        <!-- 如果为展开项 -->
        <tree-select-item
          v-if="it.children && it.children.length>0"
          v-on="$listeners"
          :key="i"
          :item="it"
          :val="val"
        ></tree-select-item>
        <!-- 如果是展示项 -->
        <div
          class="tree_option_banner nowrap row-flex-start"
          :style="{paddingLeft:(it._level*10+20)+'px'}"
          @mousedown="proventBlur"
          style="color: #606764;"
          v-else
          @click.stop="()=>{$emit('valChange', it)}"
          :class="{'last_option_banner':i===(item.children.length-1),
          'active_tree_option_banner c_c':val.includes(it.label)
          }"
          :key="it.label"
        >{{it.label}}
        <i v-if="val.includes(it.label)" class="tree_option_selected_icon el-icon-check"></i>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
/* 
该组件用于formItems
*/
import store from './store.js'
export default {
  inheritAttrs: false,
  name: "tree-select-item",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    val: {}
  },
  computed:{
     selectedItem:{
      get(){
        return store.selectedItem
      },
      set(s){
        store.selectedItem = s
      }
    },
    selectedList:{
      get(){
        return store.selectedList
      },
      set(s){
        store.selectedList = s
      }
    }
  },
  created() {},
  methods: {
    proventBlur(e) {
      e.preventDefault();
    },
    optionClick(s) {
      s.expand = !s.expand;
    }
  }
};
</script>
<style lang="scss" scoped>
.triangle_up {
  width: 0;
  height: 0;
  position: absolute;
  top: calc(100% + 4px);
  left: 30px;
  z-index: 2009;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
  border-top-width: 0;
  border-bottom-color: #e8e8e8;
}
.triangle_up::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: 1px;
  left: -7px;
  z-index: 2010;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #fff;
  border-top-width: 0;
}
.tree_option_banner {
  font-size: 14px;
  // z-index: 2002;
  font-weight: bold;
  cursor: pointer;
  color: #999999;
  position: relative;
  margin-bottom: 1px;
  width: 100%;
  height: 34px;
  padding: 6px 0px 6px 20px;
  .tree_option_selected_icon {
    position: absolute;
    font-weight: bold;
    font-size: 12px;
    right: 15px;
    top: 10px;
  }
}
.active_tree_option_banner {
  background: #f5f7fa !important;
}
.last_option_banner {
  margin-bottom: 8px;
}
.last_option_banner::after {
  content: "";
  position: absolute;
  width: calc(100% - 40px);
  bottom: 0px;
  height: 1px;
  background: #e8e8e8;
  right: 20px;
}
.tree_option_banner:hover {
  background: #f5f7fa;
}
.expand_icon_wrapper {
  position: absolute;
  z-index: 2003;
  height: 12px;
  width: 12px;
  font-size: 12px;
  transform: scale(0.75);
  left: 5px;
  top: 7px;
  .tree_expand_icon {
    font-weight: bold;
    transform-origin: center center;
    transition: transform 0.3s;
  }
}

@keyframes slideShow {
  from {
    top: 0px;
  }
  to {
    top: calc(100% + 10px);
  }
}
@keyframes slideHide {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
.slide-enter-active {
  animation: slideShow 0.2s;
}
.slide-leave-active {
  animation: slideHide 0.2s;
}
</style>
