<script setup lang="ts">
// import { storeToRefs } from 'pinia';
import CanvasDraw from '@src/components/Canvas/CanvasDraw.vue';
import ColorPalette from '@src/components/Canvas/ColorPalette.vue';
import SelectedColors from '@src/components/Canvas/SelectedColors.vue';
import PencilSelector from '@src/components/Canvas/PencilSelector.vue';
import EraserSelector from '@src/components/Canvas/EraserSelector.vue';
import PencilStrokeSizeSelector from '@src/components/Canvas/PencilStrokeSizeSelector.vue';
import ClearCanva from '@src/components/Canvas/ClearCanva.vue';
import { useGameStore } from '@store/game';
import { ref } from 'vue';

const gameStore = useGameStore();

const colors = ref<string[]>([
      '#FF0000', '#FF6666', '#FF9999', '#FFCCCC',
      '#00FF00', '#66FF66', '#99FF99', '#CCFFCC',
      '#0000FF', '#6666FF', '#9999FF', '#CCCCFF',
      '#FFFF00', '#FFFF66', '#FFFF99', '#FFFFCC',
      '#FF00FF', '#FF66FF', '#FF99FF', '#FFCCFF',
      '#00FFFF', '#66FFFF', '#99FFFF', '#CCFFFF',
      '#000000', '#333333', '#666666', '#999999',
      '#CCCCCC', '#FFFFFF'
    ]);
const selectedColor = ref<string>('#000000');
const backgroundColor = ref('#FFFFFF');
const strokeSize = ref(8);
const eraser = ref(false);
const clearCanvas = ref(false);
const isPencil = ref(true);
// const { selectedWord } = storeToRefs(gameStore);

const randomWords = gameStore.getRandomWords();
gameStore.selectWord(randomWords[0]);

const updateSelectedColor = (color: string) => {
  selectedColor.value = color;
  // if(isPencil.value) {
  //   selectedColor.value = color;
  // } else {
  //   backgroundColor.value = color;
  // }
      
};

const reverseColor = () => {
  const temp = backgroundColor.value;
  backgroundColor.value = selectedColor.value;
  selectedColor.value = temp;
};

const changeStrokeSize = (size: number) => {
  strokeSize.value = size;
};

const changeToeraseMode = (flag:boolean) =>{
  eraser.value = flag;
};

const clearAll = (flag:boolean) => {
  clearCanvas.value = flag;
};

const selectPencil = (value:boolean) => {
  isPencil.value = value;
};
</script>

<template>
  <div class="w-full h-full">
    <canvas-draw
      :selected-color="selectedColor"
      :background-color="backgroundColor"
      :stroke-size="strokeSize"
      :eraser-mode="eraser"
      :clear-mode="clearCanvas"
    />
  </div>
  <div class="flex gap-2 align-items-center mt-4 mb-1">
    <SelectedColors
      :background-color="backgroundColor"
      :selected-color="selectedColor"
      @reverse-color="reverseColor"
    />
    <ColorPalette
      :colors="colors"
      class="w-2/4"
      @color-selected="updateSelectedColor"
    />
    <PencilSelector @click="selectPencil(true)" />
    <!-- <FillColor @click="selectPencil(false)" /> -->
    <EraserSelector @eraser-mode="changeToeraseMode" />
    <PencilStrokeSizeSelector
      class="cursor-pointer"
      size="8"
      @click="changeStrokeSize(8)"
    />
    <PencilStrokeSizeSelector    
      class="cursor-pointer"
      size="12"
      @click="changeStrokeSize(12)"
    />
    <PencilStrokeSizeSelector    
      class="cursor-pointer"
      size="20"
      @click="changeStrokeSize(20)"
    />
    <PencilStrokeSizeSelector    
      class="cursor-pointer"
      size="36"
      @click="changeStrokeSize(36)"
    />
    <ClearCanva @clear="clearAll" />
  </div>
</template>
