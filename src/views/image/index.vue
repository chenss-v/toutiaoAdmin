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
      <div style="padding-bottom: 20px">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :lg="4" :md="6" :sm="6" v-for="(img, index) in images" :key="index">
          <el-image style="height: 100px" :src="img.url" :fit="fit"></el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getImage } from '@/network/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: '全部',
      images: []
    }
  },
  components: {

  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages () {
      getImage().then(res => {
        this.images = res.data.data.results
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
