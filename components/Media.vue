<template>
  <div :id="`media-${mediaSrc}`" class="media" :class="modifiers" data-media>
    <figure ref="containerRef" class="media-container">
      <video 
        v-if="mediaType === 'video'"
        ref="mediaRef"
        :src="videos[mediaSrc]"
        autoplay 
        muted 
        loop 
        playsinline
        class="media-element"
        @dblclick="handleMediaDoubleClick"
      />
      <img 
        v-else
        ref="mediaRef"
        :src="images[mediaSrc]"
        class="media-element"
        alt=""
        @dblclick="handleMediaDoubleClick"
      >
      <div class="controls controls--inline">
        <TransitionGroup 
          v-if="mediaType === 'video'"
          ref="speedButtonRef" 
          name="speeds" 
          tag="button" 
          class="control speeds"
          @click.stop="nextSpeed"
        >
          <span v-show="speeds[speedIndex].value === 1" :key="1">1x</span>
          <span v-show="speeds[speedIndex].value === 0.5" :key="0.5">0.5x</span>
          <span v-show="speeds[speedIndex].value === 2" :key="2">2x</span>
          <span v-show="speeds[speedIndex].value === 0" :key="0">Paused</span>
        </TransitionGroup>
        <button 
          aria-label="Zoom to fullscreen" 
          class="control zoom-button--open"
          :aria-expanded="isZoomed"
          @click="triggerZoom"
        >
          <FullscreenIcon />
        </button>
      </div>

      <figcaption
        v-if="$t(mediaSrc) !== mediaSrc"
      >
        {{ $t(mediaSrc) }}
      </figcaption>
    </figure>
    <Transition>
      <div 
        v-show="isZoomed || isAnimating"
        ref="twinRef"
        class="fullscreen-twin"
        :class="twinClasses"
        :style="twinStyle"
      >
        <video 
          v-if="mediaType === 'video'"
          :src="videos[mediaSrc]"
          autoplay 
          muted 
          loop 
          playsinline
          class="twin-media"
          @dblclick="handleMediaDoubleClick"
        />
        <img 
          v-else
          :src="images[mediaSrc]"
          class="twin-media"
          alt=""
          @dblclick="handleMediaDoubleClick"
        >
        <div class="controls controls--fullscreen">
          <TransitionGroup 
            v-show="mediaType === 'video'"
            ref="fullscreenSpeedButtonRef" 
            name="speeds" 
            tag="button" 
            class="control speeds fullscreen-speeds"
            @click.stop="nextSpeed"
          >
            <span v-show="speeds[speedIndex].value === 1" :key="1">1x</span>
            <span v-show="speeds[speedIndex].value === 0.5" :key="0.5">0.5x</span>
            <span v-show="speeds[speedIndex].value === 2" :key="2">2x</span>
            <span v-show="speeds[speedIndex].value === 0" :key="0">Paused</span>
          </TransitionGroup>
          <button 
            v-if="showCloseButton"
            class="control zoom-button--close"
            aria-label="Close fullscreen view"
            @click="closeZoom"
          >
            <ShrinkIcon />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { filename } from 'pathe/utils'
import FullscreenIcon from '~/assets/images/fullscreen.svg'
import ShrinkIcon from '~/assets/images/shink.svg'

const config = {
  fullsizeHeight: 100,
  fullsizeWidth: 100,
}

const videoGlob = import.meta.glob('~/assets/work/video/*.mp4', { eager: true });
const videos = Object.fromEntries(
  Object.entries(videoGlob).map(([key, value]) => [filename(key), value.default])
);

const imageGlob = import.meta.glob('~/assets/work/images/*.webp', { eager: true });
const images = Object.fromEntries(
  Object.entries(imageGlob).map(([key, value]) => [filename(key), value.default])
);

const props = defineProps({
  mediaSrc: { type: String, required: true },
  caption: { type: String, default: undefined },
  mediaType: { type: String, default: 'video' },
  showCloseButton: { type: Boolean, default: true },
  allowEscClose: { type: Boolean, default: true },
  modifiers: { type: Array, default: () => {
    return [];
  } }
})

