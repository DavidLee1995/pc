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
          class="mb-15 mt-15"
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
      <el-dialog title="添加商品名" :visible.sync="addGoods">
      <el-form :model="goodsParam" :rules="myRules" ref="myRef" >
        <el-form-item label="商品名" :label-width="formLabelWidth" prop="cat_name">
          <el-input v-model="goodsParam.cat_name" auto-complete="off" @keydown.native.enter="subMintAdd('myRef')"></el-input>
        </el-form-item>
      </el-form>

      <el-form>
         <el-form-item label="父级名称" :label-width="formLabelWidth">
        <el-cascader
          change-on-select
          :options="options"
          :props="defaultProps"
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
    <!-- 编辑商品弹框 -->
    <el-button  type="text" @click="editGoods = true"></el-button>
      <el-dialog title="编辑商品名" :visible.sync="editGoods">
      <el-form :model="goodsParam" :rules="myRules" ref="myRef" slot-scope="scope">
        <el-form-item label="商品名" :label-width="formLabelWidth" prop="cat_name">
          <el-input v-model="goodsParam.cat_name" auto-complete="off" @keydown.native.enter="editCateInfo('myRef')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editGoods = false">取 消</el-button>
        <el-button type="primary" @click="editCateInfo('myRef')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import {categories, addGoodsBtn, addGoodsName, delGoodsName, editGoodsName} from '@/api'
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
      // 编辑商品名称的内容
      editGoods: false,
      goodsId: '',
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
      myRules: {
        cat_name: [
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
    // 删除分类
    deleteCategory (cid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除分类
        delGoodsName(cid)
          .then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.initPage()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交编辑商品名字
    editCateInfo () {
      let obj = {
        id: this.goodsId,
        cat_name: this.goodsParam.cat_name
      }
      editGoodsName(obj)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            // 更新完成刷新页面
            this.initPage()
            // 隐藏弹出框
            this.editGoods = false
          } else {
            this.$message({
              type: 'warning',
              message: res.meta.msg
            })
          }
        })
    },
    // 弹出编辑框
    editCategory (cid) {
      this.editGoods = true
      this.goodsId = cid
    },
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
      // console.log(value)
      this.goodsParam.cat_pid = value[value.length - 1]
      this.goodsParam.cat_level = value.length
    },
    // 点击显示添加框
    isShow () {
      this.addGoods = true
      addGoodsBtn(2)
        .then(res => {
          // console.log(res)
          this.options = res.data
        })
    },
    // 提交新增商品
    subMintAdd (fromName) {
      this.$refs[fromName].validate(valid => {
        addGoodsName(this.goodsParam)
          .then(res => {
            // console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              // 刷新页面
              this.initPage()
              // 隐藏弹出框
              this.addGoods = false
              // 清空弹出框
              this.goodsParam.cat_name = ''
              this.selectedOptions.length = 0
            }
          })
      })
      // console.log(123)
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
