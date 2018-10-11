<template>
  <div class="home">
        <el-container>
        <!-- 侧边栏 -->
        <el-aside width="aotu" >
          <div class="logo"></div>
           <el-menu
              default-active="1"
              background-color="#f9f9f9"
              :collapse="isCollapse"
              class="el-menu-admin"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户数据</span>
                </template>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
              </el-submenu>

            </el-menu>
        </el-aside>
        <el-container>
          <!-- 头部 -->
          <el-header>
            <div class="myicon myicon-menu toggle-btn" @click="toogleTitle"></div>
            <div class="system-title">欢迎来到传智播客后台管理系统</div>
            <div>
              <span>您好，{{username}}</span>
              <el-button type="warning" round @click = 'loginout'>退出</el-button>
            </div>
          </el-header>
          <!-- 主要内容 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
        </el-container>
  </div>
</template>

<script>
import { userList } from '@/api'
export default {
  data () {
    return {
      isCollapse: false,
      username: '????'
    }
  },
  mounted () {
    this.username = localStorage.getItem('username')
    userList(this.objs)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toogleTitle () {
      this.isCollapse = !this.isCollapse
    },
    loginout () {
      localStorage.removeItem('myToken')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-container {
      height: 100%;
    }
    .el-aside {
      background-color: #f9f9f9;
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #409eff;
    }
    .logo {
      height: 60px;
      background: url(../assets/logo.png);
      background-size: cover;
      background-color: white;
    }
    .toggle-btn {
      padding: 0 15px;
      margin-left: -20px;
      font-size: 36px;
      color: white;
      cursor: pointer;
      line-height: 60px;
      &:hover {
        background-color: #4292cf;
      }
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome {
      color: white;
    }
  }
</style>
