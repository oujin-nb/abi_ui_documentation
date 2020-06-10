<template>
  <div>
    <el-table
      ref="basicTable"
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
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
      >
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row[item.prop]"
            v-if="item.type==='checkbox'"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          ></el-checkbox>
          <el-button
            type="primary"
            v-if="item.type==='button'"
            @click="item.fcn?$emit(item.fcn,scope):defuthed()"
          >{{ scope.row[item.prop]}}</el-button>
          <div v-if="item.type===undefined">{{ scope.row[item.prop]}}</div>
          <el-input
            class="edit_input"
            v-if="item.type==='input'"
            size="small"
            v-model="scope.row[item.prop]"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          ></el-input>
          <el-switch
            v-if="item.type==='switch'"
            :class="item.prop==='fix'&&scope.row[item.prop]?'fixed':'unfixed'"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
            :active-text="item.active"
            :inactive-text="item.inactive"
            v-model="scope.row[item.prop]"
          ></el-switch>
          <div v-if="item.type==='butGroup'">
            <el-button
              v-for="(it,i) in item.butList"
              :type="it.type?it.type:'primary'"
              :key="i"
              @click="it.fcn?$emit(it.fcn,scope):defuthed()"
            >{{it.text}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {},
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
      dialogTableVisible: false,
      dropCol: [],
      sortDisable: false,
      sortList: [],
      prevent: false,
      beforeVal: ""
    };
  },
  mounted() {
    // 支持拖拽
  },
  methods: {
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
