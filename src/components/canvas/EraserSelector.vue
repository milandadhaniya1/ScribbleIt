<script setup lang="ts">
import { ref } from 'vue';

const eraserMode = ref(false);

const emit = defineEmits<{
  'eraser-mode': [value: boolean]
}>();

const changeToErase = () => {
  emit('eraser-mode', !eraserMode.value);
  eraserMode.value = !eraserMode.value;
};
</script>
<template>
  <div class="icon-square flex justify-center items-center bg-slate-200">
    <img
      class="eraser-icon cursor-pointer"
      src="/assets/eraser.png"
      @click="changeToErase()"
    > <!-- Pencil icon -->
  </div>
</template>
<style scoped>
.icon-square {
  width: 42px;
  /* Width of the square */
  height: 42px;
  /* Height of the square */
}

.eraser-icon {
  width: 24px;
  height: 24px;
}
</style>