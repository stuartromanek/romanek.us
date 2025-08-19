<template>
  <div class="loading">
    <div class="content">
      {{ current }}
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
const loadingSequence = [
  '▓▒▒▒▒▒▒▒▒▒',
  '▒▓▒▒▒▒▒▒▒▒',
  '▒▒▓▒▒▒▒▒▒▒',
  '▒▒▒▓▒▒▒▒▒▒',
  '▒▒▒▒▓▒▒▒▒▒',
  '▒▒▒▒▒▓▒▒▒▒',
  '▒▒▒▒▒▒▓▒▒▒',
  '▒▒▒▒▒▒▒▓▒▒',
  '▒▒▒▒▒▒▒▒▓▒',
  '▒▒▒▒▒▒▒▒▒▓',
 ];
const current = ref(loadingSequence[0]);

onMounted(() => {
  let now = 0;
  window.setInterval(() => {
    current.value = loadingSequence[now++ % loadingSequence.length]
  }, 100);
})
</script>

<style scoped lang="scss">
  .content {
    display: inline-block;
    padding: 10px;
    border: 1px dashed var(--color-gray-5);
    color: var(--color-gray-4);
  }
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: var(--color-gray-2);
    position: absolute;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
  }
</style>