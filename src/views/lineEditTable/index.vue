
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <LineEditTable
          :opt="obt"
          @editStart="(val)=>{editStart(val)}"
          @editEnd="(val)=>{editEnd(val)}"
        ></LineEditTable>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该表格组件分为静态文字和动态输入框两种展示方式,填充数据后将自动生成表格和右侧编辑栏,点击选择列编辑按钮该列将自动进入编辑模式,再次点击退出,进入与退出分别触发事件</div>
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
      <BasicTable
        border
        :expandAll="true"
        :opt="methodOpt"
        highlight-current-row
        header-align="center"
        align="center"
      ></BasicTable>
    </el-card>


    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>代码</span>
      </div>

      <pre v-highlightjs><code class="javascript" style="background:#4B4B4B">
  created() {},
  data() {
    return {
      obt: {
        pd: [
          {
            label: "字典1",
            prop: "item1",
            sort: true,
            width: "200"
          },
          {
            label: "字典2",
            prop: "item2",
            sort: true,
            width: "200"
          },
          { label: "字典3", prop: "item3", sort: true, width: "100" },
          {
            label: "字典4",
            prop: "item4",
            sort: true,
            width: "200"
          }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          }
        ]
      },
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "opt",
            type: "object",
            explain: "参数集合",
            children: [
              { name: "indexTable", type: "boolean", explain: "是否开启索引" },
              {
                name: "checkTable",
                type: "boolean",
                explain: "是否开启check框"
              },
              { name: "data", type: "list", explain: "显示的数据" },
              {
                name: "pd",
                type: "list",
                explain: "列编辑数据",
                children: [
                  { name: "label", type: "string", explain: "列名" },
                  { name: "prop", type: "string", explain: "列名对应参数名" },
                  { name: "sort", type: "boolean", explain: "该列是否排序" },
                  { name: "fix", type: "boolean", explain: "该列是否固定" },
                  { name: "width", type: "number", explain: "该列宽度" }
                ]
              }
            ]
          }
        ]
      },
      methodOpt: {
        pd: [
          { label: "方法名", prop: "name" },
          { label: "参数", prop: "param" },
          { label: "说明", prop: "explain" }
        ],
        // 页面数据
        data: [
          { name: "editStart", param: "选中行数据", explain: "选中行编辑开始" },
          { name: "editEnd", param: "选中行数据", explain: "选中行编辑结束" },
        ]
      }
    };
  },
  methods: {
    editStart(v) {
      console.log(v);
      console.log("edit start");
      this.$message("哇,你竟然触发了editStart事件");
    },
    editEnd(v) {
      console.log(v);
      console.log(this.obt.data);
      this.$message("哇,你竟然触发了editEnd事件");
    }
  }
};

        </code></pre>
    </el-card>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      obt: {
        pd: [
          {
            label: "字典1",
            prop: "item1",
            sort: true,
            width: "200"
          },
          {
            label: "字典2",
            prop: "item2",
            sort: true,
            width: "200"
          },
          { label: "字典3", prop: "item3", sort: true, width: "100" },
          {
            label: "字典4",
            prop: "item4",
            sort: true,
            width: "200"
          }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "234",
            item5: "123",
            item6: "123",
            item7: "312"
          }
        ]
      },
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "opt",
            type: "object",
            explain: "参数集合",
            children: [
              { name: "indexTable", type: "boolean", explain: "是否开启索引" },
              {
                name: "checkTable",
                type: "boolean",
                explain: "是否开启check框"
              },
              { name: "data", type: "list", explain: "显示的数据" },
              {
                name: "pd",
                type: "list",
                explain: "列编辑数据",
                children: [
                  { name: "label", type: "string", explain: "列名" },
                  { name: "prop", type: "string", explain: "列名对应参数名" },
                  { name: "sort", type: "boolean", explain: "该列是否排序" },
                  { name: "fix", type: "boolean", explain: "该列是否固定" },
                  { name: "width", type: "number", explain: "该列宽度" }
                ]
              }
            ]
          }
        ]
      },
      methodOpt: {
        pd: [
          { label: "方法名", prop: "name" },
          { label: "参数", prop: "param" },
          { label: "说明", prop: "explain" }
        ],
        // 页面数据
        data: [
          { name: "editStart", param: "选中行数据", explain: "选中行编辑开始" },
          { name: "editEnd", param: "选中行数据", explain: "选中行编辑结束" },
        ]
      }
    };
  },
  methods: {
    editStart(v) {
      console.log(v);
      console.log("edit start");
      this.$message("哇,你竟然触发了editStart事件");
    },
    editEnd(v) {
      console.log(v);
      console.log(this.obt.data);
      this.$message("哇,你竟然触发了editEnd事件");
    }
  }
};
</script>
<style lang="less">
</style>