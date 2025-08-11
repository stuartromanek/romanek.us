// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: true,
  app: {
    
    head: {
      title: 'Stuart Romanek · Design & Code',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'title', content: 'Stuart Romanek · Design & Code' },
        { name: 'description', content: 'Stuart Romanek on the world wide web' },
        { name: 'author', content: 'Stuart Romanek' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://rsms.me' },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      ]
    }
  },
  // devtools: { enabled: false },
  css: [
    '~/assets/css/variables.scss',
    '~/assets/css/global.scss'
  ],
  devServer: {
    port: 8000,
    host: '0'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/sass-variables.scss" as vars;'
        }
      }
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    'nuxt-svgo',
    '@nuxtjs/i18n'
  ],

  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  }
})