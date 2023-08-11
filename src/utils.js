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
/**
 * Returns the questions left to answer in "normal" mode
 * @param {*} questions
 * @returns list of questions left to answer
 */
const questionsLeft = (questions) =>
  questions.filter((question) => !question.done);

/**
 * Returns the questions passed in, marking the answered one as "done".
 * @param {*} questions list of qwuestions
 * @param {*} answeredPhrase the answered question
 * @returns
 */
const markQuestionAsDone = (questions, answeredPhrase) =>
  questions.map((question) => {
    if (question.id === answeredPhrase.id) {
      return {
        ...question,
        done: true,
      };
    }
    return question;
  });

export { getRandom, randomQuestion, questionsLeft, markQuestionAsDone };
