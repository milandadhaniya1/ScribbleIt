<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@src/router';
import Avtar from '@src/components/avtars/index.vue';
import { useUsersStore } from '@store/user';
import { useGameStore } from '@store/game';
import AvatarTypeSelection from './AvatarTypeSelection.vue';

const usersStore = useUsersStore();
const gameStore = useGameStore();
const username = ref('');
const avtarType= ref('random');
onMounted(() => {
  username.value = usersStore.getUserLocalData().name;
});

const setUserName = () => {
  if (username.value && username.value.trim() !== '') {
    let avatar = {
      type: avtarType.value,
      data: ''
    };
    usersStore.setUserLocalData('name', username.value);
    usersStore.setUserLocalData('avatar', avatar);
   
    const user = JSON.parse(JSON.stringify(usersStore.getUserLocalData()));
    console.log(user);
    
    if(user.avtar.type === 'custom') {
      avatar.data = user.avtar.data;
    }
     usersStore.addUser(
      username.value,
      avatar
    );
    gameStore.startGame();
    router.push({ path: 'game' });
  } else {
    // Error
  }
};

</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <h1 class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black mb-6">
        Scribbl It..
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            class="space-y-4 md:space-y-6"
            action="javascript:void(0);"
          >
            <div>
              <input
                id="username"
                v-model="username"
                type="text"
                name="username"
                placeholder="Enter Your Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
              >
            </div>
            <AvatarTypeSelection v-model="avtarType" />
            <Avtar
              class="flex justify-center"
              :avtar-type="avtarType"
              :name="username"
            />
            <button
              class="btn btn-outline block w-full hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
              @click="setUserName()"
            >
              Play
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>