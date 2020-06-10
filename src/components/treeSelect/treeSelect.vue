
<template>
  <div class="tree_select_wrapper" id="tree_select_wrapper">
    <input
      class="tree_select_box row-flex-start"
      ref="input"
      readonly="readonly"
      autocomplete="off"
      @click="optionBoxVisable()"
      @blur="blurEvent"
    />
    <i
      class="div_arrow_icon arrow_icon"
      :style="{transform:optionBoxVisble?'rotate('+180+'deg)':'rotate('+0+'deg)'}"
    ></i>
    <transition name="slide">
      <div class="triangle_up" v-if="optionBoxVisble"></div>
    </transition>
    <!-- 展开部分 -->
    <transition name="slide">
      <div
        class="option_box column-start-center"
        ref="option_box"
        id="option_box"
        :style="{paddingBottom:operateVisiable?'60px':'10px'}"
        v-if="optionBoxVisble"
        @click.stop
      >
        <div class="option_wrapper">
          <template v-for="(item,index) in options">
            <!-- 如果为展开项 -->
            <tree-select-item
              v-if="item.children && item.children.length>0"
              :key="index"
              :item="item"
              :val="val"
              @valChange="updataVal"
              v-on="$listeners"
            ></tree-select-item>
            <!-- 如果是展示项 -->
            <div
              class="tree_option_banner nowrap row-flex-start"
              style="color: #606764;"
              @mousedown="proventBlur"
              v-else
              @click.stop="updataVal(item)"
              :class="{'last_option_banner':index===(item.children.length-1),
                'active_tree_option_banner c_c':val.includes(item.label)
                }"
              :key="item.label"
            >
              {{item.label}}
              <i
                v-if="val.includes(item.label)"
                class="tree_option_selected_icon el-icon-check"
              ></i>
            </div>
          </template>
        </div>
        <!-- 是否显示操作框 -->
        <div
          class="operate_banner row-space-between"
          @mousedown="proventBlur"
          v-if="operateVisiable&&multiple"
        >
          <span class="operete_but row-flex-start" @click="allSelected">全选</span>
          <span class="operete_but row-center" @click="reverseSelected">反选</span>
          <span class="operete_but row-flex-end" @click="clear">清空</span>
        </div>
      </div>
    </transition>

    <div class="tree_select_data_banner row-flex-start" @click="optionBoxVisable()">
      <template v-if="multiple&&val.length>0">
        <div class="multiple_banner">
          {{val[0]}}
          <i
            class="el-icon-error multiple_banner_close_icon"
            @click.stop="popSelectedList"
          ></i>
        </div>
        <div class="multiple_banner" v-if="this.val.length>1">+{{this.val.length-1}}</div>
      </template>
      <template v-if="!multiple">{{this.val}}</template>
    </div>

    <!-- </input> -->
  </div>
</template>

