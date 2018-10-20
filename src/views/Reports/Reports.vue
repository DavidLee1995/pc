<template>
  <div class="orders">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- tabs标签 -->
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户来源" name="1">
          <!-- 商家数据 -->
        <chart :options='option' auto-resize class="mb-15 mt-15"></chart>
      </el-tab-pane>
      <el-tab-pane label="数据统计1" name="2">
        <chart :options='option1' auto-resize class="mb-15 mt-15"></chart>
      </el-tab-pane>
      <el-tab-pane label="数据统计2" name="3">
        <chart :options='option2' auto-resize class="mb-15 mt-15"></chart>
      </el-tab-pane>
      <el-tab-pane label="数据统计3" name="4">
        <chart :options='option3' auto-resize class="mb-15 mt-15"></chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {ordersGoods} from '@/api'
var base = +new Date(1968, 9, 3)
var oneDay = 24 * 3600 * 1000
var date = []

var data = [Math.random() * 300]

for (var i = 1; i < 20000; i++) {
  var now = new Date(base += oneDay)
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
}
export default {
  data () {
    return {
      activeName: '1',
      option: {

      },
      option1: {},
      option2: {},
      option3: {}

    }
  },
  created () {
    ordersGoods(1)
      .then(res => {
        this.option = res.data
      })
  },
  methods: {
    handleClick (tab) {
      console.log(tab)
      if (tab.index === '1') {
        ordersGoods(tab.index)
          .then(res => {
            console.log(res)
            this.option1 = res.data
          })
      } else if (tab.index === '2') {
        ordersGoods(tab.index)
          .then(res => {
            console.log(res)
            this.option2 = res.data
          })
      } else if (tab.index === '3') {
        ordersGoods(tab.index)
          .then(res => {
            console.log(res)
            this.option3 = res.data
          })
      }
    }
  }
}
</script>

<style>

</style>
