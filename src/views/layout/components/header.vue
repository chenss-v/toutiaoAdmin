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
                <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { getUserProfile } from '@/network/user'
import globalBus from '@/network/global-bus'

export default {
  data () {
    return {
      user: {}
    }
  },
  components: {},
  created () {
    this.loadUserPrlfile()
    globalBus.$on('updata-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    loadUserPrlfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('是否确认退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
