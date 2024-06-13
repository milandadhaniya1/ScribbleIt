<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';
  import EmojiPicker from 'vue3-emoji-picker';
  import 'vue3-emoji-picker/css';
  import { createPopper } from '@popperjs/core';
  import smileysPeopleIcon from '@src/assets/smileys_people.svg';
  import sendMessageIcon from '@src/assets/send_message.svg';
  import { useMessageStore } from '@store/message';

  const messageStore = useMessageStore();

  const emojiPickerInput = ref<string>('');
  const emojiPickerButton = ref<HTMLElement | null>(null);
  const showEmojiPicker = ref<boolean>(false);
  const picker = ref<HTMLElement | null>(null);

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
      <div class="input-picker-wrap flex items-center">
        <button
          ref="emojiPickerButton"
          type="button"
          @click="showEmojiPicker = !showEmojiPicker"
        >
          <img
            :src="smileysPeopleIcon"
            alt=""
            width="30"
            height="30"
          >
        </button>
        <button type="button">
          <img
            :src="sendMessageIcon"
            alt=""
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
