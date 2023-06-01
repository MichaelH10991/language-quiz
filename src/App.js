// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import languages from "./data";

// languages = self explanitory, can contain many question sets
// question set = the specific groups of questions e.g. greetings, things to say in a resturaunt, etc.;

/**
 * a random number
 * @param {*} min
 * @param {*} max
 * @returns Number
 */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomQuestion = (questions) => {
  const randomNumber = getRandom(0, questions.length - 1);
  return questions[randomNumber];
};

// this wont work in the real world because id's will be randomised
// const nextQuestion = (question, questions) => {
//   let nextId = question.id + 1;
//   if (nextId > questions.leng) return questions[question.id + 1];
// };

const defaultLanguage = "croatian";
const defaultQuestionSet = "greetings";

const Question = (props) => {
  const { phrase, language, peek, flip } = props;
  if (!phrase) {
    return "No more questions.";
  }

  const capitalized = language.charAt(0).toUpperCase() + language.slice(1);

  const question = () => {
    if (flip) {
      return (
        <div style={{ whiteSpace: "nowrap" }}>
          <span>What is "</span>
          <span style={{ color: peek ? "green" : " " }}>
            {!peek ? phrase.foregin : phrase.english}
          </span>
          <span>" in English</span>
          <div style={{ color: "lightcoral" }}>
            <i>
              {phrase.pronounce ? (
                phrase.pronounce
              ) : (
                <div style={{ color: "#ffffff00" }}>Empty</div>
              )}
            </i>
          </div>
        </div>
      );
    }
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <span>What is "</span>
        <span style={{ color: peek ? "green" : " " }}>
          {!peek ? phrase.english : phrase.foreginDisplay || phrase.foregin}
        </span>
        <span>" in {capitalized}</span>
        <div style={{ color: "#ffffff00" }}>
          <i>
            {phrase.pronounce ? (
              phrase.pronounce
            ) : (
              <div style={{ color: "#ffffff00" }}>Empty</div>
            )}
          </i>
        </div>
      </div>
    );
  };

  return question();
};

const Feedback = (props) => {
  const { correct, previousAns, showFeedback, flip } = props;

  if (!showFeedback) {
    return undefined;
  }

  return correct ? (
    <div style={{ color: "green" }}>
      Correct;{" "}
      {flip
        ? previousAns.english
        : `${previousAns.foregin} ${previousAns.pronounce || ""}`}
    </div>
  ) : (
    <div style={{ color: "red" }}>Incorrect</div>
  );
};

const checkAnswer = (answer, phrase, flip) => {
  const comp = (ans, phrase) => {
    if (Array.isArray(phrase)) {
      const transformed = phrase.map((item) => item.toLocaleLowerCase().trim());
      return phrase.includes(transformed);
    }
    return ans.toLocaleLowerCase().trim() === phrase.toLocaleLowerCase();
  };

  if (flip) {
    return comp(answer, phrase.english);
  }
  return comp(answer, phrase.foregin);
};

function App() {
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState(defaultLanguage);
  const [questionSet, setQuestionSet] = useState(defaultQuestionSet);
  const [questions, setQuestions] = useState(
    languages[defaultLanguage][defaultQuestionSet]
  );
  const [correct, setCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [peek, setPeek] = useState(false);
  const [phrase, setPhrase] = useState(randomQuestion(questions));
  const [previousAns, setPreviousAns] = useState("");
  const [questionsLeft, setQuestionsLeft] = useState(questions.length);
  const [infinite, setInfinite] = useState(false);
  const [flip, setFlip] = useState(false);

  const submitAnswer = (event) => {
    if (checkAnswer(answer, phrase, flip)) {
      if (infinite) {
        // dont get rid of question, but reset state
        setPreviousAns(phrase);
        setAnswer("");
        setCorrect(true);
        setPhrase(randomQuestion(questions));
        event.target.value = "";
      } else {
        // get rid of question
        console.log("questions", questions);
        console.log("question to remove", phrase);
        const filtered = questions.filter((item) => {
          return item.id !== phrase.id;
        });
        setQuestions(filtered);
        setPhrase(randomQuestion(filtered));
        setQuestionsLeft(filtered.length);
        setPreviousAns(phrase);
        setAnswer("");
        setCorrect(true);
        event.target.value = "";
      }
    } else {
      setCorrect(false);
    }
    setShowFeedback(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitAnswer(event);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setQuestionSet(defaultQuestionSet);
    setQuestions(languages[e.target.value][defaultQuestionSet]);
    setQuestionsLeft(languages[e.target.value][defaultQuestionSet].length);
    setPhrase(randomQuestion(languages[e.target.value][defaultQuestionSet]));
  };

  const handleQuestionSetChange = (e) => {
    setQuestionSet(e.target.value);
    setQuestions(languages[language][e.target.value]);
    setQuestionsLeft(languages[language][e.target.value].length);
    setPhrase(randomQuestion(languages[language][e.target.value]));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: 8 + "px" }}>
          <select value={language} onChange={handleLanguageChange}>
            {Object.keys(languages).map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <select value={questionSet} onChange={handleQuestionSetChange}>
            {Object.keys(languages[language]).map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <span>
          Infinite Mode
          <input type="checkbox" onClick={() => setInfinite(!infinite)}></input>
        </span>
        <div>Questions left: {questionsLeft}</div>
        <Question phrase={phrase} language={language} peek={peek} flip={flip} />
        <span>
          <input
            onInput={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onMouseDown={() => setPeek(true)}
            onMouseUp={() => setPeek(false)}
          >
            Peek
          </button>
          <button onClick={() => setPhrase(randomQuestion(questions))}>
            Skip
          </button>
          <button onClick={() => setFlip(!flip)}>Flip</button>
          <Feedback
            flip={flip}
            correct={correct}
            previousAns={previousAns}
            showFeedback={showFeedback}
          />
        </span>
      </header>
    </div>
  );
}

export default App;
