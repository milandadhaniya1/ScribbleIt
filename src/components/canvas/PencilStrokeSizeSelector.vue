<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size: number
  }

const props = defineProps<Props>(); 

const dotStyle = computed(() => {
  let dotSize:any = {};
  dotSize.width = `${props.size}px`;
    dotSize.height = `${props.size}px`;
  return dotSize;
});


</script>

<template>
  <div class="square flex items-center justify-center">
    <div
      class="dot bg-black"
      :style="dotStyle"
    />
  </div>
</template>
<style scoped>
.square {
    width: 42px; /* Width of the square */
    height: 42px; /* Height of the square */
    background-color: #e6e6fa; /* Light purple background color */
}

.dot {
    border-radius: 50%;
}
</style>