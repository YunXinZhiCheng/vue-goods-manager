<template>
  <!-- 对话框组件 -->
  <el-dialog title="商品信息" v-model="centerDialogVisible" width="30%" center>
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  // 接收属性
  props: {
    // 判断类型
    centerDialogVisible: Boolean,
  },
  // 使用属性
  setup(props) {
    // 响应式对象
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
    })
    return {
      // 结构方式
      ...toRefs(state),
    }
  },
}
</script>

<style></style>
