<script setup lang="ts">
interface Props {
  user?: any,
  name?: string,
  isIcon?: boolean
}

const props = defineProps<Props>();
import { generateFromString } from 'generate-avatar';
import { ref } from 'vue';
import { onMounted } from 'vue';

const randomSrc = ref();
const emit = defineEmits<{
  'send-data': [value: string]
}>();


onMounted(() => {
  if (!props.isIcon) {
    radomURL();
  } else {
    randomSrc.value = props.user.avatar.data;
  }
});

const radomURL = () => {
  randomSrc.value = `data:image/svg+xml;utf8,${generateFromString((props.name || 't') + Date.now())}`;
  emit('send-data', randomSrc.value);
};
</script>
<template>
  <div class="flex flex-col align-items-center">
    <div
      v-if="!props.isIcon"
      class="shuffle relative"
      @click="radomURL()"
    >
      <img src="/assets/avatar/shuffle.png">
    </div>
    <div class="avatar">
      <div class="rounded-full">
        <img :src="randomSrc">
      </div>
    </div>
  </div>
</template>
<style scoped>
.shuffle {
  width: 24px;
  height: 24px;
  left: 80px;
}
</style>