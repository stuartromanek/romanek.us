<template>
  <section id="blkmtn" class="work">
    <div class="work-blurb">
      <h3>BLK MTN</h3>
      <div class="work-blurb__inner">
        <p>
          BLK MTN is a LA-based production &amp; talent company with a global network working across film, music and photography. I worked with team on their refreshed identity and first major web release.
        </p>
      </div>
    </div>
    <div class="work-items">
      <Media media-src="blkmtn-home" />
      <Media
        media-src="blkmtn-directors"
        :modifiers="['full-width']"
      />
      <div class="row square">
        <Media
          media-src="blkmtn-mobile-directors"
          :modifiers="['contain']"
        />
        <Media
          media-src="blkmtn-mobile-home"
          :modifiers="['contain']"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "~/assets/css/work-gallery.scss";

.work {
  margin-top: 8rem;
  scroll-margin-top: 6rem;

  @media (max-width: vars.$mobile-breakpoint) {
    margin-top: 4rem;
    scroll-margin-top: 1rem;
  }
}
</style>
