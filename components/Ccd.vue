<template>
  <section id="ccd" class="work">
    <div class="work-blurb">
      <h3>Center City District</h3>
      <div class="work-blurb__inner">
        <p>
          The Center City District (CCD) and Central Philadelphia Development Corporation (CPDC) work to enhance the vitality of Center City Philadelphia as a thriving 24-hour downtown and a great place to work, live, and have fun. A P'unk Avenue project.
        </p>
      </div>
    </div>
    <div class="work-items">
      <div class="row ccd-pair">
        <Media media-src="ccd-desktop" />
        <Media
          media-src="ccd-mobile"
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

.ccd-pair {
  align-items: flex-start;

  :deep(#media-ccd-desktop) {
    flex: 1 1 auto;
    min-width: 0;
    max-width: none;
  }

  :deep(#media-ccd-mobile) {
    flex: 0 0 auto;
    width: 22%;
    max-width: 280px;
  }

  @media (max-width: 600px) {
    :deep(#media-ccd-mobile) {
      width: 70vw;
      max-width: 280px;
      align-self: center;
    }
  }
}
</style>
