<template>
  <div class="textarea-test">
    <textarea
      class="text-area"
      id="text_area"
      ref="textArea"
      style="resize:none"
      :style="{'font-size': `${fontSize || 14}px`}"
      @input="keyuphandler"
      v-model="textValue"
    ></textarea>
    <div
      class="relative"
      :style="{'font-size': `${fontSize || 14}px`}"
      ref="coverText"
      v-html="textHtml"
    ></div>
  </div>
</template>

<script>
/**
 * keywords<Array>-关键词
 * textValue<String>-文字
 * fontSize<Number>-字号
 * hightLightColor<String>-高亮色
 * procedureName<String>-检查项目
 * comparison<String>-对比项（影像所见/影像诊断）
 */
export default {
  inheritAttrs: false,
  name: "hightLight",
  model: {
    prop: "textValue",
    event: "input"
  },
  props: [
    // "keywordList",
    "keywords",
    // "val",
    "fontSize",
    "hightLightColor"
  ],
  data() {
    return {
      textValue: "",
      textHtml: "" // 显示在界面上可显示高亮的文字html字符串
      //   keywords: [], // 关键字列表
    };
  },
  watch: {
    // keywordList: {
    //   handler(n, o) {
    //     if (n.length) {
    //       this.keywords = n;
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // 关键词变化则重新执行高亮方法
    // val:
    keywords: {
      handler(n, o) {
        if (n.length) {
          this.$nextTick(() => {
            let text = this.$refs.textArea.innerText;
            this.markHighLight(text);
          });
        }
      },
      deep: true,
      immediate: true
    },
    val(n, o) {}
    // // 外部本文内容变化则重新执行高亮方法
    // textValue(n, o) {
    //   this.$nextTick(() => {
    //     let text = this.$refs.textArea.innerText;
    //     this.markHighLight(text);
    //   });
    // }
  },
  methods: {
    // keyup监听输入
    keyuphandler(e) {
      let text = this.textValue;
      // '<' '>'关键符号替换为转义字符，避免与html标签语法冲突
      text = text.replace(new RegExp("<", "g"), "&lt;");
      text = text.replace(new RegExp(">", "g"), "&gt;");
      text = text.replace(new RegExp(" ", "g"), "&nbsp;");
      this.markHighLight(text); // 边输入边高亮关键字
    },
    setValue(s) {
      // console.log(s)
      this.textValue = s;
      this.$nextTick(() => {
        this.keyuphandler();
        this.moveEnd();
      });
    },
    moveEnd() {
      let dom = document.getElementById("text_area");
      let newSite = this.textValue.length;
      dom.setSelectionRange(newSite, newSite);
    },

    /**
     * 将文字高亮
     * 核心是将高亮词替换为span标签,并且span标签绑定高亮颜色的style样式
     * 换行: 将\n替换为<br/>
     */
    markHighLight(text) {
      let textStr = text.replace(new RegExp("\n", "g"), "<br/>");
      let color =
        this.hightLightColor == undefined ? "red" : this.hightLightColor;
      let style = `style = "color:${color};"`;
      //   // 边输入边判断左右关键字
      //   this.leftRightHandler(this.procedureName, text, this.comparison);

      if (this.keywords && this.keywords.length) {
        let tempArr = [];
        this.keywords.forEach((k, index) => {
          var reg = new RegExp(k, "g");
          textStr = textStr.replace(reg, `<span ${style}>${k}</span>`);
        });
      }
      this.textHtml = textStr;
    }
  }
};
</script>

<style lang="scss">
.textarea-test {
  width: 100%;
  height: 100%;
  position: relative;
  .text-area {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 10px;
    border: none;
    color: transparent;
    background: transparent;
    // color: rgba($color: red, $alpha: 0.5);
    -webkit-user-modify: read-write-plaintext-only; // css设置只可输入纯文本
    caret-color: black;
    // &:focus {
    //   border-color: #409eff;
    // }
    // &[contenteditable="false"] {
    //   background: #eee;
    // }
    // &[contenteditable="true"] {
    //   background: transparent;
    // }
  }
  .relative {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: #585858;
  }
}
</style>