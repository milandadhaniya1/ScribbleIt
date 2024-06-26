<script setup lang="ts">
import { ref } from 'vue';

const clearMode = ref(false);

const emit = defineEmits<{
  'clear': [value: boolean]
}>();

const clearCanva = () => {
  emit('clear', !clearMode.value);
  clearMode.value = !clearMode.value;
};
</script>
<template>
  <div
    class="icon-square flex justify-center items-center bg-slate-200"
  >
    <img
      class="trash-icon cursor-pointer"
      src="/assets/trash.jpg"      
      @click="clearCanva()"
    > <!-- Pencil icon -->
  </div>
</template>
<style scoped>
.icon-square {
    width: 42px; /* Width of the square */
    height: 42px; /* Height of the square */
}
.trash-icon {  
  width: 24px;
  height: 24px;
}
</style>