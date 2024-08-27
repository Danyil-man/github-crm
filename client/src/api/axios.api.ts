import axios from "axios";
import { API_URL } from "./constants";

export const instanceApi = axios.create({
  baseURL: API_URL,
});

instanceApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage
    .getItem("token")
    ?.replace(/(^"|"$)/g, "")}`;

  return config;
});

export default instanceApi;
