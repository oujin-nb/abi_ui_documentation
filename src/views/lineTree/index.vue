
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <lineTree :pd="pd" @itemClick="itemClick"></lineTree>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件用于通过树形连线文件夹形式展示数据,根据数据动态展示数据,点击节点分发数据,涉及到css样式可以自行覆写</div>
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
        :opt="methodOpt"
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
              <组件名 :pd="pd" @itemClick="itemClick"> 
                pd: [
                    {
                    label: "第一层(1)",
                    children: []
                    },
                    {
                    label: "第一层(2)",
                    children: [
                        {
                        label: "第二层(1)",
                        children: []
                        },
                        {
                        label: "第二层(2)",
                        children: [
                            {
                            label: "第三层(1)",
                            children: [
                                {
                                label: "第四层",
                                children: [
                                    {
                                    label: "第五层",
                                    children: [{ label: "第六层", children: [] }]
                                    }
                                ]
                                }
                            ]
                            },
                            {
                            label: "第三层(2)"
                            },
                            {
                            label: "第三层(3)",
                            children: []
                            }
                        ]
                        },
                        {
                        label: "第二层(3)",
                        children: []
                        },
                        {
                        label: "第二层(4)",
                        children: []
                        }
                    ]
                    },
                    {
                    label: "第一层(3)",
                    children: []
                    },
                    {
                    label: "第一层(4)",
                    children: []
                    },
                    {
                    label: "第一层(5)",
                    children: []
                    }
                ],
        </code>
        </pre>
    </el-card>
  </div>
</template>
<script>
import lineTree from "../../components/lineTree/lineTree.vue";
export default {
  created() {},
  components: { lineTree },
  data() {
    return {
      pd: [
        {
          label: "第一层(1)",
          children: []
        },
        {
          label: "第一层(2)",
          children: [
            {
              label: "第二层(1)",
              children: []
            },
            {
              label: "第二层(2)",
              children: [
                {
                  label: "第三层(1)",
                  children: [
                    {
                      label: "第四层",
                      children: [
                        {
                          label: "第五层",
                          children: [{ label: "第六层", children: [] }]
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "第三层(2)"
                },
                {
                  label: "第三层(3)",
                  children: []
                }
              ]
            },
            {
              label: "第二层(3)",
              children: []
            },
            {
              label: "第二层(4)",
              children: []
            }
          ]
        },
        {
          label: "第一层(3)",
          children: []
        },
        {
          label: "第一层(4)",
          children: []
        },
        {
          label: "第一层(5)",
          children: []
        }
      ],
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "pd",
            type: "list",
            explain: "树形数据",
            children: [
              {
                name: "label",
                type: "string",
                explain: "选项名"
              },
              {
                name: "children",
                type: "list",
                explain:
                  "子集,当该选项拥有children属性且有值时显示带加号文件夹,值为空时显示空文件夹,无该属性时则不显示文件夹"
              }
            ]
          }
        ]
      },
      methodOpt: {
        pd: [
          { label: "方法名", prop: "name" },
          { label: "参数名", prop: "param" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "itemClick",
            param:'所点击项所有属性',
            explain: "当点击树形组件选项时将在组件内分发该事件传出该选项的所有属性",
          }
        ]
      }
    };
  },
  methods: {
    itemClick(item) {
      console.log("选项点击");
      console.log(item);
    }
  }
};
</script>
<style lang="less">
</style>