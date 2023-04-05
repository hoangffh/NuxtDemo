import axios from "axios";
export default defineNuxtPlugin(() => {
  // UseRuntimeConfig composable được sử dụng để hiển thị các biến cấu hình trong ứng dụng của bạn.
  const config = useRuntimeConfig();
  const instance = axios.create({
    baseURL: config.public.baseApiURl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const sendGet = (url: string) => {
    instance
      .get(url)
      .then((res) => res)
      .catch(() => {});
  };
  const sendPost = (url: string, param: any) =>
    instance
      .post(url, param)
      .then((res) => res)
      .catch(() => {});
  return {
    provide: {
      sendGet,
      sendPost,
    },
  };
});
