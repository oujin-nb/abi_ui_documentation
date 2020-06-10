<template>
  <div
    class="content column-start-center reTree_box"
    :style="{fontSize: (size||14) +'px',lineHeight:(size||14) +'px'}"
    style="width:347px"
  >
    <div class="column-start-center basic_layer" v-for="(item,index) in formatData" :key="index">
      <div
        class="row-flex-start basic_banner"
        :class="{
          'active_color': item.expand && item.children.length>0,
          
        }"
        @click="itemClick(item)"
      >
        <div
          class="reTree_icon"
          :style="{height: (size||14*1.2 )+'px',width: (size||14*1.2) +'px'}"
          :class="{
          'reTree_default_icon': item.children.length===0,
          'reTree_collapse_icon': item.expand && item.children.length>0,
          'reTree_expand_icon': !item.expand && item.children.length>0,
        }"
        ></div>
        <div class="layer_text nowrap">{{item.label}}</div>
      </div>

      <lineItem v-if="item.expand&&item.children.length>0" v-on="$listeners" :list="item.children" :size="size"></lineItem>
    </div>
  </div>
</template>
<script>
import lineItem from "./lineItem.vue";
export default {
  inheritAttrs: false,
  props: {
    pd: {},
    size: {
      type: Number,
      default: 14
    }
  },
  components: { lineItem },
  data() {
    return {
      selectedDetail: {},
      timer: {},
      formatData: []
    };
  },
  watch: {
    pd(n, o) {
      this.formatData = this.preDealData(n);
      console.log(this.formatData);
    }
  },
  created() {
    console.log("lineTree create");
    this.preDealData(this.pd);
  },

  methods: {
    preDealData(list) {
      list.forEach(x => {
        if (!x.expand) this.$set(x, "expand", false);
        if (x.children && x.children.length > 0) this.preDealData(x.children);
      });
      return list;
    },
    // 根据id展开树的具体项
    expandTreeItemById(idList) {
      let _this = this;
      function loopTree(list) {
        list.forEach(x => {
          if (idList.includes(x.id)) {
            _this.$set(x, "expand", true);
          } else {
            _this.$set(x, "expand", false);
          }
          if (x.children && x.children.length > 0) loopTree(x.children);
        });
        return list;
      }
      this.formatData = loopTree(this.pd);
    },
    itemClick(item){
      item.expand=!item.expand
      this.$emit('itemClick',item)
    },
    // 详情点击
    detailClick(data) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.selectedDetail = data;
        this.$emit("detailClick", data);
      }, 300);
    },
    detailDoubleClick(data) {
      clearTimeout(this.timer);
      this.selectedDetail = data;
      this.$emit("detailDoubleClick", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.active_color{
    color: #7fb9a2!important;
}
.reTree_box {
  overflow-y: auto;
}
.reTree_icon {
  width: 17px;
  height: 17px;
  margin-right: 10px;
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
  padding-bottom: 15px;
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
  width: 20px;
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