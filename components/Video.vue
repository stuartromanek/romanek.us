<template>
  <figure class="video" @click="nextSpeed">
     <video
        ref="video"
        :src="videos[file]"
        preload="auto"
        muted
        autoplay
        playsinline
        webkit-playsinline
        x5-playsinline
      />
    <figcaption v-if="caption">{{ caption }}</figcaption>
    <TransitionGroup ref="button" name="speeds" tag="button" class="speeds">
      <span v-show="speeds[speedIndex].value === 1" :key="1">1x</span>
      <span v-show="speeds[speedIndex].value === 0.5" :key="0.5">0.5x</span>
      <span v-show="speeds[speedIndex].value === 2" :key="0">2x</span>
      <span v-show="speeds[speedIndex].value === 0" :key="0">Paused</span>
    </TransitionGroup>
  </figure>
</template>

<script setup>
import { onMounted, useTemplateRef, ref } from 'vue'
import { filename } from 'pathe/utils';

const glob = import.meta.glob('~/assets/video/*.mp4', { eager: true });
const videos = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

defineProps({
  file: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})

const speeds = ref([
  { value: 1, label: '1x' },
  { value: 0.5, label: '0.5x' },
  { value: 2, label: '2x' },
  { value: 0, label: 'Paused', width: 4 },
])

const speedIndex = ref(0);

const buttonRef = useTemplateRef('button');
const videoRef = useTemplateRef('video');

const nextSpeed = () => {
  if (speeds.value[speedIndex.value + 1]) {
    speedIndex.value++;
  } else {
    speedIndex.value = 0;
  }

  setButtonWidth();
  videoRef.value.playbackRate = speeds.value[speedIndex.value].value;
}

const setButtonWidth = () => {
  let width;
  if (speeds.value[speedIndex.value].width) {
    width = speeds.value[speedIndex.value].width;
  } else {
    const label = speeds.value[speedIndex.value].label;
    width = label.replace('.', '').length * 14 / 16
  }
  buttonRef.value.$el.style.width = `${width}rem`
}

const loop = () => {
  videoRef.value.addEventListener('ended', () => {
    setTimeout(function(){
      videoRef.value.play();
    }, 2000);
  }, false);
}

onMounted(async () => {
  setButtonWidth();
  loop();
})

</script>

<style lang="scss" scoped>
  figure {
    position: relative;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0;
  }

  .dup {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  
  video {
    // width: 101%;
    position: relative;
    // transform: translate(0px, -1%);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s ease
  }

  figcaption {
    color: var(--color-gray-9);
    font-size: 0.8rem;
    transition: color 0.2s ease;
    padding: 8px 0;
  }

  figure:hover {

    figcaption {
      color: var(--color-gray-11)
    }

    .speeds {
      opacity: 1;
      transform: scale(1.2);
      // font-size: 13px;
      background-color: var(--color-gray-1);
      color: var(--color-gray-12);
    }
  }

  .speeds {
    all: unset;
    height: 24px;
    border-radius: 8px;
    background-color: var(--color-gray-12);
    color: black;
    position: absolute;
    top: 1rem;
    right: 1rem;
    min-width: 24px;
    font-size: 13px;
    color: var(--color-gray-8);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform-origin: top right;
    opacity: 0.65;

    &:hover {
      // background-color: var(--color-gray-2);
      // color: var(--color-gray-12);
      cursor: pointer;
    }

    span {
      position: absolute;
    }
  }

  .speeds-enter-active,
  .speeds-leave-active {
    transition: all 0.5s ease;
    transform: translateX(0);
  }
  .speeds-enter-from,
  .speeds-leave-to {
    opacity: 0;
    transform: translateX(2px);
  }

</style>
