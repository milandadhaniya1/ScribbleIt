<script setup lang="ts">
interface Props {
  selectedColor?: string,
  backgroundColor: string,
  strokeSize: number,
  eraserMode: boolean,
  clearMode: boolean
}

const props = defineProps<Props>();
  import { ref, onMounted, computed, watch } from 'vue';
  import { useDrawingStore } from '@store/drawing';

  const container = ref<HTMLDivElement | null>(null);
  const canvas = ref<HTMLCanvasElement>();
  const isDrawing = ref(false);
  let context: CanvasRenderingContext2D | null = null;
  const eraserSize = 20;
  const lastPos = ref({ x: 0, y:0 });
  const drawingStore = useDrawingStore();

  const startDrawing = (event: MouseEvent) => {
    if (!context) return;
    isDrawing.value = true;
    lastPos.value.x = event.offsetX;
    lastPos.value.y = event.offsetY;
  };

  const draw = (event: MouseEvent) => {
    if (!isDrawing.value || !context) return;
    if(props.eraserMode) {
      const rect = canvas?.value.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    } else{
    context.lineTo(event.offsetX, event.offsetY);

    const currentPos = { x: event.offsetX, y: event.offsetY };
    context.beginPath();
    context.moveTo(lastPos.value.x, lastPos.value.y);
    context.lineTo(currentPos.x, currentPos.y);
    context.stroke();

    const drawingData = { startX: lastPos.value.x, startY: lastPos.value.y, endX: currentPos.x, endY: currentPos.y };
    
    drawingStore.addDrawing(drawingData);
    lastPos.value = currentPos;
    }
  };

  const stopDrawing = () => {
    if (!context) return;
    if (isDrawing.value) {
      isDrawing.value = false;
    }
    context.closePath();
  };

  const resizeCanvas = () => {
    const containerElement = container.value;
    const canvasElement = canvas.value;

    if (!containerElement || !canvasElement) return;

    canvasElement.width = containerElement.clientWidth;
    canvasElement.height = containerElement.clientHeight;
  };

  const drawings = computed(() => drawingStore.drawings);

  const drawSharedDrawing = () => {
    drawings.value.forEach(drawing => {
      if (context) {
        context.beginPath();
        context.moveTo(drawing.startX, drawing.startY);
        context.lineTo(drawing.endX, drawing.endY);
        context.stroke();
      }
    });
  };

  const clearBoard = () => {
    drawingStore.clearBoard();
    drawSharedDrawing();
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
    

  watch(
    () => drawings.value,
    () => drawSharedDrawing(),
    { immediate: true }
  );
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
    <div class="canvas-controls absolute bottom-0">
      <button
        class="btn btn-outline btn-error"
        @click="clearBoard"
      >
        Clear
      </button>
    </div>
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
  .canvas-controls {
    
  }
</style>
