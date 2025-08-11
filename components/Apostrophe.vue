<template>
  <section class="work">
    <div class="intro">
      <div class="logo">
        <ApostropheLogo style="height: 50px; width: auto" :filled="true" />
      </div>
      <div class="content">
        <h3>
          Apostrophe is a globally-minded technology company focused on creating incredible open source content
          management tools for organizations<span>—from small businesses to the enterprise.</span>
        </h3>
        <More label="More ++">
          <p>
            Born out of the hard-won experience of building hundreds of websites at Philadelphia digital agency 
            <a
              class="underlined-link"
              href="https://technical.ly/startups/web-dev-punk-ave-acquired-yes"
              target="_blank"
            >P'unk Avenue</a> (aquired), ApostropheCMS was built as a reaction to the clunky UX of traditional content
            management systems and a want to make a mark on the emerging Node.js scene.
          </p>
          <p>
            As Apostrophe's internal visual and user experience designer at P'unk, it was a natural fit for me to join
            Apostrophe Technologies as the founding product and brand designer when we struck out to form a new open core
            company.
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
    <WorkOne />
  </section>
</template>

<script setup>
import ApostropheLogo from './public/images/apostrophecms-primary.svg'
</script>
<style scoped lang="scss">

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
  // margin: 0;

  @media (max-width: vars.$mobile-breakpoint) {
    // font-size: 0.8rem;
  }
}

.work-group {
  margin: 5rem 0;
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
