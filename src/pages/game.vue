<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@src/router';
import { useGameStore } from '@store/game';

import PlayersWrapper from '@src/components/PlayersWrapper.vue';
import GameWrapper from '@src/components/GameWrapper.vue';
import ChatWrapper from '@src/components/ChatWrapper.vue';
import GameCountdown from '@src/components/GameCountdown.vue';
import GameGuessWord from '@src/components/GameGuessWord.vue';

const gameStore = useGameStore();
const { isGameStarted } = storeToRefs(gameStore);
onMounted(() => {
  // Redirect to home if game is not started
  if (!isGameStarted.value) {
    router.push({ path: '/' });
  }
});
</script>

<template>
  <div class="container mx-auto  bg-[url('./src/assets/bg.jpg')]">
    <div class="flex flex-col h-screen gap-2 p-2">
      <div class="w-full text-center">
        <h1 class="animate-text border-white bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black mb-2">
          Scribbl It..
        </h1>
      </div>
      <div
        class="border-solid border border-slate-300 rounded-box bg-white p-2 flex flex-row"
      >
        <game-countdown />
        <div class="w-full h-full">
          <game-guess-word />
        </div>
      </div>
      <div class="flex flex-row h-screen gap-2">
        <div
          class="basis-1/4 h-full border-solid border border-slate-300 rounded-box bg-white p-2"
        >
          <players-wrapper />
        </div>
        <div
          class="basis-1/2 h-full border-solid border border-slate-300 rounded-box bg-white p-2"
        >
          <game-wrapper />
        </div>
        <div
          class="basis-1/4 h-full border-solid border border-slate-300 rounded-box bg-white p-2"
        >
          <chat-wrapper />
        </div>
      </div>
    </div>
  </div>
</template>
