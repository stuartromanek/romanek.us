<template>
  <div ref="containerRef" class="pixeltrail-container">
    <canvas ref="canvasRef" class="pixeltrail-canvas" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'

// Top-level config: enable or disable simulated trails
const enableSimulatedTrails = ref(false) // Default to false

// Configuration values defined directly in the component
const pixelSize = 8
const fadeDuration = 300
const delay = 0
// const pixelColors = ['#0C50FF', '#FF0080', '#00FFD0', '#FFD600', '#FF4B00']
const pixelColors = ["#007f5f","#2b9348","#55a630","#80b918","#aacc00","#bfd200","#d4d700","#dddf00","#eeef20","#ffff3f"]
// const pixelColors = ["#d9ed92","#b5e48c","#99d98c","#76c893","#52b69a","#34a0a4","#168aad","#1a759f","#1e6091","#184e77"]
const simulatedCursorTrailLength = 35
const simulatedCursorTrailInterval = 1500
const simulatedCursorTrailSpeed = 175
const maxConcurrentSimulatedCursorTrails = 8

// Noise configuration
const enableNoise = true // Toggle noise effect
const noiseMinCount = 1  // Minimum noise pixels per trail step
const noiseMaxCount = 2  // Maximum noise pixels per trail step
const noiseMinDistance = 1 // Minimum distance (in pixels) from trail
const noiseMaxDistance = 2 // Maximum distance (in pixels) from trail

// New: Only add noise every Nth mouse event
const noiseEventInterval = 1 // Noise is added every 4th mouse event

// Refs
const containerRef = ref(null)
const canvasRef = ref(null)

// Stubs for custom hooks (to be implemented)
const hasIntroFinishedAnimating = true // TODO: Replace with actual store/composable
const isMobileMenuOpen = false // TODO: Replace with actual store/composable
const showCursors = true // TODO: Replace with actual store/composable
const userCount = 1 // TODO: Replace with actual composable

// Data structures
const pixels = reactive(new Map()) // Map<string, Pixel>
const simulatedCursorTrails = ref([]) // Array of simulated cursor trails
let animationFrameId = null
let simulatedCursorTrailIntervalId = null
let simulatedCursorTrailUpdateId = null

// Utility to get container dimensions
function getDimensions() {
  const el = containerRef.value
  if (!el) return { width: 0, height: 0 }
  const rect = el.getBoundingClientRect()
  return { width: rect.width, height: rect.height }
}

// Resize canvas to match container
function resizeCanvas() {
  const canvas = canvasRef.value
  const { width, height } = getDimensions()
  if (canvas) {
    canvas.width = width
    canvas.height = height
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  }
}

