import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://64aeb9cac85640541d4d9a77.mockapi.io/api/todos/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);

export const getT = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config);
};
export const createT = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data, config);
};
export const updateT = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data, config);
};

export const removeT = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config);
};