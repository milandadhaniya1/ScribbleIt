import { defineStore } from 'pinia';
import { ref } from 'vue';
import wordsList from './words.json';
import colors from './colors.json';

export const useGameStore = defineStore('gameStore', () => {
  const isGameStarted = ref<boolean>(false);
  const selectedWord = ref<string>('');
  const availableWords = wordsList.list as string[];
  const randomWords = ref<string[]>([]);
  const usedWords = ref<string[]>([]);
  const avaiableColors = ref(colors.list);
  const selectedColor = ref<string>('#000000');  
  const backgroundColor = ref<string>('#FFFFFF');  
  const selectedTool = ref<string>('pencil');
  const strokeSize = ref(2);
  const eraser = ref(false);
  const clearCanvas = ref(false);
  
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

  const updateSelectedColor = (color:string) =>{ 
    if(selectedTool.value === 'bucket') {
      backgroundColor.value = color;
    } else {
      selectedColor.value = color; 
    }    
  };

  const setSelectedTool = (tool:string) => {
    selectedTool.value = tool;
  };

  const setStrokeSize = (size:number) => {
    strokeSize.value = size;
  };

  const clearAll = (flag:boolean) => {
    clearCanvas.value = flag;  
    selectedTool.value = 'pencil';
    selectedColor.value ="#000000";
    backgroundColor.value = "#FFFFFF";
  };

  const reverseSelectedColor = () => {
    const temp = backgroundColor.value;
    backgroundColor.value = selectedColor.value;
    selectedColor.value = temp;
  };

  const setEraserMode = (flag:boolean) =>{
    eraser.value = flag;
  };
  const startGame = () => {
    isGameStarted.value = true;
  };

  return {
    isGameStarted,
    randomWords,
    getRandomWords,
    selectWord,
    selectedWord,
    startGame,
    avaiableColors,
    selectedColor,
    updateSelectedColor,
    setSelectedTool,
    selectedTool,
    clearAll,
    reverseSelectedColor,
    backgroundColor,
    strokeSize,
    eraser,
    clearCanvas,
    setStrokeSize,
    setEraserMode
  };
});
