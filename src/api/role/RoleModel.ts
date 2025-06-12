export type RoleModel = {
  id: number,
  name: string,
  label: string,
  remark: string
  type: string
}

export type RoleQueryParams = {
  pageNum: number,
  pageSize: number,
  roleName?: string,
}

export interface RoleOption {
  value: number
  label: string
  check: boolean
}