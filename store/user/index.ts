import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import * as localStorage from '@utils/localStorage';
import { socket } from "@src/socket";

interface User {
  id: string,
  name: string,
  avatar?: string,
  isActive: boolean,
  points: number,
  isTyping: boolean
};
interface Users {
  list: User[];
  currentUser?: User | null
};

export const useUsersStore = defineStore('UsersStore', () => {
  const allUsers = ref<Users>({
    list: [],
    currentUser: null
  });
  const currentUser = computed(() => allUsers.value.currentUser);

  const localData = ref({
    name: localStorage.getLocalStorageItem('user', 'name'),
    avtar: localStorage.getLocalStorageItem('user', 'avatar')
  });
  
  const generateUuid = (): string => {
    return uuidv4();
  };

  const addUser = (name: string, avatar?: string): void => {
    const newUser: User = {
      id: generateUuid(),
      name,
      avatar,
      isActive: true,
      points: 0,
      isTyping: false
    };

    allUsers.value.currentUser = newUser;
    socket.emit("user:create", newUser);
  };

  const deactiveUser = (id: string): void => {
    const user = allUsers.value.list.find(user => user.id === id);
    if (user) {
      user.isActive = false;
    }
  };

  const getUserLocalData = (): any => {
    localData.value = {
      name: localStorage.getLocalStorageItem('user', 'name'),
      avtar: localStorage.getLocalStorageItem('user', 'avatar')
    };
    return localData.value;
  };

  const setUserLocalData = (key: string, value: any): void => {
    localStorage.setLocalStorageItem('user', key, value);
  };

  const bindEvents = (): void => {
    // sync the list of users upon connection
    socket.on("connect", () => {
      socket.emit("user:list");
      socket.on("user:list", (res: User[]) => {
        allUsers.value.list = res;
      });
    });

    // update the store when an user was added
    socket.on("user:created", (res: User) => {
      allUsers.value.list.push(res);
    });

    // Remove user on disconnect
    socket.on("user:disconnected", (userName) => {
      // TODO: create notification
      if (currentUser.value && currentUser.value?.id) {
        alert(`user "${userName}" is disconnected`);
      }
    });
  };

  return {
    allUsers,
    currentUser,
    addUser,
    deactiveUser,
    getUserLocalData,
    setUserLocalData,
    bindEvents
  };
});
