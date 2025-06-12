import type { FormRules } from 'element-plus'

export interface UserModel {
  id?: number
  username: string
  firstName: string
  lastName: string
  nickName: string
  password?: string
  email: string
  phone: string
  gender: "0" | "1" | '2'  // 0 = male, 1 = female, 2 = unknown
  avatar: string
  roleIds?: Array<number | string> | string;
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  delFlag?: boolean
}

export interface UserQueryParams {
  pageNum: number
  pageSize: number
  username?: string
  email?: string
  phone?: string
  roleName?: string
  enabled?: boolean
  gender?: '0' | '1' | '2'
  dateFrom?: string
  dateTo?: string
}


const usernameRule = [
  { required: true, message: 'Username is required', trigger: 'blur' },
  {
    validator: (_: any, value: string, callback: (err?: Error) => void) => {
      if (value !== value.toLowerCase()) {
        callback(new Error('Username must be lowercase'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

const emailRule = [
  { required: true, message: 'Email is required', trigger: 'blur' },
  {
    validator: (_: any, value: string, callback: (err?: Error) => void) => {
      if (value !== value.toLowerCase()) {
        callback(new Error('Email must be in lowercase'))
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error('Invalid email format'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

const commonRequiredRules: FormRules = {
  username: usernameRule,
  firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  nickName: [{ required: true, message: 'Nickname is required', trigger: 'blur' }],
  email: emailRule,
  phone: [{ required: true, message: 'Phone is required', trigger: 'blur' }],
  gender: [{ required: true, message: 'Gender is required', trigger: 'change' }]
}

export const addUserRules: FormRules = {
  ...commonRequiredRules,
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
  roleIds: []
}

export const editUserRules: FormRules = {
  ...commonRequiredRules,
  password: [],
  roleIds: []
}
