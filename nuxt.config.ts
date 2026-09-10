// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
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
        { name: 'author', content: 'Stuart Romanek' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          href: '/fonts/InterVariable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  // Global CSS is imported from app.vue so Nuxt inlines it into the HTML
  // instead of emitting a render-blocking /_nuxt/entry.*.css link.
  features: {
    inlineStyles: true
  },
  devServer: {
    port: 8000,
    host: '0'
  },

  image: {
    quality: 80,
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
  },

  hooks: {
    // Vue SFC styles are already inlined in the HTML. The leftover entry.css
    // link duplicates them and is render-blocking — drop the link.
    'nitro:init'(nitro) {
      nitro.hooks.hook('prerender:generate', (route) => {
        if (!route.contents) return
        route.contents = route.contents
          // Vue SFC styles are already inlined. The leftover entry.css link
          // duplicates them and is render-blocking.
          .replace(
            /<link rel="stylesheet" href="(\/_nuxt\/entry\.[^"']+\.css)"[^>]*>/,
            ''
          )
          // Nuxt prefetches every async chunk in the HTML. On Slow 4G that
          // steals bandwidth from LCP; hydrate-on-visible fetches them later.
          .replace(
            /<link rel="prefetch"[^>]*>/g,
            ''
          )
      })
    }
  }
})