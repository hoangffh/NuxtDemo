import { defineNuxtPlugin } from "#app";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { VueQueryPlugin } from "vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd).use(VueQueryPlugin);
});
