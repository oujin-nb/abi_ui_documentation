<template>
  <el-form
    v-on="$listeners"
    v-bind="$attrs"
    :model="obj.data"
    :rules="obj.formRule"
    label-position="left"
    class="basic_form"
  >
    <div v-for="(item,i) in obj.pd" :key="i">
      <el-form-item :class="obj.inline?'inline':''" :prop="item.prop">
        <el-dropdown v-if="item.alternative" class="title">
          <span class="el-dropdown-link">
            {{item.label}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="it in item.alternative"
              :key="it.label"
              @click.native="dropDownClick({index:i,oldVal:item,val:it})"
            >{{it.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="title" v-if="!item.alternative">{{item.label}}</span>
        <el-input
          clearable
          v-model="obj.data[item.prop]"
          v-if="item.type==='input'"
          :disabled="item.disabled"
          @change="submitEvent(item.fcn)"
          :style="{width:item.width}"
        ></el-input>
        <el-input
          clearable
          v-model="obj.data[item.prop]"
           @change="submitEvent(item.fcn)"
          v-if="item.type==='textarea'"
          type="textarea"
          :style="{width:item.width}"
          :disabled="item.disabled"
        ></el-input>
        <el-select
          v-model="obj.data[item.prop]"
          placeholder="请选择"
          v-if="item.type==='select'"
          @change="submitEvent(item.fcn)"
          clearable
        >
          <el-option v-for="(it,i) in item.opt" :key="i" :label="it.label" :value="it.prop"></el-option>
        </el-select>
        <el-checkbox-group v-model="obj.data[item.prop]" v-if="item.type==='checkbox'">
          <el-checkbox v-for="(check,i) in item.opt" :label="check" :key="i">{{check}}</el-checkbox>
        </el-checkbox-group>
        <el-date-picker
          v-model="obj.data[item.prop]"
          type="date"
          placeholder="选择日期"
          v-if="item.type==='date'"
          @change="submitEvent(item.fcn)"
        ></el-date-picker>
        <el-time-picker
          v-model="obj.data[item.prop]"
          placeholder="选择时间"
          v-if="item.type==='time'"
          @change="submitEvent(item.fcn)"
        ></el-time-picker>
        <div v-if="item.type==='butGroup'">
          <el-button
            v-for="(it,i) in item.butList"
            :type="it.type?it.type:'primary'"
            :key="i"
            @click="submitEvent(it.fcn)"
          >{{it.text}}</el-button>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  created() {
    console.log(this.obj);
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return this.opt;
    }
  },
  data() {
    return {};
  },
  methods: {
    submitEvent(fcn) {
      if (this.fcn.checkNull(fcn)) this.$emit(fcn);
    },

    dropDownClick(s) {
      this.obj.pd[s.index].label = s.val.label;
      this.obj.pd[s.index].prop = s.val.prop;
    }
  }
};
</script>
 <style lang="less">
.basic_form {
  .el-form-item {
    .el-form-item__content {
      margin-left: 0px !important;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .title {
        width: 80px;
      }
    }
  }
}

.inline {
  margin-top: 10px;
}
</style>