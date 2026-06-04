import axios from "axios";

const api = axios.create({
  baseURL: "https://orbita-wdyx.onrender.com",
  withCredentials: true,
});

export default api;
