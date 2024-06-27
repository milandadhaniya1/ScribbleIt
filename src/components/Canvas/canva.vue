<template>
  <div>
    <div>
      <button @click="tool = 'pencil'">Pencil</button>
      <button @click="tool = 'bucket'">Bucket</button>
      <button @click="tool = 'eraser'">Eraser</button>
      <input type="color" v-model="color" />
    </div>
    <canvas ref="canvas" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw" @click="fillArea" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Canvas',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const context = ref<CanvasRenderingContext2D | null>(null);
    const isDrawing = ref(false);
    const tool = ref<'pencil' | 'bucket' | 'eraser'>('pencil');
    const color = ref('#000000');

    onMounted(() => {
      if (canvas.value) {
        canvas.value.width = 800;
        canvas.value.height = 600;
        context.value = canvas.value.getContext('2d');
        if (context.value) {
          context.value.lineWidth = 2;
          context.value.lineCap = 'round';
        }
      }
    });

    const startDrawing = (event: MouseEvent) => {
      if (tool.value === 'pencil' || tool.value === 'eraser') {
        if (!context.value) return;
        isDrawing.value = true;
        context.value.beginPath();
        context.value.moveTo(event.offsetX, event.offsetY);
      }
    };

    const stopDrawing = () => {
      if (!context.value) return;
      isDrawing.value = false;
      context.value.closePath();
    };

    const draw = (event: MouseEvent) => {
      if (!context.value || !isDrawing.value || (tool.value !== 'pencil' && tool.value !== 'eraser')) return;
      context.value.strokeStyle = tool.value === 'eraser' ? '#FFFFFF' : color.value;
      context.value.lineTo(event.offsetX, event.offsetY);
      context.value.stroke();
    };

    const fillArea = (event: MouseEvent) => {
      if (tool.value === 'bucket' && canvas.value && context.value) {
        const x = event.offsetX;
        const y = event.offsetY;
        const imageData = context.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
        const targetColor = getColorAtPixel(imageData.data, x, y);
        const fillColor = hexToRgba(color.value);

        if (colorsMatch(targetColor, fillColor)) return;

        floodFill(canvas.value, x, y, targetColor, fillColor);
      }
    };

    const getColorAtPixel = (data: Uint8ClampedArray, x: number, y: number): [number, number, number, number] => {
      const index = (y * canvas.value!.width + x) * 4;
      return [data[index], data[index + 1], data[index + 2], data[index + 3]];
    };

    const hexToRgba = (hex: string): [number, number, number, number] => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b, 255];
    };

    const colorsMatch = (a: [number, number, number, number], b: [number, number, number, number]): boolean => {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    };

    const floodFill = (canvas: HTMLCanvasElement, x: number, y: number, targetColor: [number, number, number, number], fillColor: [number, number, number, number]) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const stack = [[x, y]];

      while (stack.length) {
        const [currentX, currentY] = stack.pop() as [number, number];
        let index = (currentY * canvas.width + currentX) * 4;

        while (currentY >= 0 && colorsMatch(getColorAtPixel(data, currentX, currentY), targetColor)) {
          currentY--;
          index -= canvas.width * 4;
        }

        index += canvas.width * 4;
        currentY++;

        let reachLeft = false;
        let reachRight = false;

        while (currentY < canvas.height && colorsMatch(getColorAtPixel(data, currentX, currentY), targetColor)) {
          setColorAtPixel(data, index, fillColor);

          if (currentX > 0) {
            if (colorsMatch(getColorAtPixel(data, currentX - 1, currentY), targetColor)) {
              if (!reachLeft) {
                stack.push([currentX - 1, currentY]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (currentX < canvas.width - 1) {
            if (colorsMatch(getColorAtPixel(data, currentX + 1, currentY), targetColor)) {
              if (!reachRight) {
                stack.push([currentX + 1, currentY]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }

          currentY++;
          index += canvas.width * 4;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const setColorAtPixel = (data: Uint8ClampedArray, index: number, fillColor: [number, number, number, number]) => {
      data[index] = fillColor[0];
      data[index + 1] = fillColor[1];
      data[index + 2] = fillColor[2];
      data[index + 3] = fillColor[3];
    };

    return {
      canvas,
      context,
      isDrawing,
      tool,
      color,
      startDrawing,
      stopDrawing,
      draw,
      fillArea,
    };
  },
});
</script>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>
