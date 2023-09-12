import "../App.css";
import { useEffect, useState } from "react";

import { read } from "../api/quizApi";

import { randomQuestion, questionsLeft, markQuestionAsDone } from "../utils";

import Revise from "./Revise";
import Dialog from "./OptionsDialog";
import Question from "./Question";
import Feedback from "./Feedback";
import ListenButton from "./ListenButton";
import ManagementTable from "./management/ManagementTable";

// import languages from "../data";

// languages = self explanitory, can contain many question sets
// question set = the specific groups of questions e.g. greetings, things to say in a resturaunt, etc.;

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
    return comp(answer, phrase.local, phrase.localOptions);
  }
  return comp(answer, phrase.foreign, phrase.foreignOptions);
};

// const defaultLanguage = (languages) => languages && Object.keys(languages)[0];
// const defaultQuestionSet = (languages) => {
//   const language = defaultLanguage(languages);
//   return languages && Object.keys(languages[language])[0];
// };

const Quiz = () => {
  const [languages, setLanguages] = useState();
  const defaultLanguage = languages && Object.keys(languages)[0]; // first language in list
  const defaultQuestionSet =
    languages && defaultLanguage && Object.keys(languages[defaultLanguage])[0]; // first question set

  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState(defaultLanguage);
  const [questionSet, setQuestionSet] = useState(defaultQuestionSet);
  const [questions, setQuestions] = useState(
    languages &&
      defaultLanguage &&
      defaultQuestionSet &&
      languages[defaultLanguage][defaultQuestionSet]
  );
  const [correct, setCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [peek, setPeek] = useState(false);
  const [phrase, setPhrase] = useState(randomQuestion(questions));
  const [previousAns, setPreviousAns] = useState("");
  const [infinite, setInfinite] = useState(false);
  const [flip, setFlip] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const response = await read();

        if (response && Object.keys(response).length) {
          setLanguages(response);
          const defaultLanguage = Object.keys(response)[0];
          const defaultQuestionSet = Object.keys(response[defaultLanguage])[0];
          const questions = response[defaultLanguage][defaultQuestionSet];
          setLanguage(defaultLanguage);
          setQuestionSet(defaultQuestionSet);
          setQuestions(questions);
          setPhrase(randomQuestion(questions));
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setNetworkError(true);
      }
    }
    fetch();
  }, []);

  const submitAnswer = (event) => {
    if (checkAnswer(answer, phrase, flip)) {
      if (!infinite) {
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
        console.log(questionsMarkedAsDone);

        setQuestions(questionsMarkedAsDone);
        setPhrase(randomQuestion(questionsLeft(questionsMarkedAsDone)));
        setPreviousAns(phrase);
        setAnswer("");
        setCorrect(true);
        event.target.value = "";
      }
    } else {
      const questionsMarkedAsDone = markQuestionAsDone(
        questions,
        phrase,
        "incorrect"
      );
      console.log(questionsMarkedAsDone);
      setQuestions(questionsMarkedAsDone);
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
    const questions =
      languages && language && languages[language][e.target.value];
    if (questions) {
      setQuestionSet(e.target.value);
      setQuestions(questions);
      setPhrase(randomQuestion(questions));
    }
  };

  return (
    <div style={{}}>
      <h1>The "Very Good" Language Quiz</h1>
      <div className="foo">
        <Dialog>
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
              questions={questions}
              networkError={networkError}
              loading={loading}
            />
            <div style={{ padding: "0em 2em 0em 2em" }}>
              <input
                className="answer-input"
                onInput={(e) => {
                  setAnswer(e.target.value);
                  setShowFeedback(false);
                }}
                onKeyDown={handleKeyDown}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Answer"
              />
            </div>
            <span>
              <div>
                <button
                  className="button-60"
                  onMouseDown={() => setPeek(true)}
                  onMouseUp={() => setPeek(false)}
                  onTouchStart={() => setPeek(true)}
                >
                  Peek
                </button>
                <button
                  className="button-60"
                  onClick={() => {
                    setPhrase(randomQuestion(questions));
                    setShowFeedback(false);
                  }}
                >
                  Skip
                </button>
                <button
                  className="button-60"
                  onClick={() => {
                    setFlip(!flip);
                    setShowFeedback(false);
                  }}
                >
                  Flip
                </button>
              </div>
              <Feedback
                flip={flip}
                correct={correct}
                previousAns={previousAns}
                showFeedback={showFeedback}
              />
            </span>
          </div>
        </Dialog>
        <Dialog>
          <div style={{ padding: 8 + "px" }}>
            <select
              value={language || "loading"}
              onChange={handleLanguageChange}
            >
              {languages &&
                Object.keys(languages).map((item) => (
                  <option value={item}>{item}</option>
                ))}
            </select>
            <select
              value={questionSet || "loading"}
              onChange={handleQuestionSetChange}
            >
              {languages &&
                language &&
                Object.keys(languages[language]).map((item) => (
                  <option value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div style={{ textAlign: "left", padding: 5 + "px" }}>
            <div>
              Questions left: {questions && questionsLeft(questions).length}
            </div>
            <div>
              Challenge Mode
              <input
                type="checkbox"
                checked={infinite}
                onClick={() => setInfinite(!infinite)}
              ></input>
            </div>
            <Revise phrases={questions}>
              <ListenButton
                phrase={
                  (phrase && phrase.foreignDisplay) ||
                  (phrase && phrase.foreign)
                }
                language={language}
                buttonText={"Say answer"}
              />
            </Revise>
            <div>
              Show management table
              <input
                type="checkbox"
                checked={showTable}
                onClick={() => setShowTable(!showTable)}
              />
            </div>
          </div>
        </Dialog>
      </div>
      {/* <NewQuestion /> */}
      <ManagementTable
        showTable={showTable}
        questions={questions}
        languages={languages}
        questionSet={questionSet}
      />
      <div style={{ height: "calc(100vh - 331px)" }} />
      <div className="footer">
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
