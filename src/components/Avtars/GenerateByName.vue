<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name?: string
}

const props = defineProps<Props>();
const selectedWord = computed(() => {
  return (props.name || 'T')[0].toUpperCase();
});
</script>
<template>
  <div class="avatar placeholder absolute contents">
    <div class="bg-neutral text-neutral-content rounded-full">
      <span class="text-xs">{{ selectedWord }}</span>
    </div>
  </div> 
</template>