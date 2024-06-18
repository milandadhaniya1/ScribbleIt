// Segment our local storage user by concerns
type localStorageKeys = 'user';
import logger from './logger';

export function setLocalStorageItem (key: localStorageKeys, fieldName: string, value: any) {
  try {
    const item = localStorage.getItem(key);
    if (fieldName) {
      const currentValue = item ? JSON.parse(item) : {};
      currentValue[fieldName] = currentValue[fieldName] || [];
      currentValue[fieldName] = value;
      localStorage.setItem(key, JSON.stringify(currentValue));
    } else {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    logger.error({ title: 'Error while parsing local storage keys', msg: e });
  }
}

export function getLocalStorageItem (key: localStorageKeys, fieldName?: string) {
  try {
    const item = localStorage.getItem(key);
    if (fieldName && item) {
      const currentValue = JSON.parse(item);
      return currentValue[fieldName];
    } else {
      return item;
    }
  } catch (e) {
    logger.error({ title: 'Error while parsing local storage keys', msg: e });
  }
}

export function clearLocalStorage (keys: Array<localStorageKeys> = []) {
  if (keys.length < 1) { localStorage.clear(); return; }
  for (let index = 0; index < keys.length; index++) {
    localStorage.removeItem(keys[index]);
  }
}
export function clearLocalStorageItem (key: localStorageKeys) {
  localStorage.removeItem(key);
}
