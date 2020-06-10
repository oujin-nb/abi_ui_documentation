
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div class="column-start-start">
        <treeSelect :value="treeVal" ref='treeSelect' :optionList="treeOptions" :multiple="true" v-model="treeVal"></treeSelect>
        <div style="margin:20px 0px" class="row-flex-start">
          绑定值:
          {{treeVal.toString()}}
        </div>
        <div class="row-flex-start">
            <el-button @click="()=>{treeVal=['第三层2']}">赋值测试</el-button>
            <el-button @click="()=>{$refs.treeSelect.allSelected()}">全选测试</el-button>
            <el-button @click="()=>{$refs.treeSelect.reverseSelected()}">反选测试</el-button>
            <el-button @click="()=>{$refs.treeSelect.clear()}">清空测试</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件用于树形展示数据以供选择，树形选项通过数据动态显示,选中值通过v-model双向绑定,点击选项即可获取点击项的数据,对绑定的数据赋值即可使选项被选中并自动展开其所有父级</div>
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
              <组件名 :value="treeVal" ref='treeSelect' :optionList="treeOptions" :multiple="true" v-model="treeVal"> 
                    treeVal: [],
                    treeOptions: [
                        {
                        label: "第一层1",
                        prop: "第一层1",
                        children: []
                        },
                        {
                        label: "第二层1",
                        prop: "第二层1",
                        children: [
                            {
                            label: "第三层1",
                            prop: "第三层1",
                            children: []
                            },
                            {
                            label: "第三层2",
                            prop: "第三层2",
                            children: [
                                {
                                label: "第四层1",
                                prop: "第四层1"
                                },
                                {
                                label: "第四层2",
                                prop: "第四层2"
                                },
                                {
                                label: "第四层3",
                                prop: "第四层3"
                                }
                            ]
                            }
                        ]
                        },
                        {
                        label: "第一层2",
                        children: [],
                        prop: "第一层2"
                        },
                        {
                        label: "第一层3",
                        prop: "第一层3",
                        children: []
                        },
                        {
                        label: "第一层4",
                        prop: "第一层4",
                        children: []
                        }
                    ],
        </code>
        </pre>
    </el-card>
  </div>
</template>
<script>
import treeSelect from "../../components/treeSelect/treeSelect.vue";
export default {
  created() {},
  components: { treeSelect },
  data() {
    return {
      treeVal: [],
      treeOptions: [
        {
          label: "第一层1",
          prop: "第一层1",
          children: []
        },
        {
          label: "第二层1",
          prop: "第二层1",
          children: [
            {
              label: "第三层1",
              prop: "第三层1",
              children: []
            },
            {
              label: "第三层2",
              prop: "第三层2",
              children: [
                {
                  label: "第四层1",
                  prop: "第四层1"
                },
                {
                  label: "第四层2",
                  prop: "第四层2"
                },
                {
                  label: "第四层3",
                  prop: "第四层3"
                }
              ]
            }
          ]
        },
        {
          label: "第一层2",
          children: [],
          prop: "第一层2"
        },
        {
          label: "第一层3",
          prop: "第一层3",
          children: []
        },
        {
          label: "第一层4",
          prop: "第一层4",
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
            name: "value",
            type: "string/list(根据是否多选)",
            explain: "双向绑定值,在组件上v-model该值即可实现双向绑定"
          },
          {
            name: "multiple",
            type: "是否多选",
            explain: "是否多选"
          },
          {
            name: "optionList",
            type: "list",
            explain: "树形选项数据",
            children: [
              {
                name: "label",
                type: "string",
                explain: "选项名"
              },
              {
                name: "prop",
                type: "string",
                explain: "选项值"
              },
              {
                name: "children",
                type: "list",
                explain: "该选择子集"
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
            name: "optionBoxVisble",
            param: "",
            explain:
              "下拉框出现/隐藏时触发"
          },  
          {
            name: "allSelected",
            param: "",
            explain:
              "全选,由refs调用"
          },
          {
            name: "allSelected",
            param: "",
            explain:
              "反选,由refs调用"
          },
          {
            name: "allSelected",
            param: "",
            explain:
              "清空,由refs调用"
          },
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
.el-card {
  overflow: inherit;
}
</style>