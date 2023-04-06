<template>
  <div
    class="flex items-center justify-center w-full h-[100vh] bg-admin-login bg-no-repeat bg-center bg-cover px-4 lg:px-0"
  >
    <div
      class="flex items-center justify-center flex-col p-4 w-[520px] rounded-lg bg-white"
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
          name="fullName"
          :rules="[{ required: true, message: 'Please input your fullName!' }]"
        >
          <a-input v-model:value="formState.fullName"> </a-input>
        </a-form-item>

        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'email is invalid!' },
          ]"
        >
          <a-input v-model:value="formState.email"> </a-input>
        </a-form-item>
        <a-form-item
          label="Phone Number"
          name="phoneNumber"
          :rules="[
            { required: true, message: 'Please input your phone number!' },
          ]"
        >
          <a-input v-model:value="formState.phoneNumber" @change="formatNumber">
          </a-input>
        </a-form-item>
        <a-row class="gap-4">
          <a-col>
            <a-form-item name="date-picker" label="Date of birth">
              <a-date-picker
                v-model:value="formState.date"
                value-format="YYYY-MM-DD"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="Gender">
              <a-radio-group v-model:value="formState.gender">
                <a-radio value="MALE">Male</a-radio>
                <a-radio value="FEMALE">Female</a-radio>
                <a-radio value="OTHER">Other</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username"> </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
          </a-input-password>
        </a-form-item>
        <a-form-item
          label="Confirm password"
          name="passwordConfirm"
          :rules="[
            { required: true, message: 'Please input your passwordConfirm!' },
          ]"
        >
          <a-input-password v-model:value="formState.passwordConfirm">
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Return login</a>
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
              Submit
            </a-button>
          </a-row>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useMutation } from "@tanstack/vue-query";

interface FormState {
  fullName: String;
  email: String;
  phoneNumber: String;
  date: string;
  gender: string;
  username: string;
  password: string;
  passwordConfirm: String;
  remember: boolean;
}

const router = useRouter();

const sendPost = useNuxtApp().$sendPost;

const isLoading = ref<boolean>(false);

const formState = reactive<FormState>({
  fullName: "",
  email: "",
  phoneNumber: "",
  date: "",
  gender: "",
  username: "",
  password: "",
  remember: true,
  passwordConfirm: "",
});

const formatNumber = () => {
  const splitStr = formState.phoneNumber.replace(/[^0-9]/g, "");
  formState.phoneNumber = splitStr;
};

const handleLogin = async (params: { username: string; password: string }) => {
  return await sendPost("/api/v1/user/login-user", params);
};

const mutation = useMutation({
  mutationFn: (params: { username: string; password: string }) =>
    handleLogin(params).then((res: any) => {
      return res.data;
    }),
  onSuccess: () => {},
  onError: () => {
    isLoading.value = false;
  },
});

const onFinish = (value: FormState) => {
  isLoading.value = true;
  mutation.mutate({ username: value.username, password: value.password });
};

const onFinishFailed = () => {};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
