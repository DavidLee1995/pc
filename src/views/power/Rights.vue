<template>
  <div class="rights">
    <!-- 面包屑导航 -->
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <el-table
    :data="RightsData"
    v-loading="loading"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    border
    class="mb-15 mt-15"
    >
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      label="等级">
      <!-- 设置一个过滤器来设置等级 -->
      <template slot-scope="scope">
        <el-tag>{{scope.row.level | fiterU}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {RightsList} from '@/api'
export default {
  data () {
    return {
      RightsData: [],
      loading: true
    }
  },
  created () {
    RightsList('list')
      .then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.RightsData = res.data
          this.loading = false
        }
      })
  },
  filters: {
    fiterU (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  }
}
</script>

<style>

</style>
