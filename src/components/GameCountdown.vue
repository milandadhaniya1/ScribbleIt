<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import clockCircleIcon from '@src/assets/clock-circle.svg';
const remainingTime = ref(90); // 60 seconds countdown

const updateRemainingTime = () => {
  remainingTime.value--;
  if (remainingTime.value <= 0) {
    clearInterval(interval);
    remainingTime.value = 0;
  }
};

let interval: number;

onMounted(() => {
  interval = setInterval(updateRemainingTime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

</script>
<template>
  <div class="flex flex-row text-center items-center p-2 bg-neutral rounded-box text-neutral-content w-20 content-start justify-center gap-2">
    <span>
      <img
        :src="clockCircleIcon"
        alt=""
        width="30"
        height="30"
      >
    </span>
    <span class="countdown font-mono text-xl flex items-center">
      <span
        :style="`--value:${remainingTime};`"
      />
    </span>
  </div>
</template>