<template>
  <div class="category">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
       <el-button type="primary" plain @click="isShow" >添加商品</el-button>
   <!-- 使用组件 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
    <!-- 分页组件 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      class="page"
      :total="total">
    </el-pagination>
      <!-- 添加商品弹框 -->
    <el-button  type="text" @click="addGoods = true"></el-button>
      <el-dialog title="添加用户" :visible.sync="addGoods">
      <el-form :model="goodsParam" :rules="myRules" ref="myRef">
        <el-form-item label="商品名" :label-width="formLabelWidth" prop="goodsname">
          <el-input v-model="goodsParam.goodsname" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>

      <el-form >
         <el-form-item label="父级名称" :label-width="formLabelWidth">
        <el-cascader
          :options="options"
          :props="defaultProps"
          class="selectInfo"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoods = false">取 消</el-button>
        <el-button type="primary" @click="subMintAdd('myRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import {categories, addGoodsBtn, addGoodsName} from '@/api'
export default {
  // 引入组件
  components: {
    TreeGrid
  },
  data () {
    return {
      // 定义连级选择器
      options: [],
      selectedOptions: [], // 存放连级选择器选中的数据
      defaultProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      // 定义分页器相关的内容
      total: 0,
      pagesize: 5,
      pagenum: 1,
      // 定义添加弹框的内容
      addGoods: false,

      // 商品名
      goodsParam: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      formLabelWidth: '80px',
      myRules: {goodsname: [
        { required: true, message: '请输入商品', trigger: 'blur' }
      ]},
      // 定义组件相关内容
      goodsList: [],
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  created () {
    this.initPage()
  },

  methods: {
    deleteCategory () {},
    editCategory () {},
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 把每页的条数传进去渲染函数里面
      this.pagesize = val
      // 传递进去后再渲染一次
      this.initPage()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 把当前的页码数传递到参数里面
      this.pagenum = val
      this.initPage()
    },
    // 渲染页面
    initPage () {
      categories({query: 3, pagesize: this.pagesize, pagenum: this.pagenum})
        .then(res => {
          if (res.meta.status === 200) {
            // console.log(res)
            this.dataSource = res.data.result
            this.total = res.data.total
          }
        })
    },
    handleChange (value) {
      console.log(value)
      this.goodsParam.cat_pid = value[value.length - 1]
      this.goodsParam.cat_level = value.length
    },
    // 点击显示添加框
    isShow () {
      this.addGoods = true
      addGoodsBtn(2)
        .then(res => {
          console.log(res)
          this.options = res.data
        })
    },
    // 提交新增商品
    subMintAdd (fromName) {
      this.$refs[fromName].validate(valid => {
        addGoodsName(this.goodsParam)
          .then(res => {
            console.log(res)
          })
      })
      console.log(123)
    }
  }

}
</script>

<style lang="scss" scoped>
  .category{
    .selectInfo{
      // margin-left: 78px
    }
  }
</style>
