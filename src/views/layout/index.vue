<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
        <app-aside class="aside-menu"/>
    </el-aside>
    <el-container>
        <el-header class="header">
          <app-header />
        </el-header>
        <el-main class="main">
            <router-view />
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside.vue'
import AppHeader from './components/header.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.aside {
    background-color: #d3dce6;
    .aside-menu {
        height: 100%;
    }
}
.header {
    background: #b3c0d1;
    border-bottom: 1px solid #ccc;
}
.main {
    background-color: #e9eef3;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
