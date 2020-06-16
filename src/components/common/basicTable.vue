<template>
    <el-table
      ref="basicTable"
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
      class="custom-el-table custom-scroll"
      header-cell-class-name="c-header-cell"
    >
       <!-- 序列号 -->
    <el-table-column  v-if="obj.indexAble"
                     label="#"
                     type="index"
                     width="70"
                     align="center"
                     fixed>
      <!-- 锁定 -->
      <template slot-scope="scope">
        <div class="index-status column-center"
             v-if="scope.row.lockFlag">
          <span class="index-status-icon index-lock-falg"
                v-if="scope.row.lockFlag"></span>
        </div><span class="index-number" v-else>{{ scope.$index|indexFilter}}</span>
      </template>
    </el-table-column>
      <!-- <el-table-column v-if="obj.indexAble" type="index" width="50"></el-table-column> -->
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
          class="but_rewrite"
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
             class="but_rewrite"
              v-for="(it,i) in item.butList"
              :type="it.type?it.type:'primary'"
              :key="i"
              @click="it.fcn?$emit(it.fcn,scope):defuthed()"
            >{{it.text}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
<style  lang='scss'>

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



// 重写table样式
.custom-el-table {
  position: relative;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  // 暂无数据 居中
  .el-table__body-wrapper {
    position: unset;
    .el-table__empty-block {
      display: block !important;
    }
    .el-table__empty-text {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  // 列表头部样式
  .el-table__header {
    font-size: 14px;
    thead {
      color: rgba(37, 37, 37, 1);
      .cell {
        font-weight: 400;
      }
    }
    .c-header-cell {
      background: #fafafa;
    }
  }
  // 列表行边框颜色
  td,
  th.is-leaf {
    border-bottom: 1px solid #efefef !important;
  }
  // 列表body字号和颜色
  td {
    font-size: 14px;
    color: #5b5b5b;
    padding: 6px 0!important;
  }
  th {
    height: 50px;
  }
  // 就诊类别样式
  .patientclass-color {
    padding: 6px 8px;
    line-height: 27px;
    border-radius: 13px;
    font-size: 14px;
  }
  .icon-more {
    color: #687671;
  }
  .status-flag {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 2px;
    height: 55%;
  }
  .status-tag {
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
  // index序号列 状态
  .index-status {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .index-status-icon {
      //   position: absolute;
      //   top: 50%;
      //   transform: translateY(-50%);
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
      background-color: rgba(223, 32, 31, 0.1);
      &:first-child {
        left: 0;
        z-index: 0;
      }
      &:nth-of-type(2) {
        left: 20px;
        z-index: 1;
        margin-left: -10px;
      }
    }
    .index-lock-falg {
      background: rgba(241, 112, 89, 0.2);
      background-image: url("/static/image/table_icon_lock.svg");
      background-repeat: no-repeat;
      background-position: center center;
    }
    // .index-returned-flag {
    //   background: orange;
    // }
  }
  .index-number {
      color: #999;
  }

  // .wait {
  //   color: #e6a23c;
  //   background-color: rgba(230, 162, 60, 0.2);
  // }
  // .done {
  //   background-color: rgba(103, 194, 58, 0.2);
  //   color: #67c23a;
  // }
  // .reported {
  //   background-color: rgba(86, 152, 246, 0.2);
  //   color: #5698f6;
  // }
  // .canceled {
  //   background-color: rgba(153, 153, 153, 0.2);
  //   color: #999;
  // }
  // .wait-flag {
  //   border-left: 3px solid #e6a23c;
  // }
  // .done-flag {
  //   border-left: 3px solid #67c23a;
  // }
  // .reported-flag {
  //   border-left: 3px solid #5698f6;
  // }
  // .canceled-flag {
  //   border-left: 3px solid #999999;
  // }
  .history-flag {
    font-size: 12px;
    border-radius: 3px;
    padding: 2px 5px;
  }
  .ft-icon {
    position: absolute;
    top: 50%;
    margin-top: -14px;
    z-index: 1;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    &:first-child {
      left: 0;
    }
    &:nth-of-type(2) {
      left: 20px;
    }
  }
  .flowrate-warning-icon {
    background-color: #fbf5f2;
    background-image: url("/static/image/technician_flowrate.svg");
    background-repeat: no-repeat;
    background-position: center center;
  }
  .transport-bed-icon {
    background-image: url("/static/image/technician_transport_bed.svg");
  }
  .transport-wheelchair-icon {
    background-image: url("/static/image/technician_transport_wheelchair.svg");
  }
  .transport-icon {
    background-color: #f1f4fa;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .is-history {
    color: #999;
    background: rgba(0, 0, 0, 0.1);
  }
  .history-flag {
    border-left: 3px solid #e8e8e8;
  }
  .current-flag {
    border-left: 3px solid #ff8f8f;
  }
  .op-text {
    cursor: pointer;
  }
}

</style>
