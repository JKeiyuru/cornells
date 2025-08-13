import axios from 'axios';
const BASE_URL = "http://localhost:8000/api/v1/";

//axios.defaults.withCredentials = true;

export const userRequest= axios.create({
    baseURL:BASE_URL,
});

