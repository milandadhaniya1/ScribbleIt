<script setup lang="ts">
import { useConnectionStore } from "@store/connection";
import { useUsersStore } from "@store/user";
import { useMessageStore } from '@store/message';
import { socket } from "@src/socket";

const connectionStore = useConnectionStore();
const usersStore = useUsersStore();
const messageStore = useMessageStore();

// remove any existing listeners (after a hot module replacement)
socket.off();

connectionStore.bindEvents();
usersStore.bindEvents();
messageStore.bindEvents();
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
