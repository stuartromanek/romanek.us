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
        <!-- <p>
          ApostropheCMS grew from practice. After years of building on brittle tools, we made our own. 
          As the informal product designer at P’unk Avenue, the Philadelphia design agency where Apostrophe was born, 
          I helped shape its earliest forms. When we stepped out to build the company, I came with it, as founding designer.
        </p> -->
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
        <div class="details">
          <div class="column">
            <div class="kv-group">
              <div class="key">Role</div>
              <div class="value">Lead Designer</div>
            </div>
            <div class="kv-group">
              <div class="key">Area</div>
              <div class="value">Web, Product, Brand</div>
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
        <!-- <div class="style-13">
          <div class="style-14">
            <p class="style-15">
              <span class="style-18">Role</span>Lead Designer
            </p>
            <p class="style-15">
              <span class="style-18">Area</span>Web<span class="style-19">,</span> Product<span class="style-19">,</span>Brand
            </p>
          </div>
          <div class="style-14">
            <p class="style-15">
              <span class="style-18">Period</span>2022 - 2024</p>
            <p class="style-15">
              <span class="style-18">Live</span>
              <a href="https://apostrophecms.com" target="_blank" class="underlined-link">apostrophecms.com</a>
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <WorkOne />
  </section>
</template>

<script setup>
import ApostropheLogo from '~/assets/images/apostrophe/apostrophecms-primary.svg'
// import ApostropheLogo from '~/assets/images/apostrophe/aaa.svg'
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
  margin: 0;

  @media (max-width: vars.$mobile-breakpoint) {
    font-size: 0.8rem;
  }
}

.work-group {
  margin: 5rem 0;
}

p.sm {
  font-size: 0.9rem;
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

  @media (max-width: 690px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .key {
    color: var(--color-gray-7);
    min-width: 6rem;
  }

  .kv-group {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
