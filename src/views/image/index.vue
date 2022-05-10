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
      <div class="action-head">
        <el-radio-group v-model="radio1" size="mini" @change="onCollectChange">
          <el-radio-button :label="false" @click.native="loadImages(false)">全部</el-radio-button>
          <el-radio-button :label="true" @click.native="loadImages(true)">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="dialogUploadVisible = true">上传素材</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :lg="4" :md="6" :sm="6" v-for="(img, index) in images" :key="index">
          <el-image style="height: 100px" :src="img.url" :fit="fit"></el-image>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
    </el-dialog>
  </div>
</template>

<script>
import { getImage } from '@/network/image'

export default {
  name: 'ImageIndex',
  data () {
    return {
      radio1: false,
      images: [],
      dialogUploadVisible: false
    }
  },
  components: {

  },
  created () {
    this.loadImages(false)
  },
  methods: {
    loadImages (collect = false) {
      getImage({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style scoped lang="less">
.action-head{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
