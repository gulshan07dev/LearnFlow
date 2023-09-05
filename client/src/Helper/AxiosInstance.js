import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;