const emit = defineEmits(['zoom-start', 'zoom-end', 'close-start', 'close-end'])

const containerRef = ref(null)
const mediaRef = ref(null)
const twinRef = ref(null)
const speedButtonRef = ref(null)
const fullscreenSpeedButtonRef = ref(null)

const isZoomed = ref(false)
const originalPosition = ref(null)
const isAnimating = ref(false)
const speeds = ref([
  { value: 1, label: '1x' },
  { value: 0.5, label: '0.5x' },
  { value: 2, label: '2x' },
  { value: 0, label: 'Paused', width: 4 },
])
const speedIndex = ref(0)

const twinClasses = computed(() => ({
  'media-twin--initial': !isZoomed.value && !isAnimating.value,
  'media-twin--fullscreen': isZoomed.value && !isAnimating.value,
  'media-twin--animating': isAnimating.value
}))

const twinStyle = reactive({
  top: '0px',
  left: '0px',
  width: '0px',
  height: '0px',
})

const nextSpeed = () => {
  if (speeds.value[speedIndex.value + 1]) {
    speedIndex.value++
  } else {
    speedIndex.value = 0
  }

  setButtonWidth()
  
  if (mediaRef.value && props.mediaType === 'video') {
    mediaRef.value.playbackRate = speeds.value[speedIndex.value].value
  }
  
  if (twinRef.value && props.mediaType === 'video') {
    const twinVideo = twinRef.value.querySelector('video')
    if (twinVideo) {
      twinVideo.playbackRate = speeds.value[speedIndex.value].value
    }
  }
}

const setButtonWidth = () => {
  let width
  if (speeds.value[speedIndex.value].width) {
    width = speeds.value[speedIndex.value].width
  } else {
    const label = speeds.value[speedIndex.value].label
    width = label.replace('.', '').length * 14 / 16
  }
  
  if (speedButtonRef.value?.$el) {
    speedButtonRef.value.$el.style.width = `${width}rem`
  }
  if (fullscreenSpeedButtonRef.value?.$el) {
    fullscreenSpeedButtonRef.value.$el.style.width = `${width}rem`
  }
}

const useMediaAnimation = () => {
  const animateToFullscreen = () => {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        twinRef.value?.removeEventListener('transitionend', handleAnimationEnd)
        resolve()
      }
      twinRef.value?.addEventListener('transitionend', handleAnimationEnd)
      twinStyle.top = `${(100 - config.fullsizeHeight) / 2}vh`
      twinStyle.left = `${(100 - config.fullsizeWidth) / 2}vw`
      twinStyle.width = `${config.fullsizeWidth}vw`
      twinStyle.height = `${config.fullsizeHeight}vh`
    })
  }

  const animateToOriginal = (originalPosition) => {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        twinRef.value?.removeEventListener('transitionend', handleAnimationEnd)
        resolve()
      }
      twinRef.value?.addEventListener('transitionend', handleAnimationEnd)
      twinStyle.top = `${originalPosition.top}px`
      twinStyle.left = `${originalPosition.left}px`
      twinStyle.width = `${originalPosition.width}px`
      twinStyle.height = `${originalPosition.height}px`
    })
  }

  return { animateToFullscreen, animateToOriginal }
}

const { animateToFullscreen, animateToOriginal } = useMediaAnimation()

const getElementPosition = (element) => {
  if (!element) return null
  
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  }
}

const setTwinPosition = (position) => {
  twinStyle.top = `${position.top}px`
  twinStyle.left = `${position.left}px`
  twinStyle.width = `${position.width}px`
  twinStyle.height = `${position.height}px`
}

