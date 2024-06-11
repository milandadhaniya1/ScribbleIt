<script setup lang="ts">
  import PlayersWrapper from '@/src/components/PlayersWrapper.vue';
  import GameWrapper from '@/src/components/GameWrapper.vue';
  import ChatWrapper from '@/src/components/ChatWrapper.vue';
</script>

<template>
  <div class="container mx-auto bg-slate-300">
    <div class="flex flex-col h-screen gap-2 p-2">
      <div
        class="h-10 border-solid border border-slate-300 rounded-box bg-white p-2"
      >
        Header
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
