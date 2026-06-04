import axios from "axios";

const api = axios.create({
  baseURL: "https://orbita-wdyx.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
