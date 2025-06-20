<template>
  <div class="login-container">
    <div class="login-card-container">
      <div class="login-card-left"></div>
      <div class="login-card-right">
        <h2 class="login-head-title">Sign In</h2>
        <h3 class="login-head-description">Hello.</h3>
        <h3 class="login-head-sub-description">{{ greeting }}</h3>
        <el-form
          :label-position="'top'"
          label-width="100px"
          :model="loginForm"
          :rules="formRules"
          ref="formDataRef"
          @submit.prevent
          @keydown.enter.prevent="handleLogin"
        >
          <div class="login-label-container">
            <el-icon class="login-label-icon"><User /></el-icon>
            <h4 class="login-label">Username</h4>
          </div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="Please enter your username." />
          </el-form-item>
          <div class="login-label-container">
            <el-icon class="login-label-icon"><Lock /></el-icon>
            <h4 class="login-label">Password</h4>
          </div>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="Please enter your password." type="password" show-password />
          </el-form-item>
          <el-form-item prop="verifyCode">
            <div class="check-code-panel">
              <div class="code-input">
                <el-input v-model="loginForm.verifyCode" placeholder="Enter verification code.">
                  <template #prefix>
                    <el-icon><Ticket /></el-icon>
                  </template>
                </el-input>
              </div>
              <div class="code-image">
                <img :src="captcha?.img" @click="getCaptcha" class="check-code" alt="CAPTCHA" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin"> Login </el-button>
          </el-form-item>
          <a class="login-forgot-password" @click="router.push('/forgot-password')"
          >Forgot password?</a
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock, Ticket } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, onUnmounted, computed } from 'vue'
import { login, fetchCaptcha, formRules } from '@/api/auth/index.ts'
import type { FormInstance } from 'element-plus'
import message from '@/utils/message.ts'
import router from '@/router'
import type { loginModel } from '@/api/auth/AuthModel.ts'

interface CaptchaResponse {
  img: string
  uuid: string
  expiresIn: number
}

const formDataRef = ref<FormInstance | null>(null)
const captcha = ref<CaptchaResponse | null>(null)
let captchaTimer: ReturnType<typeof setTimeout> | null = null

const loginForm = reactive<loginModel>({
  username: '',
  password: '',
  verifyCode: '',
  captchaUUID: '',
})

async function getCaptcha() {
  try {
    const res = await fetchCaptcha()
    captcha.value = res.data
    loginForm.captchaUUID = res.data.uuid

    loginForm.verifyCode = ""

    if (captchaTimer) clearTimeout(captchaTimer)
    const refreshIn = (res.data.expiresIn - 10) * 1000
    captchaTimer = setTimeout(getCaptcha, refreshIn)
  } catch (err) {
    console.error('Failed to refresh captcha:', err)
  }
}

async function handleLogin() {
  if (!formDataRef.value) return

  formDataRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await login(loginForm)

        if (res.success) {
          message.success(res.message + ", Welcome, " + res.data.user.username || 'Login successful')
          localStorage.setItem('token', res.data.user.token)
          await router.push('/dashboard').catch(err => console.log(err))
        }
      } catch (err: any) {
        if (err.code !== 400) {
          await getCaptcha()
        }
      }
    } else {
      message.error('Login failed. Please fill in all the blank.')
    }
  })
}

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good Morning!'
  if (hour >= 12 && hour < 17) return 'Good Afternoon!'
  if (hour >= 17 && hour < 21) return 'Good Evening!'
  return 'Welcome!'
})

onMounted(() => {
  getCaptcha()
})

onUnmounted(() => {
  if (captchaTimer) clearTimeout(captchaTimer)
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/image/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;

  .login-card-container {
    display: flex;
    width: 1000px;
    max-width: 100%;
    height: 590px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;

    .login-card-left {
      flex: 1;
      background-image: url('@/assets/image/login-card.png');
      background-size: cover;
      background-position: center;
    }

    .login-card-right {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .login-head-title {
        font-size: 2rem;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .login-head-description {
        padding-top: 20px;
        font-size: 1.2rem;
      }

      .login-head-sub-description {
        font-size: 1.2rem;
        padding-bottom: 20px;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .el-form {
        width: 100%;

        .el-form-item {
          margin-bottom: 20px;
        }

        .el-input,
        .el-button {
          width: 100%;
        }

        .el-button {
          margin-top: 10px;
        }
      }

      .login-label-container {
        display: flex;

        .login-label {
          color: var(--el-input-text-color, var(--el-text-color-regular));
          padding-left: 5px;
          font-weight: 500;
        }
      }

      .login-forgot-password {
        justify-content: center;
        display: flex;
        font-size: 0.8rem;
        color: grey;
      }

      .check-code-panel {
        display: flex;
        gap: 8px;
        align-items: center;
        width: 100%;

        .code-input {
          width: 80%;
        }

        .code-image {
          width: auto;

          .check-code {
            width: 100%;
            height: 30px;
            border-radius: 4px;
            cursor: pointer;
            object-fit: contain;
          }
        }
      }
    }

    // Responsive styles
    @media (max-width: 768px) {
      flex-direction: column;
      height: auto;

      .login-card-left {
        height: 200px;
        flex: none;
        background-size: cover;
        background-position: center;
      }

      .login-card-right {
        padding: 20px;

        .login-head-title {
          font-size: 1.5rem;
        }

        .login-head-description,
        .login-head-sub-description {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
