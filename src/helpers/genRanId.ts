const genRanId = (min: number = 1000, max: number = 500000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default genRanId;
