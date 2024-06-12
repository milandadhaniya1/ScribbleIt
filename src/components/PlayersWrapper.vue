<script setup lang="ts">
  import Icon from '@/src/components/icons/index.vue';
</script>

<template>
  <div id="game-players" class="grid">
    <div class="players-list">
      <!-- Player 1 -->
      <div
        class="player odd bg-gray-200 p-2 flex flex-row justify-between rounded-t-lg"
      >
        <div class="player-name font-bold">Milan</div>
        <div class="player-score text-sm">100 points</div>
        <div class="player-icons">
          <!-- Writing -->
        </div>
      </div>

      <div class="player odd bg-gray-100 p-2 flex flex-row justify-between">
        <div class="player-name font-bold">Nirmal</div>
        <div class="player-score text-sm">90 points</div>
        <div class="player-icons">
          <Icon name="pencil" />
        </div>
      </div>

      <div
        class="player odd bg-gray-200 p-2 flex flex-row justify-between rounded-b-lg"
      >
        <div class="player-name font-bold">Trishant</div>
        <div class="player-score text-sm">80 points</div>
        <div class="player-icons">
          <!-- Writing -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .icon {
    height: 24px;
    width: 24px;
  }
</style>
