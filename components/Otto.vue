<template>
  <span
    ref="otto"
    :style="ottoStyle"
  />
</template>

<script setup>
import { computed, onMounted, useTemplateRef } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 1
  }
})

const otto = useTemplateRef('otto');

const smile = ref([
  { tag: 'span', attrs: { class: 'backtick' }, text: '`', delayMs: 50 },
  { tag: 'span', attrs: { class: 'colon' }, text: ':', delayMs: 100 },
  { tag: 'span', attrs: { class: 'paren' }, text: ')', delayMs: 75 },
]);

const ottoStyle = computed(() => {
  const rem = props.size
  return {
    '--otto-size': `${rem}rem`,
    '--otto-font-size': `${rem * 0.6}rem`,
    '--otto-border-radius': `${rem * 0.2}rem`,
    '--otto-gap': `${rem * 0.05}rem`,
    '--otto-padding': `${rem * 0.08}rem`
  }
})

onMounted(async () => {
  await new Promise(res => setTimeout(res, 2000));
  await type(otto, smile.value);
  otto.value.classList.add('otto');
})

function appendElement(ref, tag, attributes = {}, textContent = '') {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));
  el.textContent = textContent;
  ref.value.appendChild(el);
  return el;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function type(parent, elementsWithDelays) {
  for (const { tag, attrs, text, delayMs } of elementsWithDelays) {
    await delay(delayMs);
    appendElement(parent, tag, attrs, text);
  }
}

// async function clear() {
//   const children = otto.value.children
//   const childrenLen = Object.assign({},otto.value.children);
//   // console.log(otto.value.children);
//   // console.log(otto.value.children.length);
//   for (let i = 0; i < childrenLen; i++) {
//     console.log(i);
//     console.log('remove', children[i]);
//     children[i].remove();
//     await delay(30);
//   }
// }
</script>

<style lang="scss">

.otto {
  --otto-color: var(--color-green);
  --otto-border-color: #466e09;
  --otto-background-color: #212b1b;

  font-family: monospace;
  // font-family: 'Inconsolata', sans-serif;
  font-size: var(--otto-font-size);
  color: var(--otto-color);
  border: 1px solid var(--otto-border-color);
  background-color: var(--otto-background-color);
  border-radius: var(--otto-border-radius);
  padding: var(--otto-padding);
  width: var(--otto-size);
  height: var(--otto-size);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--otto-gap);

  span {
    position: relative;
  }

  .backtick {
    display: none;
  }

  .colon {
    left: 1px;
    top: -0.5px;
  }

  .paren {
    top: 0.5px;
  }
}
</style>
