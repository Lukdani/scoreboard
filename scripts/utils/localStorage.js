export const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

export const getFromLocalStorage = key => localStorage.getItem(key);

export const clearFromLocalStorage = key => localStorage.removeItem(key);   