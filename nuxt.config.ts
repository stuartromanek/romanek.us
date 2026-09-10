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
    // Vue SFC styles are already inlined. Vite still emits a render-blocking
    // entry.css link (and prefetches every async chunk). Strip both in the
    // HTML renderer so it applies to generate *and* Cloudflare SSR.
    'render:html'(html) {
      const strip = (chunk) =>
        chunk
          .replace(/<link(?=[^>]*rel="stylesheet")(?=[^>]*\/_nuxt\/entry\.)[^>]*>/gi, '')
          .replace(/<link(?=[^>]*rel="prefetch")[^>]*>/gi, '')
      for (const key of ['head', 'bodyPrepend', 'body', 'bodyAppend']) {
        if (Array.isArray(html[key])) html[key] = html[key].map(strip)
      }
      // Cloudflare Email Address Obfuscation injects a render-blocking
      // email-decode script when it sees @-addresses in the HTML.
      html.bodyPrepend = html.bodyPrepend || []
      html.bodyAppend = html.bodyAppend || []
      html.bodyPrepend.unshift('<!--email_off-->')
      html.bodyAppend.push('<!--email_on-->')
    },
    'nitro:init'(nitro) {
      const strip = (html) => {
        let next = html
          .replace(/<link(?=[^>]*rel="stylesheet")(?=[^>]*\/_nuxt\/entry\.)[^>]*>/gi, '')
          .replace(/<link(?=[^>]*rel="prefetch")[^>]*>/gi, '')
        if (!next.includes('<!--email_off-->')) {
          next = next
            .replace(/<body([^>]*)>/, '<body$1><!--email_off-->')
            .replace('</body>', '<!--email_on--></body>')
        }
        return next
      }

      nitro.hooks.hook('prerender:generate', (route) => {
        if (!route.contents) return
        route.contents = strip(route.contents)
      })

      nitro.hooks.hook('close', async () => {
        const { promises: fs } = await import('node:fs')
        const { join } = await import('node:path')
        const dir = nitro.options.output.publicDir
        for (const name of ['index.html', '200.html', '404.html']) {
          const file = join(dir, name)
          try {
            const html = await fs.readFile(file, 'utf8')
            const next = strip(html)
            if (next !== html) await fs.writeFile(file, next)
          } catch {
            // File may not exist for this preset.
          }
        }
      })
    }
  }
})