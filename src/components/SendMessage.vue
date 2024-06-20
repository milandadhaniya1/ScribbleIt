<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { createPopper } from '@popperjs/core';
import { useMessageStore } from '@store/message';

const messageStore = useMessageStore();

const emojiPickerInput = ref<string>('');
const emojiPickerButton = ref<HTMLElement | null>(null);
const showEmojiPicker = ref<boolean>(false);
const picker = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits(["messageAdded"]);

const clickListener = (event: MouseEvent) => {
  const isOutside = !(event.target as HTMLElement)?.closest(
    '.input-picker-wrap',
  );
  if (isOutside && showEmojiPicker.value) {
    showEmojiPicker.value = false;
  }
};

const setupPopper = () => {
  let offset = 6;
  if (emojiPickerButton.value && picker.value) {
    createPopper(emojiPickerButton.value, picker.value, {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, offset],
          },
        },
      ],
    });
  }
  document.body.addEventListener('click', clickListener);
};

const onSelectEmoji = (emoji: { i: string; }) => {
  emojiPickerInput.value += emoji.i;
  showEmojiPicker.value = false;
};

const sendMessage = () => {
  if (emojiPickerInput.value && (emojiPickerInput.value || '').trim() !== '') {
    messageStore.sendMessage(emojiPickerInput.value);
    emojiPickerInput.value = '';
    emit('messageAdded', true);
  }
};

// Trigger file input click
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const url = URL.createObjectURL(file);
      messageStore.sendMessage(url, 'image');
      emit('messageAdded', true);
    }
  }
};

onMounted(async () => {
  await nextTick();
  setupPopper();
});

onBeforeUnmount(() => {
  document.body.removeEventListener('click', clickListener);
});
</script>

<template>
  <div class="relative">
    <label class="input input-bordered flex items-center gap-2">
      <input
        v-model="emojiPickerInput"
        type="text"
        class="w-full"
        placeholder="Type your guess here"
        @keyup.enter="sendMessage"
      >
      <div class="input-picker-wrap flex items-center gap-2">
        <button
          ref="emojiPickerButton"
          type="button"
          @click="showEmojiPicker = !showEmojiPicker"
        >
          <img
            src="/assets/smileys_people.svg"
            alt=""
            width="30"
            height="30"
          >
        </button>

        <!-- eslint-disable-next-line vue/html-self-closing -->
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg, image/png"
          class="hidden"
          @change="handleFileUpload"
        />
        <button type="button">
          <img
            src="/assets/file_upload.svg"
            alt="Upload Image"
            title="Upload Image"
            width="20"
            height="20"
            @click="triggerFileInput"
          >
        </button>

        <button type="button">
          <img
            src="/assets/send_message.svg"
            alt="Send Message"
            title="Send Message"
            width="30"
            height="30"
            @click="sendMessage"
          >
        </button>
        <EmojiPicker
          v-show="showEmojiPicker"
          ref="picker"
          class="absolute right-0 bottom-12"
          :native="true"
          :disable-skin-tones="true"
          mode="insert"
          theme="light"
          :display-recent="true"
          @select="onSelectEmoji"
        />
      </div>
    </label>
  </div>
</template>
