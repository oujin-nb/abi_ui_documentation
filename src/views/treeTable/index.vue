
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <TreeTable border :opt="obt" highlight-current-row header-align="center" align="center"></TreeTable>
      </div>
    </el-card>

    <el-card class="box-card expland_text" shadow="hover">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件将根据传入数据格式自动生成树形表格</div>
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

      <pre v-highlightjs><code class="javascript" style="background:	#4B4B4B">

export default {
  created() {},
  data() {
    return {
      obt: {
        editTable: false,
        pd: [
          { label: "字典1", prop: "item1" },
          { label: "字典2", prop: "item2" },
          { label: "字典3", prop: "item3" },
          { label: "字典4", prop: "item4" },
          { label: "字典5", prop: "item5" },
          { label: "字典6", prop: "item6" },
          { label: "字典7", prop: "item7" }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123",
            children: [
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123",
                children: [
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  },
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  },
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  }
                ]
              },
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123"
              },
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123"
              }
            ]
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          }
        ]
      }
    };
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
                  { name: "prop", type: "string", explain: "列名对应参数名" }
                ]
              }
            ]
          }
        ]
      },
      obt: {
        editTable: false,
        pd: [
          { label: "字典1", prop: "item1" },
          { label: "字典2", prop: "item2" },
          { label: "字典3", prop: "item3" },
          { label: "字典4", prop: "item4" },
          { label: "字典5", prop: "item5" },
          { label: "字典6", prop: "item6" },
          { label: "字典7", prop: "item7" }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123",
            children: [
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123",
                children: [
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  },
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  },
                  {
                    item1: "123",
                    item2: "123",
                    item3: "123",
                    item4: "123",
                    item5: "123",
                    item6: "123",
                    item7: "123"
                  }
                ]
              },
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123"
              },
              {
                item1: "123",
                item2: "123",
                item3: "123",
                item4: "123",
                item5: "123",
                item6: "123",
                item7: "123"
              }
            ]
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: "123",
            item5: "123",
            item6: "123",
            item7: "123"
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
</style>