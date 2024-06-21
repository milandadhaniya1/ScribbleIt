<script setup lang="ts">
import { onMounted } from 'vue';
import UserLogin from '@src/components/UserLogin.vue';
import { useConnectionStore } from "@store/connection";
import { useGameStore } from "@store/game";

const connectionStore = useConnectionStore();
const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.isGameStarted) {
    connectionStore.connect();
  }
});
</script>

<template>
  <div
    class="container mx-auto"
    style="background-image: url('/assets/bg.jpg')"
  >
    <UserLogin />
  </div>
</template>
