import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://campbackend-production.up.railway.app', // Directly set the base URL
});

export default axiosInstance;
