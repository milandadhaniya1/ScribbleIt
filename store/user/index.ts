import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

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
  const defaultUsers = [
    {
      id: uuidv4(),
      name: 'Milan',
      avatar: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      isActive: true,
      points: 100,
      isTyping: false
    },
    {
      id: uuidv4(),
      name: 'Nirmal',
      avatar: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      isActive: true,
      points: 90,
      isTyping: true
    },
    {
      id: uuidv4(),
      name: 'Trishant',
      avatar: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      isActive: true,
      points: 80,
      isTyping: false
    }
  ];
  const defaultCurrentUser = defaultUsers[0];

  const allUsers = ref<Users>({
    list: defaultUsers || [],
    currentUser: defaultCurrentUser || null
  });
  const currentUser = computed(() => allUsers.value.currentUser);
  
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
    allUsers.value.list.push(newUser);
  };

  const deactiveUser = (id: string): void => {
    const user = allUsers.value.list.find(user => user.id === id);
    if (user) {
      user.isActive = false;
    }
  };

  return {
    allUsers,
    currentUser,
    addUser,
    deactiveUser
  };
});
