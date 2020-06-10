
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例(当前关键词123)</span>
      </div>
      <div style="height:100px">
        <dynamicInput
          :keywords="keywords"
          :hightLightColor="color"
          ref="dynamicInput"
          :fontSize="20"
        ></dynamicInput>
      </div>
      <el-button @click="test">赋值测试</el-button>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件用于自动识别传入组件的关键词在进行输入时将自动高亮关键词进行提示</div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>参数说明</span>
      </div>
      <TreeTable
        border
        :expandAll="true"
        :opt="paramOpt"
        highlight-current-row
        header-align="center"
        align="center"
      ></TreeTable>
    </el-card>

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>代码</span>
      </div>
      <pre v-highlightjs>
          <code class="javascript">
            export default {
                data() {
                  return {
                    textValue: "2222123",
                    keywords: ["123"],
                    color: "#EB7B68",
                  };
                },
                methods: {
                  test() {
                    this.$refs.dynamicInput.setValue("1233333333333333213212333");
                  }
                }
            };
        </code>
        </pre>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      textValue: "2222123",
      keywords: ["123"],
      color: "#EB7B68",
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "keywords",
            type: "list<String>",
            explain: "关键词列表"
          },
          {
            name: "fontSize",
            type: "String",
            explain: "字体大小"
          },
          {
            name: "hightLightColor",
            type: "String",
            explain: "高亮色"
          }
        ]
      }
    };
  },
  methods: {
    test() {
      this.$refs.dynamicInput.setValue("1233333333333333213212333");
    }
  }
};
</script>
<style lang="less">
</style>