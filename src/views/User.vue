<template>
  <div  class="">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户数据</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;" >
      <el-input placeholder="请输入内容"  v-model="userInfo" class="input-with-select mySearch" @keydown.native.enter="searchUser">
        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
      </el-input>
     <!-- 添加按钮 -->
       <el-button type="primary" plain @click="dialogFormVisible=true" >添加用户</el-button>
    </div>
    <!-- 用户列表表格 -->
    <el-table
    :data="tableData"
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
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop=""
      label="切换状态">
       <template slot-scope="scope">
         <el-switch
         @change="changeStatus(scope.row)"
          v-model="scope.row.mg_state"
          active-color="skyblue"
          inactive-color="#ccc">
        </el-switch>
       </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      :formatter="formatter">
      <template slot-scope="scope">
          <el-button size="small" type="primary"  plain icon="el-icon-edit" @click="editUsers(scope.row)"></el-button>
          <el-button size="small" type="danger"  plain icon="el-icon-delete"  @click="delUsers(scope.row)" ></el-button>
          <el-button size="small" type="warning"  plain icon="el-icon-check" @click="grantUsers(scope.row)"></el-button>
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
    <!-- 添加用户弹框 -->
    <el-button  type="text" @click="dialogFormVisible = true"></el-button>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="myAddForm" :rules="myRules" ref="myRef">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="myAddForm.username" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth"  prop="password">
          <el-input v-model="myAddForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="myAddForm.email" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="myAddForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subMintAdd('myRef')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹框 -->
    <el-button  type="text" @click="dialogFormEdit = true"></el-button>
      <el-dialog title="编辑用户" :visible.sync="dialogFormEdit">
      <el-form :model="EditeForm" :rules="myRules" ref="myRefEdit">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="EditeForm.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="EditeForm.email" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="EditeForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="submintEidt('myRefEdit')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 授权用户弹框 -->
    <el-button  type="text" @click="dialogFormgrant = true"></el-button>
      <el-dialog title="授权用户" :visible.sync="dialogFormgrant">
      <el-form :model="grantRoles" :rules="myRules" ref="myRefGrant">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="grantRoles.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="选择角色" :label-width="formLabelWidth" prop="">
              <el-select v-model="grantRoles.rid" placeholder="请选择">
                <el-option
                  v-for="(item,index) in rolelist"
                  :key="index"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormgrant = false">取 消</el-button>
        <el-button type="primary" @click="submintGrant('myRefGrant')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入各种请求函数
import {userList, delData, addUser, toogleStatus, editUser, grantRoles, grantGive} from '@/api'
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱不能为空'))
      }
      // 此注释为eslint语法，放弃去监听下一句，因为正则eslint监听不了
      // eslint-disable-next-line
      let checkreq = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (checkreq.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误，请重新输入'))
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      }
      // 手机验证正则
      // eslint-disable-next-line
      let phoneReq = /^1[34578]\d{9}$/
      if (phoneReq.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不对，请重新输入'))
      }
    }
    return {
      userInfo: '',
      value2: '',
      tableData: [],
      total: 0,
      // 懒加载
      loading: true,
      pagesize: 5,
      pagenum: 1,
      // 添加用户显示
      dialogFormVisible: false,
      // 编辑用户显示
      dialogFormEdit: false,
      // 授权用户显示
      dialogFormgrant: false,
      // 渲染页面表单数据
      myAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''

      },
      // 编辑用户表单数据
      EditeForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 授权用户
      grantRoles:
        {
          username: '',
          rid: '',
          id: ''
        },
      rolelist: [],
      // 校验表单
      myRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  // 在创建的时候，直接就渲染页面
  created () {
    this.listUser()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 把每页的条数传进去渲染函数里面
      this.pagesize = val
      // 传递进去后再渲染一次
      this.listUser()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 把当前的页码数传递到参数里面
      this.pagenum = val
      this.listUser()
    },
    formatter (row, column) {
      return row.address
    },
    // 获取数据渲染页面
    listUser () {
      userList({query: this.userInfo, pagenum: this.pagenum, pagesize: this.pagesize})
        .then(res => {
          // console.log(res.data.users)
          this.tableData = res.data.users
          this.total = res.data.total
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })
    },
    // 搜索用户
    searchUser () {
      this.listUser()
      this.userInfo = ''
    },
    // 删除用户
    delUsers (row) {
      // 通过组件中。scope.row获取到一整行的数据，从数据中获取到id值，然后直接传递进去删除函数里面，然后再渲染页面一次
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row)
        delData(row.id)
          .then(res => {
            if (res.meta.status === 200) {
              this.listUser()
            }
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交添加用户
    subMintAdd (myform) {
      addUser(this.myAddForm)
        .then(res => {
        //  验证是否为空，也就是验证是否通过了校验
          this.$refs[myform].validate((valid) => {
            if (valid) {
              if (res.meta.status === 201) {
                this.$message({
                  message: '添加用户成功',
                  type: 'success'
                })
                // 添加成功之后。弹出框消失
                this.dialogFormVisible = false
                // 重新渲染页面
                this.listUser()
                // 清空添加框内容
                this.myAddForm.username = ''
                this.myAddForm.password = ''
                this.myAddForm.email = ''
                this.myAddForm.mobile = ''
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: 'warning'
                })
              }
            } else {
              this.$message({
                message: '表单验证不完整，请重试',
                type: 'warning'
              })
            }
          })
        })
    },
    // 切换用户状态
    changeStatus (row) {
      let obj = {
        id: row.id,
        type: row.mg_state
      }
      toogleStatus(obj)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'warning'
            })
          }
        })
    },
    // 编辑用户信息
    editUsers (row) {
      this.dialogFormEdit = true
      this.EditeForm.id = row.id
      this.EditeForm.username = row.username
      this.EditeForm.email = row.email
      this.EditeForm.mobile = row.mobile
    },
    // 提交编辑资料
    submintEidt (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editUser(this.EditeForm)
            .then(res => {
              if (res.meta.status === 200) {
                this.dialogFormEdit = false
                this.$message({
                  message: res.meta.msg,
                  type: 'success'
                })
                this.listUser()
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: 'warning'
                })
              }
            })
        }
      })
    },
    // 授权用户
    grantUsers (row) {
      this.dialogFormgrant = true
      this.grantRoles.username = row.username
      this.grantRoles.id = row.id
      this.grantRoles.rid = row.role_name// 这里是为了解决点击分配角色按钮，当前角色展示错误问题的bug
      console.log(this.grantRoles.id)
      grantRoles()
        .then(res => {
          this.rolelist = res.data
        })
    },
    // 提交角色分配
    submintGrant () {
      if (typeof this.grantRoles.rid === 'string') {
        this.dialogFormgrant = false
        return false
      }
      grantGive(this.grantRoles)
        .then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.listUser()
            this.dialogFormgrant = false
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'warning'
            })
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
