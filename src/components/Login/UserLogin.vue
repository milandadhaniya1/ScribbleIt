<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import router from '@src/router';
import { useUsersStore } from '@store/user';
import { useGameStore } from '@store/game';
import Avtar from '@src/components/Avatars/index.vue';
import AvatarTypeSelection from '@src/components/Avatars/AvatarTypeSelection.vue';

const usersStore = useUsersStore();
const gameStore = useGameStore();
const username = ref('');
const avtarType= ref('');
const avtarData= ref('');

const getLocalUserName = () => username.value = usersStore.getUserLocalData().name || '';
const getLocalAvtarType = () => avtarType.value = usersStore.getUserLocalData().avtar?.type || 'random';
const getLocalAvtar = () => avtarData.value = usersStore.getUserLocalData().avtar?.data || '';
onBeforeMount(() => {
  getLocalUserName();
  getLocalAvtarType();
  getLocalAvtar();
});
const avatarData = ref('');

const setUserName = () => {
  if (username.value && username.value.trim() !== '') {
    getLocalAvtar();
    let avatar = {
      type: avtarType.value,
      data: avatarData.value
    };
    usersStore.setUserLocalData('name', username.value);
    usersStore.setUserLocalData('avatar', avatar);
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

const handleSend = (data: any) => {
  avatarData.value = data;
};

</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <h1 class="custom-animated-text text-5xl mb-6">
        Scribbl It..
      </h1>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
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
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true"
              >
            </div>
            <avatar-type-selection v-model="avtarType" />
            <Avtar
              class="flex justify-center avatar-wrapper"
              :avtar-type="avtarType"
              :avtar-data="avtarData"
              :name="username"
              @send-avatar="handleSend"
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
<style scoped>
.avatar-wrapper {
  margin-top: 0px !important;
}
</style>