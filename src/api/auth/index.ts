import request from '@/utils/request.ts'
import type { loginModel } from '@/api/auth/AuthModel.ts'
import type { FormRules } from 'element-plus'

export const fetchCaptcha = () => {
  return request.get('/auth/captcha')
}

export const login = (data: loginModel) => {
  return request.post('/auth/login', data)
}

export const formRules: FormRules = {
  username: [{ required: true, message: 'Please enter username.', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter password.', trigger: 'blur' }],
  verifyCode: [{ required: true, message: 'Please enter verification code.', trigger: 'blur' }],
}