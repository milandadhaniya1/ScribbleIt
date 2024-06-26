<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@store/user';
import PlayersAvatarIconWrapper from '@src/components/Avatars/PlayersAvatarIconWrapper.vue';

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
            <players-avatar-icon-wrapper
              :user="user"
              class="avtar"
            />
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
  .avtar {
    height: 48px;
    width: 48px;
  }
</style>
