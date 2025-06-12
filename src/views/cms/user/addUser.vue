<template>
  <el-dialog
    :model-value="props.visible"
    @update:model-value="emit('update:visible', $event)"
    title="Add User"
    width="850px"
    @close="onClose"
  >
    <el-form
      ref="addUserFormRef"
      :model="form"
      :rules="addUserRules"
      label-width="120px"
      size="default"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="form.firstName" />
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="form.lastName" />
          </el-form-item>
          <el-form-item label="Nickname" prop="nickName">
            <el-input v-model="form.nickName" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="Gender" prop="gender">
            <el-select v-model="form.gender" placeholder="Select gender">
              <el-option label="Male" value="0" />
              <el-option label="Female" value="1" />
              <el-option label="Unknown" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="Avatar URL" prop="avatar">
            <el-input v-model="form.avatar" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" type="password" show-password />
          </el-form-item>
          <el-form-item label="Roles" prop="roleIds">
            <el-select
              v-model="form.roleIds"
              multiple
              placeholder="Select roles"
              style="width: 100%"
            >
              <el-option
                v-for="role in roles"
                :key="role.value"
                :label="role.label"
                :value="role.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Non-Expired">
            <el-switch v-model="form.accountNonExpired" />
          </el-form-item>
          <el-form-item label="Non-Locked">
            <el-switch v-model="form.accountNonLocked" />
          </el-form-item>
          <el-form-item label="Credentials Valid">
            <el-switch v-model="form.credentialsNonExpired" />
          </el-form-item>
          <el-form-item label="Enabled">
            <el-switch v-model="form.enabled" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="onClose">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addUserRules, type UserModel } from '@/api/user/UserModel.ts'

const props = defineProps({
  visible: Boolean,
  roles: Array as () => { value: number; label: string }[],
})

const emit = defineEmits(['update:visible', 'submit'])

const form = reactive<UserModel>({
  username: '',
  firstName: '',
  lastName: '',
  nickName: '',
  password: '',
  email: '',
  phone: '',
  gender: '2',
  avatar: '',
  roleIds: [],
  accountNonExpired: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
  enabled: true,
})

const addUserFormRef = ref<FormInstance | null>(null)

function onClose() {
  emit('update:visible', false)
  addUserFormRef.value?.resetFields()
}

function onSubmit() {
  addUserFormRef.value?.validate((valid) => {
    if (valid) emit('submit', form)
  })
}
</script>
