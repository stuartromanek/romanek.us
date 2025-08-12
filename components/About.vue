<template>
  <section id="about">
    <div class="wrapper">
      <div class="content" data-content>
          <Otto id="about-otto" :size="2" />
          <p id="primary-description">Hey, I'm Stuart Romanek, a digital designer and developer focusing on intuitive user experiences, durable interfaces, and seamlessly blending strategy and aesthetics.</p>
          <More>
            <p>I aim to create expressive brands and software systems that are honest, resilient, and self-evident.</p>
            <p>
              I am the founding designer for <a href="http://apostrophecms.com" target="_blank">ApostropheCMS</a>, 
              an open source content management system that aims to marry an unopinionated, developer-first application 
              framework with a rich in-context editing interface. <br /> Think Rails + Squarespace in JavaScript.
            </p>
          </More>
      </div>
      <figure id="pic">
        <NuxtImg src="/images/stuartromanek.webp" alt="Portrait of Stuart Romanek" preload />
        <!-- <figcaption>
          Me & Otto at Porchfest in W. Philadelphia, 2024
        </figcaption> -->
      </figure>
    </div>
  </section>
</template>

<script setup>
  import { useTemplateRef, ref } from 'vue';

</script>

<style scoped lang="scss">
  #about {
    position: relative;
    height: 70vh;
    font-size: 170%;
    font-size: 1.4rem;
    line-height: 1.4;
    font-size: 1rem;
    line-height: 1.5;
    display: flex;
    align-items: flex-end;
    width: 100%;

    @media (max-width: vars.$mobile-breakpoint) {
      height: auto;
      font-size: 1.3rem;
    }

    p {
      max-width: 580px;

      a {
        color: var(--color-green);
      }
    }
  }

  #about-otto {
    @media (max-width: vars.$mobile-breakpoint) {
      display: none;
    }
  }

  // #primary-description {
  //   @media (max-width: vars.$mobile-breakpoint) {
  //     font-size: 1.2rem;
  //   }
  // }

  .wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    @media (max-width: vars.$mobile-breakpoint) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }

  #pic {
    position: relative;
    display: block;
    max-width: 310px;
    font-size: 0.75rem;

    @media (max-width: vars.$mobile-breakpoint) {
      display: none;
    }

    figcaption {
      padding-top: 5px;
      color: var(--color-gray-9);
    }

    img {
      max-width: 100%;
      border-radius: 8px;
    }
  }
</style>