<script>
import treeSelectItem from "./treeSelectItem.vue";
import store from "./store.js";
/* 
该组件用于formItems
*/
export default {
  components: { treeSelectItem },
  props: {
    // 监听值
    value: {
      required: true
    },
    // 是否显示操作栏
    operateVisiable: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    optionList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  computed: {
    options(s) {
      return this.prehandleOption(this.optionList);
    },
    selectedItem: {
      get() {
        return store.selectedItem;
      },
      set(s) {
        store.selectedItem = s;
      }
    },
    selectedList: {
      get() {
        return store.selectedList;
      },
      set(s) {
        store.selectedList = s;
      }
    }
  },
  data() {
    return {
      val: this.value,
      optionBoxVisble: false
    };
  },
  // 手动双向绑定
  // 将porp换算成label
  // 更新内部监听数据selectedList
  watch: {
    value(n, o) {
      this.tranPropToLable(n);
    }
  },
  created() {
    this.tranPropToLable(this.value);
  },
  mounted() {},

  methods: {
    // 失焦关闭展开项
    blurEvent() {
      this.optionBoxVisble = false;
    },
    // 阻止失焦
    proventBlur(e) {
      e.preventDefault();
    },
    // 递归处理原始数据
    prehandleOption(list, level = 0, pId) {
      // console.log(list);
      list.forEach((x, index) => {
        x._level = level;
        if (level === 0) {
          x.rootFlag = true;
        }
        x.id = x.prop;
        x.pId = pId || "";
        if (x.children && x.children.length > 0) {
          // 如果该项内有子项被选中,则该项展开
          this.$set(x, "expand", false);
          this.prehandleOption(x.children, level + 1, x.prop);
        }
      });
      return list;
    },
    // 根据prop展开特定项
    itemExpand(item) {
      // 寻找父元素
      if (!item.pId) return;
      let pItem = this.loopOptionsByProp(this.options, item.pId);
      this.$set(pItem, "expand", true);
      if (pItem.prop && !pItem.rootFlag && pItem._level !== 0) {
        this.itemExpand(pItem);
      }
    },
    // 通过prop在Options树内寻找匹配项
    loopOptionsByProp(list, prop) {
      let resItem = {};
      if (!prop) {
        return resItem;
      }
      function loopOptions(list) {
        list.some(x => {
          if (x.prop == prop) {
            resItem = x;
            return true;
          }
          if (x.children && x.children.length > 0 && x.prop !== prop) {
            loopOptions(x.children, prop);
          }
        });
      }
      loopOptions(list);
      return resItem;
    },
    // 展开/关闭展开项
    optionBoxVisable() {
      if (!this.optionBoxVisble) this.$emit("optionBoxVisble"); //如果是展开则分发事件
      this.optionBoxVisble = !this.optionBoxVisble;
    },
    // 从数组尾部删除数据
    popSelectedList() {
      this.selectedList.pop();
      this.$emit(
        "change",
        this.selectedList.map(x => {
          return x.prop;
        })
      );
    },
    // 根据触发序列获取绑定数据
    getModelData(modelQuence) {
      let quence = modelQuence.split(".");
      let model = this.$parent;
      quence.forEach(x => {
        model = model[x];
      });
      return model;
    },
    /* 
    手动双向绑定
    */
    updataVal(s) {
      // console.log(s);
      if (this.multiple) {
        if (
          this.selectedList.find(y => {
            return y.prop === s.prop;
          })
        ) {
          this.selectedList.splice(
            this.selectedList.findIndex(x => {
              return x.label === s.label;
            }),
            1
          );
        } else {
          this.selectedList.push(s);
        }
        // console.log(this.selectedList);
        // this.$emit(
        //   "updataVal",
        //   this.selectedList.map(x => {
        //     return x.prop;
        //   })
        // );
        this.$emit(
          "change",
          this.selectedList.map(x => {
            return x.prop;
          })
        );
      } else {
        this.selectedItem = s;
        this.$emit("change", s.prop);
      }
    },
    tranPropToLable(n) {
      if (this.multiple) {
        // if (n.length === 0) return;
        let list = [];
        this.val = n.map(x => {
          let _selectedItem = this.loopOptionsByProp(this.options, x);
          list.push(_selectedItem);
          this.itemExpand(_selectedItem);
          return _selectedItem.label;
        });
        // 更新selectedList
        this.selectedList = list;
      } else {
        // if (n === "") return;
        let selectedItem = this.loopOptionsByProp(this.options, n);
        if (selectedItem.prop) {
          this.$set(this, "val", selectedItem.label);
          this.itemExpand(selectedItem);
        }
      }
    },
    /* 
    全选
    递归展开全部展开项
    */
    allSelected() {
      let resList = [];
      function loopOptions(list) {
        list.forEach(x => {
          if (x.children && x.children.length > 0) {
            x.expand = true;
            loopOptions(x.children);
          } else {
            resList.push(x);
          }
        });
      }
      loopOptions(this.options);
      this.selectedList = resList;
      this.$emit(
        "change",
        this.selectedList.map(x => {
          return x.prop;
        })
      );
    },
    /* 
    反选
    */
    reverseSelected() {
      let resList = [];
      let _this = this;
      function loopOptions(list) {
        list.forEach(x => {
          if (x.children && x.children.length > 0) {
            x.expand = true;
            loopOptions(x.children);
          } else {
            if (!_this.selectedList.includes(x)) {
              resList.push(x);
            }
          }
        });
      }
      loopOptions(this.options);
      this.selectedList = resList;
      this.$emit(
        "change",
        this.selectedList.map(x => {
          return x.prop;
        })
      );
    },
    /* 
    清空
    */
    clear() {
      this.selectedList = [];
      this.$emit("change", []);
    }
  }
};
</script>
<style lang="scss" scoped>
.tree_select_wrapper {
  height: 36px;
  width: 340px;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: relative;
  .label_style {
    padding: 0 12px;
    text-align-last: justify;
    line-height: 36px;
    font-size: 14px;
    height: 100%;
    background: #fff;
    color: #777;
    width: 90px;
    border-radius: 4px 0px 0px 4px;
  }
  .cut_line {
    position: absolute;
    left: 75px;
    top: 50%;
    margin-top: -10px;
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    height: 20px;
    background: #e8e8e8;
    margin-left: 10px;
  }
  .tree_select_banner {
    flex: 1;
    height: 100%;
  }
  // 多选框banner
  .multiple_banner {
    color: #909399;
    background: #f0f2f5;
    margin: 2px 0 2px 6px;
    height: 20px;
    padding: 0 5px;
    line-height: 19px;
    border-color: transparent;
    font-size: 14px;
    white-space: nowrap;
    border-radius: 5px;
    .multiple_banner_close_icon {
      color: #c0c4cc;
    }
    .multiple_banner_close_icon:hover {
      color: #909399;
    }
  }
}
.div_arrow_icon {
  width: 9px;
  height: 9px;
  background: url("../../../static/image/form_arrow_up.svg") no-repeat center
    center;
  background-size: contain;
}
.tree_select_box {
  //   position: relative;
  height: 34px;
  cursor: pointer;
  color: #606764;
  padding: 6px 0px 6px 6px;
  border-color: transparent;
  width: 100%;
  border-radius: 0px 4px 4px 0px;
  //   border: 1px solid rgba(236, 236, 236, 1);
  background: #fff;
  max-width: 1000px;
}
.tree_select_data_banner {
  position: absolute;
  // height: 34px;
  top: 5px;
  left: 0px;
  // width: 100%;
  // padding: 5px;
  padding-left: 10px;
}
.arrow_icon {
  position: absolute;
  transform-origin: center center;
  transition: transform 0.2s;
  right: 15px;
  top: calc(50% - 7px);
}

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

.option_box {
  position: absolute;
  z-index: 2000;
  padding: 10px 0px;
  top: calc(100% + 10px);
  left: 0px;
  background: #fff;
  width: 100%;
  border-radius: 4px;
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(232, 232, 232, 1);
  // padding-bottom: 60px;
  .tree_option_banner {
    font-size: 14px;
    // z-index: 2002;
    cursor: pointer;
    margin-bottom: 1px;
    color: #999999;
    position: relative;
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
  .option_wrapper {
    width: 100%;
    overflow-y: auto;
    flex: 1;
  }
  .operate_banner {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2002;
    padding: 0 14px;
    background: #fff;
    height: 60px;
    .operete_but {
      width: 60px;
      cursor: pointer;
      height: 32px;
      color: #999 !important;
      font-size: 14px;
    }
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
    font-size: 12px;
    transform: scale(0.75);
    left: 5px;
    top: 7px;
    .expand_icon {
      font-weight: bold;
      transform-origin: center center;
      transition: transform 0.3s;
    }
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
