<template>
  <div class="addgoods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="goodsInfo">添加商品信息</div>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
      <el-step title="步骤 6"></el-step>
      <el-step title="步骤 7"></el-step>
    </el-steps>
    <!-- tabs标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left'>
    <el-tab-pane label="基本信息" name="1">
      <!-- 商品基本信息 -->
      <el-form ref="form" :model="goodsData" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="goodsData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="goodsData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="goodsData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="goodsData.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 连级选择器 -->
        <el-form class="mb-15 mt-15">
          <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-cascader
            change-on-select
            :options="goodsOptions"
            :props="defaultProps"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
          </el-form-item>
           <el-form-item label="是否促销" :label-width="formLabelWidth">
            <div>
              <el-radio size="small" v-model="radio7" label="1" border>是</el-radio>
              <el-radio size="small" v-model="radio7" label="2" border>否</el-radio>
            </div>
         </el-form-item>
         <!-- 确定按钮 -->
         <div class="sureBtn">
            <el-button>取消</el-button>
            <el-button type="primary">确认</el-button>
          </div>
        </el-form>

    </el-tab-pane>
    <el-tab-pane label="商品参数" name="2"></el-tab-pane>
    <el-tab-pane label="商品属性" name="3"></el-tab-pane>
    <el-tab-pane label="商家地图" name="4">
      <div class="amap-wrapper mapSize mb-15 mt-15">
        <el-amap class="amap-box"  :vid="'amap-vue'"></el-amap>
      </div>
    </el-tab-pane>
    <el-tab-pane label="商家数据" name="5">
      <!-- 商家数据 -->
      <chart :options='option' auto-resize class="mb-15 mt-15"></chart>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="6">
    <!-- 上传图片 -->
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:8888/api/private/v1/upload"
      :on-preview="handlePreview"
      :headers="myheaders"
      :on-remove="handleRemove"
      :before-upload = "handlelogin"
      :on-success = "handleSuccess"
      :file-list="fileList2"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品內容" name="7"></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 基本商品信息
      goodsData: {},
      formLabelWidth: '80px',
      goodsOptions: [],
      defaultProps: {},
      selectedOptions: [],
      radio7: '1',
      radio8: '1',
      // 步骤条部分
      active: 0,
      activeName: '1',
      // 上传图片部分
      fileList2: [],
      myheaders: {
        Authorization: localStorage.getItem('myToken')
      },
      // 数据表数据
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  methods: {
    // 点击步骤条进度
    handleClick (tab) {
      this.active = parseInt(tab.index)
    },
    // 上传图片
    // 移动图片的时候触发
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 上传列表已经存在的时候触发
    handlePreview (file, fileList) {
      console.log(file, fileList)
    },
    // 准备上传时候触发
    handlelogin (file) {
      if (file.size > 512000) {
        this.$message({
          type: 'error',
          message: '文件大小不能超过500kb'
        })
        return false
      }
    },
    // 上传成功的触发
    handleSuccess (response, file, fileList) {
      if (response.meta.status === 200) {
        this.$message({
          type: 'success',
          message: response.meta.msg
        })
      } else {
        this.$message({
          type: 'error',
          message: response.meta.msg
        })
      }
    },
    // 基本信息的级联选择器
    handleChange () {}

  }
}
</script>

<style lang="scss" scoped>
.addgoods{
  .goodsInfo{
    background-color: #d7e2ef!important;
    padding: 15px;
    margin: 15px 0;
  }
  .amap-wrapper {
  width: 500px;
  height: 500px;
  }
  .el-tab-pane{
    width: 100%;
    height: 500px;
  }
  .echarts{
    width: 100%;
    height: 100%;
  }
  .mapSize{
    width: 100%;
    height: 100%;
  }
  .sureBtn{
    // width: 100%;
    // margin: 0 auto;
    display: flex;
   justify-content:center
  }

}
</style>
