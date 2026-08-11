// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    'nuxt-svgo',
    '@nuxtjs/i18n',
    'nuxt-umami'
  ],
  umami: {
    id: '3b282076-cec8-42b6-9884-d8ea56c841dc',
    host: 'https://umami-production-d6f7.up.railway.app',
    autoTrack: true,
    // proxy: 'cloak',
    // useDirective: true,
    ignoreLocalhost: true,
    // excludeQueryParams: false,
    // domains: ['cool-site.app', 'my-space.site'],
    // customEndpoint: '/my-custom-endpoint',
    // enabled: false,
    // logErrors: true,
  },
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
        { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }
      ]
    }
  },
  // devtools: { enabled: false },
  css: [
    '~/assets/css/inter.scss',
    '~/assets/css/variables.scss',
    '~/assets/css/global.scss'
  ],
  devServer: {
    port: 8000,
    host: '0'
  },

  image: {
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
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


  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  }
})