<template>
  <div>
    <el-table
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
      :header-cell-class-name="headerClass"
      class="edit-table"
      @header-contextmenu="editTableOpen"
    >
     <el-table-column
     v-if="obj.indexAble"
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
      type="selection"
       v-if="obj.checkAble"
      width="55">
    </el-table-column>
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        :sortable="item.sort"
        :fixed="item.fix"
        :width="`${item.width}px`"
      ></el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="obj.editTable" :before-close="()=>{$emit('editclose')}">
      <div class="column-start-center">
        <div class="row-center edit_box">
          <div class="edit_table">
            <div class="table">
              <SortTable
                row-key="prop"
                ref="selectedTable"
                border
                :opt="selectObt"
                @row-click="(s)=>{selSelected(s)}"
                highlight-current-row
              ></SortTable>
            </div>
          </div>
          <div class="edit_option column-center">
            <div class="edit_banner row-center" @click="exchange('right')">
              <i class="el-icon-caret-right icon"></i>
            </div>
            <div class="edit_banner row-center" @click="exchange('left')">
              <i class="el-icon-caret-left icon"></i>
            </div>
            <div class="edit_banner row-center" @click="exchange('allRight')">
              <i class="el-icon-d-arrow-right icon"></i>
            </div>
            <div class="edit_banner row-center" @click="exchange('allLeft')">
              <i class="el-icon-d-arrow-left icon"></i>
            </div>
          </div>
          <div class="edit_table">
            <div class="table">
              <SortTable
                ref="editedTable"
                row-key="prop"
                border
                :opt="editObt"
                highlight-current-row
                @fixEdit="(s)=>{this.fixEdit(s)}"
                @selectCheck="(s)=>{this.editTableCheck(s)}"
                @row-click="(s)=>{editSelected(s)}"
                @drapExchange="(s)=>{drapExchange(s)}"
              ></SortTable>
            </div>
          </div>
        </div>
        <div class="edit_bottom edit_box row-flex-end">
          <button class="summit-but row-center" @click="submit()">提交保存</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {
    this.editObt.data = this.obj.realOption;
    this.selectObt.data = this.obj.selectOption;
    console.log('local edit table')
  },
  mounted() {},
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      startEdit: "",
      aIndex: "",
      bIndex: "",
      headerClass: "",
      dialogTableVisible: true,
      editForm: {},
      editedObt: {},
      selectedObt: {},
      selectObt: {
        checkSelect: true,
        pd: [{ prop: "label", label: "选项名称" }],
        data: []
      },
      editObt: {
        checkSelect: false,
        pd: [
          { prop: "label", label: "列名" },
          { prop: "width", label: "列宽", type: "input" },
          { prop: "fix", label: "固定", type: "switch", fcn: "fixEdit" },
          { prop: "sort", label: "排序", type: "switch" }
        ],
        data: []
      }
    };
  },

  methods: {
    editTableOpen(){
        event.preventDefault();
        this.$emit('rightClick')
    },
    exchange(type) {
      switch (type) {
        // 右移
        case "right":
          if (!this.selectedObt.prop && this.selectObt.data.length > 0) {
            this.selectedObt = this.selectObt.data[0];
          }
          if(this.selectObt.data.length > 0){
           this.editObt.data.push(this.selectedObt);
          }
          let selindex = [].findIndex.call(
            this.selectObt.data,
            (value, index, arr) => {
              return value.prop === this.selectedObt.prop;
            }
          );
          this.selectObt.data.splice(selindex, 1);
          this.fixEdit(this.selectedObt);//fix排序
          this.$nextTick(() => {
            this.$refs.editedTable.dragAble();
          });
          break;
        case "left":
          if (!this.editedObt.prop && this.editObt.data.length > 0) {
            this.editedObt = this.editObt.data[0];
          }
          if(this.editObt.data.length > 0){
            this.selectObt.data.push(this.editedObt);
          }
          let index = [].findIndex.call(
            this.editObt.data,
            (value, index, arr) => {
              return value.prop === this.editedObt.prop;
            }
          );
          this.editObt.data.splice(index, 1);
          break;
        case "allRight":
          this.editObt.data = [...this.editObt.data, ...this.selectObt.data];
          this.selectObt.data = [];
          this.fixSort();
          this.$nextTick(() => {
            this.$refs.editedTable.dragAble();
          });
          break;
        case "allLeft":
          this.selectObt.data = [...this.selectObt.data, ...this.editObt.data];
          this.editObt.data = [];
          break;
      }
      this.setCurrentRow();
    },
    //手动设置选择行
    setCurrentRow() {
      console.log('setCurrentRow')
      if (this.selectObt.data.length > 0) {
        this.$nextTick(() => {
          this.$refs.selectedTable.selectedRow(this.selectObt.data[0]);
          this.selSelected(this.selectObt.data[0]);
        });
      }
      if (this.editObt.data.length > 0) {
        this.$nextTick(() => {
          this.$refs.editedTable.selectedRow(this.editObt.data[0]);
          this.editSelected(this.editObt.data[0]);
        });
      }
    },
    // fix事件及重排
    fixEdit(s) {
      //如果变为固定列则不触发重排
      if (!s.fix) {
        return;
      }
      let fixList = [];
      let unfixList = [];
      this.editObt.data.forEach(o => {
        if (o.fix && o.prop !== s.prop) {
          fixList.push(o);
        }
        if (!o.fix && o.prop !== s.prop) {
          unfixList.push(o);
        }
      });
      fixList.push(s);
      this.editObt.data = [...fixList, ...unfixList];
    },
    fixSort() {
      let fixList = [];
      let unfixList = [];
      this.editObt.data.forEach(o => {
        if (o.fix) {
          fixList.push(o);
        }
        if (!o.fix) {
          unfixList.push(o);
        }
      });
      this.editObt.data = [...fixList, ...unfixList];
    },
    editTableCheck(s) {},
    editSelected(s) {
      this.editedObt = Object.assign({}, s);
    },
    selSelected(s) {
      this.selectedObt = Object.assign({}, s);
    },
    drapExchange(s) {
      let aIndex = "";
      let bIndex = "";
      let list = [].slice.call(this.editObt.data);
      list.forEach((p, index) => {
        if (p.label === s.before) {
          aIndex = index;
        }
        if (p.label === s.after) {
          bIndex = index;
        }
      });
      if (this.editObt.data[aIndex].fix || this.editObt.data[bIndex].fix) {
        this.$message("固定列不允许排序");
        return;
      }
      let tmplObj = Object.assign({}, list[aIndex]);
      list[aIndex] = Object.assign({}, list[bIndex]);
      list[bIndex] = tmplObj;
      this.editObt.data = list;
    },
    submit(s) {
      if (this.editObt.data.length > 0) {
        this.$emit("submit", this.editObt.data);
      } else {
        this.$message("列不允许为空");
      }
    }
  },
  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return Object.assign({}, this.opt);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;

.edit_box {
  width: 100%;
}
.edit_form {
  height: 10vh;
  border-bottom: #00070c5b 1px dashed;
  .body {
    padding: 20px;
  }
}
.edit_bottom {
  height: 5vh;
}
.edit_table {
  width: 45%;
  .table {
    padding: 20px;
  }
}
.edit_option {
  width: 10%;
  height: 60vh;
  min-width: 120px;
  .edit_banner {
    height: 50px;
    width: 100%;
    margin: 10px;
    .icon {
      height: 30px;
      width: 30px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.row-fixed {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.summit-but {
  margin-right: 20px;
  height: 40px;
  width: 120px;
  border: none;
  outline: none;
  border-radius: 5px;
  background: #2196f3;
  color: white;
  cursor: pointer;
}
</style>


