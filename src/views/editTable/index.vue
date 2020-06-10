<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>示例</span>
      </div>
      <div>
        <EditTable
          border
          :opt="obt"
          highlight-current-row
          stripe
          @submit="(s)=>{submit(s)}"
          @rightClick="editTableOpen"
          header-align="center"
          align="center"
          @editclose="close"
        ></EditTable>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="box-header content">
        <span>说明</span>
      </div>
      <div>
        该组件用于对所展示组件进行在线编辑，右键表头即可进入编辑模式，可对所展示的表格的列进行编辑。在实际开发中可将用于加载表格的数据保存
        在数据库中，在created时填充，在编辑完成后将结果保存到数据库即可,
        <span style="color:red">element原生事件与属性可直接赋值</span>
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

      <pre v-highlightjs><code class="javascript" style="background:	#4B4B4B">
        
export default {
    data() {
        return {
                obt: {
                editTable:false,
                // 页面列数据
                pd: [
                    { label: '字典1', prop: 'item1', sort: true, fix: true, width: '200' },
                    { label: '字典2', prop: 'item2', sort: true, width: '100' },
                    { label: '字典3', prop: 'item3', sort: true, width: '150' },
                    { label: '字典4', prop: 'item4', sort: true, width: '150' },
                    { label: '字典5', prop: 'item5', sort: true, width: '150' },
                    { label: '字典6', prop: 'item6', sort: true, width: '150' },
                    { label: '字典7', prop: 'item7', sort: true, width: '150' },

                ],
                // 页面数据
                data: [
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                    {'item1':'123','item2':'123','item3':'123','item4':'123','item5':'123','item6':'123','item7':'123'},
                  
                ],
                //编辑页 可选列数据
            selectOption:[
                    { label: '字典8', prop: 'item8', sort: true, fix: true, width: '200' },
                    { label: '字典9', prop: 'item9', sort: true, width: '100' },
                    { label: '字典10', prop: 'item10', sort: true, width: '150' },
                    { label: '字典11', prop: 'item11', sort: true, width: '150' },
                    { label: '字典12', prop: 'item12', sort: true, width: '150' },
                  
            ],
            // 编辑页 编辑列数据
            realOption:[
                    { label: '字典1', prop: 'item1', sort: true, fix: true, width: '200' },
                    { label: '字典2', prop: 'item2', sort: true, width: '100' },
                    { label: '字典3', prop: 'item3', sort: true, width: '150' },
                    { label: '字典4', prop: 'item4', sort: true, width: '150' },
                    { label: '字典5', prop: 'item5', sort: true, width: '150' },
                    { label: '字典6', prop: 'item6', sort: true, width: '150' },
                    { label: '字典7', prop: 'item7', sort: true, width: '150' },
            ],
            },
        }
    },
    methods: {
        submit(s){
            //避免引用类型共享内存，生产环境应从单独各自赋值
            this.obt.pd = Object.assign({},s)
            this.$message('保存成功')
        },
        // 右键打开编辑框
        editTableOpen(){
            this.obt.editTable = true
        },
        //关闭编辑框
        close(){
            this.obt.editTable = false
        }
    }
}
        </code></pre>
    </el-card>
  </div>
</template>
<script>
export default {
  created(){
    
        setTimeout(()=>{
          this.obt.pd =  [
          {label: "字典1",prop: "item1",sort: true,width: "200"},
          { label: "字典2", prop: "item2", sort: true, width: "100" },
          { label: "字典3", prop: "item3", sort: true, width: "150" },
          { label: "字典4", prop: "item4", sort: true, width: "150" },
          { label: "字典5", prop: "item5", sort: true, width: "150" },
          { label: "字典6", prop: "item6", sort: true, width: "150" },
          { label: "字典7", prop: "item7", sort: true, width: "150" }
        ]
        }, 0)
  },
  data() {
    return {
      obt: {
        editTable: false,
        indexAble:false,
        checkAble:false,
        // 页面列数据
        pd: [
        ],
        // 页面数据
        data: [
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
        ],
        //编辑页 可选列数据
        selectOption: [
          {
            label: "字典8",
            prop: "item8",
            sort: true,
            fix: true,
            width: "200"
          },
          { label: "字典9", prop: "item9", sort: true, width: "100" },
          { label: "字典10", prop: "item10", sort: true, width: "150" },
          { label: "字典11", prop: "item11", sort: true, width: "150" },
          { label: "字典12", prop: "item12", sort: true, width: "150" }
        ],
        // 编辑页 编辑列数据
        realOption: [
          {
            label: "字典1",
            prop: "item1",
            sort: true,
            fix: true,
            width: "200"
          },
          { label: "字典2", prop: "item2", sort: true, width: "100" },
          { label: "字典3", prop: "item3", sort: true, width: "150" },
          { label: "字典4", prop: "item4", sort: true, width: "150" },
          { label: "字典5", prop: "item5", sort: true, width: "150" },
          { label: "字典6", prop: "item6", sort: true, width: "150" },
          { label: "字典7", prop: "item7", sort: true, width: "150" }
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
              { name: "editTable", type: "boolean", explain: "是否开启编辑" },
              { name: "indexTable", type: "boolean", explain: "是否开启索引" },
              { name: "checkTable", type: "boolean", explain: "是否开启check框" },
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
              },
              { name: "data", type: "list", explain: "显示的数据" },
              {
                name: "selectOption",
                type: "list",
                explain: "编辑页可供选择表格（左侧）渲染数据",
                children: [
                  { name: "label", type: "string", explain: "列名" },
                  { name: "prop", type: "string", explain: "列名对应参数名" },
                  { name: "sort", type: "boolean", explain: "该列是否排序" },
                  { name: "fix", type: "boolean", explain: "该列是否固定" },
                  { name: "width", type: "number", explain: "该列宽度" }
                ]
              },
              {
                name: "realOption",
                type: "list",
                explain: "编辑页可供编辑表格（右侧）渲染数据",
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
          { name: "rightClick", param: "无", explain: "右键点击事件" },
          { name: "editclose", param: "无", explain: "关闭编辑页面" },
          { name: "submit", param: "编辑表格数据", explain: "提交编辑信息" }
        ]
      }
    };
  },
  methods: {
    submit(s) {
      //避免引用类型共享内存，生产环境应从单独各自赋值
      this.obt.pd = Object.assign({}, s);
      this.$message("保存成功");
    },
    // 右键打开编辑框
    editTableOpen() {
      this.obt.editTable = true;
    },
    //关闭编辑框
    close() {
      this.obt.editTable = false;
    }
  }
};
</script>
<style lang="less">
.box-card {
  margin-top: 50px;
}
</style>