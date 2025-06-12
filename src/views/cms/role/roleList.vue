<template>
  <el-main>
    <el-form :inline="true" :model="searchParams" size="small">
      <el-form-item class="searchField">
        <el-input
          prefix-icon="Comment"
          v-model="searchParams.roleName"
          placeholder="Enter keyword"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="handleSearch">Query</el-button>
        <el-button icon="Close" type="danger" plain @click="handleReset">Clear</el-button>
        <el-button icon="Plus" type="primary" @click="addBtn">Add</el-button>
      </el-form-item>
    </el-form>

    <el-table :height="tableHeight" :data="tableList" style="width: 100%">
      <el-table-column sortable prop="name" label="Role" width="auto" />
      <el-table-column sortable prop="label" label="Label" width="auto" />
      <el-table-column sortable prop="type" label="Type" width="auto" />
      <el-table-column sortable prop="remark" label="Remark" width="auto" />
      <el-table-column label="Operations" width="auto">
        <template #default="scope">
          <el-button icon="Edit" size="small" type="warning" plain @click="editBtn(scope.row)">
            Edit
          </el-button>
          <el-button icon="Delete" size="small" type="danger" @click="handleDelete(scope.row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      size="small"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="searchParams.pageNum"
      :page-sizes="[10, 20, 40, 50, 100]"
      :page-size="searchParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>

    <AddRole
      v-if="isAddVisible"
      v-model:visible="isAddVisible"
      :roleModel="roleModel"
      @submit="handleCommit"
    />

    <EditRole
      v-if="isEditVisible"
      v-model:visible="isEditVisible"
      :roleModel="roleModel"
      @submit="handleCommit"
    />
  </el-main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import AddRole from '@/views/cms/role/addRole.vue'
import EditRole from '@/views/cms/role/editRole.vue'

import message from '@/utils/message'
import useInstance from '@/hooks/useInstance'

import { fetchRoleList, createRole, updateRole, deleteRole } from '@/api/role'
import type { RoleModel } from '@/api/role/RoleModel'

const { global } = useInstance()

const tableHeight = ref()
const tableList = ref([])
const total = ref(0)

const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '',
})

const roleModel = reactive<RoleModel>({
  id: 0,
  name: '',
  label: '',
  remark: '',
  type: '',
})

const isAddVisible = ref(false)
const isEditVisible = ref(false)

onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 230
  })
  fetchList()
})

async function fetchList() {
  tableList.value = []
  const res = await fetchRoleList(searchParams)
  if (res.success) {
    tableList.value = res.data.pagination.records
    total.value = res.data.pagination.total
  } else {
    message.error(res.message)
  }
}

function handleSearch() {
  fetchList()
}

function handleReset() {
  searchParams.roleName = ''
  searchParams.pageNum = 1
  searchParams.pageSize = 10
  fetchList()
}

function addBtn() {
  Object.assign(roleModel, { id: 0, name: '', label: '', remark: '', type: '' })
  isAddVisible.value = true
}

function editBtn(row: any) {
  Object.assign(roleModel, row)
  isEditVisible.value = true
}

async function handleCommit() {
  let res
  if (roleModel.id !== 0) {
    res = await updateRole(roleModel)
  } else {
    res = await createRole(roleModel)
  }

  if (res.success) {
    message.success(res.message)
    await fetchList()
    isAddVisible.value = false
    isEditVisible.value = false
  } else {
    message.error(res.message)
  }
}

async function handleDelete(id: number) {
  const confirm = await global.$dialogConfirm('Are you sure you want to delete this role?')
  if (confirm) {
    const res = await deleteRole(id)
    if (res.success) {
      message.success(res.message)
      fetchList()
    } else {
      message.error(res.message)
    }
  }
}

function sizeChange(size: number) {
  searchParams.pageSize = size
  fetchList()
}

function currentChange(page: number) {
  searchParams.pageNum = page
  fetchList()
}
</script>

<style land="scss" scoped>
.el-table {
  --el-table-bg-color: none;
}

.searchField {
  width: 100%;
  max-width: 250px;
}
</style>
