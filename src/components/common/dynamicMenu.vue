<template>
  <div class="com-context-menu" ref="menu" v-if="visiable">
    <ul class="menu-ul" ref="menuUl">
      <template v-for="(item, index) in menus">
        <li
          class="menu-li"
          :class="{'disabled': item.disabled}"
          v-if="!item.hide"
          :key="index"
          @click.stop="clickMenuItem(item)"
          @mouseenter="mouseEnterItem(item)"
          @mouseleave="currentHoverName = ''"
        >
          <el-tooltip :disabled="!item.tooltip" :content="item.tooltip|| ''" placement="right">
            <div>
              <!-- 菜单icon -->
              <div
                class="menu-icon"
                v-if="item.icon"
                :style="{'background-image': currentHoverName === item.name && item.hoverIcon ? 'url('+item.hoverIcon+')' : 'url('+item.icon+')'}"
              ></div>
              <!-- 菜单名 -->
              <div class="menu-text">{{item.content}}</div>
              <!-- 分割线 -->
              <div v-if="item.borderBottom" class="divide-line"></div>
              <!-- 子菜单 -->
              <div
                class="menu-more el-icon-arrow-right"
                v-if="item.children && item.children.length"
              ></div>
              <div
                class="menu-children-wrp"
                :style="{'left':childMenuLeft}"
                v-if="item.children && item.children.length && currentHoverName === item.name"
              >
                <div
                  class="menu-child"
                  :class="{'menu-child-border': itm.borderBottom, 'disabled': itm.disabled}"
                  v-for="(itm,idx) in item.children"
                  :key="idx"
                  @click.stop="clickMenuItem(itm)"
                >
                  <el-tooltip
                    :disabled="!itm.tooltip"
                    :content="itm.tooltip|| ''"
                    placement="right"
                  >
                    <div>{{itm.content}}</div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </el-tooltip>
        </li>
      </template>
    </ul>
    <!-- 右上角关闭按钮 -->
    <i class="close-btn el-icon-circle-close" @click="close"></i>
  </div>
</template>
<script>
/**
 * usage:
 * 在需要右键的元素上绑定事件@contextmenu.prevent="Handler($event)"
 * context-menu组件上绑定属性：
 *    menus: 菜单  Array  content-内容描述
 *    position: 位置信息 Object x-x坐标 | y-y坐标 | op-点击操作栏则为true
 * context-menu组件上绑定事件：
 *    clickHandler: 菜单的点击事件 传递参数为点击的menuItem
 *    close: 关闭事件
 */
export default {
  inheritAttrs: false,
  name: "context-menu",
  props: ["menus"],
  data() {
    return {
      currentHoverName: "",
      childMenuLeft: "",
      position: {},
      visiable: false
    };
  },
  
  watch: {
    position(nVal) {
      this.$nextTick(() => {
        this.computePosition();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computePosition();
      let self = this;
      window.onresize = function() {
        self.computePosition();
      };

      document.body.addEventListener("click", () => {
        this.$emit("close");
      });
      document.body.addEventListener("contextmenu", () => {
        this.$emit("close");
      });
    });
  },
  destroyed() {
    document.body.removeEventListener("click", () => {
      this.$emit("close");
    });
    document.body.addEventListener("contextmenu", () => {
      this.$emit("close");
    });
  },
  methods: {
    show() {
      // console.log(event);
      this.visiable = true;
        this.position = {
          x: event.clientX,
          y: event.clientY,
          op: true
        };
    },
    close() {
       this.visiable = false
      //  this.$emit('close')
    },
    computePosition() {
      let menuEl = this.$refs.menu;
      if (menuEl) {
        let bodyHeight = document.body.clientHeight,
          bodyWidth = document.body.clientWidth,
          menuWidth = menuEl.offsetWidth,
          menuHeight = menuEl.offsetHeight,
          mouseX = this.position.x,
          mouseY = this.position.y;
        //判断高度是否超出屏幕
        if (bodyHeight - mouseY > menuHeight) {
          menuEl.style.top = `${mouseY}px`;
          menuEl.style.bottom = "unset";
        } else {
          // menuEl.style.bottom = `${bodyHeight - mouseY}px`;
          menuEl.style.bottom = 0;
          menuEl.style.top = "unset";
        }

        // 判断宽度是否超出屏幕
        if (bodyWidth - mouseX > menuWidth) {
          menuEl.style.left = `${mouseX}px`;
          menuEl.style.right = "unset";
        } else {
          // menuEl.style.right = `${bodyWidth - mouseX}px`;
          menuEl.style.right = this.position.op ? `${bodyWidth - mouseX}px` : 0;
          menuEl.style.left = "unset";
        }
      }
    },
    clickMenuItem(item) {
      if (!item.disabled) this.$emit("clickHandler", item);
    },
    mouseEnterItem(item) {
      this.currentHoverName = item.name;
      // 判断当前主菜单右侧距离是否够显示子菜单 不够则在主菜单左侧显示子菜单
      let distance =
        window.screen.width - this.position.x - this.$refs.menuUl.offsetWidth;
      this.childMenuLeft =
        distance < 210 ? "-210px" : this.$refs.menuUl.offsetWidth + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
.com-context-menu {
  position: fixed;
  z-index: 103;
  min-width: 210px;
  padding: 5px 0;
  background: #fff;
  border: 1px solid rgba(232, 232, 232, 1);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  .menu-ul {
    margin-bottom: 0;
  }
  .menu-li {
    position: relative;
    line-height: 32px;
    color: #303030;
    font-size: 14px;
    cursor: pointer;
    transition-duration: 0.2s;
    .menu-icon {
      position: absolute;
      left: 25px;
      top: 50%;
      width: 14px;
      height: 14px;
      margin-top: -8px;
      background-size: cover;
    }
    .menu-more {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #303030;
      font-weight: 600;
    }
    .menu-text {
      padding: 0 50px;
    }
    .divide-line {
      width: 100%;
      height: 1px;
      margin-bottom: 5px;
      border-top: 1px solid #efefef;
    }
    &:last-child {
      .divide-line {
        border: none;
      }
    }
    &:hover {
      background: #efefef;
    }
    .menu-children-wrp {
      position: absolute;
      bottom: 0;
      background: #fff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      .menu-child {
        width: 210px;
        height: 34px;
        line-height: 34px;
        padding-left: 30px;
        &:hover {
          background: #efefef;
        }
      }
      .menu-child-border {
        border-bottom: 1px solid #efefef;
      }
    }
  }
  .disabled {
    .menu-icon,
    .menu-text {
      opacity: 0.33;
    }
    cursor: not-allowed;
  }
  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    width: 18px;
    height: 18px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>


