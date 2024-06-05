<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSelectedWordsStore } from '@/store/selectedWords';

const selectedWordsStore = useSelectedWordsStore();
const { selectedWord } = storeToRefs(selectedWordsStore)

const randomWords = selectedWordsStore.getRandomWords();
selectedWordsStore.selectWord(randomWords[0]);
</script>

<template>
  <div>
    Game -> {{ selectedWord }}
  </div>
</template>
