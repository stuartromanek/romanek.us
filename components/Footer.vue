<template>
  <footer>
    <div class="container">
      <h4>Thank you.</h4>
    </div>
    <div class="info">
      <span>Stuart Romanek</span>
      <span>2026</span>
      <!--email_off--><a href="mailto:sdr@romanek.us">Email</a><!--email_on-->
      <a target="_blank" href="https://github.com/stuartromanek">GitHub</a>
      <a target="_blank" href="https://www.linkedin.com/in/stuart-romanek-796269191">LinkedIn</a>
      <a target="_blank" href="https://www.are.na/stuart-romanek">Are.na</a>
      <a target="_blank" href="https://literal.club/stu">Reading</a>
      <a target="_blank" href="https://record.club/stu">Listening</a>
      <!-- <a target="_blank" href="https://record.club/stu">Colophon</a> -->
      <span class="net-container" @mouseover="show" @mouseout="showNet = false">
        <div v-show="showNet" ref="video" class="net">
          <video src="/video/net.mp4" autoplay muted loop playsinline />
        </div>
        <Otto />
      </span>
    </div>
    <Trail />
  </footer>
</template>

<script setup>
import { computed, onMounted, useTemplateRef, ref } from 'vue'

const showNet = ref(false);
const video = useTemplateRef('video');

function show(event) {
  showNet.value = true;
  video.value.style.transform = getDancingTransformFromEvent(event);
}

function getDancingTransformFromEvent(e, intensity = 0.15) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const deltaX = (e.clientX - centerX) / centerX;
  const deltaY = (e.clientY - centerY) / centerY;

  const moveX = -deltaX * window.innerWidth * intensity;
  const moveY = -deltaY * window.innerHeight * intensity;

  return `translate(${moveX}px, ${moveY}px)`;
}


onMounted(() => {
})

const props = defineProps({
  size: {
    type: Number,
    default: 1
  }
})

// export {
//   data() {
//     return { backgroundImagePath }
//   }
// }

</script>

<style lang="scss" scoped>

  footer {
    position: relative;
  }

  .net-container {
    padding: relative;  
    cursor: url('/pi.cur'), pointer;
    padding: 5px;
  }

  .net {
    z-index: 2;
    position: absolute;
    transform: translate(-100%, -100%);
    padding: 3px;
    border-radius: 5px;
    background-color: var(--color-gray-1);
    border: 1px solid var(--color-gray-4);
    display: flex;
    transition: all 0.2s ease;

    video {
      width: 150px;
      border-radius: 3px;
      margin: 0;
      padding: 0;
    }
  }

  .info {
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.7rem;

    @media (max-width: vars.$mobile-breakpoint) {
      flex-direction: column;
      margin-bottom: 5rem;
    }
    
    a {
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }

  footer {
    padding: 2.5rem;
  }

  .container {
    position: relative;
    border-top: 1px solid var(--color-gray-1);
    border-bottom: 1px solid var(--color-gray-1);
    padding: 8rem 0;
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 13px;
    justify-content: center;
  }

  h4 {
    font-size: 2rem;
    font-weight: 200;
  }
</style>