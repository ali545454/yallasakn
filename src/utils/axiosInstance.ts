// src/utils/axiosInstance.ts
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ مهم جدًا عشان الكوكي يتبعت مع كل request
});

// 🚫 مش هنحتاج interceptor يضيف Authorization Header
// لأن التوكن محفوظ في الكوكي من السيرفر تلقائي

export default axiosInstance;
