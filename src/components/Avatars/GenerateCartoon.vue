<script setup lang="ts">
import colors from './colors.json';
import { onMounted, ref } from 'vue';

const eyesObject = import.meta.glob('@/public/assets/avatar/eyes/*.png');
let eyes = Object.keys(eyesObject);
eyes = eyes.map(str => str.replace(new RegExp('/public', 'g'), ''));

const mouthObject = import.meta.glob('@/public/assets/avatar/mouth/*.png');
let mouths = Object.keys(mouthObject);
mouths = mouths.map(str => str.replace(new RegExp('/public', 'g'), ''));

const getRandomElement = (arr: Array<string>) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};
const eyeSrc = ref(getRandomElement(eyes));
const mouthSrc = ref(getRandomElement(mouths));
const faceColor = ref(getRandomElement(colors));
const emit = defineEmits<{
  'send-custom': [value: {
    faceColor: string, 
    eyeSrc: string, 
    mouthSrc: string
  }]
}>();

const sendCustom = () => {
  emit('send-custom',  {
    faceColor: faceColor.value, 
    eyeSrc: eyeSrc.value, 
    mouthSrc: mouthSrc.value 
  });
};
  
onMounted(() =>{ 
  sendCustom();
});

const randomizeFeatures = (attribute: string) => {
  switch(attribute) {
    case 'color': 
      faceColor.value = getRandomElement(colors);
      sendCustom();
      return;
    case 'eye':
      eyeSrc.value = getRandomElement(eyes); 
      sendCustom();
      return;
    default:
      mouthSrc.value = getRandomElement(mouths);
      sendCustom();
      return;
  }
};
</script>
<template>
  <div class="flex justify-center align-center">
    <div class="flex flex-col justify-between left arrows">
      <div
        class="arrow cursor-pointer left"
        data-avatar-index="0"
        @click="randomizeFeatures('color')"
      />
      <div
        class="arrow cursor-pointer left"
        data-avatar-index="1"
        @click="randomizeFeatures('eye')"
      /><div
        class="arrow cursor-pointer left"
        data-avatar-index="2"
        @click="randomizeFeatures('mouth')"
      />
    </div>
    <div
      class="relative flex justify-center align-items-center border-solid border-4 border-black avatar mx-1"
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
    <div class="flex flex-col justify-between right arrows">
      <div
        class="arrow cursor-pointer right"
        data-avatar-index="0"
        @click="randomizeFeatures('color')"
      />
      <div
        class="arrow cursor-pointer right"
        data-avatar-index="1"
        @click="randomizeFeatures('eye')"
      /><div
        class="arrow cursor-pointer right"
        data-avatar-index="2"
        @click="randomizeFeatures('mouth')"
      />
    </div>
  </div>
</template>
<style scoped>
.arrows.left .arrow {
    background-position: 0 0;
}
.arrows.right {
  transform: rotateY(180deg);
}
.arrows .arrow {
    flex: 0 0 auto;
    width: 25px;
    height: 25px;
    background-image: url('/assets/avatar/arrow.png');
    background-repeat: no-repeat;
}
.avatar {
  width: 100px;
  height: 100px;
  background-color: #ffe0bd;
  border-radius: 50%;
}
.eye {
  width: 70px;
  height: 50px;
  top: 10px;
  left: 10px;
}
.mouth {
  width: 60px;
  height: 40px;
  top: 54px;
  right: 15px;;
}
</style>