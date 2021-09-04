<template>
  <!-- 对话框组件 -->
  <el-dialog
    title="添加商品信息"
    v-model="centerDialogVisible"
    width="60%"
    center
    @close="closeDialog(false)"
  >
    <!-- 表单组件 -->
    <el-form
      :model="goodsForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <!-- 表单项 -->
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="goodsForm.title"></el-input>
      </el-form-item>

      <!-- 表单项 -->
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="goodsForm.price"></el-input>
      </el-form-item>

      <!-- 表单项 -->
      <el-form-item label="商品图片" prop="coverImg">
        <img src="" alt="" />
      </el-form-item>

      <!-- 表单项 -->
      <el-form-item label="商品详情" prop="goodsDeatil">
        <!-- 富文本编辑器组件 -->
        <QuillEditor theme="snow" v-model="goodsForm.goodsDetail" />
      </el-form-item>

      <!-- 表单项 -->
      <el-form-item>
        <el-button type="primary">添加商品</el-button>
      </el-form-item>
    </el-form>

    <!-- 底部操作 -->
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
        <el-button type="primary" @click="centerDialogVisible = false">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from 'vue'
// 导入富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  // 注册富文本
  components: {
    QuillEditor,
  },
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
      // 商品窗口
      centerDialogVisible: props.centerDialogVisible,
      // 商品表单
      goodsForm: {
        title: '',
        price: 0,
        coverImg: '',
        goodsDetail: '',
      },
    })

    // 关闭函数
    const closeDialog = (visible) => {
      // 子传父：触发事件
      emit('onCloseDialog', visible)
    }

    // 校验规则
    const rules = {
      // 名称
      title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
      // 价格
      price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
      // 图片
      coverImg: [
        { required: true, message: '请上传商品主图', trigger: 'blur' },
      ],
      // 详情
      goodsDetail: [
        { required: true, message: '请输入商品详情', trigger: 'blur' },
      ],
    }

    return {
      // 结构方式
      ...toRefs(state),
      closeDialog,
      rules,
    }
  },
}
</script>

<style></style>
