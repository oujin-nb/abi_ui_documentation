
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <BasicForm
          :opt="obt"
          label-width="80px"
          @submit="(s)=>{event(s,'submit')}"
          @cancel="(s)=>{event(s,'cancel')}"
          @inputEvt="(s)=>{event(s,'inputEvt')}"
          @textEvt="(s)=>{event(s,'textEvt')}"
          @selectEvt="(s)=>{event(s,'selectEvt')}"
          @dateEvt="(s)=>{event(s,'dateEvt')}"
          @timeEvt="(s)=>{event(s,'timeEvt')}"
        ></BasicForm>
      </div>
    </el-card>
    <el-card class="expland_text" shadow="hover" style="margin-top: 50px;">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>
        该组件用于表单数据展示及事件触发,所有事件由页面组件将事件名传入组件,组件内将会分发该方法到页面,由页面统一实现，表单展示将由每一行传入的type决定，
        每一项的label提供可选功能,若传入alternative可自动开启
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

      <pre v-highlightjs><code class="javascript" style="background:	#f8f8f8">
export default {
  created() {},
  data() {
    return {
      obt: {
        pd: [
          {
            label: "选项1",
            alternative: [
              { label: "选项11", prop: "option11" },
              { label: "选项12", prop: "option12" }
            ],
            prop: "option1",
            type: "input",
            fcn: "inputEvt",
            width: "200px"
          },
          {
            label: "选项2",
            prop: "option2",
            type: "textarea",
            width: "200px",
            fcn: "textEvt"
          },
          {
            label: "选项3",
            alternative: [
              { label: "选项31", prop: "option11" },
              { label: "选项32", prop: "option21" }
            ],
            prop: "option3",
            type: "select",
            opt: [
              { lable: "选项1", prop: "select_opt1" },
              { lable: "选项2", prop: "select_opt2" },
              { lable: "选项3", prop: "select_opt3" }
            ],
            fcn: "selectEvt"
          },
          {
            label: "选项4",
            prop: "option4",
            type: "checkbox",
            opt: [
              { lable: "选项1", prop: "check_opt1" },
              { lable: "选项2", prop: "check_opt2" },
              { lable: "选项3", prop: "check_opt3" }
            ]
          },
          { label: "选项5", prop: "option5", type: "date", fcn: "dateEvt" },
          { label: "选项6", prop: "option6", type: "time", fcn: "timeEvt" },
          {
            type: "butGroup",
            butList: [
              { text: "提交", fcn: "submit" },
              { text: "取消", type: "danger", fcn: "cancel" }
            ]
          }
        ],
        data: {}
      }
    };
  },
  methods: {
    event(s, type) {
      this.$message("哇,你竟然触发了" + type + "事件");
      console.log(type);
      console.log(this.obt.data);
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
            label: "选项1",
            alternative: [
              { label: "选项11", prop: "option11" },
              { label: "选项12", prop: "option12" }
            ],
            prop: "option1",
            type: "input",
            fcn: "inputEvt",
            width: "200px"
          },
          {
            label: "选项2",
            prop: "option2",
            type: "textarea",
            width: "200px",
            fcn: "textEvt"
          },
          {
            label: "选项3",
            alternative: [
              { label: "选项31", prop: "option11" },
              { label: "选项32", prop: "option21" }
            ],
            prop: "option3",
            type: "select",
            opt: [
              { lable: "选项1", prop: "select_opt1" },
              { lable: "选项2", prop: "select_opt2" },
              { lable: "选项3", prop: "select_opt3" }
            ],
            fcn: "selectEvt"
          },
          {
            label: "选项4",
            prop: "option4",
            type: "checkbox",
            opt: [ "选项1", "选项2", "选项3"
              // { lable: "选项1", prop: "check_opt1" },
              // { lable: "选项2", prop: "check_opt2" },
              // { lable: "选项3", prop: "check_opt3" }
            ]
          },
          { label: "选项5", prop: "option5", type: "date", fcn: "dateEvt" },
          { label: "选项6", prop: "option6", type: "time", fcn: "timeEvt" },
          {
            type: "butGroup",
            butList: [
              { text: "提交", fcn: "submit" },
              { text: "取消", type: "danger", fcn: "cancel" }
            ]
          }
        ],
        data: {
          option1:'',
          option2:'',
          option3:'',
          option4:[],
          option5:'',
          option6:'',
        }
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
              {
                name: "pd",
                type: "list",
                explain: "表单编辑数据",
                children: [
                  { name: "label", type: "string", explain: "选项名" },
                  { name: "prop", type: "string", explain: "选项名对应参数名" },
                  { name: "width", type: "number", explain: "该选项宽度" },
                  {
                    name: "type",
                    type: "string",
                    explain: "该列展示dom类型,可选类型可参照下列示例"
                  },
                  {
                    name: "alternative",
                    type: "string",
                    explain: "选项名列表，如传入该参数将自动触发选项名可选",
                    children: [
                      { name: "label", type: "string", explain: "选项名" },
                      {
                        name: "prop",
                        type: "string",
                        explain: "选项名对应参数名"
                      }
                    ]
                  },
                  {
                    name: "butGroup",
                    type: "string",
                    explain:
                      "按钮组列表，用于绘制对表单进行操作按钮组,若该组类型为butGroup则不需传入label,与prop",
                    children: [
                      { name: "text", type: "string", explain: "按钮名" },
                      {
                        name: "type",
                        type: "string",
                        explain: "按钮类型，参照element"
                      },
                      {
                        name: "fcn",
                        type: "string",
                        explain:
                          "点击该按钮所触发的事件名，需在组件上声明对应方法"
                      }
                    ]
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
      console.log(this.obt.data);
    }
  }
};
</script>
<style lang="less">

</style>