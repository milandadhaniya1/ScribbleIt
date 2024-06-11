<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import CanvasDraw from '@/src/components/CanvasDraw.vue';
  import { useSelectedWordsStore } from '@/store/game';

  const selectedWordsStore = useSelectedWordsStore();
  const { selectedWord } = storeToRefs(selectedWordsStore);

  const randomWords = selectedWordsStore.getRandomWords();
  selectedWordsStore.selectWord(randomWords[0]);
</script>

<template>
  <div class="w-full h-full">
    <canvas-draw />
  </div>
</template>
