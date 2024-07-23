<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CanvasDraw from '@src/components/Canvas/CanvasDraw.vue';
import ColorPalette from '@src/components/Canvas/ColorPalette.vue';
import SelectedColors from '@src/components/Canvas/SelectedColors.vue';
import PencilSelector from '@src/components/Canvas/PencilSelector.vue';
import EraserSelector from '@src/components/Canvas/EraserSelector.vue';
import PencilStrokeSizeSelector from '@src/components/Canvas/PencilStrokeSizeSelector.vue';
import FillColor from '@src/components/Canvas/FillColor.vue';
import ClearCanva from '@src/components/Canvas/ClearCanvas.vue';
import { useGameStore } from '@store/game';

const gameStore = useGameStore();
const { selectedColor, avaiableColors, backgroundColor, selectedTool, strokeSize, clearCanvas } = storeToRefs(gameStore);


// const { selectedWord } = storeToRefs(gameStore);

const randomWords = gameStore.getRandomWords();
gameStore.selectWord(randomWords[0]);

const updateSelectedColor = (color: string) => {
 gameStore.updateSelectedColor(color);  
};

const reverseColor = () => {
gameStore.reverseSelectedColor();
};

const changeStrokeSize = (size: number) => {
  gameStore.setStrokeSize(size);
};
const clearAll = (flag:boolean) => {
  gameStore.clearAll(flag);
};

const selectTools = (value:string) => {
  gameStore.setSelectedTool(value);
};
</script>

<template>
  <div class="w-full h-full">
    <canvas-draw />
  </div>
  <div class="flex gap-2 align-items-center mt-4 mb-1">
    <selected-colors
      :background-color="backgroundColor"
      :selected-color="selectedColor"
      @reverse-color="reverseColor"
    />
    <color-palette
      :colors="avaiableColors"
      class="w-2/4"
      @color-selected="updateSelectedColor"
    />
    <pencil-selector
      class="cursor-pointer"
      :class="{'active' : selectedTool === 'pencil'}"
      @click="selectTools('pencil')"
    />
    <fill-color
      class="cursor-pointer"
      :class="{'active' : selectedTool === 'bucket'}"
      @click="selectTools('bucket')"
    />
    <eraser-selector
      :class="{'active' : selectedTool === 'eraser'}"
      @click="selectTools('eraser')"
    />
    <pencil-stroke-size-selector
      class="cursor-pointer"
      :class="{'active' : strokeSize === 2}"
      size="2"
      @click="changeStrokeSize(2)"
    />
    <pencil-stroke-size-selector
      class="cursor-pointer"
      :class="{'active' : strokeSize === 8}"
      size="8"
      @click="changeStrokeSize(8)"
    />
    <pencil-stroke-size-selector    
      class="cursor-pointer"
      :class="{'active' : strokeSize === 12}"
      size="12"
      @click="changeStrokeSize(12)"
    />
    <pencil-stroke-size-selector    
      class="cursor-pointer"
      :class="{'active' : strokeSize === 20}"
      size="20"
      @click="changeStrokeSize(20)"
    />
    <pencil-stroke-size-selector    
      class="cursor-pointer"
      :class="{'active' : strokeSize === 28}"
      size="28"
      @click="changeStrokeSize(28)"
    />
    <clear-canva
      :class="{'active' : clearCanvas === true}"
      @clear="clearAll"
    />
  </div>
</template>
<style scoped>
.active {
  background-color: #6c6cc8; 
}
</style>
