<template>
  <el-main>
    <el-form :inline="true" :model="searchParams" size="small">
      <el-form-item class="searchField">
        <el-input
          prefix-icon="User"
          v-model="searchParams.username"
          placeholder="Enter username"
          clearable
        />
      </el-form-item>
      <el-form-item class="searchField">
        <el-input
          prefix-icon="Message"
          v-model="searchParams.email"
          placeholder="Enter email"
          clearable
        />
      </el-form-item>
      <el-form-item class="searchField">
        <el-input
          prefix-icon="PhoneFilled"
          v-model="searchParams.phone"
          placeholder="Enter phone number"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="handleSearch">Query</el-button>
        <el-button icon="Close" type="danger" plain @click="handleReset">Clear</el-button>
        <el-button icon="Plus" type="primary" @click="addDialogVisible = true">Add</el-button>
      </el-form-item>
    </el-form>

    <el-table :height="tableHeight" :data="tableList" style="width: 100%" size="small">
      <el-table-column prop="username" label="Username" sortable />
      <el-table-column label="Name" sortable>
        <template #default="{ row }"> {{ row.firstName }} {{ row.lastName }} </template>
      </el-table-column>
      <el-table-column prop="nickName" label="Nickname" sortable />
      <el-table-column prop="email" label="Email" sortable />
      <el-table-column prop="phone" label="Phone" sortable />
      <el-table-column label="Roles">
        <template #default="{ row }">
          <el-tag
            v-for="roleId in row.roleIds"
            :key="roleId"
            type="info"
            size="small"
            class="role-tag"
          >
            {{ getRoleName(roleId) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="auto">
        <template #default="{ row }">
          <div class="status-tags">
            <el-tag v-if="row.delFlag" type="danger" plain size="small">Deleted</el-tag>
            <template v-else>
              <el-tag :type="row.enabled ? 'success' : 'danger'" plain size="small">
                Enabled
              </el-tag>
              <el-tag v-if="!row.accountNonLocked" type="danger" plain size="small">
                Locked
              </el-tag>
              <el-tag v-if="!row.accountNonExpired" type="danger" plain size="small">
                Expired
              </el-tag>
              <el-tag v-if="!row.credentialsNonExpired" type="danger" plain size="small">
                Pass Exp
              </el-tag>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Created At" sortable />
      <el-table-column label="Operations" width="180px">
        <template #default="scope">
          <el-button icon="Edit" type="warning" size="small" plain @click="editBtn(scope.row)">
            Edit
          </el-button>
          <el-button icon="Delete" type="danger" size="small" @click="handleDelete(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      size="small"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="searchParams.pageNum"
      :page-sizes="[10, 20, 40, 50, 100]"
      :page-size="searchParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    />

    <AddUser
      v-model:visible="addDialogVisible"
      :roles="roleOptions"
      @submit="handleAddUserSubmit"
    />

    <EditUser
      v-if="editUserData"
      v-model:visible="editDialogVisible"
      :roles="roleOptions"
      :user="editUserData"
      @submit="handleEditUserSubmit"
    />
  </el-main>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import message from '@/utils/message.ts'
import { fetchUserList, createUser, updateUser, deleteUser } from '@/api/user'
import { fetchRole } from '@/api/role'
import type { UserModel } from '@/api/user/UserModel.ts'
import useInstance from '@/hooks/useInstance.ts'
import AddUser from '@/views/cms/user/addUser.vue'
import EditUser from '@/views/cms/user/editUser.vue'

const { global } = useInstance()

const tableHeight = ref(400)
const tableList = ref([])
const total = ref(0)

const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  username: '',
  email: '',
  phone: '',
})

const addDialogVisible = ref(false)
const editDialogVisible = ref(false)
const editUserData = ref<UserModel | null>(null)

const roleOptions = ref<{ value: number; label: string }[]>([])

async function fetchList() {
  tableList.value = []
  const res = await fetchUserList(searchParams)
  if (res.success) {
    tableList.value = res.data.pagination.records
    total.value = res.data.pagination.total
  } else {
    message.error(res.message)
  }
}

async function getRoles() {
  const res = await fetchRole()
  if (res.success && Array.isArray(res.data?.list)) {
    roleOptions.value = res.data.list.map((role: any) => ({
      value: role.id,
      label: role.label,
    }))
  } else {
    message.error('Failed to load roles')
  }
}

function handleSearch() {
  searchParams.pageNum = 1
  fetchList()
}

function handleReset() {
  searchParams.username = ''
  searchParams.email = ''
  searchParams.phone = ''
  searchParams.pageNum = 1
  searchParams.pageSize = 10
  fetchList()
}

function sizeChange(size: number) {
  searchParams.pageSize = size
  fetchList()
}

function currentChange(page: number) {
  searchParams.pageNum = page
  fetchList()
}

function handleAddUserSubmit(form: UserModel) {
  createUser(form)
    .then((res) => {
      if (res.success) {
        message.success(res.message)
        addDialogVisible.value = false
        fetchList()
      } else {
        message.error(res.message)
      }
    })
    .catch(() => {
      message.error('Failed to add user')
    })
}

function editBtn(row: UserModel) {
  editUserData.value = { ...row, password: '' }
  editDialogVisible.value = true
}

function handleEditUserSubmit(form: UserModel) {
  updateUser(form)
    .then((res) => {
      if (res.success) {
        message.success(res.message)
        editDialogVisible.value = false
        fetchList()
      } else {
        message.error(res.message)
      }
    })
    .catch(() => {
      message.error('Failed to update user')
    })
}

async function handleDelete(id: number) {
  const confirm = await global.$dialogConfirm('Are You Sure you want to delete this user?')
  if (confirm) {
    const res = await deleteUser(id)
    if (res.success) {
      message.success(res.message)
      await fetchList()
    } else {
      message.error(res.message)
    }
  }
}

function getRoleName(id: number) {
  const match = roleOptions.value.find(role => role.value === id)
  return match ? match.label : 'Unknown'
}

onMounted(async () => {
  await nextTick(() => {
    tableHeight.value = window.innerHeight - 230
  })
  await fetchList()
  await getRoles()
})
</script>

<style lang="scss" scoped>
.el-table {
  --el-table-bg-color: none;
}

.searchField {
  width: 100%;
  max-width: 250px;
}

.el-tag.el-tag--info {
  margin-right: 1.5px;
}
</style>
