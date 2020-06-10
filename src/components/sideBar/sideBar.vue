<template>
  <div class="side-bar-wrapper">
    <el-aside class="index-aside" :width="$store.state.sideBarShow?'64px':'250px'">
      <el-menu
        class="aside-menu"
        :collapse="$store.state.sideBarShow"
        ref="sideBar"
        :default-active="onRoutes"
        text-color="#666666"
        active-text-color="#3E8EF7"
        background-color="#ffffff"
        unique-opened
        router
        menu-trigger="click"
        :collapse-transition="collapseTransition"
        @select="menuChange"
      >
        <!-- <template v-for="(item) in menuList">
            <el-menu-item
              v-if="item.title"
              :index="item.route"
              :key="item.route"
              style="height:60px"
            >
              <icon-svg :icon-class="item.icon" />
              <span class="title" style="margin-left:30px">{{item.title}}</span>
            </el-menu-item>
        </template>-->

        <template v-for="(item) in menuList">
          <el-menu-item
            v-if="item.title&&!item.list"
            :index="item.route"
            :key="item.route"
            @click="barHref(item.route)"
          >
            <icon-svg :icon-class="onRoutes===item.route?item.icon+'_active':item.icon" />
            <span class="title" style="margin-left:3px;margin-bottom:10px">{{item.title}}</span>
          </el-menu-item>
          <el-submenu
            v-if="item.title&&item.list"
            :index="item.route"
            :key="item.route"
            :show-timeout="0"
            :hide-timeout="0"
          >
            <template slot="title">
              <div>
                <icon-svg :icon-class="item.list.includes(onRoutes)?item.icon+'_active':item.icon" />
                <span slot="title" style="margin-left:3px">{{item.title}}</span>
              </div>
            </template>
            <el-menu-item
              v-for="(subItem,i) in item.list"
              :key="i"
              :index="subItem.route"
              @click="barHref(subItem.route)"
            >
              <icon-svg :icon-class="subItem.icon" />
              <span slot="title" style="margin-left:3px">{{ subItem.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script src="./sideBar.js"></script>

<style lang="less">
@import url("./sideBar.css");
</style>