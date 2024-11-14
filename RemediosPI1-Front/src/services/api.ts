import axios from "axios"

export const api = axios.create({
  //baseURL: "http://localhost:8080",
  baseURL: "http://50.17.120.87:8080"
})
