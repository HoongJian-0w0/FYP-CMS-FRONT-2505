<!-- addRole.vue -->
<template>
  <el-dialog v-model="props.visible" title="Add Role" width="600px" @close="handleClose">
    <el-form ref="addRef" :model="roleModel" :rules="rules" label-width="auto" @submit.prevent>
      <el-form-item prop="name" label="Role Name">
        <el-input v-model="roleModel.name" />
      </el-form-item>
      <el-form-item prop="label" label="Label">
        <el-input v-model="roleModel.label" />
      </el-form-item>
      <el-form-item prop="type" label="Type">
        <el-input v-model="roleModel.type" />
      </el-form-item>
      <el-form-item prop="remark" label="Remark">
        <el-input v-model="roleModel.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RoleModel } from '@/api/role/RoleModel'

const props = defineProps<{
  visible: boolean
  roleModel: RoleModel
}>()

const emits = defineEmits(['update:visible', 'submit'])

const addRef = ref<FormInstance | null>(null)

const rules: FormRules = {
  name: [{ required: true, message: 'Please enter role name.', trigger: 'blur' }],
  label: [{ required: true, message: 'Please enter role label.', trigger: 'blur' }],
}

function handleClose() {
  emits('update:visible', false)
}

function handleSubmit() {
  addRef.value?.validate((valid) => {
    if (valid) {
      emits('submit')
    }
  })
}
</script>
