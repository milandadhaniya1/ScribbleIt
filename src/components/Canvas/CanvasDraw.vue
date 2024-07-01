<script setup lang="ts">
interface Props {
  selectedColor?: string,
  backgroundColor: string,
  strokeSize: number,
  eraserMode: boolean,
  clearMode: boolean,
  selectedTool: string
}

const props = defineProps<Props>();
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
  const eraserSize = 20;
  const lastPos = ref({ x: 0, y:0 });
  const canvasHeight = ref();
  const canvasWidth = ref();

  const startDrawing = (event: MouseEvent) => {
    if (!context) return;
    isDrawing.value = true;
    if (context && props.selectedTool === 'pencil') {
      lastPos.value.x = event.offsetX;
      lastPos.value.y = event.offsetY;
        context.beginPath();
        context.moveTo(event.clientX, event.clientY);
    }
  
  };

  const draw = (event: MouseEvent) => {
    if (!isDrawing.value || !context) return; 
    const currentPos = { x: event.offsetX, y: event.offsetY };
    if (props.selectedTool === 'bucket') {
        fillArea(event.offsetX, event.offsetY, props.backgroundColor);
    } else {    
      context.lineWidth = props.selectedTool === 'eraser' ? eraserSize :  props.strokeSize;
      context.strokeStyle = props.selectedTool === 'eraser' ? 'white' : props.selectedColor;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(lastPos.value.x, lastPos.value.y);
      context.lineTo(currentPos.x, currentPos.y);
      context.stroke();
    }    
    const color = (props.selectedTool === 'bucket' ? props.backgroundColor : props.selectedColor) || '#000000';
    const size = props.selectedTool === 'eraser' ? eraserSize : props.strokeSize;
    const drawingData = { 
      startX: lastPos.value.x, 
      startY: lastPos.value.y, 
      endX: currentPos.x, 
      endY: currentPos.y, 
      type: props.selectedTool, 
      color,
      size
    };
      
    drawingStore.addDrawing(drawingData);
    lastPos.value = currentPos;
  };

  const stopDrawing = () => {
    if (!context) return;
    if (isDrawing.value) {
      isDrawing.value = false;
    }
    context.beginPath();
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
        if(drawing.type === 'bucket') {
          fillArea(drawing.endX, drawing.endY, drawing.color);
        } else{
          context.beginPath();        
          context.strokeStyle = drawing.type === 'eraser' ? 'white' : drawing.color;
          context.lineWidth = drawing.size;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.moveTo(drawing.startX, drawing.startY);
          context.lineTo(drawing.endX, drawing.endY);
          context.stroke();
        }   
         
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


  watch(() => props.clearMode, (newVal) => {
      if(newVal === true && canvas.value) {
        context = canvas.value.getContext('2d');
        if(context) {
          clearBoard();
        context.clearRect(0, 0, canvas.value.width, canvas.value.height); 
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
        }
      }
    });
    watch(
    () => drawings.value,
    () => drawSharedDrawing(),
    { immediate: true }
  );
const fillArea = (x: number,y: number, color:string) => {
  if (canvas.value && context) {
    const imageData = context.getImageData(0, 0, canvas.value.width, canvas.value.height);
    const targetColor = getColorAtPixel(imageData.data, x, y);
    const fillColor = hexToRgba(color);
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
        let [currentX, currentY] = stack.pop() as [number, number];
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

</script>

<template>
  <div
    ref="container"
    class="canvas-container"
  >
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mouseup="stopDrawing"
      @mousemove="draw"
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
