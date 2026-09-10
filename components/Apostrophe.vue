<template>
  <section id="apostrophe" class="work">
    <div class="intro">
      <div class="logo">
        <ApostropheLogo style="height: 50px; width: auto" :filled="true" />
      </div>
      <div class="content">
        <h3>
          Apostrophe Technologies is an open source content management company building beautifully designed tools for managing websites at scale.
        </h3>
        <More label="More ++">
          <p>
            Apostrophe Technologies began at the Philadelphia agency <a
              class="underlined-link"
              href="https://technical.ly/startups/web-dev-punk-ave-acquired-yes"
              target="_blank"
            >P'unk Avenue</a>, where ApostropheCMS was created to improve on traditional CMS platforms and embrace Node.js. I moved from my role as visual and UX designer at P’unk to become the founding product and brand designer at Apostrophe.
          </p>
        </More>
        <div class="details">
          <div class="column">
            <div class="kv-group">
              <div class="key">Role</div>
              <div class="value">Lead designer, engineering</div>
            </div>
            <div class="kv-group">
              <div class="key">Area</div>
              <div class="value">Web, product, brand</div>
            </div>
          </div>
          <div class="column">
            <div class="kv-group">
              <div class="key">Period</div>
              <div class="value">2019+</div>
            </div>
            <div class="kv-group">
              <div class="key">Live</div>
              <div class="value">
                <a href="https://apostrophecms.com" target="_blank" class="underlined-link">apostrophecms.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
      <Media
        media-src="apostrophecms-footer"
        media-type="image"
        :modifiers="['contain']"
      />
    </div>
  </section>
</template>

<script setup>
import ApostropheLogo from './public/images/apostrophecms-primary.svg'
</script>
<style scoped lang="scss">
@use "~/assets/css/work-gallery.scss";

.content {
  position: relative;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  flex: 1 0 0px;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1.25rem;
  height: min-content;
  justify-content: center;
  overflow: visible;
  padding: 0;

  @media (min-width: 810px) and (max-width: 1199px) {
    flex: none;
    width: 100%;
  }
}

.intro {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 60%;

  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.intro p {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.25px;
  color: var(--color-gray-1);
  color: white;
}

.details {
  $gap: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: calc(50% - ($gap / 2)) calc(50% - ($gap / 2));
  gap: $gap;
  font-size: 1.2rem;
  border-top: 1px solid var(--color-gray-3);
  border-bottom: 1px solid var(--color-gray-3);
  padding: 2rem 0;

  @media (max-width: vars.$mobile-breakpoint) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.8rem;
    padding: 0.5rem 0 0.75rem;
  }

  .key {
    color: var(--color-gray-10);
    min-width: 6rem;
  }

  .kv-group {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @media (max-width: vars.$mobile-breakpoint) {
      gap: 0.25rem;
    }
  }
}
</style>
