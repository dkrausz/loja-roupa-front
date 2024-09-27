import axios from "axios";

export const api = axios.create({
  baseURL: "https://loja-roupas.onrender.com",
  timeout: 5 * 1000,
});