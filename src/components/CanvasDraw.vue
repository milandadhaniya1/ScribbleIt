<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const container = ref<HTMLDivElement | null>(null)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const isDrawing = ref(false)
  let context: CanvasRenderingContext2D | null = null

  const startDrawing = (event: MouseEvent) => {
    if (!context) return
    isDrawing.value = true
    context.beginPath()
    context.moveTo(event.offsetX, event.offsetY)
  }

  const draw = (event: MouseEvent) => {
    if (!isDrawing.value || !context) return
    context.lineTo(event.offsetX, event.offsetY)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!context) return
    isDrawing.value = false
    context.closePath()
  }

  const resizeCanvas = () => {
    const containerElement = container.value
    const canvasElement = canvas.value

    if (!containerElement || !canvasElement) return

    canvasElement.width = containerElement.clientWidth
    canvasElement.height = containerElement.clientHeight
  }

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d')
      resizeCanvas()
    }
  })
</script>

<template>
  <div ref="container" class="canvas-container">
    <canvas
      ref="canvas"
      class="border"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    />
  </div>
</template>

<style scoped>
  .canvas-container {
    min-width: 100%;
    min-height: 100%;
    position: relative;
  }
  .border {
    border: 0;
    min-width: 100%;
    min-height: 100%;
  }
</style>
