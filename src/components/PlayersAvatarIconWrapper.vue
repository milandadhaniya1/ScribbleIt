<script setup lang="ts">
import GenerateDefault from './avtars/generateDefault.vue';
import GenerateByName from './avtars/generateByName.vue';
import ShowAvatarIcon from './avtars/showAvatarIcon.vue';
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
    <ShowAvatarIcon
      v-else-if="userData.avatar?.type === 'custom'"
      :data="userData.avatar?.data"
    />
    <GenerateDefault
      v-else
      :user="userData"
      :is-icon="true"
    />
  </div>
</template>