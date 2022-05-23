<template>
  <div class="">
    <div class="cover-wrap" @click="showCoverSelect">
      <img class="cover-image" src="">
    </div>

    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">1</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">2</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  components: {

  },
  created () {

  },
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
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
