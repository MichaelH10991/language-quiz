/**
 * Provides a random number between to ranges.
 * @param {*} min
 * @param {*} max
 * @returns Number
 */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Returns a random question from the provided list.
 * @param {*} questions
 * @returns phrase object
 */
const randomQuestion = (questions) => {
  const randomNumber = getRandom(0, questions.length - 1);
  return questions[randomNumber];
};

export { getRandom, randomQuestion };
