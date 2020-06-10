
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <BasicTable
          border
          :opt="obt"
          highlight-current-row
          header-align="center"
          align="center"
          @switchFcn='(s)=>{event(s,"switch")}'
          @clickFcn='(s)=>{event(s,"click")}'
          @inputFcn='(s)=>{event(s,"input")}'
          @checkFcn='(s)=>{event(s,"check")}'
          @submit="(s)=>{event(s,'submit')}"
          @cancel="(s)=>{event(s,'cancel')}"
        ></BasicTable>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div >
        该组件用于表格数据展示及事件触发,所有事件由页面组件将事件名传入组件,组件内将会分发该方法到页面,由页面统一实现，表格展示将由每一行传入的type决定，
        若不传则默认展示字符串
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
        pd: [
          {
            label: "字典1",
            prop: "item1",
            sort: true,
            fix: true,
            width: "200"
          },
          {
            label: "字典2",
            prop: "item2",
            sort: false,
            fix: "right",
            width: "200",
            type:'butGroup',
            butList:[
               { text: "提交", fcn: "submit" },
               { text: "取消", type: "danger", fcn: "cancel" }
            ]
          },
          { label: "字典3", prop: "item3", sort: true, width: "100" },
          {
            label: "字典4",
            prop: "item4",
            type: "switch",
            width: "100",
            fcn: "switchFcn"
          },
          {
            label: "字典5",
            prop: "item5",
            type: "button",
            width: "200",
            fcn: "clickFcn"
          },
          {
            label: "字典6",
            prop: "item6",
            type: "input",
            width: "100",
            fcn: "inputFcn"
          },
          {
            label: "字典7",
            prop: "item7",
            type: "checkbox",
            width: "100",
            fcn: "checkFcn"
          }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: false,
            item5: "123",
            item6: "123",
            item7: false
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: false,
            item5: "123",
            item6: "123",
            item7: false
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
          }
        ]
      }
    };
  },
  methods: {
    event(s, type) {
      this.$message("哇,你竟然触发了" + type + "事件");
      console.log(type);
      console.log(s);
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
            fix: true,
            width: "200"
          },
          {
            label: "字典2",
            prop: "item2",
            sort: false,
            fix: "right",
            width: "200",
            type:'butGroup',
            butList:[
               { text: "提交", fcn: "submit" },
               { text: "取消", type: "danger", fcn: "cancel" }
            ]
          },
          { label: "字典3", prop: "item3", sort: true, width: "100" },
          {
            label: "字典4",
            prop: "item4",
            type: "switch",
            width: "100",
            fcn: "switchFcn"
          },
          {
            label: "字典5",
            prop: "item5",
            type: "button",
            width: "200",
            fcn: "clickFcn"
          },
          {
            label: "字典6",
            prop: "item6",
            type: "input",
            width: "100",
            fcn: "inputFcn"
          },
          {
            label: "字典7",
            prop: "item7",
            type: "checkbox",
            width: "100",
            fcn: "checkFcn"
          }
        ],
        data: [
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: false,
            item5: "123",
            item6: "123",
            item7: false
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: false,
            item5: "123",
            item6: "123",
            item7: false
          },
          {
            item1: "123",
            item2: "123",
            item3: "123",
            item4: true,
            item5: "123",
            item6: "123",
            item7: true
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
                  { name: "width", type: "number", explain: "该列宽度" },
                  { name: "type", type: "string", explain: "该列展示dom类型" },
                  {
                    name: "fcn",
                    type: "string",
                    explain: "该列回调函数名,请在页面组件做对应声明"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    event(s, type) {
      this.$message("哇,你竟然触发了" + type + "事件");
      console.log(type);
      console.log(s);
    }
  }
};
</script>
<style lang="less">

</style>