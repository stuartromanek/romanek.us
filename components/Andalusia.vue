<template>
  <section id="andalusia" class="work">
    <div class="work-blurb">
      <h3>The Andalusia Foundation</h3>
      <div class="work-blurb__inner">
        <p>
          The Andalusia Foundation. A P'unk Avenue project.
        </p>
      </div>
    </div>
    <div class="work-items">
      <Media
        media-src="andalusia-mobile"
        :modifiers="['contain']"
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
