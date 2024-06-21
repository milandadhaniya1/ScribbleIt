import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useUsersStore } from '@store/user';
import { socket } from "@src/socket";

interface Message {
  id: string,
  userId: string,
  userName: string,
  time: string,
  message: string,
  type: 'message' | 'image',
  style: 'default' | 'error' | 'success'
};

export const useMessageStore = defineStore('MessageStore', () => {
  const userStore = useUsersStore();
  const messages = ref<Message[]>([]);
  
  const generateUuid = (): string => {
    return uuidv4();
  };

  const sendMessage = (message: string, type: 'message' | 'image' = 'message'): void => {
    const msgStyle = 'default';
    const newMessage: Message = {
      id: generateUuid(),
      userId: userStore.currentUser?.id || '',
      userName: userStore.currentUser?.name || '',
      time: new Date().toLocaleTimeString(),
      message,
      type,
      style: msgStyle
    };
    socket.emit("message:send", newMessage);
  };

  const getMessages = computed(() => messages.value);

  const bindEvents = (): void => {
    // update the store when an message was added
    socket.on("message:received", (msg: Message) => {
      messages.value.push(msg);
    });
  };

  return {
    getMessages,
    sendMessage,
    bindEvents
  };
});
