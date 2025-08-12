<template>
  <header>
    <section>
      <div id="headshot">
        <NuxtImg src="/images/stuartromanek.jpg" alt="Head shot of Stuart Romanek" />
      </div>
      <h1 id="name">
        Stuart Romanek
      </h1>
      <h2 id="practice">
        <span>
          <div class="triangle" />
        </span>
        Design & Code
      </h2>
    </section>
    <section id="secondary">
      <span id="open" class="group">
        <div class="circle" />
        <p>Open to new projects, people, and ideas</p>
      </span>
      <span id="contact" class="group">
        <div class="square" />
        <a href="mail:sdr@romanek.us">sdr@romanek.us</a>
      </span>
    </section>
  </header>
</template>

<script setup>
// import { onMounted, useTemplateRef } from 'vue'
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  box-sizing: border-box;
  mix-blend-mode: plus-lighter;
  z-index: 5;

  @media (max-width: vars.$mobile-breakpoint) {
    position: relative;
    padding: 1rem 0;
  }
}

section {
  display: flex;
  align-items: center;
  width: 50%;
  // justify-content: space-between;
  gap: 3rem;
  @media (max-width: vars.$mobile-breakpoint) {
    width: 100%;
    gap: 0.5rem;
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    .triangle {
      display: none;
    }
  }
}



#secondary {
  justify-content: flex-end;
  @media (max-width: vars.$mobile-breakpoint) {
    display: none;
  }
}

#headshot {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: none;

  @media (max-width: vars.$mobile-breakpoint) {
    display: block;
  }

  img {
    width: 110px;
    transform: translate(-19px, -29px);
  }
}

// #inline-practice {
//   display: none;
// }

h1, h2, .group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 1000px) {
  // #practice, #open {
  //   display: none;
  // }
}

// Shapes

.triangle {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 6px 12px 6px;
  border-color: transparent transparent var(--color-green) transparent;
  transform: rotate(0deg);
}

.square {
  width: 12px;
  height: 12px;
  background: var(--color-green);
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-green);
}
</style>