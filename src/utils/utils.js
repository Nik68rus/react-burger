export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length-1)];