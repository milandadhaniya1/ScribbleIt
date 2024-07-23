<script setup lang="ts">
import GenerateCartoon from './GenerateCartoon.vue';
import GenerateByName from './GenerateByName.vue';
import GenerateDefault from './GenerateDefault.vue';

interface Props {
  avtarType: string;
  name?: string;
  avtarData?: object | string
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
  <generate-cartoon
    v-if="props.avtarType === 'custom'"
    @send-custom="handleSave"
  />
  <div
    v-else-if="props.avtarType === 'name'"
    class="flex justify-center"
  >
    <div class="default">
      <generate-by-name :name="props.name" />
    </div>
  </div>
  <div
    v-else
    class="flex justify-center"
  >
    <div class="default size-auto">
      <generate-default
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