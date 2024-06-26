<script setup lang="ts">
import { useConnectionStore } from "@store/connection";
import { useUsersStore } from "@store/user";
import { useMessageStore } from '@store/message';
import { useDrawingStore } from '@store/drawing';
import { socket } from "@src/socket";

const connectionStore = useConnectionStore();
const usersStore = useUsersStore();
const messageStore = useMessageStore();
const drawingStore = useDrawingStore();

// remove any existing listeners (after a hot module replacement)
socket.off();

connectionStore.bindEvents();
usersStore.bindEvents();
messageStore.bindEvents();
drawingStore.bindEvents();
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
