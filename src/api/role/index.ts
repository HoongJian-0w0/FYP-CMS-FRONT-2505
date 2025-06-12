import request from '@/utils/request.ts'
import type { RoleQueryParams, RoleModel } from '@/api/role/RoleModel.ts'

export const fetchRoleList = (params: RoleQueryParams) => {
  return request.get('/role/page', { params })
}

export const fetchRole = () => {
  return request.get('/role')
}

export const createRole = (data: RoleModel) => {
  return request.post('/role', data)
}

export const updateRole = (data: RoleModel) => {
  return request.put('/role', data)
}

export const deleteRole = (id: number) => {
  return request.delete(`/role/${id}`)
}

