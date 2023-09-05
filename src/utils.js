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
const randomQuestion = (questions = []) => {
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
const markQuestionAsDone = (questions = [], answeredPhrase, outcome = "done") =>
  questions.map((question) => {
    if (question._id === answeredPhrase._id) {
      if (outcome === "done") {
        return {
          ...question,
          done: true,
        };
      } else if (outcome === "incorrect") {
        return {
          ...question,
          incorrect: true,
        };
      }
    }
    return question;
  });

const quizResults = (questions = []) => {
  return questions.reduce(
    (acc, question) => {
      return {
        correct:
          question.done && !question.incorrect ? acc.correct + 1 : acc.correct,
        incorrect: question.incorrect ? acc.incorrect + 1 : acc.incorrect,
      };
    },
    { correct: 0, incorrect: 0 }
  );
};

const calculateScore = (questions = []) => {
  const { correct, incorrect } = quizResults(questions);
  const totalQuestions = questions.length;
  return {
    correct,
    incorrect,
    percentage: `${Math.floor((correct / totalQuestions) * 100)}%`,
  };
};

export {
  getRandom,
  randomQuestion,
  questionsLeft,
  markQuestionAsDone,
  calculateScore,
};
