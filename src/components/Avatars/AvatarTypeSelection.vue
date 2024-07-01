<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useUsersStore } from '@store/user';

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();
const usersStore = useUsersStore();

const options = ref([
  { value: 'name', label: 'Intial' },
  { value: 'custom', label: 'Custom' },
  { value: 'random', label: 'Random' }
]);
const avtarType = ref();
const currentIndex = ref();
if (props.modelValue) { avtarType.value = props.modelValue; }

const selectNextType = () => {
  currentIndex.value = (currentIndex.value + 1) % options.value.length;
  avtarType.value = options.value[currentIndex.value].value;
  emit('update:modelValue', avtarType.value);
};

const selectPreviousType = () => {
  currentIndex.value = (currentIndex.value - 1 + options.value.length) % options.value.length;;
  avtarType.value = options.value[currentIndex.value].value;
  emit('update:modelValue', avtarType.value);
};
onBeforeMount(() => {
  avtarType.value = usersStore.getUserLocalData().avtar?.type || 'random';
  currentIndex.value = options.value.findIndex(obj => obj.value === avtarType.value);
});
</script>

<template>
  <div class="flex align-items-center justify-between">
    <div
      class="right cursor-pointer"
      @click="selectNextType()"
    >
      <img src="/assets/avatar/arrow.png">
    </div>
    <div class="font-mono text-lg tracking-wide custom-animated-text">
      {{ options[currentIndex].label }}
    </div>
    <div
      class="cursor-pointer" 
      @click="selectPreviousType()"
    >
      <img src="/assets/avatar/arrow.png">
    </div>
  </div>
</template>

<style scoped>
.right {
  transform: rotateY(180deg);
}
</style>
