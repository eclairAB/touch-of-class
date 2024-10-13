import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Create axios instance for all requests
  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl,
  });

  // Add interceptors
  apiClient.interceptors.request.use((config) => {
    const token = useCookie('authState');
    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  apiClient.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

  // General function to handle requests (GET, POST, etc.)
  const apiRequest = async (method, url, data = {}, options = {}) => {
    try {
      const config = {
        method,
        url,
        ...options,
      };
      
      if (method === 'post' || method === 'put' || method === 'patch') {
        config.data = data; // Add data for methods like POST, PUT, PATCH
      } else if (method === 'get' || method === 'delete') {
        config.params = data; // Add params for GET, DELETE requests
      }

      const response = await apiClient.request(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Function to handle file uploads
  const fileRequest = async (url, formData, options = {}) => {
    try {
      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...options,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Provide both the general API request function and fileRequest
  nuxtApp.provide('api', {
    request: apiRequest,
    fileRequest,
  });
});
