<script setup lang="ts">
import GenerateDefault from './avtars/generateDefault.vue';
import GenerateByName from './avtars/generateByName.vue';
import ShowavatarIcon from './avtars/showavatarIcon.vue';
import { computed } from 'vue';
interface Props {
  user: any;
}
const props = defineProps<Props>();
const userData = computed(() => {
  return props.user;
});
</script>
<template>
  <div class="image">
    <GenerateByName
      v-if="userData.avatar?.type === 'name'"
      :name="userData.name"
    />
    <ShowavatarIcon v-else-if="userData.avatar?.type === 'custom'" />
    <GenerateDefault
      v-else
      :name="userData.name"
    />
  </div>
</template>