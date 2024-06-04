<script setup lang="ts">
import { useSelectedWordsStore } from '@/store/selectedWords';
// const a = useSelectedWordsStore().getRandomWords();
// useSelectedWordsStore().selectWord(a[0]);
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <router-link to="/">
      Go to Index
    </router-link>
  </div>
</template>
