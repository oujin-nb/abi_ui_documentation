<template>
  <el-card class="box-card fcn_box"   shadow="hover">
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
</template>

<script>
export default {
  data() {
    return {
      methodOpt: {
        pd: [
          { label: "方法名", prop: "name" },
          { label: "说明", prop: "explain" },
          { label: "参数", prop: "param" },
        ],

        data: [
          {
            name: "convertToCamelCase",
            explain: "将首字母转成大写",
            param: "str",
          },
          {
            name: "toLowerCase",
            explain: "将首字母转成小写",
            param: "str",
          },
          {
            name: "getQueryString",
            explain: "获取当前url内某个参数",
            param: "key",
          },
          {
            name: "convertToCamelCase",
            explain: "获取某个url内所有参数 ",
            param: "url",
          },
          {
            name: "convertObj",
            explain: "将对象转换为url参数",
            param: "obj",
          },
          {
            name: "arrayBufferToBase64",
            explain: "将二进制转换成base64",
            param: "raw",
          },
          {
            name: "copyToClipboard",
            explain: "将字符串黏贴到黏贴版",
            param: "str",
          },
          {
            name: "tranArrtoStr",
            explain: "将数据集合内的数组处理成字符串",
            param: "arr",
          },
          {
            name: "tranStrtoArr",
            explain: "将数据集合内的字符串处理成数组",
            param: "str",
          },



         {
            name: "compareObjChange",
            explain: "比较对象是否有变动 ",
            param: "originalObj,currentObj",
          },
          {
            name: "resetStore",
            explain: "重设vue原型",
            param: "ket,value",
          },
          {
            name: "getTimeRangeByDays",
            explain: "通过天数获取时间范围(返回字符串数组)",
            param: "days",
          },
          {
            name: "getDateByDays",
            explain: "通过天数获取时间范围(返回日期数组)",
            param: "days",
          },
          {
            name: "dateRangeToString",
            explain: "将时间范围转换为字符串",
            param: "[Date,Date]",
          },
          {
            name: "getNowTime",
            explain: "获取当前时间根据格式",
            param: "format",
          },


          {
            name: "debounce",
            explain: "防抖 ",
            param: "fcn,time",
          },
         {
            name: "throttle",
            explain: "节流 ",
            param: "fcn,time",
          },
          {
            name: "equals",
            explain: "比较相等(无法比较原型链上面的属性)",
            param: "a,b",
          },
          {
            name: "getSize",
            explain: "获取长度",
            param: "val",
          },
          {
            name: "deepFlatten",
            explain: "拉平数组",
            param: "arr",
          },
          {
            name: "stripHTMLTags",
            explain: "提取html内容",
            param: "dom",
          },

          {
            name: "uuid",
            explain: "生成uuid ",
            param: "",
          },
         {
            name: "proventBlur",
            explain: "阻止失焦 ",
            param: "",
          },
          {
            name: "exportOutXLSX",
            explain: "导出excl表格的方法",
            param: "domId",
          },
          {
            name: "deepClone",
            explain: "深拷贝",
            param: "obj",
          },
          {
            name: "scrollToTop",
            explain: "回到顶部",
            param: "",
          },
         
        ]
      }
    };
  }
};
</script>

<style lang='scss'>
.fcn_box{
    height: 600px;
    overflow-y: auto;
}
</style>