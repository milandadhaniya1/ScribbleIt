<script setup lang="ts">
  interface Props {
    colors: Array<string[]>
  }
const props = defineProps<Props>();
const emit = defineEmits<{
  'color-selected': [value: string]
}>();

const selectColor = (color: string) => {  
 emit('color-selected', color);
};
</script>
<template>
  <div>
    <div class="palette">
      <div
        v-for="(color, index) in props.colors"
        :key="index"
        :style="{ 'backgroundColor': color }"
        class="color-box"
        @click="selectColor(color)"
      />
    </div>
  </div>
</template>
<style scoped>
.palette {
  display: flex;
  flex-wrap: wrap;
}
.color-box {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
