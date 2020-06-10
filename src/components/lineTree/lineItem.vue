<template>
  <div class="tree_item_box">
    <div
      class="column-start-start linkLine_default"
      v-for="(item,s_index) in list"
      :key="s_index"
      :class="{
                'linkLine_first': s_index===0&list.length>1,
                'linkLine_half_top': s_index===0&&list.length===1,
                'linkLine_last': (s_index===(list.length-1)&&s_index!==0),
                'third_layer':!item.children,
                'second_layer':item.children
        }"
    >
      <div
        class="row-flex-start basic_banner"
        @click="itemClick(item)"
        :class="{
          'active_color': item.expand
        }"
      >
        <div
          v-if="item.children"
          class="reTree_icon"
          :style="{height: (size||14*1.2) +'px',width: (size||14*1.2) +'px'}"
          :class="{
          'reTree_default_icon': item.children.length===0,
          'reTree_collapse_icon': item.expand && item.children.length>0,
          'reTree_expand_icon': !item.expand && item.children.length>0,
        }"
        ></div>
        <div
          class="layer_text nowrap"
          :class="{
          'active_color': item.expand
        }"
        >{{item.label}}</div>
      </div>
      <line-item
        :list="item.children"
        v-on="$listeners"
        :size="size"
        v-if="item.expand&&item.children&&item.children.length>0"
      ></line-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "line-item",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    size: {
      type: Number,
      default: 14
    }
  },
  methods: {
    itemClick(item) {
      item.expand = !item.expand;
      this.$emit("itemClick", item);
      if (!item.children) {
        this.$emit("valClick", item);
      }
    }
  }
};
</script>
<style lang='scss'>
.active_color {
  color: #7fb9a2 !important;
}
.reTree_box {
  overflow-y: auto;
}
.reTree_icon {
  width: 17px;
  height: 17px;
  margin-right: 10px;
}
.no_icon {
  width: 17px;
  height: 17px;
}
.tree_item_box {
  position: relative;
  width: 100%;
  cursor: pointer;
}
.basic_layer {
  width: 100%;
  position: relative;
  color: #606764;
  cursor: pointer;
  .layer_text {
    flex: 1;
  }
}
.first_vertical_line {
  content: "";
  position: absolute;
  width: 1px;
  left: 6px;
  top: 17px;
  background: #c3c5c8;
}
.basic_banner {
  position: relative;
  width: 100%;
  padding-bottom: 13px;
}
.second_layer {
  position: relative;
  width: 100%;
  cursor: pointer;
  padding-left: 25px;
}
.third_layer {
  position: relative;
  // padding-bottom: 15px;
  width: 100%;
  padding-left: 40px;
  color: #999999;
}

.second_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 16px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}
.third_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 22px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}

.linkLine_default::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.linkLine_first::after {
  content: "";
  position: absolute;
  /* 为了触顶 */
  top: -14px;
  height: calc(100% + 14px);
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
// 上半截
.linkLine_half_top::after {
  content: "";
  position: absolute;
  height: 24px;
  top: -14px;
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
.linkLine_last::after {
  content: "";
  position: absolute;
  height: 9px;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.reTree_collapse_icon {
  background: url("/static/image/reTree_collapse_.svg") no-repeat center center;
  background-size: contain;
}

.reTree_default_icon {
  background: url("/static/image/reTree_default_.svg") no-repeat center center;
  background-size: contain;
}

.reTree_expand_icon {
  background: url("/static/image/reTree_expand_.svg") no-repeat center center;
  background-size: contain;
}

.reTree_focus_icon {
  background: url("/static/image/reTree_focus_.svg") no-repeat center center;
  background-size: contain;
}
</style>