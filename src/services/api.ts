import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://loja-roupas.onrender.com",
//   timeout: 5 * 1000,
// });
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5 * 1000,
});
