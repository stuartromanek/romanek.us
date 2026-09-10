<template>
  <section id="orphan" class="work">
    <div class="work-blurb">
      <h3>The Orphan Disease Center</h3>
      <div class="work-blurb__inner">
        <p>
          The Orphan Disease Center, uniting investigators and clinicians within The University of Pennsylvania, Children's Hospital of Philadelphia, and others internationally. A P'unk Avenue project.
        </p>
      </div>
    </div>
    <div class="work-items">
      <Media
        media-src="orphan-mobile"
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
