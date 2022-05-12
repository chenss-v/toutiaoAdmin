<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--
        1把数据列表articles绑定给data
      -->
      <el-table
        :data="articles"
        style="width: 100%" class="table">
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
              :disabled="scope.row.statusDisabled">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getActicles, updataCommentStauts } from '@/network/article'

export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [],
      totalCount: 0,
      pageSize: 10,
      page: 1
    }
  },
  components: {

  },
  created () {
    this.loadActicles()
  },
  methods: {
    handleSizeChange () {
      this.loadActicles(1)
    },
    handleCurrentChange (page) {
      this.loadActicles(page)
    },
    loadActicles (page = 1) {
      this.page = page
      getActicles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      article.statusDisable = true
      updataCommentStauts(article.id.toString(), article.comment_status).then(res => {
        article.statusDisable = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启评论状态' : '关闭评论状态'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.table{
  margin-bottom: 20px;
}
</style>
