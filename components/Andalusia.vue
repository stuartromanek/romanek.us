<template>
  <section id="punk-web" class="work">
    <div class="row pair">
      <article id="andalusia" class="pair__col">
        <div class="pair__copy">
          <h3>The Andalusia Foundation</h3>
          <p>
            The Andalusia Foundation, stewarding the historic Biddle estate on the Delaware River, its house, gardens, and collections in Bensalem, Pennsylvania. A P'unk Avenue project.
          </p>
        </div>
        <Media
          media-src="andalusia-mobile"
          :modifiers="['contain']"
        />
      </article>
      <article id="orphan" class="pair__col">
        <div class="pair__copy">
          <h3>The Orphan Disease Center</h3>
          <p>
            The Orphan Disease Center, uniting investigators and clinicians within The University of Pennsylvania, Children's Hospital of Philadelphia, and others internationally. A P'unk Avenue project.
          </p>
        </div>
        <Media
          media-src="orphan-mobile"
          :modifiers="['contain']"
        />
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/css/work-gallery.scss";

.work {
  margin-top: 8rem;
  scroll-margin-top: 6rem;

  @media (max-width: vars.$mobile-breakpoint) {
    margin-top: 4rem;
    scroll-margin-top: 1rem;
  }
}

.pair {
  align-items: flex-start;
  justify-content: center;
}

.pair__col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  scroll-margin-top: 6rem;

  @media (max-width: vars.$mobile-breakpoint) {
    scroll-margin-top: 1rem;
  }
}

.pair__copy {
  width: 100%;
  text-align: left;

  p {
    margin: 0;
    max-width: 36rem;
  }
}

.pair__col :deep(.media) {
  max-width: none;
  align-self: center;
  width: 100%;
}
</style>
