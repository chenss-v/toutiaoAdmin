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
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange">
      </el-pagination>
    </el-card>

    <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage } from '@/network/image'

export default {
  name: 'ImageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      radio1: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 20
    }
  },
  components: {

  },
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page = 1) {
      getImage({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(this.page)
    },
    onPageChange (page) {
      this.loadImages(page)
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
