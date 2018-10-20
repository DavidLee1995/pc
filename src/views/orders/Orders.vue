<template>
  <div class="orders">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
       <!-- 搜索框 -->
    <div style="margin-top: 15px;" >
      <el-input placeholder="请输入内容"  v-model="userInfo" class="input-with-select mySearch">
        <el-button slot="append" icon="el-icon-search" @click="searchOrdersBtn"></el-button>
      </el-input>
     <!-- 添加按钮 -->
       <el-button type="primary" plain >测试订单</el-button>
    </div>
    <!-- 用户列表表格 -->
    <el-table
    :data="tableData"
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
      prop="order_number"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="订单价格">
    </el-table-column>
    <el-table-column
      prop="order_id"
      label="下单用户">
    </el-table-column>
    <el-table-column
      prop="order_pay"
      label="是否付款">
    </el-table-column>
    <el-table-column
      prop="is_send"
      label="是否发货">
    </el-table-column>
    <el-table-column
      label="下单时间">
      <template slot-scope="scope">
        {{scope.row.update_time | checkTime(scope.row.update_time ,'/')}}
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
          <el-button size="small" type="primary"  plain icon="el-icon-edit" @click="editUsers(scope.row)"></el-button>
          <el-button size="small" type="danger"  plain icon="el-icon-delete"  @click="delUsers(scope.row)" ></el-button>
       </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      class="page"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getorders, searchorders} from '@/api'
export default {
  data () {
    return {
      userInfo: '',
      tableData: [],
      pagesize: 5,
      total: 5,
      pagenum: 1
    }
  },
  filters: {
    checkTime (time, seprator) {
      let times = parseInt(time)
      let times2 = new Date(times)
      let y = times2.getFullYear()
      let m = times2.getMonth() + 1
      let d = times2.getDate()
      return y + seprator + m + seprator + d
    }
  },

  created () {
    this.initPage()
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.initPage()
    },
    // 搜索框
    searchOrdersBtn () {
      searchorders(this.userInfo)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.goods
        })
    },
    // 渲染页面
    initPage () {
      getorders(
        {
          query: this.userInfo,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          user_id: this.searchId,
          pay_status: '',
          is_send: '',
          order_fapiao_title: '',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '' })
        .then(res => {
          if (res.meta.status === 200) {
            // console.log(res)
            this.tableData = res.data.goods
            this.total = res.data.total
          }
        })
    }
  }

}
</script>

<style lang="scss" scoped>
  .mySearch{
    width: 330px;
  }

</style>
