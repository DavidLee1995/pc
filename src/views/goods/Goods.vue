<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" plain  @click="addGoods">添加商品</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    addGoods () {
      this.$router.push({name: 'addgoods'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .mySearch{
    width: 330px;
  }

</style>
