import { defineStore } from 'pinia';
import { ref } from 'vue';
import { socket } from "@src/socket";

interface Drawing {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const useDrawingStore = defineStore('drawingStore',() => {
  const drawings = ref<Drawing[]>([]);
  const addDrawing = (drawing: Drawing) => {
    if (drawing) {
      drawings.value.push(drawing);
      socket.emit("draw", drawing);
    }
  };

  const clearBoard = () => {
    socket.emit("clearBoard");
  };

  const bindEvents = (): void => {
    // update the store when an message was added
    socket.on("draw", (drawing: Drawing[]) => {
      drawings.value = drawing;
    });
  };

  return {
    drawings,
    addDrawing,
    clearBoard,
    bindEvents
  };
});
