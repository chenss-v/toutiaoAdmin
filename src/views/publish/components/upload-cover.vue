<template>
  <div class="">
    <div class="cover-wrap" @click="showCoverSelect">
      <img class="cover-image" ref="cover-image" :src="coverImage">
    </div>

    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      >
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">1</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="onFileChange" ref="file">
          <img height="100" src="" alt="" ref="preview-image">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/network/image'
export default {
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  props: ['cover-image'],
  components: {
  },
  created () {
  },
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      // 预览图片
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // this.$refs.file.values = ''
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log(res)
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url

          // 将图片地址发送给父组件
          this.$emit('updata-cover', res.data.data.url)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-image {
    height: 120px;
    max-width: 100%;
  }
}
</style>
