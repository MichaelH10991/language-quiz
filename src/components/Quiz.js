import "../App.css";
import { useState } from "react";

import { randomQuestion } from "../utils";

import Revise from "./Revise";
import Dialog from "./OptionsDialog";
import Question from "./Question";
import Feedback from "./Feedback";

import languages from "../data";

// languages = self explanitory, can contain many question sets
// question set = the specific groups of questions e.g. greetings, things to say in a resturaunt, etc.;

const defaultLanguage = Object.keys(languages)[0]; // first language in list
const defaultQuestionSet = Object.keys(languages[defaultLanguage])[0]; // first question set

const checkAnswer = (answer, phrase, flip) => {
  const comp = (ans, phrase, options) => {
    if (options) {
      const transformed = options.map((item) =>
        item.toLocaleLowerCase().trim()
      );
      return transformed.includes(ans);
    }
    return ans.toLocaleLowerCase().trim() === phrase.toLocaleLowerCase();
  };

  if (flip) {
    return comp(answer, phrase.english, phrase.englishOptions);
  }
  return comp(answer, phrase.foregin, phrase.foreginOptions);
};

const Quiz = () => {
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
    const value = e.target.value;
    const language = languages[value];
    const questionSet = Object.keys(languages[value])[0]; // first question set
    setLanguage(value);
    setQuestionSet(questionSet);
    setQuestions(language[questionSet]);
    setQuestionsLeft(language[Object.keys(language)[0]].length);
    setPhrase(randomQuestion(language[questionSet]));
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
        <Dialog>
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
          <div>Questions left: {questionsLeft}</div>
          Infinite Mode
          <input type="checkbox" onClick={() => setInfinite(!infinite)}></input>
          <Revise phrases={questions} />
        </Dialog>
      </header>
    </div>
  );
};

export default Quiz;
