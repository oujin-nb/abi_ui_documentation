<template>
  <el-table class="custom-el-table custom-scroll"
            header-cell-class-name="c-header-cell"
            ref="baseTable"
            v-bind="$attrs"
            v-on="$listeners"
            :data="tableDataObj.data"
            :show-header="true"
            highlight-current-row
            style="width: 100%">

    <!-- 注意事项列表 状态历史/当前 -->
    <el-table-column width="15"
                     fixed>
      <template slot-scope="scope">
        <span v-if="tableDataObj.tableName === 'attentionTable'"
              class="status-flag"
              :class="scope.row.isHistory || scope.row.isHistoryData  ? 'history-flag' : 'current-flag'"></span>
      </template>
    </el-table-column>

    <!-- 多选 -->
    <el-table-column v-if="tableDataObj.isSelection"
                     type="selection"
                     width="55"
                     fixed></el-table-column>

    <!-- 序列号 -->
    <el-table-column v-if="!tableDataObj.notShowIndex"
                     label="序列号"
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

    <!-- 技师列表-流速预警和运输方式 -->
    <el-table-column  
                     label
                     width="50">
      <template slot-scope="scope">
        <span v-if="scope.row.flowratewarning"
              class="ft-icon flowrate-warning-icon"></span>
        <span v-if="scope.row.transportationMode"
              class="ft-icon transport-icon"
              :class="{'transport-wheelchair-icon': scope.row.transportationMode === 'WHLC', 'transport-bed-icon': scope.row.transportationMode === 'CART' || 'PORT'}"></span>
      </template>
    </el-table-column>

    <el-table-column v-for="(item,index) in tableDataObj.thead"
                     :key="index"
                     :prop="item.colDisplayFieldName"
                     :label="item.colDisplayName"
                     :width="item.columnWidth"
                     :align="item.align || 'left'"
                     :fixed="item.fixedFlag"
                     :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span v-if="item.colDisplayFieldName === 'resultStatus'"
              class="status-tag"
              :class="{'wait': scope.row.resultStatus >= 1020 && scope.row.resultStatus < 2050, 'done':  scope.row.resultStatus >= 2050 && scope.row.resultStatus < 3010, 'reported': scope.row.resultStatus >= 3010, 'canceled': scope.row.resultStatus === 1000}">{{scope.row.resultStatusCH}}</span>

        <!-- 就诊类别 -->
        <span v-else-if=" item.colDisplayFieldName == 'patientClassCH'">
          <span class="patientclass-color"
                :style="{'color': scope.row.patientClassColor || '', 'background-color': scope.row.patientClassBgColor || ''}">{{scope.row.patientClassCH}}</span>
          <span v-if="tableDataObj.tableName === 'technicianWaitList' && item.colDisplayFieldName == 'patientClassCH' && scope.row.patientClass == '3000' && scope.row.emergencygrading"
                class="patientclass-color"
                :style="{'color': scope.row.patientClassColor || '', 'background-color': scope.row.patientClassBgColor || ''}">{{scope.row.emergencygrading}}</span>
        </span>

        <!-- 检查状态 -->
        <!-- <span v-else-if="item.colDisplayFieldName == 'resultStatusCH'">
          <resultStatus :resultStatus="scope.row.resultStatus"
                        :resultStatusCH="scope.row.resultStatusCH"></resultStatus>
        </span> -->

        <!-- 注意事项-历史检查/当前检查 -->
        <span v-else-if="tableDataObj.tableName === 'attentionTable' && item.colDisplayFieldName === 'isHistory'"
              class="history-flag"
              :class="scope.row.isHistory || scope.row.isHistoryData ? 'is-history' : 'current-attention'">{{scope.row.isHistory || scope.row.isHistoryData ? '患者事项' : '检查事项'}}</span>
        <span v-else>{{scope.row[item.colDisplayFieldName]}}</span>
      </template>
    </el-table-column>

    <!-- 操作列 有文字形式、按钮形式和更多(...)形式 -->
    <el-table-column fixed="right"
                     label=" "
                     align="center"
                     v-if="tableDataObj.hasOpration">
      <template slot-scope="scope">
        <!-- 文字 -->
        <div v-if="tableDataObj.operations">
          <span class="op-text actived-font"
                v-for="(item,index) in tableDataObj.operations"
                :key="index"
                @click.stop="(s) => { $emit(item.fn, scope.row)}">{{item.label}}</span>
        </div>
        <!-- 按钮 -->
        <div v-else-if="tableDataObj.operatButton">
          <el-button v-if="scope.row.clickChecked"
                     type="primary"
                     @click.stop="$emit(tableDataObj.operatButton.clickFn, scope.row)">{{tableDataObj.operatButton.buttonText}}</el-button>
        </div>
        <!-- ... -->
        <div v-else>
          <el-button class="icon-more"
                     @click.stop="(s) => { $emit('clickOperation', scope.row)}"
                     icon="el-icon-more"
                     type="text"
                     size="small"></el-button>
        </div>
      </template>
    </el-table-column>
    <template slot="empty">
      <span class="table-empty-slot"
            v-if="tableDataObj.emptyText">{{tableDataObj.emptyText}}</span>
    </template>
  </el-table>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "base-table",
  props: { 
    paginationHeight: {
      default: 58,
      type: Number
    },
    currentClickRow: {
      type: Object
    }
  },
  computed: {
    tableDataObj() {
      this.fcn.patientClassColorHandler.call(this, this.$attrs.tableData.data);
      //   return Object.assign({}, this.$attrs.tableData); // 对象深拷贝
      return this.$attrs.tableData;
    }
  },
  filters: {
      indexFilter(val) {
         return val < 9 ? `0${val+1}` : val+1
      }
  },
  mounted() {
    this.$nextTick(() => {
      // 当有currentClickRow传进来时 将当前行设置为高亮行
      if (this.currentClickRow && this.$refs.baseTable) {
        this.$refs.baseTable.setCurrentRow(this.currentClickRow); // 将当前行设置为高亮
      }
    });
  }
};
</script>

<style lang="scss">
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
    // padding: 6px 0!important;
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

