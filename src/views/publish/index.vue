<template>
  <div class="publish">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>发布文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="from" :model="article" label-width="80px">
            <el-form-item label="标题：">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容：">
                <el-input type="textarea" v-model="article.content"></el-input>
            </el-form-item>
            <el-form-item label="封面：">
                <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道：">
                <el-select v-model="article.channel_id" placeholder="请选择频道">
                  <el-option label="全部" :value="null"></el-option>
                  <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(false)">发布</el-button>
                <el-button @click="onSubmit(true)">存入草稿</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import { getActiclesChannels, addArticle, getArticle } from '@/network/article'

export default {
  name: 'PublishIndex',
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: []
    }
  },
  components: {},
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    onSubmit (draft = false) {
      addArticle(this.article, draft).then(res => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      })
    },
    loadChannels () {
      getActiclesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
</style>
