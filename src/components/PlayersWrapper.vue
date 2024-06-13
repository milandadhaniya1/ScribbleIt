<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Icon from '@src/components/icons/index.vue';
  import { useUsersStore } from '@store/user';

  const userStore = useUsersStore();
  const { allUsers } = storeToRefs(userStore);
</script>

<template>
  <div
    id="game-players"
    class="grid"
  >
    <div class="players-list">
      <template
        v-for="(user, index) in allUsers.list"
        :key="user.id"
      >
        <div
          class="player p-2 flex flex-row justify-between"
          :class="{
            'bg-gray-100': index % 2 === 1,
            'bg-gray-200': index % 2 === 0,
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === ((allUsers.list || []).length - 1)
          }"
        >
          <div
            class="player-name font-bold"
          >
            {{ user.name }}
          </div>
          <div class="player-score text-sm">
            {{ user.points }} points
          </div>
          <div class="player-icons">
            <Icon
              v-if="user.isTyping"
              name="pencil"
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
</style>
