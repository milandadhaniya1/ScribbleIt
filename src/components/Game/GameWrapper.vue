<script setup lang="ts">
// import { storeToRefs } from 'pinia';
import CanvasDraw from '@src/components/CanvasDraw.vue';
import { useGameStore } from '@store/game';

const gameStore = useGameStore();
// const { selectedWord } = storeToRefs(gameStore);

const randomWords = gameStore.getRandomWords();
gameStore.selectWord(randomWords[0]);
</script>

<template>
  <div class="w-full h-full">
    <canvas-draw />
  </div>
</template>
