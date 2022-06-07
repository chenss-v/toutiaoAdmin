<template>
  <div class="upload-cover" @click="onChange">
    <div class="cover-wrap">
      <img class="cover-image" ref="cover-image" :src="value">
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <ImageList :is-show-add="false" :is-show-action="false" is-show-selected ref="image-list" />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="onFileChange" ref="file">
          <img class="file-image" ref="preview-image">
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
import ImageList from '../../image/components/image-list'

export default {
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  props: ['value'],
  // props: ['cover-image'],
  components: {
    ImageList
  },
  created () {
  },
  methods: {
    // 打开对话框
    onChange () {
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
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url

          // 将图片地址发送给父组件
          this.$emit('input', res.data.data.url)
          // this.$emit('updata-cover', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected // 拿到组件内用户选择的图片index
        if (selected === null) { // 没选就提示 并结束执行
          this.$message('请选择图片封面')
          return
        }
        // 选择了图片 确定 则执行
        this.dialogVisible = false // 关闭对话框
        // console.log(selected)
        this.$emit('input', imageList.images[selected].url) // 把选择的图片的按数据images内对应index拿到url 通过自定义事件传给父组件
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
.file-image {
  font-size: 30px;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  // border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
