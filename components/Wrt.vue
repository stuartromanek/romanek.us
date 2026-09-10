<template>
  <section id="wrt" class="work">
    <div class="work-blurb">
      <h3>WRT</h3>
      <div class="work-blurb__inner">
        <p>
          WRT is a team of planners, urban designers, architects, and landscape architects with offices in Philadelphia and San Francisco. A P'unk Avenue project.
        </p>
      </div>
    </div>
    <div class="work-items">
      <Media
        media-src="wrt-desktop"
        :modifiers="['full-width']"
      />
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
