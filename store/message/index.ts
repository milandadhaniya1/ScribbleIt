import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useUsersStore } from '@store/user';

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
    messages.value.push(newMessage);
  };

  const getMessages = computed(() => messages.value);

  return {
    getMessages,
    sendMessage
  };
});