async function triggerZoom() {  
  try {
    if (!containerRef.value || !mediaRef.value) {
      console.log('Missing refs')
      return
    }
    
    const media = mediaRef.value
    const position = getElementPosition(media)
    
    if (!position) {
      console.error('Could not get element position')
      return
    }
    
    originalPosition.value = position
    
    isAnimating.value = false
    isZoomed.value = false
    // resetTwinState()
    setTwinPosition(position)
    await nextTick()
    if (twinRef.value) void twinRef.value.offsetHeight
    
    isZoomed.value = true
    isAnimating.value = true
    emit('zoom-start')

    document.body.style.overflow = 'hidden';
    
    await new Promise(resolve => setTimeout(resolve, 10))
    
    if (props.mediaType === 'video' && twinRef.value) {
      const twinVideo = twinRef.value.querySelector('video')
      if (twinVideo && media) {
        twinVideo.currentTime = media.currentTime
        twinVideo.playbackRate = media.playbackRate
        if (!media.paused) {
          twinVideo.play()
        }
      }
    }

    await animateToFullscreen(position)
    
    isAnimating.value = false
    emit('zoom-end')
    
  } catch (error) {
    console.error('Zoom animation failed:', error)
    isAnimating.value = false
    isZoomed.value = false
  }
}

async function closeZoom() {
  try {
    if (!containerRef.value || !mediaRef.value || isAnimating.value) return
    
    const media = mediaRef.value
    const position = getElementPosition(media)
    
    if (!position) {
      console.error('Could not get element position')
      return
    }
    
    if (props.mediaType === 'video' && twinRef.value) {
      const twinVideo = twinRef.value.querySelector('video')
      if (twinVideo && media) {
        media.currentTime = twinVideo.currentTime
        media.playbackRate = twinVideo.playbackRate
        if (!twinVideo.paused) {
          media.play()
        }
      }
    }
    
    isAnimating.value = true
    emit('close-start')

    document.body.style.overflow = 'auto';
    
    await animateToOriginal(position)
    
    isZoomed.value = false
    isAnimating.value = false
    // resetTwinState()
    
    emit('close-end')
    
  } catch (error) {
    console.error('Close animation failed:', error)
    isAnimating.value = false
    isZoomed.value = false
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isZoomed.value && props.allowEscClose) {
    closeZoom()
  }
}

function handleMediaDoubleClick(event) {
  event.stopPropagation()
  if (isZoomed.value) {
    closeZoom()
  } else {
    triggerZoom()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  setButtonWidth()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.media {
  position: relative;
  display: inline-block;

  &.contain .twin-media {
    object-fit: contain;
  }

  @media (max-width: vars.$mobile-breakpoint) {
    .twin-media {
      object-fit: contain;
    }
  }

  &.max-height {
    video, img {
      max-height: 50rem;
    }
  }

  &.full-width {
    max-width: 100%;
  }
}

.media-container {
  position: relative;
  display: inline-block;
}

.media-container:hover .controls,
.fullscreen-twin .controls {
  opacity: 1;
  transform: scale(1.3);
  
  .control {
    background-color: var(--color-gray-1);
    color: var(--color-gray-12);
  }
}

.media-element {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

figcaption {
  color: var(--color-gray-9);
  color: var(--color-gray-11);
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 10px 0;
  max-width: 550px;
}

figure {
  margin: 0;
}

figure:hover {
  figcaption {
    color: var(--color-gray-11)
  }
}

.controls {
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  gap: 0.25rem;
  transition: all 0.3s ease;
  transform-origin: top right;
  opacity: 0.65;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.control {
  all: unset;
  height: 24px;
  border-radius: 8px;
  background-color: var(--color-gray-12);
  color: black;
  min-width: 24px;
  font-size: 13px;
  color: var(--color-gray-8);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  position: absolute;

  &.speeds {
    transform: translateX(-30px);
    line-height: 1;
  }

  svg {
    margin: 0;
    padding: 0;
  }
}

.speeds span {
  position: absolute;
  transform: translateY(0.5px);
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

.fullscreen-twin {
  position: fixed;
  z-index: 9999;
  transition-property: all;
  transition-delay: 0;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition-duration: 0.5s;
}

.media-twin--initial {
  opacity: 0;
  transition: none;
}

.media-twin--fullscreen,
.media-twin--animating {
  opacity: 1;
  backdrop-filter: blur(3px);
  background-color: hsla(0, 0%, 0%, 0.85);
}

.media-twin--fullscreen.fullscreen-twin {
  
}

.twin-media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

</style>
