<script setup lang="ts">

interface Props {
  name?: string
}

const props = defineProps<Props>();
</script>
<template>
  <div class="avatar placeholder absolute contents">
    <div class="bg-neutral text-neutral-content rounded-full">
      <span class="text-xs">{{ (props.name || '')[0].toUpperCase() || 'T' }}</span>
    </div>
  </div> 
</template>