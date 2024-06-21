<script setup lang="ts">
interface Props {
  name?: string
  }

const props = defineProps<Props>();  
import { generateFromString } from 'generate-avatar';
import { computed } from 'vue';

const radomURL = computed(() => {
  return `data:image/svg+xml;utf8,${generateFromString(props.name || 't')}`;
});
</script>
<template>
  <div class="avatar">
    <div class="rounded-full">
      <img :src="radomURL">
    </div>
  </div>
</template>