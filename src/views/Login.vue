<template>
<div class="login">
  <el-form ref="form" :model="myform" class="container" :rules="myrules">
    <el-form-item>
    <div  class="avatar">
      <img src="../assets/avatar.jpg" alt="">
    </div>
  </el-form-item>
  <el-form-item prop="username">
    <el-input v-model="myform.username"  prefix-icon="myicon myicon-user" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input v-model="myform.password"  prefix-icon="myicon myicon-key"  placeholder="请输入密码" type="password" @keydown.native.enter="hendlerLigin('form')"></el-input>
  </el-form-item>
  <el-form-item>
     <el-button  class="login-btn" type="primary" @click="hendlerLigin('form')" >登录</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>
<script>
import { handleLogin } from '@/api'
// import axios from 'axios'
export default {
  data () {
    return {
      myform: {
        username: 'admin',
        password: '123456'
      },
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  // methods: {
  //   hendlerLigin () {
  //     axios.post('http://127.0.0.1:8888/api/private/v1/login', this.myform)
  //       .then(res => {
  //         console.log(res)
  //         if (res.data.meta.status === 200) {
  //           this.$router.push({name: 'home'})
  //         }
  //       })
  //   }
  // }
  methods: {
    hendlerLigin (formName) {
      this.$refs[formName].validate(valid => {
        handleLogin(this.myform).then(res => {
          if (res.meta.status === 200) {
            localStorage.setItem('myToken', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.$router.push({ name: 'home' })
          } else {
            this.$message({
              title: '错误',
              message: res.meta.msg,
              type: 'warning'
            })
            return false
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4050;

    .container {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 0px 40px 15px 40px;
      margin: 200px auto;
      background: white;
      .avatar {
        position: relative;
        left: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
