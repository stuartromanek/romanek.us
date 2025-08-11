<template>
  <nav id="mobile-menu">
    <div class="details">
      <h2>Stuart Romanek</h2>
      <h3>Design & Code</h3>
    </div>
    <div class="controls">
      <a href="mailto:sdr@romanek.us">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
      </a>
      <button @click="scroll('prev')">
        Previous Item
        <svg class="rotate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/></svg>
      </button>
      <button @click="scroll('next')">
        Next Item
        <svg class="rotate" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/></svg>
      </button>
    </div>
    
  </nav>
</template>

<script setup>
function scroll(direction = 'next') {
  const SELECTOR = '[data-media]';
  const OFFSET = -20; // Adjust to account for sticky headers, etc.
  const BUFFER = 100;  // Leeway to consider partially visible elements as still "unseen"

  const elements = Array.from(document.querySelectorAll(SELECTOR));
  const currentY = window.scrollY;

  let target;

  if (direction === 'next') {
    const threshold = currentY + BUFFER;
    target = elements.find(el => {
      const elTop = el.getBoundingClientRect().top + currentY;
      return elTop > threshold;
    });
  } else if (direction === 'prev') {
    const threshold = currentY - BUFFER;
    const reversed = [...elements].reverse();
    target = reversed.find(el => {
      const elTop = el.getBoundingClientRect().top + currentY;
      return elTop < threshold;
    });
  }

  if (target) {
    const targetY = target.getBoundingClientRect().top + currentY + OFFSET;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }
}

</script>

<style lang="scss" scoped>
  h2, h3 {
    all: unset;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  svg.rotate {
    transform: rotate(90deg);
    margin-left: 0.25rem;
    max-width: 18px;
  }

  #mobile-menu {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--color-gray-4);
    padding: 1rem 2rem;
    font-size: 0.8rem;
    border-radius: 32px 32px 0px 0px;
    box-sizing: border-box;
    transform: translateY(100%);
    transition: all 0.6s ease;
    transition-delay: 1s;
  };

  .is-mobile #mobile-menu {
    transform: translateY(0);
  }

  .details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    color: gray;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  a, button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 2rem;
    background-color: var(--color-gray-6);
  }

  button {
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.75rem;
  }

  a {
    flex-grow: 1;
    background-color: transparent;
    outline: 2px solid var(--color-gray-6);
    outline-offset: -2px;
  }
</style>