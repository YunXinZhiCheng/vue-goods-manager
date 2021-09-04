<template>
  <!-- 表格组件 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="编号" width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
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
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
// axios
import axios from 'axios'

// 封装函数：用于存放数据
function loadData(state) {
  // axios请求服务端数据
  axios
    .get('http://localhost:3005/products')
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
  setup() {
    // 表格数据: 响应式对象
    const state = reactive({
      tableData: [],
    })
    // 钩子函数
    onMounted(() => {
      // 调用函数：加载数据
      loadData(state)
    })
    return {
      // 正常解构数据,不是响应式对象，需要使用toRefs函数
      ...toRefs(state),
    }
  },
}
</script>

<style></style>
