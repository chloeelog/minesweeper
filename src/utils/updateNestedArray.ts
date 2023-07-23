export const updateNestedArray = <T extends unknown>(
  arr: Array<Array<T>>,
  x: number,
  y: number,
  value: T
) => {
  return arr.map((row, i) => {
    if (i !== x) return row;
    return row.map((col, j) => {
      if (j !== y) return col;
      return value;
    });
  });
};
