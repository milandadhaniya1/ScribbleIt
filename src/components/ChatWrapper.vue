<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import SendMessage from './SendMessage.vue';
import { useMessageStore } from '@store/message';

const messageStore = useMessageStore();
const { getMessages } = storeToRefs(messageStore);

const chatHistory = ref();

const scrollToBottom = () => {
  chatHistory.value?.scrollIntoView({ behavior: 'smooth' });
};

</script>

<template>
  <div class="chat-wrapper flex flex-col">
    <div
      ref="chatHistory"
      class="chat-history flex-1 overflow-auto mb-1 scrollbar-thin scroll-smooth"
    >
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
      <SendMessage @message-added="scrollToBottom" />
    </div>
  </div>
</template>
<style scoped>
.chat-wrapper {
  height: 100%;
  max-height: calc(100vh - 155px);
}
.chat-history {
  max-height: 100%
}
.chat .chat-bubble {
  max-width: 100%;
}
</style>