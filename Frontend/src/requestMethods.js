///home/jkeiyuru/Development/cornells/FullStackBeautyStore/Frontend/src/requestMethods.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/";

export const userRequest = axios.create({
    baseURL: BASE_URL,
});
