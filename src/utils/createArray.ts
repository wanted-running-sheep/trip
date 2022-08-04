const createArray = (n: number) => {
  const arr = Array.from({ length: n }, (_, i) => i);

  return arr;
};

export default createArray;
