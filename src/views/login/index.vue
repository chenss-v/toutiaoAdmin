<template>
<div class="login-container">
  <el-form class="login-from" ref="login-form" :model="user" :rules="fromRules">
    <h1 class="login-head">管理系统</h1>
    <el-form-item prop="mobile">
      <el-input v-model="user.mobile" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model="user.code" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox v-model="user.agree">
        我已阅读并同意用户协议和隐私条款
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { login } from '../../network/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      fromRules: {
        mobile: [
          { required: true, message: '账号不能为空', trigger: 'change' },
          // { pattern: /^1\d{10}$/, message: '请输入正确的号码格式', trigger: 'change'},
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, message: '密码长度最低为6个字符', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      // 获取表单数据（根据接口要求绑定数据）
      // 表单验证
      // 验证通过，提交登录
      this.loginLoading = true
      login(this.user).then(res => {
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        this.$router.push('/home')
      }).catch(err => {
        // 登录失败
        console.log(err)
        this.$message.error('登录失败，请检查账号与密码')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./images/login-bgimg.jpg") no-repeat;
  background-size: cover;
  .login-from{
    background-color: rgba(245, 237, 237, 0.719);
    padding-left: 50px;
    padding-right: 50px;
    .login-head{
      margin-left: 60px;
    }
    .login-btn{
      width: 100%;
    }
  }
}
</style>
