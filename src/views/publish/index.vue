<template>
  <div class="publish">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $route.query.id ? '修改内容' : '发布内容'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="article" :rules="formRules" label-width="80px" ref="publish-form">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-tiptap lang="zh" v-model="article.content" :extensions="extensions" height="350" placeholder="请输入文章内容"/>
                </el-form-item>
            <el-form-item label="封面：">
                <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <template v-if="article.cover.type > 0">
                  <upload-cover
                    :key="cover"
                    v-for="(cover, index) in article.cover.type"
                    @updata-cover="onUpdataCover(index, $event)"
                    :cover-image="article.cover.images[index]"
                    />
                </template>
            </el-form-item>
            <el-form-item label="频道：" prop="channel_id">
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
import UploadCover from './components/upload-cover.vue'
import { getActiclesChannels, addArticle, getArticle, updateArticle } from '@/network/article'
import { uploadImage } from '@/network/image'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
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
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
        new Underline({ bubble: true, menubar: false }),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new TextColor()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      }
    }
  },
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    onSubmit (draft = false) {
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        if (this.$route.query.id) {
          updateArticle(this.$route.query.id, draft, this.article).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '修改'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
          })
          this.$router.push('/article')
        }
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
    },
    onUpdataCover (index, url) {
      console.log('onUpdataCover', url)
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
</style>
