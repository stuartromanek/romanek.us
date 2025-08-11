<template>
  <span>
    <button v-show="!revealed" class="reveal-button" @click="revealMore">{{ props.label }}</button>
    <div ref="more" class="collapsable" data-more>
      <slot></slot>
    </div>
  </span>
</template>
<script setup>
  import { useTemplateRef, ref } from 'vue';

  const props = defineProps({
    label: { type: String, default: 'More >>' },
  })
  const revealed = ref(false);
  const more = useTemplateRef('more');

  function revealMore() {
    revealed.value = true;
    more.value.classList.add('revealed');
  }

</script>

<style scoped lang="scss">

  .reveal-button {
    all: unset;
    cursor: pointer;
    color: var(--color-gray-12);
    color: var(--color-green);
    font-size: 1rem;
    font-family: monospace;
    display: none;
    @media (max-width: vars.$mobile-breakpoint) {
      display: block;
    }
  }

  .collapsable {
    transition: all 0.5s ease-in-out;
    overflow: hidden;

    :deep(*) {
      transition: opacity 0.5s ease-in-out;
      @media (max-width: vars.$mobile-breakpoint) {
        opacity: 0;
      }
    }

    @media (max-width: vars.$mobile-breakpoint) {
      max-height: 0;
      &.revealed {
        max-height: 999px;

        :deep(*) {
          opacity: 1;
          &:first-of-type {
            margin-top: 0;
          }
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>