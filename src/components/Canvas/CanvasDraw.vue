<script setup lang="ts">
interface Props {
  selectedColor?: string,
  backgroundColor: string,
  strokeSize: number,
  eraserMode: boolean,
  clearMode: boolean
}

const props = defineProps<Props>();

  import { ref, onMounted, watch } from 'vue';

  const container = ref<HTMLDivElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const isDrawing = ref(false);
  let context: CanvasRenderingContext2D | null = null;
  const eraserSize = 20;
  const path = ref<Path2D | null>(null);

  const startDrawing = (event: MouseEvent) => {
    if (!context) return;
    
    if (!path.value) path.value = new Path2D();
    isDrawing.value = true;
    const rect = canvas.value!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      path.value.moveTo(x, y);

    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
  };

  const draw = (event: MouseEvent) => {
    if (!isDrawing.value || !context ||!path.value) return;
    if(props.eraserMode) {
      const rect = canvas?.value.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    } else{
      const rect = canvas.value!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      path.value.lineTo(x, y);
      context.lineWidth = props.strokeSize || 8;
      context.strokeStyle = props.selectedColor || '#000000';
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (!context) return;
    isDrawing.value = false;
    context.closePath();
  };

  const resizeCanvas = () => {
    const containerElement = container.value;
    const canvasElement = canvas.value;

    if (!containerElement || !canvasElement) return;

    canvasElement.width = containerElement.clientWidth;
    canvasElement.height = containerElement.clientHeight;
  };

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d');
      resizeCanvas();
    }
  });

  watch(() => props.backgroundColor, (newColor) => {
      setCanvasBackground(newColor);
    });

    const setCanvasBackground = (color: string) => {
      if (context && canvas.value) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
        context.globalCompositeOperation = "destination-out";
        context.fill();
      }
    };

    watch(() => props.clearMode, (newVal) => {
      if(newVal === true && canvas.value) {
        context = canvas.value.getContext('2d');
        if(context) {
        context.clearRect(0, 0, canvas.value.width, canvas.value.height); 
        context.fillStyle = props.backgroundColor;
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
        }
      }
    });
    

</script>

<template>
  <div
    ref="container"
    class="canvas-container"
  >
    <canvas
      ref="canvas"
      class="border"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @click="fillArea"
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
