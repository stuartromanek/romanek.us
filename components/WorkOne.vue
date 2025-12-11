<template>
  <div class="work-blurb">
    <h3>An open source content management system with a beautiful editing experience.</h3>
    <More label="Designing ApostropheCMS >>">
      <div class="work-blurb__inner">
        <p>
          Most content management systems fall into one of two categories: 
          closed-source SaaS platforms with polished editing experiences, or open 
          frameworks that prioritize developer flexibility at the expense of editor usability.
        </p>
        <p>
          Apostrophe aims to balance both. The challenge is creating an in-context, 
          intuitive editing experience while maintaining the flexibility of a 
          developer-first framework. Every part of Apostrophe is designed to be 
          overridable and configurable, giving developers and editors the tools 
          they need to create sites that feel purpose-built.
        </p>
      </div>
    </More>

  </div>
  <div class="work-items">
    <Media media-src="ui-marquee" />
    <Media media-src="ui-in-context" />
    <Media media-src="ui-content-management" />
    <div class="row square">
      <Media
        media-src="ui-sq-tagging"
        :modifiers="['square']"
      />
      <Media
        media-src="ui-sq-shortcuts-menu"
        :modifiers="['square']"
      />
      <Media
        media-src="ui-sq-ai-seo"
        :modifiers="['square']"
      />
    </div>
    <Media media-src="ui-widget-editing" />
    <Media media-src="ui-palette" />
    <Media media-src="ui-permissions-grid" />
  </div>
  <div class="work-blurb">
    <h3>Other brand, web, and marketing work for Apostrophe Technologies</h3>
    <div class="work-blurb__inner">
      <p>
        In addition to the design, UX, and engineering of ApostropheCMS the software I am also responsible for the
        design and maintenance of the Apostrophe Technologies brand family, marketing material, and other web presences.
        Here are a few snapshots.
      </p>
    </div>
  </div>
  <div class="work-items">
    <Media
      media-src="apostrophecms-wordmark"
      media-type="image"
      :modifiers="['full-width']"
    />
    <Media
      media-src="apostrophecms-home-2"
      media-type="image"
      :modifiers="['contain']"
    />
    <Media
      media-src="apostrophecms-tweet"
      media-type="image"
      :modifiers="['contain']"
    />
    <!-- <Media
      media-src="apostrophecms-tagline"
      media-type="image"
    /> -->
    <div class="row square">
      <Media
      media-src="apostrophecms-stickers"
      media-type="image"
      :modifiers="['square']"
      />
      <Media
      media-src="apostrophecms-opensource"
      media-type="image"
      :modifiers="['square']"
      />
      <Media
      media-src="apostrophecms-hat"
      media-type="image"
      :modifiers="['square']"
      />
    </div>
    <div class="row square">
      <Media
      media-src="apostrophecms-glitch-mock"
      media-type="image"
      :modifiers="['square', 'contain']"
      />
      <Media
      media-src="apostrophecms-wake"
      media-type="image"
      :modifiers="['square', 'contain']"
      />
      <Media
      media-src="apostrophecms-plantlife-mockup"
      media-type="image"
      :modifiers="['square', 'contain']"
      />
    </div>
    <Media
      media-src="apostrophecms-pricing"
      media-type="image"
      :modifiers="['contain']"
    />
    <!-- <Media
      media-src="apostrophecms-browser"
      media-type="image"
      :modifiers="['contain', 'square']"
    /> -->
    <Media 
      media-src="apostrophecms-footer"
      media-type="image"
      :modifiers="['contain']"
    />
  </div>
  <div class="work-blurb">
    <h3>Miscellaneous design and development work</h3>
    <div class="work-blurb__inner">
      <p>
        A few other projects.
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
    <div class="row square">
      <Media
        media-src="andalusia-mobile"
        :modifiers="['contain']"
      />
      <Media
        media-src="orphan-mobile"
        :modifiers="['contain']"
      />
    </div>
    <Media
      media-src="wrt-desktop"
      :modifiers="['full-width']"
    />
    <Media media-src="ccd-desktop" />
    <Media
      media-src="ccd-mobile"
      :modifiers="['contain', 'center', 'mobile-width']"
    />

    <!-- <div class="work-blurb">
      <h3>image.png</h3>
      <div class="work-blurb__inner">
        <p>
          Select graphic experiments done in the margins. No context, no clients.
        </p>
      </div>
    </div>
    <div class="row square">
      <Media media-src="__11" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
      <Media media-src="__10" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
    </div>
    <div class="row square">
      <Media media-src="__4" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
      <Media media-src="__5" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com"/>
      <Media media-src="__6" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
    </div>
    <div class="row square">
      <Media media-src="__7" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
      <Media media-src="__8" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
      <Media media-src="__9" media-type="image" :modifiers="['contain']" caption="The homepage of Apostrophecms.com" />
    </div> -->
  </div>

</template>

<style scoped lang="scss">
.work-blurb {
  display: grid;
  margin: 5rem 0;
  gap: 5%;
  grid-template-columns: 43% 50%;
  align-items: flex-end;
  text-wrap: balance;

  @media (max-width: vars.$mobile-breakpoint) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
    align-items: flex-start;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }

  p {
    max-width: 670px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.work-items {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.row {
  width: 100%;
  display: flex;
  gap: 3rem;

  @media (max-width: 800px) {
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.square {
  align-items: center;
  justify-content: center;

  &>.media-container {
    max-width: 400px;
  }
}

:deep(.media) {
  max-width: 1000px;

  &:nth-child(2n + 2) {
    align-self: flex-end;
  }

  &:nth-child(3n) {
    align-self: center;
  }

  &:nth-child(4n) {
    max-width: 1200px;
  }
  @media (max-width: vars.$mobile-breakpoint) {
    max-width: 100%;
    display: block;
    width: 100%;
    .media-container {
      display: block;
      width: 100%;
    }
  }
}

.row :deep(.media) {
  align-self: flex-start;
}
</style>