// Simulated cursor trail helpers
function generateRandomPath(startX, startY, occupiedHeads = new Set()) {
  const { width, height } = getDimensions()
  const maxX = Math.ceil(width / pixelSize)
  const maxY = Math.ceil(height / pixelSize)
  if (maxX <= 0 || maxY <= 0) return []
  const path = []
  let currentX = startX !== undefined ? startX : Math.floor(Math.random() * maxX)
  let currentY = startY !== undefined ? startY : Math.floor(Math.random() * maxY)
  path.push({ x: currentX, y: currentY })
  const directions = [
    { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 },
    { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
  ]
  let dirIndex = Math.floor(Math.random() * directions.length)
  for (let i = 1; i < simulatedCursorTrailLength; i++) {
    if (Math.random() < 0.3) {
      const turn = Math.floor(Math.random() * 3) - 1
      dirIndex = (dirIndex + turn + directions.length) % directions.length
    }
    let direction = directions[dirIndex]
    let nextX = currentX + direction.x
    let nextY = currentY + direction.y
    let reflectedX = false
    let reflectedY = false
    if (nextX < 0 || nextX >= maxX) {
      direction = { ...direction, x: -direction.x }
      nextX = currentX + direction.x
      reflectedX = true
    }
    if (nextY < 0 || nextY >= maxY) {
      direction = { ...direction, y: -direction.y }
      nextY = currentY + direction.y
      reflectedY = true
    }
    if (reflectedX || reflectedY) {
      dirIndex = directions.findIndex(dir => dir.x === direction.x && dir.y === direction.y)
      if (dirIndex === -1) {
        dirIndex = directions.findIndex(dir => Math.sign(dir.x) === Math.sign(direction.x) && Math.sign(dir.y) === Math.sign(direction.y))
      }
      if (dirIndex === -1) {
        dirIndex = Math.floor(Math.random() * directions.length)
      }
    }
    let candidateX = Math.max(0, Math.min(maxX - 1, nextX))
    let candidateY = Math.max(0, Math.min(maxY - 1, nextY))
    let candidateKey = `${candidateX}-${candidateY}`
    if (occupiedHeads.has(candidateKey)) {
      let found = false
      for (let tryDir = 0; tryDir < directions.length; tryDir++) {
        const altDir = directions[tryDir]
        const altX = Math.max(0, Math.min(maxX - 1, currentX + altDir.x))
        const altY = Math.max(0, Math.min(maxY - 1, currentY + altDir.y))
        const altKey = `${altX}-${altY}`
        if (!occupiedHeads.has(altKey)) {
          candidateX = altX
          candidateY = altY
          dirIndex = tryDir
          found = true
          break
        }
      }
    }
    currentX = candidateX
    currentY = candidateY
    path.push({ x: currentX, y: currentY })
  }
  return path
}

function getOccupiedHeads(trails) {
  const set = new Set()
  for (const trail of trails) {
    if (trail.path.length > 0 && !trail.isComplete) {
      const head = trail.path[Math.min(trail.currentIndex, trail.path.length - 1)]
      set.add(`${head.x}-${head.y}`)
    }
  }
  return set
}

function createSimulatedCursorTrail(startOffset = 0, occupiedHeads = new Set()) {
  const path = generateRandomPath(undefined, undefined, occupiedHeads)
  return {
    id: Math.random().toString(36).substr(2, 9),
    path,
    currentIndex: 0,
    startTime: Date.now() + startOffset,
    isComplete: false,
  }
}

function updateSimulatedCursorTrails() {
  const now = Date.now()
  simulatedCursorTrails.value = simulatedCursorTrails.value.map(trail => {
    if (trail.isComplete) return trail
    const elapsed = now - trail.startTime
    const expectedIndex = Math.floor(elapsed / simulatedCursorTrailSpeed)
    if (expectedIndex > trail.currentIndex && expectedIndex < trail.path.length) {
      for (let i = trail.currentIndex + 1; i <= expectedIndex; i++) {
        const point = trail.path[i]
        if (point) {
          const key = `simulated-${trail.id}-${point.x}-${point.y}`
          pixels.set(key, {
            x: point.x,
            y: point.y,
            opacity: 1,
            fadeStart: now,
          })
        }
      }
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate)
      }
      return {
        ...trail,
        currentIndex: expectedIndex,
        isComplete: expectedIndex >= trail.path.length - 1,
      }
    }
    return trail
  }).filter(trail => {
    if (trail.isComplete) {
      const timeSinceComplete = now - (trail.startTime + trail.path.length * 50)
      return timeSinceComplete < 2000
    }
    return true
  })
}

function spawnSimulatedCursorTrail() {
  const occupiedHeads = getOccupiedHeads(simulatedCursorTrails.value)
  const newTrail = createSimulatedCursorTrail(Math.random() * 400, occupiedHeads)
  simulatedCursorTrails.value.push(newTrail)
}

// Animation loop and pixel drawing
function animate() {
  const canvas = canvasRef.value
  if (!canvas) {
    animationFrameId = null
    return
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    animationFrameId = null
    return
  }
  const now = Date.now()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Draw and update all pixels
  pixels.forEach((pixel, key) => {
    const elapsed = now - pixel.fadeStart - delay
    if (elapsed < 0) return
    if (elapsed >= fadeDuration) {
      pixels.delete(key)
      return
    }
    const fadeProgress = elapsed / fadeDuration
    pixel.opacity = 1 - fadeProgress
    // Pick a random color for each pixel
    const colorArray = Array.isArray(pixelColors) ? pixelColors : [pixelColors]
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)]
    ctx.globalAlpha = pixel.opacity
    ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize)
  })
  ctx.globalAlpha = 1
  if (pixels.size > 0) {
    animationFrameId = requestAnimationFrame(animate)
  } else {
    animationFrameId = null
  }
}

