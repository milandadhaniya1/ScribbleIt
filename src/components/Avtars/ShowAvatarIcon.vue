<script setup lang="ts">
interface Props {
  data: {
    faceColor: string,
    eyeSrc: string;
    mouthSrc: string;
  }
}

defineProps<Props>();
</script>
<template>
  <div
    class="relative flex justify-center align-items-center border-solid border-2 border-black avatar"
    :style="{ backgroundColor: data.faceColor }"
  >
    <div class="face text-center">
      <img
        :src="data.eyeSrc"
        class="absolute eye mb-1"
      >
      <img
        :src="data.mouthSrc"
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
  width: 100%;
  height: 55%;
  top: 4px;
  scale: 0.7;
}

.mouth {
  width: 100%;
  height: 37%;
  top: 25px;
  scale: 0.7;
}
</style>
