<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from '@store/user';

  const userStore = useUsersStore();
  const { allUsers } = storeToRefs(userStore);
</script>

<template>
  <div
    id="game-players"
    class="grid grid-flow-col gap-2"
  >
    <div class="players-list">
      <template
        v-for="(user, index) in allUsers.list"
        :key="user.id"
      >
        <div
          class="player p-2 flex flex-row justify-between content-center hover:bg-gray-600 hover:text-white transition-transform duration-300 transform hover:scale-x-105"
          :class="{
            'bg-gray-100': index % 2 === 1,
            'bg-gray-200': index % 2 === 0,
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === ((allUsers.list || []).length - 1)
          }"
        >
          <div
            class="player-name font-bold content-center"
          >
            {{ user.name }}
          </div>
          <div class="player-score text-sm content-center">
            {{ user.points }} points
          </div>
          <div class="player-icons flex gap-2 content-center">
            <img
              v-if="index==2"
              src="/assets/pencil-icon.svg"
              alt="Pencil"
              class="animate-pulse"
              width="24"
              height="24"
            >
            <div class="avatar">
              <div class="w-12 rounded-full ring">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg">
              </div>
            </div>       
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .icon {
    height: 24px;
    width: 24px;
  }
</style>
