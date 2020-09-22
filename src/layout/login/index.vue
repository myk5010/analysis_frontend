<template>
  <el-container direction="vertical">
    <el-main>
      <el-col :span="12" :offset="6" style="margin-top: calc( (100vh - 500px) / 2);">
        <el-col :span="12">
          <el-image style="height: 500px" :src="require('@/assets/images/login_background_2.png')" fit="cover"></el-image>
        </el-col>
        <el-col :span="12">
          <div class="login_content">
            <p class="p_login">测试中心欢迎您</p>
            <el-col :span="20" :offset="2">
              <el-form
                :model="loginForm"
                status-icon
                :hide-required-asterisk="true"
                :rules="loginRules"
                ref="loginForm"
                label-width="auto"
                class="demo-ruleForm"
                label-position="top"
                size="medium"
              >
                <el-form-item label="账号" prop="username">
                  <el-input v-model="loginForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    auto-complete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item style="margin: 40px 40px 0 0">
                  <el-button
                    :loading="loading"
                    type="primary"
                    @click="handleLogin"
                    class="login_button"
                    style="width:125px;"
                  >登录</el-button>
                </el-form-item>
                <el-button
                  type="text"
                  style="float: right;margin-top: -25px;"
                  @click="forgetPassword"
                >忘记密码</el-button>
              </el-form>
            </el-col>
          </div>
        </el-col>
      </el-col>
      <!-- <p class="now_data">{{date}}</p> -->
    </el-main>
    <!-- <el-footer style="height: 40px;">Equipment Reservation System @Test Center</el-footer> -->
  </el-container>
</template>

<script>
import { menuList } from "@/api/common"

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //     callback(new Error('请输入账号'))
      // } else {
      //     callback()
      // }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6'))
      } else {
        callback()
      }
    }
    return {
      // 登录表单
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      date: new Date()
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await this.$store.dispatch('user/userLogin', this.loginForm)
            const userInfo = await this.$store.dispatch('user/getUser')
            await this.$store.dispatch('user/userPermission', userInfo)
            // 菜单权限过滤
            menuList().then(res => {
              sessionStorage.setItem('menuList', JSON.stringify(res))
              var path = '/'
              var redirect_path = this.redirect
              if (this.redirect) {
                // 拆分出父级路由
                const parent_path = this.redirect.split('/')
                // 拆分出完整路由
                const full_path = this.redirect.split('?')
                const children_path = res.find(function(item) {
                  if (item.path == parent_path[1]) {
                    return item.children
                  }
                })
                if (children_path) {
                  children_path.children.find(function (item) {
                    if (full_path[0] == item.path) {
                      path = redirect_path
                    }
                  })
                }
              }
              this.loading = false
              this.$router.push({ 'path': path })
            }, err => {
              this.loading = false
            })
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 忘记密码
    forgetPassword() {
      window.open( 'VUE_API' + 'password/reset')
    }
  },
  mounted() {
    let _this = this
    // this.timer = setInterval(() => {
    //   _this.date = new Date().toLocaleString() // 修改数据date
    // })
    // 监控键盘
    document.onkeydown = function(e) {
      // 登录界面 - 回车触发登录
      if (e.keyCode === 13 && _this.$route.path == '/login') {
        _this.handleLogin()
      }
    }
  }
}
</script>

<style scoped>
.p_login {
  text-align: center;
  font-size: 32px;
  color: #333;
  font-weight: 800;
  margin: 0 0 40px 0;
  padding: 20px 0;
  height: 35px;
}
.now_data {
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: ghostwhite;
  top: 50%;
  left: 50%;
  position: absolute;
  margin: 150px 0 0 -76px;
}
.carousel_content {
  background: #636f6f;
  width: 700px;
  display: inline-block;
  margin-top: 4em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  left: 61px;
  position: fixed;
}
.login_content {
  background-color: #fff;
  overflow: hidden;
  height: 500px;
}
.el-main {
  height: 100vh;
  background: url("../../assets/images/login_background_1.png") no-repeat;
  background-size: cover;
}
.el-footer {
  background-color: ghostwhite;
  color: #333;
  text-align: center;
  line-height: 45px;
  position: fixed;
  bottom: 0;
  left: 0px;
  width: 100%;
  font-size: 15px;
  font-weight: 700;
}
</style>

