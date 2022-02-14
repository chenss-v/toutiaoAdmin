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
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="ruleForm.date1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到条结果： </span>
      </div>
      <el-table :data="acticle" stripe border style="width: 100%;margin-bottom: 20px;">
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
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getActicles } from '@/network/article'

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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      acticle: [

      ]
    }
  },
  created () {
    this.loadActicles()
  },
  methods: {
    loadActicles () {
      getActicles().then(res => {
        this.acticle = res.data.data.results
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
