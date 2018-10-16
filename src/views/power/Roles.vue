<template>
    <div class="roles">
    <!-- 面包屑导航 -->
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户按钮 -->
      <el-button type="primary" @click="addUserInfo">添加用户</el-button>
    <!-- 权限列表 -->
    <el-table
    :data="RolesData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    border
    class="mb-15 mt-15"
    >
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-if="scope.row.children.length === 0" :span='24'>
          <el-col>
              权限为空，请前往添加权限
          </el-col>
        </el-row>
          <el-row v-for='(firstItem,index) in scope.row.children' :key='index'>
          <el-col :span='4'>
            <el-tag closable @close="handelClose(scope.row,scope.row.id,firstItem.id)">
              {{firstItem.authName}}
            </el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span='20'>
            <el-row  v-for="(secondItem,index) in firstItem.children" :key="index" v-if="secondItem.children.length !== 0 ">
              <el-col :span='4'>
                <el-tag type="warning" closable @close="handelClose(scope.row,scope.row.id,secondItem.id)">
                  {{secondItem.authName}}
                </el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span='20'>
                <el-tag type="success" closable v-for="(childrenItem,index) in secondItem.children" :key="index" @close="handelClose(scope.row,scope.row.id,childrenItem.id)">
                  {{childrenItem.authName}}
                  <!-- 点击关闭权限 -->
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="130">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名字"
      width="130">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
      <template slot-scope="scope">
          <el-button size="small" type="primary"  plain icon="el-icon-edit" @click="handelEdit(scope.row)"></el-button>
          <el-button size="small" type="danger"  plain icon="el-icon-delete" @click="handelDel(scope.row)"></el-button>
          <el-button size="small" type="warning"  plain icon="el-icon-check" @click="handelGrant(scope.row)"></el-button>
       </template>
    </el-table-column>
  </el-table>
  <!-- 点击弹出选择权限弹框 -->
  <el-dialog
  title="权限选择"
  :visible.sync="grantVisible"
  width="50%"
  >
  <span>
    <el-tree
    class="treeClass"
      :data="rolesList"
      show-checkbox
      ref="tree"
      node-key="id"
      default-expand-all
      :default-checked-keys="selectKeys"
      :props="defaultProps">
    </el-tree>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="grantVisible = false">取 消</el-button>
    <el-button type="primary" @click="subMintGrant">确 定</el-button>
  </span>
</el-dialog>

<!-- 添加用户弹框 -->
    <el-button  type="text" @click="isShowUser = true"></el-button>
      <el-dialog title="添加用户" :visible.sync="isShowUser">
      <el-form :model="myAddForm" :rules="myRules" ref="myRef">
        <el-form-item label="角色名字" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="myAddForm.roleName" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth"  prop="roleDesc">
          <el-input v-model="myAddForm.roleDesc" auto-complete="off" @keydown.native.enter="subMintRoles('myRef')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowUser = false">取 消</el-button>
        <el-button type="primary" @click="subMintRoles('myRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹框 -->
    <el-button  type="text" @click="isShowEditer = true"></el-button>
      <el-dialog title="添加用户" :visible.sync="isShowEditer">
      <el-form :model="myEditForm" :rules="myRules" ref="myRef">
        <el-form-item label="角色名字" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="myEditForm.roleName" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth"  prop="roleDesc">
          <el-input v-model="myEditForm.roleDesc" auto-complete="off" @keydown.native.enter="editRoles('myRef')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditer = false">取 消</el-button>
        <el-button type="primary" @click="editRoles('myRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {grantRoles, delRight, RightsList, rightGrant, deleRoles, addRoles, eidtoles} from '@/api'
export default {
  data () {
    return {
      // 编辑用户数据
      isShowEditer: false,
      myEditForm: {
        roleDesc: '',
        roleName: ''
      },
      eitUserId: '',
      // 添加用户类
      isShowUser: false,
      myAddForm: {},
      RolesData: [],
      myRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px',
      // 权限选择框的显示与隐藏
      grantVisible: false,
      // 权限列表
      rolesList: [],
      // 组件树型选择器的属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 定义一个数组去接收选中权限的id值
      selectKeys: [],
      currentId: {
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    // 渲染页面
    initList () {
      grantRoles()
        .then(res => {
          // console.log(res)
          this.RolesData = res.data
        })
    },
    // 点击删除权限
    handelClose (row, roleId, rightId) {
      delRight(roleId, rightId)
        .then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            row.children = res.data
            this.$message({
              type: 'success',
              message: '权限取消成功!'
            })
          }
        })
    },
    // 选择权限
    handelGrant (row) {
      this.grantVisible = true
      // 把当前用户的id值放进去
      this.currentId = row
      // 把接口数据放进对应的数组
      RightsList('tree')
        .then(res => {
          this.rolesList = res.data
          // 为了不重叠权限功能，所以再循环的前面必须先把选中的id的数组清空
          this.selectKeys.length = 0
          // 进行三层去循环，循环出对应的id
          row.children.forEach(fitstItem => {
            if (fitstItem.children && fitstItem.children.length > 0) {
              fitstItem.children.forEach(secondItem => {
                if (secondItem.children && secondItem.children.length > 0) {
                  secondItem.children.forEach(thirdItme => {
                    // console.log(thirdItme.id)
                    this.selectKeys.push(thirdItme.id)
                  })
                }
              })
            }
          })
        })
    },
    // 提交选择好的权限
    subMintGrant () {
      // 创建个变量去接收选中的参数
      let checkId = this.$refs.tree.getCheckedNodes()
      console.log(checkId)
      // 用map循环去循环出id和pid
      let newArrId = checkId.map(item => item.id + ',' + item.pid)
      // 数组方法，把得到的数组用逗号分隔开来
      let arrInfo = newArrId.join(',').split(',')
      // new一个set函数出来，把函数传递进去，去重，es6语法，得到一个类数组
      let setArr = new Set(arrInfo)
      // 通过解构，把这个类数组解构出来
      let newArr = [...setArr]
      // console.log(newArr)

      rightGrant(this.currentId.id, newArr.join(','))
        .then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            // 添加完成就刷新
            this.initList()
            // 添加框消失
            this.grantVisible = false
          } else {
            this.$message({
              type: 'warning',
              message: res.meta.msg
            })
          }
        })
    },
    // 删除角色
    handelDel (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleRoles(row.id)
          .then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              // 刷新
              this.initList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        })
      })
    },
    // 弹出添加用户框
    addUserInfo () {
      this.isShowUser = true
    },
    // 提交添加角色
    subMintRoles () {
      addRoles(this.myAddForm)
        .then(res => {
          if (res.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.initList()
            this.isShowUser = false
            this.myAddForm.roleName = ''
            this.myAddForm.roleDesc = ''
          } else {
            this.$message({
              type: 'warning',
              message: res.meta.msg
            })
          }
        })
    },
    // 编辑角色
    handelEdit (row) {
      this.isShowEditer = true
      this.eitUserId = row.id
      this.myEditForm = row
    },
    // 提交编辑用户信息
    editRoles () {
      let obj = {
        id: this.eitUserId,
        roleName: this.myEditForm.roleName,
        roleDesc: this.myEditForm.roleDesc
      }
      eidtoles(obj)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.initList()
            this.isShowEditer = false
          } else {
            this.$message({
              type: 'warning',
              message: res.meta.msg
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .roles{
    .el-tag{
      margin: 5px;
    }
    .treeClass{
      height: 300px;
      overflow: auto
    }
  }
</style>
