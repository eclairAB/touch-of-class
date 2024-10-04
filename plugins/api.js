import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // Optionally, add interceptors
  apiClient.interceptors.request.use((config) => {
    const token = useCookie('authState')
    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  apiClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })

  // Make the apiClient available in Nuxt's context
  nuxtApp.provide('api', apiClient)
})
