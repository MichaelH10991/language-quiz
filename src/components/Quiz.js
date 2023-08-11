import "../App.css";
import { useState } from "react";

import { randomQuestion, questionsLeft, markQuestionAsDone } from "../utils";

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
  const [infinite, setInfinite] = useState(true);
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
        /**
         * instead of getting rid of it completely, we could mark it as complete
         * this way we can filter it out when rendering and could also
         * use it for doing a strikethrough
         *
         * */

        // const filtered = questions.filter((item) => {
        //   return item.id !== phrase.id;
        // });
        // setQuestions(filtered);
        // setPhrase(randomQuestion(filtered));
        const questionsMarkedAsDone = markQuestionAsDone(questions, phrase);
        setQuestions(questionsMarkedAsDone);
        setPhrase(randomQuestion(questionsLeft(questionsMarkedAsDone)));
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
    <div style={{}}>
      <h1>The "Very Good" Language Quiz</h1>
      <div className="foo">
        <div
          style={{
            flex: 1,
            borderStyle: "solid",
            borderRadius: 9 + "px",
            background: "#202020",
            margin: 11 + "px",
            padding: 10 + "px",
            minWidth: "275px",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "left",
              color: "lightcoral",
            }}
          >
            <i>{language}</i>
          </div>
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
                onInput={(e) => {
                  setAnswer(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <div>
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
              </div>
              <Feedback
                flip={flip}
                correct={correct}
                previousAns={previousAns}
                showFeedback={showFeedback}
              />
            </span>
          </div>
        </div>
        <div style={{ flex: "1 1 0%" }}>
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
              <div>Questions left: {questionsLeft(questions).length}</div>
              <div>
                Infinite Mode
                <input
                  type="checkbox"
                  checked={infinite}
                  onClick={() => setInfinite(!infinite)}
                ></input>
              </div>
              <Revise phrases={questions}>
                <ListenButton
                  phrase={
                    (phrase && phrase.foreginDisplay) ||
                    (phrase && phrase.foregin)
                  }
                  buttonText={"Say answer"}
                />
              </Revise>
            </div>
          </Dialog>
        </div>
      </div>
      <div className="footer">
        {`This app is in developmemnt, please check back for updates.`}
        <br />
        <span>
          {"See the code "}
          <a
            href="https://github.com/MichaelH10991/language-quiz"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </span>
        <br />
        {`Last update: ${process.env.REACT_APP_TIMESTAMP}`}
      </div>
    </div>
  );
};

export default Quiz;
