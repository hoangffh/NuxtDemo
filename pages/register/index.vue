<template>
    <div
      class="flex items-center justify-center w-full h-[100vh] bg-admin-login bg-no-repeat bg-center bg-cover px-4 lg:px-0"
    >
      <div
        class="flex items-center justify-center flex-col p-4 w-[400px]  rounded-lg bg-white"
      >
        <p class="font-bold text-2xl">Register</p>
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form w-full"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          layout="vertical"
        
        >
        <a-form-item
            :labelWrap="true"
            label="Full Name"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
  
          <a-form-item
            label="Email"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            label="Phone Number"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
  
          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
  
          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember"
                >Remember me</a-checkbox
              >
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
            <a-row class="mt-4" justify="center">
             <a-col>You are not account ?</a-col>
             <a class="login-form-forgot ml-2" href="">Register</a>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-row justify="center">
              <a-button
                :disabled="disabled"
                type="primary"
                html-type="submit"
                class="login-form-button"
                :loading="isLoading"
              >
                Log in
              </a-button>
            </a-row>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </template>
  
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useMutation } from '@tanstack/vue-query'

interface FormState {
  username: string
  password: string
  remember: boolean
}

const router = useRouter()

const sendPost = useNuxtApp().$sendPost

const isLoading = ref<boolean>(false)

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const handleLogin = async (params: { username: string; password: string }) => {
  return await sendPost('/api/v1/user/login-user', params)
}

const mutation = useMutation({
  mutationFn: (params: { username: string; password: string }) =>
    handleLogin(params).then((res: any) => {
      return res.data
    }),
  onSuccess: () => {
  },
  onError: () => {
    isLoading.value = false
  },
})

const onFinish = (value: FormState) => {
  isLoading.value = true
  mutation.mutate({ username: value.username, password: value.password })
}

const onFinishFailed = () => {}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>