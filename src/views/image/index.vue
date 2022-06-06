<template>
  <div class="">
    <el-card class="box-card">
       <div slot="header" class="clearfix">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 面包屑导航 -->
        <image-list />
    </el-card>
  </div>
</template>

<script>
import imageList from './components/image-list'

export default {
  name: 'ImageIndex',
  data () {
    return {}
  },
  components: {
    imageList
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
