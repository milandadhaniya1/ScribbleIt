<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import SendMessage from './SendMessage.vue';
  import { useMessageStore } from '@store/message';

  const messageStore = useMessageStore();
  const { getMessages } = storeToRefs(messageStore);

</script>

<template>
  <div class="chat-wrapper flex flex-col h-full">
    <div class="chat-history flex-1 overflow-auto">
      <template 
        v-for="message in getMessages"
        :key="message.id"
      >
        <div class="chat chat-end">
          <div class="chat-header opacity-50 mr-2">
            {{ message.userName }}
          </div>
          <div
            class="chat-bubble"
            :class="{'chat-bubble-success': message.type === 'success', 'chat-bubble-error': message.type === 'error'}"
          >
            {{ message.message }}
          </div>
        </div>
      </template>
    </div>
    <div class="chat-box mt-auto">
      <SendMessage />
    </div>
  </div>
</template>
<style scoped>
.chat-history {
  max-height: fit-content;
}
.chat .chat-bubble {
  max-width: fit-content;
}
</style>