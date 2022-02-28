<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="region">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option :label="channel.name" :value="channel.id" v-for="(channel, index) in channels" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="rangDate" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadActicles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{ totalCount }}条结果： </span>
      </div>
      <el-table :data="acticle" stripe border style="width: 100%;margin-bottom: 20px;" v-loading="loading">
          <el-table-column prop="date" label="封面">
            <template slot-scope="scope">
              <img v-if="scope.row.cover.images[0]" class="acticle-cover" :src="scope.row.cover.images[0]" alt="">
              <img v-else class="acticle-cover" src="./cover.jpg" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0">草稿</el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                circle
                @click="onDeleteArticle(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :current-page.sync="page" :total="totalCount" @current-change="onCurrentChange"  :page-size="pageSize" :disabled="loading"/>
    </el-card>
  </div>
</template>

<script>
import { getActicles, getActiclesChannels, getActiclesDelete } from '@/network/article'

export default {
  name: 'ArticleIndex',
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      acticle: [],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangDate: null,
      loading: true,
      page: 1
    }
  },
  created () {
    this.loadActicles(1)
    this.loadChannels()
  },
  methods: {
    loadActicles (page = 1) {
      this.loading = true
      getActicles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangDate ? this.rangDate[0] : null,
        end_pubdate: this.rangDate ? this.rangDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.acticle = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onCurrentChange (page = 1) {
      this.loadActicles(page)
    },
    loadChannels () {
      getActiclesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getActiclesDelete(articleId.toString()).then(res => {
          this.loadActicles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
.acticle-cover{
  width: 100px;
  background-size: cover;
}
</style>
