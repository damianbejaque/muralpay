export const checkIfIsEmpty = (value: string) => {
  return value.trim().length === 0;
};

export const checkIfIsEmail = (value: string) => {
  if (checkIfIsEmpty(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
