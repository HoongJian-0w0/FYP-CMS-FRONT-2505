import request from '@/utils/request.ts'
import type { UserQueryParams, UserModel } from '@/api/user/UserModel.ts'
import type { FormRules } from 'element-plus'

export const fetchUserList = (params: UserQueryParams) => {
  return request.get('/user/page', { params })
}

export const createUser = (data: UserModel) => {
  return request.post('/user', data)
}

export const updateUser = (data: UserModel) => {
  return request.put('/user', data)
}

export const deleteUser = (id: number) => {
  return request.delete(`/user/${id}`)
}

