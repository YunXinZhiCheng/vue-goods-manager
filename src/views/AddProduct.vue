<template>
  <!-- 对话框组件 -->
  <el-dialog
    title="添加商品信息"
    v-model="centerDialogVisible"
    width="30%"
    center
    @close="closeDialog(false)"
  >
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <!-- 取消按钮事件 -->
        <el-button
          @click="
            () => {
              closeDialog(false)
            }
          "
        >
          取 消
        </el-button>
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

  // 触发属性,声明来自父组件定义的事件
  emits: ['onCloseDialog'],

  // 使用属性
  setup(props, { emit }) {
    // 响应式对象
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
    })
    // 关闭函数
    const closeDialog = (visible) => {
      // 子传父：触发事件
      emit('onCloseDialog', visible)
    }
    return {
      // 结构方式
      ...toRefs(state),
      closeDialog,
    }
  },
}
</script>

<style></style>
