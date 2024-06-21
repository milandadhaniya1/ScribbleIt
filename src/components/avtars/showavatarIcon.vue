<script setup lang="ts">
import { useUsersStore } from '@store/user';
import { ref, onBeforeMount } from 'vue';

const userStore = useUsersStore();
const userData = ref(userStore.getUserLocalData());
const faceColor = ref();
const eyeSrc = ref();
const mouthSrc = ref();

onBeforeMount(() => {
  const avatar = JSON.parse(JSON.stringify(userData.value)).avtar;
  faceColor.value = avatar.data[0];
  eyeSrc.value = avatar.data[1];
  mouthSrc.value = avatar.data[2];
});
</script>
<template>
  <div
    class="relative flex justify-center align-items-center border-solid border-4 border-black avatar"
    :style="{ backgroundColor: faceColor }"
  >
    <div class="face text-center">
      <img
        :src="eyeSrc"
        class="absolute eye mb-1"
      >
      <img
        :src="mouthSrc"
        class="absolute mouth"
      >
    </div>
  </div>
</template>
<style scoped>
.avatar {
  width: 100%;
  height: 100%;
  background-color: #ffe0bd;
  border-radius: 50%;
}
.eye {
  width: auto;
  height: 50%;
  top: 5px;
  left: 5px;
}
.mouth {
  width: 50%;
  height: 50%;
  top: 20px;
  right: 10px;;
}
</style>