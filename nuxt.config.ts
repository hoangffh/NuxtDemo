// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  plugins: ["@/plugins/antd"],
  runtimeConfig: {
    public: {
      baseApiURl: process.env.BASE_API_URl,
    },
  },
});
