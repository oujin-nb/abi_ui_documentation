<template>
  <div class="info_box column-start-center">
    <div class="top_wrapper"
    >
      <div class="top_banner row-space-between">
        <div class="title_banner">
           基础信息
        </div>
        <div class="row-flex-start">
          <el-tooltip content="编辑" placement="top">
            <div class="data-head_icon_wrapper row-center" @click="openRelateInfoEdit">
              <div class="data_head_icon el-icon-setting"></div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>

    <div class="patient_detailed_wrapper" ref="infoWrapper">
      <div
        class="patient_detailed_banner row-start-start"
        :style="{fontSize:fontSize+'px'}"
        v-for="(item,index) in labelList"
        :key="index"
      >
        <div class="title nowrap" :title="item.label+':'">{{item.label}}:</div>
         
        <div
          class="text"
          :style="{
        color:item.color
      }"
        >{{data[item.prop]}}</div>
      </div>
    </div>
    <!-- <div class="shadow_bottom_banner" v-if="isScorll"></div> -->
  </div>
</template>

<script>
export default {
  props: {
      labelList:Array,
      fontSize:{
          default:14
      },
      data:Object

  },
 
  data() {
    return {
    };
  },
  created() {
 
  },
  mounted(){
   
  },
  methods: {
   
   
 
  }
};
</script>
<style lang="scss" scoped>
.info_top_shadow {
  box-shadow:0px 14px 9px 0px rgba(119, 118, 118, 0.08);
}
.info_box {
  color: #999999;
  // padding: 15px 20px;
  height: 100%;
  position: relative;
  .shadow_bottom_banner {
    height: 15px;
    width: 100%;
    box-shadow: 0px -12px 12px 0px rgba(136, 134, 134, 0.08);
  }
  .data-head_icon_wrapper {
    width: 34px;
    height: 34px;
    background: #ffffff;
    position: relative;
    border-radius: 12px;
    margin-left: 12px;
    cursor: pointer;
    .data_head_icon {
      width: 17px;
      height: 17px;
      font-size: 16px;
      color: #666666;
    }
  }
  .top_wrapper {
    width: 100%;
    padding: 15px 20px;
  }
  .top_banner {
    width: 100%;
    .title_banner {
      color: #262626d6;
      font-size: 16px;
      font-weight: bold;
    }
    .relative_icon {
      position: relative;
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-right: 16px;
    }

    .relative_text {
      margin: 0px 5px;
      cursor: pointer;
    }
    .relative_num {
      position: absolute;
      cursor: pointer;
      right: -5px;
      top: -5px;
      width: 16px;
      height: 16px;
      font-size: 11px;
      border-radius: 50%;
      color: #ffffff;
      background: #fe6866;
    }
  }
  .patient_info_baner {
    width: 100%;
    padding-top: 28px;
    // padding-bottom: 25px;
    .patient_img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
      // background: #ffb6bd;
    }
    .patient_name {
      font-size: 18px;
      // color: #262626;
      color: #262626e0;
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 5px;
    }
    .patient_otherInfo {
      color: #666666;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .separate_line {
    width: 260px;
    height: 1px;
    background: #ececec;
  }
  .patient_detailed_wrapper {
    width: 100%;
    overflow-y: auto;
    flex: 1;
    padding: 0px 20px;
    // max-height:700px;
  }
  .patient_detailed_banner {
    margin-top: 20px;
    width: 100%;
    font-size: 14px;
    .title {
      // width: 85px;
      height: 100%;
      margin-right: 10px;
      color: #2f2f2fbf;
      font-weight: bold;
    }
 
  }
}
</style>