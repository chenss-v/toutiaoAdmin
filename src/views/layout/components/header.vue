<template>
    <div class="header">
        <div>
            <i class="el-icon-s-fold"></i>
            <span>后台管理系统</span>
        </div>

        <el-dropdown>
            <div class="avatar-wrap">
                <img class="avatar" :src="user.photo" alt="">
                <span>{{ user.name }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { getUserProfile } from '@/network/user'

export default {
  data () {
    return {
      user: {}
    }
  },
  components: {

  },
  methods: {
    loadUserPrlfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  },
  created () {
    this.loadUserPrlfile()
  }
}
</script>

<style scoped lang="less">
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
