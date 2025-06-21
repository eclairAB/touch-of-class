// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  target: 'static', // Github pages config
  app: {
    baseURL: '/touch-of-class/',
    buildAssetsDir: 'assets',
  },
  router: {
    options: {
      mode: 'hash'
    }
  },
  runtimeConfig: {
    public: {
      // apiBaseUrl: process.env.API_BASE_URL || 'https://your-laravel-backend.com/api',
      apiBaseUrl: 'http://localhost/api',
    }
  },
  experimental: {
    restoreState: true
  },
  generate: {
    fallback: true,  // Generate a 404.html file for routing fallback
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
    loaders: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  },
  
  css: [
    '~/assets/scss/main.scss'
  ],
  sanctum: {
    baseUrl: 'http://localhost/api', // Laravel API
  },
  modules: [
    'nuxt-easy-lightbox',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})