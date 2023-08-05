import "../App.css";
import { useState } from "react";

import { randomQuestion } from "../utils";

import Revise from "./Revise";
import Dialog from "./OptionsDialog";
import Question from "./Question";
import Feedback from "./Feedback";
import ListenButton from "./ListenButton";

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
  const [infinite, setInfinite] = useState(false);
  const [flip, setFlip] = useState(false);
  const [enablePlayback, setEnablePlayback] = useState(false);

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
        /**
         * instead of getting rid of it completely, we could mark it as complete
         * this way we can filter it out when rendering and could also
         * use it for doing a strikethrough
         *
         * */

        const filtered = questions.filter((item) => {
          return item.id !== phrase.id;
        });
        setQuestions(filtered);
        setPhrase(randomQuestion(filtered));
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
    setPhrase(randomQuestion(language[questionSet]));
  };

  const handleQuestionSetChange = (e) => {
    setQuestionSet(e.target.value);
    setQuestions(languages[language][e.target.value]);
    setPhrase(randomQuestion(languages[language][e.target.value]));
  };

  return (
    <div style={{ padding: 35 + "px" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "relative",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Question
              phrase={phrase}
              language={language}
              peek={peek}
              flip={flip}
            />
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
          </div>
        </div>
        <div>
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
            <div style={{ textAlign: "left", padding: 5 + "px" }}>
              <div>Questions left: {questions.length}</div>
              <div>
                Infinite Mode
                <input
                  type="checkbox"
                  onClick={() => setInfinite(!infinite)}
                ></input>
              </div>
              <Revise phrases={questions} />
              <span>
                Enable Playback
                <input
                  type="checkbox"
                  onClick={() => setEnablePlayback(!enablePlayback)}
                />
                {enablePlayback ? (
                  <ListenButton phrase={phrase.foregin} />
                ) : undefined}
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
