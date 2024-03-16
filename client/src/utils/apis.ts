import Axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
export const baseUrl = import.meta.env.VITE_SERVER_URL;
const cookies = new Cookies();

const defaultAxios = Axios.create({
  headers: {
    "Content-type": "application/json",
    Authorization: cookies.get("authToken"),
  },
});
defaultAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function apiClient(
  method: string,
  url: string,
  options: AxiosRequestConfig<unknown> = {}
) {
  const { data = {}, headers = {}, params = {}, ...rest } = options;
  return defaultAxios({
    url,
    data,
    method,
    params,
    headers,
    ...rest,
  });
}

export const apis = {
  get: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("get", url, args),
  post: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("post", url, args),
  put: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("put", url, args),
  patch: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("patch", url, args),
  delete: (url: string, args: AxiosRequestConfig<unknown>) =>
    apiClient("delete", url, args),
};
