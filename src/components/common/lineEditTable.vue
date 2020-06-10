<template>
  <div>
    <el-table
      ref="lineEditTable"
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
      id="lineEditTable"
      :header-cell-class-name="()=>{return 'nowrap'}"
    >
      <el-table-column v-if="obj.indexAble" type="index" width="50"></el-table-column>
      <el-table-column type="selection" v-if="obj.checkAble" width="55"></el-table-column>
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
        :fixed="item.fix"
        :width="`${item.width}px`"
        :sortable="item.sort"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="item.type===undefined&&!scope.row.edit">{{ scope.row[item.prop]}}</div>
          <el-input
            class="edit_input"
            v-if="scope.row.edit"
            size="small"
            v-model="scope.row[item.prop]"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          ></el-input>
        
        </template>
      </el-table-column>
       <el-table-column
        label="编辑"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="startEdit(scope)  "
          >
          <span v-if="!scope.row.edit">编辑</span>
          <span v-if="scope.row.edit" style="color:red">完成</span>
          </el-button>
        
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {
   this.obj.data= this.obj.data.map(v=>{
     this.$set(v, 'edit', false) 
   })
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
      node:'',
      row:''
    };
  },
  mounted() {
    // 支持拖拽
  },
  methods: {
    startEdit(val) {
      if (val.row.edit) {
        val.row.edit = false;
        this.$emit('editEnd',val)
      } else {
        val.row.edit = true;
        this.$emit('editStart',val)
      }
      // 向上遍历父节点直至找到TR节点
      let node = this.findNode(event.target);
      console.log(node)
      let nodeHeight = node.style.height
      if (nodeHeight === '75px') {
        this.closeEdit(node);
        console.log("closeEdit")
      } else {
        this.openEdit(node);
        console.log("openEdit")
      }
      // 缓存上一节点信息
      if (this.node === "") {
        this.node = node;
        this.row = val.row;
      } else {
        if (this.node !== node) {
          this.closeEdit(this.node);
          this.row.edit = false;
          this.row = val.row;
          this.node = node;
        }
      }
      
    },
     openEdit(node) {
       node.style.height='75px'
      // node.setAttribute(
      //   "class",
      //   node.getAttribute("class") + " " + "active_row"
      // );
    },
    closeEdit(node) {
      node.style.height='0px'
      // node.setAttribute(
      //   "class",
      //   node.getAttribute("class").replace("active_row")
      // );
    },
    findNode(node) {
      if (node.nodeName === "TR") {
        return node;
      } else {
        return this.findNode(node.parentNode);
      }
    },
    defuthed() {}
  },

  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return Object.assign({}, this.opt);
    }
  }
};
</script>
<style lang='less'>
.active_row {
  height: 75px;
  background: rgba(231, 239, 250, 0.678) !important;
  box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 1);
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(231, 239, 250, 0.678);
}
.el-table {
  .el-table__header-wrapper {
    .el-table__header {
      .has-gutter tr {
        background-color: rgba(250,250,250,1) !important ;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1) !important ;
      }
    }
  }
}
.el-table th{
 background-color:rgba(250,250,250,1) !important ;
}



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
   background-color:  transparent;
   
}
</style>
