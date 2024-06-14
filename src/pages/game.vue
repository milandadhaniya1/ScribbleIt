<script setup lang="ts">
import PlayersWrapper from '@src/components/PlayersWrapper.vue';
import GameWrapper from '@src/components/GameWrapper.vue';
import ChatWrapper from '@src/components/ChatWrapper.vue';
import GameCountdown from '@src/components/GameCountdown.vue';
import GameGuessWord from '@src/components/GameGuessWord.vue';
</script>

<template>
  <div class="container mx-auto bg-gray-700">
    <div class="flex flex-col h-screen gap-2 p-2">
      <div class="w-full text-center">
        <h1 class="text-3xl font-black">
          <span class="text-white">S</span>
          <span class="text-red-100">c</span>
          <span class="text-red-200">r</span>
          <span class="text-red-300">i</span>
          <span class="text-red-400">b</span>
          <span class="text-red-500">b</span>
          <span class="text-red-600">l</span>
          <span class="text-red-700">e </span>
          <span class="text-red-100">I</span>
          <span class="text-red-200">t</span>
          <span class="text-red-300 animate-pulse">.</span>
          <span class="text-red-400 animate-pulse">.</span>
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
