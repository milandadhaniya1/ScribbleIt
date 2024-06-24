<script setup lang="ts">
import generateCartoon from './generateCartoon.vue';
import generateByName from './generateByName.vue';
import generateDefault from './generateDefault.vue';

interface Props {
  avtarType: string;
  name?: string;
  }

const props = defineProps<Props>();
const emit = defineEmits<{
  'send-avatar': [value: any]
}>();

const handleSave = (data: any) => {
  emit('send-avatar', data);
};

</script>
<template>
  <generateCartoon
    v-if="props.avtarType === 'custom'"
    @send-custom="handleSave"
  />
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
    <div class="default size-auto">
      <generateDefault
        :name="props.name"
        @send-data="handleSave"
      />
    </div>
  </div>
</template>
<style scoped>
.default {
  width: 96px;
}
</style>