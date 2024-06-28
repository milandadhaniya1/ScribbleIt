<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useDrawingStore } from '@store/drawing';
  import { useUsersStore } from '@store/user';
  import { socket } from "@src/socket";

  const drawingStore = useDrawingStore();
  const usersStore = useUsersStore();

  const container = ref<HTMLDivElement | null>(null);
  const canvas = ref<HTMLCanvasElement>();
  const isDrawing = ref(false);
  let context: CanvasRenderingContext2D | null = null;
  const lastPos = ref({ x: 0, y:0 });
  const canvasHeight = ref();
  const canvasWidth = ref();

  const startDrawing = (event: MouseEvent) => {
    if (!context) return;
    isDrawing.value = true;
    lastPos.value.x = event.offsetX;
    lastPos.value.y = event.offsetY;
  };

  const draw = (event: MouseEvent) => {
    if (!isDrawing.value || !context) return;
    context.lineTo(event.offsetX, event.offsetY);

    const currentPos = { x: event.offsetX, y: event.offsetY };
    context.beginPath();
    context.moveTo(lastPos.value.x, lastPos.value.y);
    context.lineTo(currentPos.x, currentPos.y);
    context.stroke();

    const drawingData = { startX: lastPos.value.x, startY: lastPos.value.y, endX: currentPos.x, endY: currentPos.y };
    
    drawingStore.addDrawing(drawingData);
    lastPos.value = currentPos;
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
    canvasWidth.value = containerElement.clientWidth;
    canvasElement.height = containerElement.clientHeight;
    canvasHeight.value = containerElement.clientHeight;
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
  };

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d');
      resizeCanvas();
    }

    // Clear board
    socket.on("clearBoard", () => {
      if (context) {
        context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
      }
    });

    // Show cursors on move cursor
    socket.on('cursorUpdate', (cursors) => {
      if (context && canvas.value) {
        context.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear the canvas

        // Draw all cursors and usernames
        cursors.forEach((cursor: { x: number; y: number; userId: string; userName: string; }) => {
          if (context) {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(cursor.x, cursor.y, 5, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = 'black';
            context.fillText(cursor.userName, cursor.x + 5, cursor.y - 5);
          }
        });
        drawSharedDrawing();
      }
    });

    // Track the cursor position
    const userId = usersStore.currentUser?.id;
    const userName = usersStore.currentUser?.name;
    canvas.value.addEventListener('mousemove', (event) => {
      const rect = canvas.value.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Send cursor position to the server
      socket.emit('cursorMove', { x, y, userId, userName });
    });
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
</style>
