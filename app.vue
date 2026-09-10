<template>
  <div id="inner">
    <Header />
    <main>
      <About />
      <h2 id="works">Select Works</h2>
      <LazyApostrophe :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyLouis :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyBlkMtn :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyAndalusia :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyWrt :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyCcd :hydrate-on-visible="{ rootMargin: '200px' }" />
      <LazyExperience :hydrate-on-visible="{ rootMargin: '200px' }" />
    </main>
  </div>
  <LazyFooter :hydrate-on-visible="{ rootMargin: '200px' }" />
  <MobileMenu />
  <!-- <Colophon /> -->
</template>

<script setup>
  import { onMounted, onBeforeUnmount } from 'vue'

  const siteUrl = 'https://romanek.us'
  const title = 'Stuart Romanek · Design & Code'
  const description = 'Stuart Romanek is a designer and engineer working on product, brand, and open source. Founding designer of ApostropheCMS; recent work includes Louis, a YouTube-to-Yoto studio, plus web and identity for BLK MTN and P\'unk Avenue clients.'
  const portrait = `${siteUrl}/images/stuartromanek.webp`

  useSeoMeta({
    title,
    description,
    author: 'Stuart Romanek',
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogUrl: `${siteUrl}/`,
    ogLocale: 'en_US',
    ogSiteName: 'Stuart Romanek',
    ogImage: portrait,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: portrait,
  })

  useHead({
    link: [
      { rel: 'canonical', href: `${siteUrl}/` }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${siteUrl}/#person`,
              name: 'Stuart Romanek',
              url: siteUrl,
              jobTitle: 'Designer and engineer',
              image: portrait,
              knowsAbout: [
                'Product design',
                'Brand design',
                'ApostropheCMS',
                'Louis',
                'Yoto'
              ],
              sameAs: [
                'https://github.com/stuartromanek',
                'https://www.linkedin.com/in/stuart-romanek-796269191',
                'https://www.are.na/stuart-romanek'
              ]
            },
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: title,
              description,
              author: { '@id': `${siteUrl}/#person` },
              publisher: { '@id': `${siteUrl}/#person` }
            },
            {
              '@type': 'ProfilePage',
              '@id': `${siteUrl}/#profile`,
              url: siteUrl,
              name: title,
              isPartOf: { '@id': `${siteUrl}/#website` },
              mainEntity: { '@id': `${siteUrl}/#person` },
              hasPart: { '@id': `${siteUrl}/#works` }
            },
            {
              '@type': 'ItemList',
              '@id': `${siteUrl}/#works`,
              name: 'Select Works',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'ApostropheCMS',
                    url: 'https://apostrophecms.com',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'SoftwareApplication',
                    name: 'Louis',
                    url: 'https://louis.romanek.us/',
                    sameAs: 'https://github.com/stuartromanek/louis',
                    description: 'A studio that turns YouTube content into playlists for the Yoto player.',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'BLK MTN',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'The Andalusia Foundation',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'The Orphan Disease Center',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'WRT',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 7,
                  item: {
                    '@type': 'CreativeWork',
                    name: 'Center City District',
                    creator: { '@id': `${siteUrl}/#person` }
                  }
                }
              ]
            }
          ]
        })
      }
    ]
  })

  let mediaQueries = []

  const setupMediaQuery = ({ maxWidth, className }) => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`)

    const handler = (e) => {
      const matches = e?.matches ?? query.matches
      document.body.classList.toggle(className, matches)
    }

    // Store both query and handler for cleanup
    mediaQueries.push({ query, handler })

    // Add listener and run once
    query.addEventListener('change', handler)
    handler()
  }

  onMounted(() => {
    umTrackView();
    const bodyStyles = window.getComputedStyle(document.body);
    const responsiveRules = [
      {
        maxWidth: parseInt(bodyStyles.getPropertyValue('--mobile-breakpoint').split('px')[0]),
        className: 'is-mobile'
      }
      // { maxWidth: 1024, className: 'is-tablet' }
    ];
    responsiveRules.forEach(setupMediaQuery);
  })

  onBeforeUnmount(() => {
    mediaQueries.forEach(({ query, handler }) => {
      query.removeEventListener('change', handler)
    })
    mediaQueries = []
  })
</script>

<style scoped lang="scss">

  #inner {
    padding: 2.5rem;

    @media (max-width: vars.$mobile-breakpoint) {
      padding: 1rem;
    }
  }

  #works {
    margin: 5rem 0 3rem;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--color-gray-10);
    @media (max-width: vars.$mobile-breakpoint) {
      margin: 2rem 0;
      font-size: 0.75rem;
    }
  }
</style>

<style lang="scss">
@use "~/assets/css/inter";
@use "~/assets/css/variables";
@use "~/assets/css/global";
</style>