import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-krishi-backend-58n9.onrender.com/api",
});

export default API;