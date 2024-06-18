<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import SendMessage from './SendMessage.vue';
import { useMessageStore } from '@store/message';

const messageStore = useMessageStore();
const { getMessages } = storeToRefs(messageStore);

const chatHistory = ref();
const showImageModal = ref();
const selectedImage = ref<string | undefined>(undefined);

const scrollToEnd = async () => {
  const chatBubbles = chatHistory.value?.querySelectorAll('.chat-bubble');
  if (chatBubbles.length > 0) {
    const lastChatBubble = chatBubbles[chatBubbles.length - 1];
    await nextTick();
    lastChatBubble.scrollIntoView({ behavior: 'smooth' });
  }
};

// View image in modal
const viewImage = (url: string) => {
  selectedImage.value = url;
  showImageModal.value?.showModal();
};

// Close modal
const closeModal = () => {
  selectedImage.value = undefined;
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
            :class="{'chat-bubble-success': message.style === 'success', 'chat-bubble-error': message.style === 'error'}"
          >
            <template v-if="message.type === 'image'">
              <!-- eslint-disable-next-line vue/html-self-closing -->
              <img
                :src="message.message"
                class="uploaded-image cursor-pointer"
                @click="viewImage(message.message)"
              />
            </template>
            <template v-else>
              {{ message.message }}
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="chat-box mt-auto">
      <SendMessage @message-added="scrollToEnd" />
    </div>
    <dialog
      id="show_image_modal"
      ref="showImageModal"
      class="modal"
    >
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="closeModal"
          >
            ✕
          </button>
        </form>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          :src="selectedImage"
          class="full-image py-4"
        />
      </div>
    </dialog>
  </div>
</template>
<style scoped>
.chat-wrapper {
  height: 100%;
  max-height: calc(100vh - 175px);
}
.chat-history {
  max-height: 100%
}
.chat .chat-bubble {
  max-width: 100%;
}
</style>