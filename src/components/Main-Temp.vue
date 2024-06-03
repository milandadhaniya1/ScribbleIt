<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-4xl font-bold mb-4">Skribbl Clone</h1>
    <canvas ref="canvas" class="border border-black"></canvas>
    <input
      v-model="guess"
      @keyup.enter="sendGuess"
      placeholder="Type your guess here"
      class="mt-4 p-2 border border-gray-300 rounded"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import io from 'socket.io'

export default {
  setup() {
    const canvas = ref(null)
    const guess = ref('')
    const socket = io()

    let ctx
    let drawing = false

    onMounted(() => {
      const canvasEl = canvas.value
      ctx = canvasEl.getContext('2d')
      canvasEl.width = 800
      canvasEl.height = 600

      canvasEl.addEventListener('mousedown', startDrawing)
      canvasEl.addEventListener('mouseup', stopDrawing)
      canvasEl.addEventListener('mousemove', draw)

      socket.on('draw', ({ x, y }) => {
        ctx.lineTo(x, y)
        ctx.stroke()
      })

      socket.on('guess', data => {
        console.log('Guess received:', data)
      })
    })

    const startDrawing = e => {
      drawing = true
      ctx.beginPath()
      ctx.moveTo(
        e.clientX - canvas.value.offsetLeft,
        e.clientY - canvas.value.offsetTop
      )
    }

    const stopDrawing = () => {
      drawing = false
      ctx.closePath()
    }

    const draw = e => {
      if (!drawing) return
      const x = e.clientX - canvas.value.offsetLeft
      const y = e.clientY - canvas.value.offsetTop
      ctx.lineTo(x, y)
      ctx.stroke()
      socket.emit('draw', { x, y })
    }

    const sendGuess = () => {
      socket.emit('guess', guess.value)
      guess.value = ''
    }

    return {
      canvas,
      guess,
      sendGuess,
    }
  },
}
</script>

<style scoped>
canvas {
  cursor: crosshair;
}
</style>
