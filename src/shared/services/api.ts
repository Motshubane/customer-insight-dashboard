import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // replace with your backend
  headers: { "Content-Type": "application/json" },
});

export default api;
