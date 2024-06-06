import { defineStore } from 'pinia';
import { ref } from 'vue';
import wordsList from './words.json';

export const useSelectedWordsStore = defineStore('SelectedWords', () => {
  const selectedWord = ref<string>('');
  const availableWords = wordsList.list as string[];
  const randomWords = ref<string[]>([]);
  const usedWords = ref<string[]>([]);
  
  const getRandomWords = (): string[] => {
    // Filter out used words
    const filteredWords: string[] = availableWords.filter(word => !usedWords.value.includes(word));
    const selectRandomWords: string[] = [];

    // Select 3 random words from filteredWords
    while (selectRandomWords.length < 3 && filteredWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      selectRandomWords.push(filteredWords.splice(randomIndex, 1)[0]);
    }
    randomWords.value = selectRandomWords;
    return selectRandomWords;
  };

  const selectWord = (word: string) => {
    selectedWord.value = word;
    if (!usedWords.value.includes(word)) {
      usedWords.value.push(word);
    }
  };

  return {
    randomWords,
    getRandomWords,
    selectWord,
    selectedWord
  };
});
