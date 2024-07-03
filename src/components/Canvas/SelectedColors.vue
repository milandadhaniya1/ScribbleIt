<script setup lang="ts">
interface Props {
  backgroundColor: string,
  selectedColor: string
}
const props = defineProps<Props>();
const emit = defineEmits<{
  'reverse-color': any
}>();
const changeColor = () => {
  emit('reverse-color');
};
</script>
<template>
  <div
    class="diagonal-square border-2 cursor-pointer"
    :style="{ 'background': `linear-gradient(135deg, ${props.backgroundColor} 50%, ${props.selectedColor} 50%)` }"
    @click="changeColor()"
  />
</template>
<style scoped>
.diagonal-square {
  width: 42px;
  /* Width of the square */
  height: 42px;
  /* Height of the square */
}
</style>