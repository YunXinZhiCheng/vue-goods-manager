<template>
  <!-- 卡片组件 -->
  <el-card shadow="never">
    <!-- 商品标题 -->
    <template #header>
      <div class="card-header">
        <!-- LOGO -->
        <img
          src="../assets/logo.png"
          alt=""
          style="width: 50px; height: 50px"
        />
        <span>商品列表</span>
      </div>
    </template>
    <!-- 商品行:珊格布局，包含3列 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input placeholder="请输入搜索商品名称"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" @click="addGoodsInfo()">添加</el-button>
      </el-col>
    </el-row>

    <!-- 表格组件 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 编号列 -->
      <el-table-column label="编号" width="180">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <!-- 名称列 -->
      <el-table-column label="商品名称" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top">
            <template #default>
              <p>商品名称: {{ scope.row.title }}</p>
              <p>单价: {{ scope.row.price }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.title }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 图片列 -->
      <el-table-column label="商品图片" width="180">
        <template #default="scope">
          <span style="margin-left: 10px">
            <!-- 图片地址:使用字符串拼接 -->
            <img
              :src="url + scope.row.thumbnail"
              alt=""
              style="width: 180px; height: 180px"
            />
          </span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 使用组件
       打开：父传子：绑定属性：centerDialogVisible
       关闭：子传父：自定义事件
   -->
  <AddProduct
    :centerDialogVisible="centerDialogVisible"
    @onCloseDialog="closeDialogVisible"
  />
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
// 导入添加商品组件
import AddProduct from './AddProduct.vue'

// axios
import axios from 'axios'

// 封装函数：用于存放数据
function loadData(state) {
  // axios请求服务端数据
  axios
    .get('/products')
    .then((res) => {
      console.log(res)
      // 返回表格数据
      state.tableData = res.data
    })
    .catch((err) => {
      console.error(err)
    })
}
export default {
  components: {
    AddProduct,
  },
  setup() {
    // 商品数据: 响应式对象
    const state = reactive({
      // 表格数据
      tableData: [],
      // 对话框
      centerDialogVisible: false, // 默认隐藏
    })
    // 拿到开发环境下,服务端定义的地址
    const url = import.meta.env.VITE_APP_URL

    // 钩子函数
    onMounted(() => {
      // 调用函数：加载数据
      loadData(state)
    })

    // 添加函数
    const addGoodsInfo = () => {
      state.centerDialogVisible = true // 显示
    }
    // 关闭函数
    const closeDialogVisible = (visible) => {
      state.centerDialogVisible = visible // 显示与隐藏切换 boolean
    }
    return {
      // 正常解构数据,不是响应式对象，需要使用toRefs函数
      ...toRefs(state),
      url,
      addGoodsInfo,
      closeDialogVisible,
    }
  },
}
</script>

<style></style>
