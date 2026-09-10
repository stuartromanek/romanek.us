<template>
  <div id="inner">
    <Header />
    <About />
    <h3>Select Works</h3>
    <Apostrophe />
    <Louis />
    <BlkMtn />
    <Andalusia />
    <Orphan />
    <Wrt />
    <Ccd />
    <Experience />
  </div>
  <Footer />
  <MobileMenu />
  <!-- <Colophon /> -->
</template>

<script setup>
  import { onMounted, onBeforeUnmount } from 'vue'
  import Apostrophe from '~/components/Apostrophe.vue'
  import Louis from '~/components/Louis.vue'
  import BlkMtn from '~/components/BlkMtn.vue'
  import Andalusia from '~/components/Andalusia.vue'
  import Orphan from '~/components/Orphan.vue'
  import Wrt from '~/components/Wrt.vue'
  import Ccd from '~/components/Ccd.vue'

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
    document.body.classList.add('mounted');
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

  h3 {
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