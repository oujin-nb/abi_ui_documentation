
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <dynamicStatusBox :options="obt" :value="val" v-model="val"></dynamicStatusBox>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>该组件用于动态状态展示，当鼠标移上时自动展开全部选项并恢复正常顺序，当鼠标移开则将已被选择项移至最前以方便查看</div>
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
              
              <组件名 :options="obt" :value="val" v-model="val"> 
               obt: [
                { label: "a", prop: "a" },
                { label: "b", prop: "b" },
                { label: "c", prop: "c" },
                { label: "d", prop: "d" },
                { label: "e", prop: "e" },
                { label: "f", prop: "f" }
                ],
                val: [],
        </code>
        </pre>
    </el-card>
  </div>
</template>
<script>
import dynamicStatusBox from "../../components/dynamicStatusBox/dynamicStatusBox.vue";
export default {
  created() {},
  components: { dynamicStatusBox },
  data() {
    return {
      obt: [
        { label: "a", prop: "a" },
        { label: "b", prop: "b" },
        { label: "c", prop: "c" },
        { label: "d", prop: "d" },
        { label: "e", prop: "e" },
        { label: "f", prop: "f" }
      ],
      val: [],
      paramOpt: {
        pd: [
          { label: "参数名", prop: "name" },
          { label: "类型", prop: "type" },
          { label: "说明", prop: "explain" }
        ],
        data: [
          {
            name: "options",
            type: "list",
            explain: "选项",
            children: [
              { name: "label", type: "string", explain: "选项名" },
              { name: "prop", type: "string", explain: "选项名对应参数名" }
            ]
          },
          {
            name: "val",
            type: "list",
            explain: "监听值"
          }
        ]
      }
    };
  },
  methods: {}
};
</script>
<style lang="less">
</style>