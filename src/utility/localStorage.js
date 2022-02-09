export const loadState = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, value) => {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    }
  } catch (err) {
    // Игнорировать ошибки записи.
  }
};
