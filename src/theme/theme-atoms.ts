import { atom, AtomEffect } from 'recoil';

export type ThemeMode = 'light' | 'dark';

const localStorageEffect = (key: string): AtomEffect<ThemeMode> => ({ setSelf, onSet }) => {
  // Retrieve the value stored at the specified key
  const stored = localStorage.getItem(key);
  // Check if the value exists and is light or dark
  if (stored === 'dark' || stored === 'light') {
    // If the value is valid, the call the provided function setSelf which initializes the atom value
    setSelf(stored);
  }
  // Creates the callback triggered when the atom is changed
  onSet((value, _, isReset) => {
    isReset ? localStorage.removeItem(key) : localStorage.setItem(key, value || _);
  });
};

export const appThemeMode = atom<ThemeMode>({
  key: 'AppThemeMode',
  default: 'dark',
  effects: [localStorageEffect('theme-mode')]
});