// Mouse move handler
function handleMouseMove(e) {
  if (!containerRef.value || !hasIntroFinishedAnimating) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = Math.floor((e.clientX - rect.left) / pixelSize)
  const y = Math.floor((e.clientY - rect.top) / pixelSize)
  if (x < 0 || y < 0) return
  const { width, height } = getDimensions()
  if (x >= Math.ceil(width / pixelSize) || y >= Math.ceil(height / pixelSize)) return
  const key = `${x}-${y}`
  pixels.set(key, {
    x,
    y,
    opacity: 1,
    fadeStart: Date.now(),
  })

  // --- Noise logic start ---
  // Track a short tail of recent mouse positions
  if (!handleMouseMove.tail) handleMouseMove.tail = []
  const tail = handleMouseMove.tail
  const tailLength = 6 // How many previous positions to keep
  tail.push({ x, y })
  if (tail.length > tailLength) tail.shift()

  if (enableNoise) {
    // Only add noise every Nth mouse event
    if (!handleMouseMove.noiseEventCounter) handleMouseMove.noiseEventCounter = 0
    handleMouseMove.noiseEventCounter++
    if (handleMouseMove.noiseEventCounter % noiseEventInterval === 0) {
      // For each of the last N positions (except the most recent)
      for (let i = 0; i < tail.length - 1; i++) {
        const base = tail[i]
        // Random number of noise pixels for this tail point
        const noiseCount = Math.floor(Math.random() * (noiseMaxCount - noiseMinCount + 1)) + noiseMinCount
        for (let n = 0; n < noiseCount; n++) {
          // Random angle and distance
          const angle = Math.random() * 2 * Math.PI
          const dist = Math.random() * (noiseMaxDistance - noiseMinDistance) + noiseMinDistance
          // Offset in grid units
          const dx = Math.round(Math.cos(angle) * dist)
          const dy = Math.round(Math.sin(angle) * dist)
          const nx = base.x + dx
          const ny = base.y + dy
          // Bounds check
          if (nx < 0 || ny < 0 || nx >= Math.ceil(width / pixelSize) || ny >= Math.ceil(height / pixelSize)) continue
          const noiseKey = `noise-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
          pixels.set(noiseKey, {
            x: nx,
            y: ny,
            opacity: 1,
            fadeStart: Date.now(),
          })
        }
      }
    }
  }
  // --- Noise logic end ---

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', handleMouseMove)
  }
  // Simulated cursor trail intervals (only if enabled)
  if (enableSimulatedTrails.value) {
    simulatedCursorTrailUpdateId = setInterval(updateSimulatedCursorTrails, 60)
    simulatedCursorTrailIntervalId = setInterval(() => {
      // Limit number of concurrent simulated trails
      const activeCount = simulatedCursorTrails.value.filter(trail => !trail.isComplete).length
      if (activeCount < maxConcurrentSimulatedCursorTrails) {
        spawnSimulatedCursorTrail()
      }
      // Cap total trails
      const maxTotalTrails = maxConcurrentSimulatedCursorTrails * 2
      if (simulatedCursorTrails.value.length > maxTotalTrails) {
        simulatedCursorTrails.value = simulatedCursorTrails.value.slice(-maxTotalTrails)
      }
    }, simulatedCursorTrailInterval / 3)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (simulatedCursorTrailIntervalId) clearInterval(simulatedCursorTrailIntervalId)
  if (simulatedCursorTrailUpdateId) clearInterval(simulatedCursorTrailUpdateId)
})
</script>

<style scoped>
.pixeltrail-container {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}
.pixeltrail-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  image-rendering: pixelated;
}
</style>
