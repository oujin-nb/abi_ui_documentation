<template>
  <el-container class="index-wrapper">
    <el-header height="80px">
      <!-- 公共头部 -->
      <common-header></common-header>
    </el-header>
    <el-container class="main-container">
      <!-- 公共侧边栏 -->
      <side-bar></side-bar>
      <!-- 内容区域 -->
      <el-main >
        <div style="height:55px;width:100%;background:#ffffff;margin-bottom:20px" class="row-flex-start">
          <el-breadcrumb separator="/" style='margin-left:20px'>
            <el-breadcrumb-item>主页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$store.state.currentRoute}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <transition 
        enter-active-class="animated bounceInLeft">
        <router-view  :key="key"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script src="./index.js"></script>

<style lang="less">
@import url("./index.css");
</style>