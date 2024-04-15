export const sequenceGenerator = function (startNumber: number, n: number) {
  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    result.push(startNumber + i);
  }
  return result;
};
