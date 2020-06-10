
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <Reporte :opt="obt"></Reporte>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div class="expland_text">
        该组件可
        <span style="color:#3E8EF7">根据传入数据的条数自动完成适应布局</span>,当每行为一条数据时视为详细数据展示组件将展示全部信息,其余信息超出长度后将自动缩略
      </div>
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
        title: "报告信息",
        icon: require("../../../static/image/jiantou_l.png"),
        pd: [
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" },
              { label: "病例号", prop: "record" },
              { label: "病区", prop: "area" }
            ]
          },
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" }
            ]
          },
          { list: [{ label: "姓名", prop: "name" }] },
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" },
              { label: "病例号", prop: "record" },
              { label: "病区", prop: "area" }
            ]
          }
        ],
        data: [
          { name: "小明", age: "19岁", record: "0002448033", area: "浙江杭州" },
          { name: "小明", age: "19岁", record: "0002448033", area: "浙江杭州" },
          {
            name:
              "小明小明小明小明小明小明小小小明小明小明小明小明小明小小小明小明小明小明小明小明小明明小明小明小明小明小明小明明小明小明小明小明小明小明小小小明小明小明小明小明小明小明明小明小明小明小明小明小明明小明小明小明小明小明小明小明明小明小明小明小明小明小明明"
          },
          {
            name: "小明",
            age: "19岁",
            record: "0001232448033",
            area: "浙江杭州"
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
      obt: {
        title: "报告信息",
        icon: require("../../../static/image/jiantou_l.png"),
        pd: [
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" },
              { label: "病例号", prop: "record" },
              { label: "病区", prop: "area" }
            ]
          },
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" }
            ]
          },
          { list: [{ label: "姓名", prop: "name" }] },
          {
            list: [
              { label: "姓名", prop: "name" },
              { label: "年龄", prop: "age" },
              { label: "病例号", prop: "record" },
              { label: "病区", prop: "area" }
            ]
          }
        ],
        data: [
          { name: "小明", age: "19岁", record: "0002448033", area: "浙江杭州" },
          { name: "小明", age: "19岁", record: "0002448033", area: "浙江杭州" },
          {
            name:
              "小明小明小明小明小明小明小小小明小明小明小明小明小明小小小明小明小明小明小明小明小明明小明小明小明小明小明小明明小明小明小明小明小明小明小小小明小明小明小明小明小明小明明小明小明小明小明小明小明明小明小明小明小明小明小明小明明小明小明小明小明小明小明明"
          },
          {
            name: "小明",
            age: "19岁",
            record: "0001232448033",
            area: "浙江杭州"
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
              { name: "title", type: "string", explain: "标题" },
              {
                name: "icon",
                type: "require(../../xx.png)",
                explain: "图标"
              },
              { name: "data", type: "list", explain: "显示的数据,与pd内每条数据的prop值相互对应" },
              {
                name: "pd",
                type: "list",
                explain: "dom加载数据",
                children: [
                  { name: "label", type: "string", explain: "参数名" },
                  { name: "prop", type: "string", explain: "参数值,与data内每条数据一一对应" },
                ]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.box-card {
  margin-top: 50px;
}
.expland_text {
  margin-top: 50px;
  font-size: 16px;
  line-height: 30px;
}
</style>