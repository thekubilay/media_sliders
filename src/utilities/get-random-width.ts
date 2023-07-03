const GET_RANDOM_WIDTH = (): object => {
  const minWidth = 50; // minimum height for images
  const maxWidth = 15; // maximum height for images
  const step = 20; // step for randomization
  const range = (maxWidth - minWidth) / step; // calculate the number of steps within the range
  const randomStep = Math.floor(Math.random() * (range + 1)); // generate a random step
  const width = minWidth + randomStep * step; // calculate the random height
  return {width: `${width}px`};
};

export default GET_RANDOM_WIDTH;