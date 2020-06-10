<template>
  <div>
    <el-table
      ref="dragTable"
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
      height="500px"
      @selection-change="(s)=>{$emit('selectCheck',s)}"
    >
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row[item.prop]" v-if="item.type==='checkbox'"></el-checkbox>
          <el-button v-if="item.type==='button'"></el-button>
          <div v-if="item.type===undefined">{{ scope.row[item.prop]}}</div>
          <!-- <input class="input row-center" v-if="item.type==='input'" v-model="scope.row[item.prop]"> -->
          <el-input
            class="edit_input"
            v-if="item.type==='input'"
            size="small"
            v-model="scope.row[item.prop]"
          ></el-input>
          <el-switch
            v-if="item.type==='switch'"
            @change="item.fcn?$emit(item.fcn,scope.row):defuthed()"
            :active-text="item.active"
            :inactive-text="item.inactive"
            v-model="scope.row[item.prop]"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import SortClass from "../../common/utils/vueSortable";
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {
    // this.sortList = this.obj.data;
    console.log('created')
  },
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
      dialogTableVisible: false,
      dropCol: [],
      sortDisable: false,
      sortList: [],
      prevent: false,
      beforeVal: ""
    };
  },
  // watch: {
  //   obj: {
  //     handler: function(newVal, oldVal) {
  //       console.log("obj change");
  //       this.$nextTick(() => {
  //         this.dragAble();
  //       });
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    // 支持拖拽
    this.dragAble();
    if (this.obj.data.length > 0) {
      this.selectedRow(this.obj.data[0]);
    }
  },
  methods: {
    defuthed() {},

    dragAble() { 
      let beforeVal = "";
      const tbody = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      tbody.addEventListener("dragover", e => {
        e.preventDefault();
      });

      Array.prototype.forEach.call(tbody.children, (s, index) => {
        if (s.getAttribute("draggable")) {
          return;
        }
        s.setAttribute("draggable", "true");
        s.addEventListener("dragstart", e => {
          this.beforeVal = e.target.children[0].innerText.trim();
        });
        s.addEventListener("drop", e => {
          let parent = this.getParentNode(e.target);
          let text = parent.children[0].innerText.trim();
          this.$emit("drapExchange", { before: this.beforeVal, after: text });
        });
      });
    },
    getParentNode(node) {
      let parent = node.parentNode;
      if (parent.nodeName === "TR") {
        return parent;
      }
      return this.getParentNode(parent);
    },
    exchange(before, after) {
      let aIndex = "";
      let bIndex = "";
      let list = [].slice.call(this.obj.data);
      list.forEach((p, index) => {
        if (p.label === before) {
          aIndex = index;
        }
        if (p.label === after) {
          bIndex = index;
        }
      });
      let tmplObj = Object.assign({}, list[aIndex]);
      list[aIndex] = Object.assign({}, list[bIndex]);
      list[bIndex] = tmplObj;
      this.obj.data = list;
    },
    selectedRow(row) {
      this.$refs.dragTable.setCurrentRow(row);
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
<style scope>
.row-fixed {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.input {
  border: none;
  outline: none;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #1682c02c !important;
}
.fixed {
  opacity: 0.3 !important;
}
.unfixed {
  opacity: 1 !important;
}

.edit_input .el-input__inner {
  border: 0 none;
  border-radius: 0px;
}
</style>
