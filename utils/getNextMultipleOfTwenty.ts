export const getNextMultipleOfTwenty = (value: number): number => {
  const nextMultipleOfTwenty = Math.ceil(value / 20) * 20;
  return nextMultipleOfTwenty + 20; // Add buffer to prevent overflow
};
