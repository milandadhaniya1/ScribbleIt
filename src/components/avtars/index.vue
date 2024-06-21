<script setup lang="ts">
import generateCartoon from './generateCartoon.vue';
import generateByName from './generateByName.vue';
import generateDefault from './generateDefault.vue';

interface Props {
  avtarType: string;
  name?: string;
  }

const props = defineProps<Props>();

</script>
<template>
  <generateCartoon v-if="props.avtarType === 'custom'" />
  <div
    v-else-if="props.avtarType === 'name'"
    class="flex justify-center"
  >
    <div class="default">
      <generateByName
        :name="props.name"
      />
    </div>
  </div>
  <div
    v-else
    class="flex justify-center"
  >
    <div class="default">
      <generateDefault
        :name="props.name"
      />
    </div>
  </div>
</template>
<style scoped>
.default {
  width: 96px;
    height: 96px;
}
</style>