<script setup lang="ts">
import { useConnectionStore } from "@store/connection";
import { useUsersStore } from "@store/user";
import { socket } from "@src/socket";

const connectionStore = useConnectionStore();
const usersStore = useUsersStore();

// remove any existing listeners (after a hot module replacement)
socket.off();

connectionStore.bindEvents();
usersStore.bindEvents();
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
