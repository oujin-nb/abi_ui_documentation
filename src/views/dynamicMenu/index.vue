
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <el-button @click="test">点击出现菜单</el-button>
      <el-button @click="$refs.dynamicMenu.close()">点击隐藏菜单</el-button>
    </el-card>

    <el-card class="expland_text box-card" shadow="hover"  >
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件用于动态生成菜单选项</div>
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
        <span>方法说明</span>
      </div>
      <TreeTable
        border
        :expandAll="true"
        :opt="fcnParamOpt"
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
    <dynamicMenu :menus="meaus" ref="dynamicMenu" @clickHandler="clickHandler"></dynamicMenu>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      meausVisable: false,
      meaus: [
        {
          content: "选项1",
          name: "examWindowExamCall",
          fn: "optionClick"
        },
        {
          content: "选项2",
          name: "examMethod",
          fn: "optionClick",
          borderBottom: true
        },
        {
          content: "选项3",
          name: "transferRoom",
          fn: "optionClick",
          borderBottom: true
        },
        {
          content: "选项4",
          name: "examTrack",
          icon: "/static/image/menus/exam-track.svg",
          fn: "optionClick"
        },
        { content: "选项5", name: "examRalete", fn: "optionClick" },
        {
          content: "选项6",
          name: "viewRequest",
          icon: "/static/image/menus/view-request.svg",
          fn: "optionClick",
          borderBottom: true
        },
        {
          content: "选项7",
          name: "editPatientInfo",
          fn: "optionClick",
          disabled: true
        },
        {
          content: "选项8",
          name: "editOrder",
          fn: "optionClick",
          borderBottom: true,
          disabled: true
        },
        {
          content: "选项9",
          name: "print",
          icon: "/static/image/menus/print.svg",
          borderBottom: true,
          children: [
            {
              content: "选项9-1",
              name: "printLableFilm",
              fn: "optionClick"
            },
            {
              content: "选项9-2",
              name: "printOrderFilm",
              fn: "optionClick"
            },
            {
              content: "选项9-3",
              name: "printTakeFilm",
              fn: "optionClick"
            },
            {
              content: "选项9-4",
              name: "printReceiptFilm",
              fn: "optionClick"
            }
          ]
        },
        {
          content: "选项10",
          name: "lock",
          icon: "/static/image/menus/lock.svg",
          fn: "optionClick"
        },
        {
          content: "选项11",
          name: "unlock",
          icon: "/static/image/menus/unlock.svg",
          fn: "optionClick",
          borderBottom: true
        },
        { content: "选项12", name: "cancelAuth", fn: "optionClick" }
      ],
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "meaus",
            type: "list<Object>",
            explain: "菜单栏配置",
            children: [
              { name: "content", type: "String", explain: "菜单名" },
              { name: "name", type: "String", explain: "菜单属性" },
              { name: "icon", type: "String", explain: "图标路径" },
              { name: "fn", type: "String", explain: "选项对应事件名" },
              {
                name: "borderBottom",
                type: "Boolean",
                explain: "是否需要下划线"
              },
              { name: "disabled", type: "Boolean", explain: "是否禁用" }
            ]
          }
        ]
      },
      fcnParamOpt: {
        pd: [
          { label: "方法名", prop: "name" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "show",
            explain: "菜单栏显示"
          },
          {
            name: "close",
            explain: "菜单栏关闭"
          },
          {
            name: "clickHandler",
            explain: "选项点击事件,返回每个选项事件名"
          }
        ]
      }
    };
  },
  methods: {
    test() {
      this.$refs.dynamicMenu.show();
    },
    clickHandler(s) {
      this.$message(s.content + "被点击" + "将调用方法" + s.fn);
    }
  }
};
</script>
<style lang="less">
.box-card{
    margin-bottom: 30px;
}
</style>