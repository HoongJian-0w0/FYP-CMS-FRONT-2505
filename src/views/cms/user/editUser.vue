<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    title="Edit User"
    width="850px"
    @close="onClose"
  >
    <el-form
      ref="editUserFormRef"
      :model="form"
      :rules="editUserRules"
      label-width="120px"
      size="default"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="form.firstName" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="form.lastName" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Nickname" prop="nickName">
            <el-input v-model="form.nickName" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <el-input v-model="form.phone" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Gender" prop="gender">
            <el-select v-model="form.gender" :disabled="form.delFlag" placeholder="Select gender">
              <el-option label="Male" value="0" />
              <el-option label="Female" value="1" />
              <el-option label="Unknown" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="Avatar URL" prop="avatar">
            <el-input v-model="form.avatar" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="New Password" prop="password">
            <el-input v-model="form.password" type="password" show-password :disabled="form.delFlag" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Roles" prop="roleIds">
            <el-select v-model="form.roleIds" multiple placeholder="Select roles" style="width: 100%" :disabled="form.delFlag">
              <el-option v-for="role in roles" :key="role.value" :label="role.label" :value="role.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="Non-Expired">
            <el-switch v-model="form.accountNonExpired" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Non-Locked">
            <el-switch v-model="form.accountNonLocked" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Credentials Valid">
            <el-switch v-model="form.credentialsNonExpired" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Enabled">
            <el-switch v-model="form.enabled" :disabled="form.delFlag" />
          </el-form-item>
          <el-form-item label="Deleted Flag" prop="delFlag">
            <el-switch
              v-model="form.delFlag"
              :active-value="true"
              :inactive-value="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="onClose">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">Update</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { editUserRules, type UserModel } from '@/api/user/UserModel.ts'

const props = defineProps({
  visible: Boolean,
  roles: Array as () => { value: number; label: string }[],
  user: Object as () => UserModel
})

const emit = defineEmits(['update:visible', 'submit'])

const form = reactive<UserModel>({
  id: props.user?.id ?? 0,
  username: props.user?.username ?? '',
  firstName: props.user?.firstName ?? '',
  lastName: props.user?.lastName ?? '',
  nickName: props.user?.nickName ?? '',
  email: props.user?.email ?? '',
  phone: props.user?.phone ?? '',
  gender: props.user?.gender ?? '2',
  avatar: props.user?.avatar ?? '',
  password: '',
  roleIds: props.user?.roleIds ?? [],
  accountNonExpired: props.user?.accountNonExpired ?? true,
  accountNonLocked: props.user?.accountNonLocked ?? true,
  credentialsNonExpired: props.user?.credentialsNonExpired ?? true,
  enabled: props.user?.enabled ?? true,
  delFlag: props.user?.delFlag ?? false
})

const editUserFormRef = ref<FormInstance | null>(null)

function onClose() {
  emit('update:visible', false)
  editUserFormRef.value?.resetFields()
}

function onSubmit() {
  editUserFormRef.value?.validate((valid) => {
    if (valid) emit('submit', form)
  })
}

watch(() => props.user, (newUser) => {
  if (newUser) {
    Object.assign(form, {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      nickName: newUser.nickName,
      email: newUser.email,
      phone: newUser.phone,
      gender: newUser.gender ?? '2',
      avatar: newUser.avatar,
      password: '',
      roleIds: newUser.roleIds ?? [],
      accountNonExpired: newUser.accountNonExpired ?? true,
      accountNonLocked: newUser.accountNonLocked ?? true,
      credentialsNonExpired: newUser.credentialsNonExpired ?? true,
      enabled: newUser.enabled ?? true,
      delFlag: newUser.delFlag ?? false
    })
  }
}, { immediate: true })
</script>