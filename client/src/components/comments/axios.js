import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:5000/api", // Change if your backend is running elsewhere
  withCredentials: true, // Enable if using authentication (cookies/sessions)
});
