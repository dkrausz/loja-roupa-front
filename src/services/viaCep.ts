import axios from "axios";

export const viaCep = axios.create({
  baseURL: "http://viacep.com.br/ws",
  timeout: 5 * 1000,
});